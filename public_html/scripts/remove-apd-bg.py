from PIL import Image
from collections import deque
from pathlib import Path

root = Path(__file__).resolve().parents[1]
src = root / "images" / "Isometric Government Policy Research Hub.png"
dst = root / "images" / "ai-pintar-dasar-hub.png"

img = Image.open(src).convert("RGBA")
w, h = img.size
px = img.load()


def is_bg(r, g, b, a):
    return a < 8 or (r >= 245 and g >= 245 and b >= 245)


visited = [[False] * w for _ in range(h)]
q = deque()

for x in range(w):
    for y in (0, h - 1):
        r, g, b, a = px[x, y]
        if is_bg(r, g, b, a):
            q.append((x, y))
            visited[y][x] = True

for y in range(h):
    for x in (0, w - 1):
        if visited[y][x]:
            continue
        r, g, b, a = px[x, y]
        if is_bg(r, g, b, a):
            q.append((x, y))
            visited[y][x] = True

removed = 0
while q:
    x, y = q.popleft()
    r, g, b, a = px[x, y]
    if is_bg(r, g, b, a):
        px[x, y] = (r, g, b, 0)
        removed += 1
    for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
        if 0 <= nx < w and 0 <= ny < h and not visited[ny][nx]:
            nr, ng, nb, na = px[nx, ny]
            if is_bg(nr, ng, nb, na):
                visited[ny][nx] = True
                q.append((nx, ny))

img.save(dst, optimize=True)
print(f"wrote {dst.name} size={w}x{h} removed={removed}")
