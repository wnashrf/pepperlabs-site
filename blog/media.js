// Pictures in blog posts, shared by index.html, post.html and admin.html.
//
// A post keeps its pictures in three places:
//   post.image    the main picture, used on blog cards and at the top of the article
//   post.content  pictures placed at a set point in the article, as <figure class="post-figure">
//   post.gallery  the rest, as [{ src, caption }], shown as thumbnails under the main picture
//
// Every upload goes through BlogMedia.shrink() first and joins the article as a data: address.
// When the article is saved, the server writes each picture to blog/uploads/<article id>/ and keeps
// only its address (blog/private/lib/media.php).

const BlogMedia = (() => {
    // Longest side in pixels and JPEG quality, tried in turn until the picture is small enough.
    const SHRINK_STEPS = [[1600, 0.82], [1600, 0.7], [1280, 0.7], [1024, 0.65], [800, 0.6]];
    // About 300 KB once stored as text.
    const SHRINK_TARGET = 400000;

    const icon = paths => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
    const ICON = {
        up: icon('<path d="M12 19V5M6 11l6-6 6 6"/>'),
        x: icon('<path d="M6 6l12 12M18 6L6 18"/>'),
        prev: icon('<path d="M15 5l-7 7 7 7"/>'),
        next: icon('<path d="M9 5l7 7-7 7"/>')
    };

    function esc(value) {
        return String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
    }

    /* ---------- Shrinking ---------- */

    function loadImage(file) {
        return new Promise((resolve, reject) => {
            const url = URL.createObjectURL(file);
            const image = new Image();
            image.onload = () => {
                URL.revokeObjectURL(url);
                if (image.naturalWidth && image.naturalHeight) resolve(image); else reject(new Error('This picture could not be read.'));
            };
            image.onerror = () => {
                URL.revokeObjectURL(url);
                reject(new Error('This picture could not be read.'));
            };
            image.src = url;
        });
    }

    // Turns a chosen file into a JPEG small enough to store, and resolves with it as a data: address.
    async function shrink(file) {
        if (!file || !String(file.type).startsWith('image/')) throw new Error('Choose a picture file, such as a JPEG or PNG.');
        const image = await loadImage(file);
        const longest = Math.max(image.naturalWidth, image.naturalHeight);
        let result = '';
        for (const [edge, quality] of SHRINK_STEPS) {
            const scale = Math.min(1, edge / longest);
            const canvas = document.createElement('canvas');
            canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
            canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
            const context = canvas.getContext('2d');
            // JPEG has no transparency, so see-through areas become white rather than black.
            context.fillStyle = '#fff';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            result = canvas.toDataURL('image/jpeg', quality);
            if (result.length <= SHRINK_TARGET) break;
        }
        return result;
    }

    /* ---------- Pictures inside the article ---------- */

    // The last place the cursor was inside an editor, kept because choosing a file moves focus away.
    let caret = null;
    document.addEventListener('selectionchange', () => {
        const selection = getSelection();
        if (!selection.rangeCount) return;
        const node = selection.anchorNode;
        const editor = (node?.nodeType === 1 ? node : node?.parentElement)?.closest('[contenteditable="true"]');
        if (editor) caret = { editor, range: selection.getRangeAt(0).cloneRange() };
    });

    // Shrinks the chosen files and places them where the cursor last was in the editor (or at the end).
    async function insertImages(editor, files) {
        const sources = [];
        for (const file of files) sources.push(await shrink(file));
        if (!sources.length) return;

        editor.focus();
        const selection = getSelection();
        if (caret && caret.editor === editor && editor.contains(caret.range.startContainer)) {
            const range = caret.range;
            // A picture never goes inside another picture's caption.
            const start = range.startContainer.nodeType === 1 ? range.startContainer : range.startContainer.parentElement;
            const figure = start?.closest('.post-figure');
            if (figure && editor.contains(figure)) range.setStartAfter(figure);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
        } else {
            selection.selectAllChildren(editor);
            selection.collapseToEnd();
        }
        // The empty paragraph gives the writer somewhere to carry on typing below the picture.
        document.execCommand('insertHTML', false, sources.map(src => `<figure class="post-figure"><img src="${esc(src)}" alt=""><figcaption></figcaption></figure>`).join('') + '<p><br></p>');
    }

    function eachFigure(html, visit) {
        const doc = new DOMParser().parseFromString(`<body>${html || ''}</body>`, 'text/html');
        doc.body.querySelectorAll('figure.post-figure').forEach(figure => visit(figure, doc));
        return doc.body.innerHTML.trim();
    }

    // Before saving: drops captions left empty, uses a caption as the picture's description,
    // and removes the blank typing line under a picture if nothing was written on it.
    function tidy(html) {
        return eachFigure(html, figure => {
            const image = figure.querySelector('img');
            const after = figure.nextElementSibling;
            if (after && after.tagName === 'P' && !after.textContent.trim() && !after.querySelector('img')) after.remove();
            if (!image) {
                figure.remove();
                return;
            }
            const caption = figure.querySelector('figcaption');
            const text = caption ? caption.textContent.trim() : '';
            if (caption && !text) caption.remove();
            if (!image.getAttribute('alt')) image.setAttribute('alt', text);
        });
    }

    // Before editing: gives every picture a caption line to type into.
    function prepare(html) {
        return eachFigure(html, (figure, doc) => {
            if (!figure.querySelector('figcaption')) figure.append(doc.createElement('figcaption'));
        });
    }

    /* ---------- More photos ---------- */

    function safeSource(src) {
        return typeof src === 'string' && /^(data:image\/|https?:\/\/|\/)/i.test(src);
    }

    // The gallery as saved on a post, with anything that is not a usable picture left out.
    function list(gallery) {
        return (Array.isArray(gallery) ? gallery : [])
            .filter(item => item && safeSource(item.src))
            .map(item => ({ src: item.src, caption: String(item.caption || '').trim() }));
    }

    function galleryHtml(gallery) {
        const items = list(gallery);
        if (!items.length) return '';
        return `<ul class="post-gallery" aria-label="More photos">${items.map((item, index) => `
            <li><button type="button" data-photo data-caption="${esc(item.caption)}" aria-label="Open photo ${index + 1} of ${items.length}${item.caption ? `: ${esc(item.caption)}` : ''}"><img src="${esc(item.src)}" alt="" loading="lazy"></button></li>`).join('')}
        </ul>`;
    }

    // The box where a writer adds, captions, reorders and removes the extra photos.
    function galleryEditor(root, { onChange = () => {} } = {}) {
        let items = [];
        const inputId = `${root.id}-input`;

        function draw(note = '') {
            root.classList.add('media-editor');
            root.innerHTML = `
                <ul class="media-editor__list">${items.map((item, index) => `
                    <li class="media-editor__item" data-index="${index}">
                        <img src="${esc(item.src)}" alt="">
                        <input type="text" maxlength="200" value="${esc(item.caption)}" placeholder="Caption (optional)" aria-label="Caption for photo ${index + 1}">
                        <span class="media-editor__tools">
                            <button type="button" data-move aria-label="Move photo ${index + 1} earlier" ${index === 0 ? 'disabled' : ''}>${ICON.up}</button>
                            <button type="button" data-remove aria-label="Remove photo ${index + 1}">${ICON.x}</button>
                        </span>
                    </li>`).join('')}</ul>
                <input class="media-file-input" id="${inputId}" type="file" accept="image/*" multiple>
                <label class="pl-btn pl-btn--ghost" for="${inputId}">Add photos</label>
                <p class="media-editor__note" role="status">${esc(note)}</p>`;
        }

        root.addEventListener('input', event => {
            const row = event.target.closest('.media-editor__item');
            if (row && event.target.type === 'text') items[Number(row.dataset.index)].caption = event.target.value;
        });

        root.addEventListener('click', event => {
            const button = event.target.closest('[data-move], [data-remove]');
            if (!button) return;
            const index = Number(button.closest('.media-editor__item').dataset.index);
            if (button.hasAttribute('data-remove')) {
                items.splice(index, 1);
            } else {
                items.splice(index - 1, 0, items.splice(index, 1)[0]);
            }
            draw();
            onChange();
        });

        root.addEventListener('change', async event => {
            if (event.target.id !== inputId) return;
            const files = [...event.target.files];
            let failed = 0;
            for (const file of files) {
                try {
                    items.push({ src: await shrink(file), caption: '' });
                } catch {
                    failed += 1;
                }
            }
            draw(failed ? `${failed} of ${files.length} could not be read as a picture.` : '');
            if (failed < files.length) onChange();
        });

        draw();
        return {
            get items() {
                return list(items);
            },
            set items(value) {
                items = list(value);
                draw();
            }
        };
    }

    /* ---------- Full-size viewer ---------- */

    let viewer = null;
    let viewerPhotos = [];
    let viewerIndex = 0;

    function showPhoto(index) {
        viewerIndex = (index + viewerPhotos.length) % viewerPhotos.length;
        const photo = viewerPhotos[viewerIndex];
        viewer.querySelector('img').src = photo.src;
        viewer.querySelector('img').alt = photo.caption;
        viewer.querySelector('p').textContent = photo.caption;
        viewer.querySelectorAll('.media-lightbox__prev, .media-lightbox__next').forEach(button => { button.hidden = viewerPhotos.length < 2; });
    }

    function openViewer(photos, index) {
        if (!viewer) {
            viewer = document.createElement('dialog');
            viewer.className = 'media-lightbox';
            viewer.setAttribute('aria-label', 'Photo');
            viewer.innerHTML = `
                <img alt="">
                <p aria-live="polite"></p>
                <button type="button" class="media-lightbox__close" aria-label="Close">${ICON.x}</button>
                <button type="button" class="media-lightbox__prev" aria-label="Previous photo">${ICON.prev}</button>
                <button type="button" class="media-lightbox__next" aria-label="Next photo">${ICON.next}</button>`;
            viewer.addEventListener('click', event => {
                if (event.target.closest('.media-lightbox__prev')) showPhoto(viewerIndex - 1);
                else if (event.target.closest('.media-lightbox__next')) showPhoto(viewerIndex + 1);
                // A click on the dark surround or the close button shuts the viewer; one on the photo does not.
                else if (event.target.tagName !== 'IMG') viewer.close();
            });
            viewer.addEventListener('keydown', event => {
                if (viewerPhotos.length < 2) return;
                if (event.key === 'ArrowLeft') showPhoto(viewerIndex - 1);
                if (event.key === 'ArrowRight') showPhoto(viewerIndex + 1);
            });
            document.body.append(viewer);
        }
        viewerPhotos = photos;
        showPhoto(index);
        viewer.showModal();
    }

    document.addEventListener('click', event => {
        const button = event.target.closest('.post-gallery [data-photo]');
        if (!button) return;
        const buttons = [...button.closest('.post-gallery').querySelectorAll('[data-photo]')];
        openViewer(buttons.map(each => ({ src: each.querySelector('img').src, caption: each.dataset.caption || '' })), buttons.indexOf(button));
    });

    // Article bodies are inserted as HTML. This removes anything in them that could run code:
    // the admin page cleans an article when it is approved, and the post page cleans it again before showing it.
    const UNSAFE_TAGS = 'script, style, iframe, frame, object, embed, link, meta, base, form, input, button, textarea, select';
    const URL_ATTRIBUTES = ['href', 'src', 'xlink:href', 'action', 'formaction', 'poster'];

    function sanitize(html) {
        const doc = new DOMParser().parseFromString(`<body>${html || ''}</body>`, 'text/html');
        let removed = 0;
        doc.body.querySelectorAll(UNSAFE_TAGS).forEach(element => {
            element.remove();
            removed += 1;
        });
        doc.body.querySelectorAll('*').forEach(element => {
            [...element.attributes].forEach(attribute => {
                const name = attribute.name.toLowerCase();
                const value = attribute.value.replace(/[\u0000- ]/g, '').toLowerCase();
                const badUrl = URL_ATTRIBUTES.includes(name)
                    && (/^(javascript|vbscript):/.test(value) || (value.startsWith('data:') && !value.startsWith('data:image/')));
                if (name.startsWith('on') || badUrl) {
                    element.removeAttribute(attribute.name);
                    removed += 1;
                }
            });
            if (element.tagName === 'A' && element.getAttribute('target') === '_blank') {
                element.setAttribute('rel', 'noopener');
            }
        });
        return { html: doc.body.innerHTML.trim(), removed, body: doc.body };
    }

    return { shrink, insertImages, tidy, prepare, list, galleryHtml, galleryEditor, sanitize };
})();
