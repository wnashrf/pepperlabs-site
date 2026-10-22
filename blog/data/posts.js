// Sample posts for the blog, shared by index.html, post.html and admin.html.
// Each page starts from this list until posts are saved in the browser
// (localStorage key "blog_posts"), after which the saved posts are used instead.
//
// These posts are drafts written from press coverage of Pepper Labs' work
// (each one links its source). Check the facts and wording before publishing.
// Photo origins are listed in images/SOURCES.md.

const source = (label, url) => `<p><em>Source: <a href="${url}" target="_blank" rel="noopener">${label}</a></em></p>`;

// A picture placed at a set point in an article, with its caption underneath.
const figure = (file, caption) => `<figure class="post-figure"><img src="/blog/data/images/${file}" alt="${caption}"><figcaption>${caption}</figcaption></figure>`;

const SAMPLE_POSTS = [
    {
        id: 1,
        slug: "ai-ready-malaysia-50000",
        sourceName: "Pokde.net",
        image: "/blog/data/images/ai-ready-malaysia-50000.jpg",
        title: "50,000 AI Learning Opportunities for Malaysians",
        category: "avpn",
        date: "Aug 20, 2026",
        author: "Pepper Labs",
        status: "published",
        emoji: "🤖",
        excerpt: "At the AI-Ready Malaysia Summit 2026, Pepper Labs opened 50,000 places for practical AI training aimed at university students, educators and small businesses.",
        content: `
            <p>Pepper Labs has opened 50,000 AI learning opportunities for Malaysians under the AI-Ready Malaysia initiative. The programme was launched by the Minister of Digital, YB Gobind Singh Deo, at the AI-Ready Malaysia Summit 2026 at Royale Chulan Damansara.</p>
            ${figure('ai-ready-malaysia-50000-2.jpg', 'On stage at the AI-Ready Malaysia Summit 2026. Photo: Pokde.net')}
            <h2>Who it is for</h2>
            <p>The training is practical, and it is aimed at three groups:</p>
            <ul>
                <li><strong>University students</strong> preparing to enter a job market where AI skills are increasingly expected.</li>
                <li><strong>Educators</strong> who will pass those skills on.</li>
                <li><strong>Micro, small and medium enterprises</strong>, including community businesses that have not used AI tools before.</li>
            </ul>
            <h2>Who is behind it</h2>
            <p>AI-Ready Malaysia is part of a regional programme run by AVPN (the Asian Venture Philanthropy Network), with support from Google.org and the Asian Development Bank. Pepper Labs is also working with MyDIGITAL Corporation to widen access to digital skills training, so that learners can find courses through the national Rakyat Digital learning hub as well as through Pepper Labs' own community network.</p>
            <h2>How it came about</h2>
            <p>The 50,000 places trace back to April 2026, when Pepper Labs was <a href="/blog/post.html?slug=ai-opportunity-fund-selection">chosen as a local training provider</a> under the second phase of the AI Opportunity Fund: Asia-Pacific. The training is free to participants and covers three areas: generative AI, agentic AI and applied AI. The summit in August was the public launch of that commitment.</p>
            <h2>Why it matters</h2>
            <p>At the launch, the Minister said Malaysia's digital transformation must make AI knowledge and capabilities accessible to all Malaysians, not only to those already working in technology.</p>
            <p>The honest test of a programme like this is what happens afterwards. As one report on the launch put it, the real measure of success will be how many of the 50,000 are using those skills in their jobs or businesses a year from now. That is the number Pepper Labs intends to be judged on.</p>
            <h2>A milestone year</h2>
            <p>The launch fell on Pepper Labs' 11th anniversary. Alongside the training places, Pepper Labs presented its own AI products at the summit, including Bisnes.ai, an assistant for small businesses.</p>
            ${source('Pokde.net, 20 August 2026', 'https://pokde.net/system/software/ai/pepper-labs-50000-ai-learning')}
        `
    },
    {
        id: 2,
        slug: "bisnes-ai-agentic",
        sourceName: "Pokde.net",
        image: "/blog/data/images/bisnes-ai-agentic.jpg",
        title: "Bisnes.ai: An AI Assistant for Micro-Entrepreneurs",
        category: "ai",
        date: "Aug 20, 2026",
        author: "Pepper Labs",
        status: "published",
        emoji: "🤖",
        excerpt: "Alongside the AI-Ready Malaysia launch, Pepper Labs presented Bisnes.ai, a platform that helps small businesses with quotations, invoices, marketing content and customer replies.",
        content: `
            <p>At the AI-Ready Malaysia Summit 2026, Pepper Labs presented two pieces of its own AI work: a business assistant for small enterprises, and a set of AI tools built for government.</p>
            <h2>Bisnes.ai</h2>
            <p>Bisnes.ai is an AI-powered business support platform for Malaysian micro-entrepreneurs, small and medium enterprises and community businesses. It is built to take over the paperwork and replies that eat into a small trader's day. It can:</p>
            <ul>
                <li>generate business documents, quotations and invoices;</li>
                <li>read and analyse forms and images;</li>
                <li>write marketing content;</li>
                <li>help manage conversations with customers;</li>
                <li>give guidance on Malaysian regulations and available grants.</li>
            </ul>
            <p>The platform is described as sovereign, meaning it is built and run with Malaysian businesses and Malaysian rules in mind.</p>
            <h2>AI tools for government</h2>
            <p>Pepper Labs also presented a portfolio of more than 40 agentic AI solutions for ministries and agencies. "Agentic" means the software can carry out a multi-step task on its own, not only answer a question. The tools include policy assistants, parliamentary intelligence tools, grant assessment support, document intelligence and workflow coordination.</p>
            ${source('Pokde.net, 20 August 2026', 'https://pokde.net/system/software/ai/pepper-labs-50000-ai-learning')}
        `
    },
    {
        id: 3,
        slug: "mydigital-mou-rakyat-digital",
        sourceName: "MyDIGITAL Corporation",
        image: "/blog/data/images/mydigital-mou-rakyat-digital.jpg",
        title: "MyDIGITAL Corporation and Pepper Labs Sign an Agreement to Bring AI Learning into PPR Communities",
        category: "avpn",
        date: "Aug 14, 2026",
        author: "Pepper Labs",
        status: "published",
        emoji: "🤖",
        excerpt: "A memorandum of understanding links Rakyat Digital, the national digital learning hub, with the Dapur Digital community network in public housing flats.",
        content: `
            <p>MyDIGITAL Corporation and Pepper Labs exchanged a memorandum of understanding on 14 August 2026 at the AI-Ready Malaysia Summit 2026. The agreement is meant to speed up digital adoption and AI literacy, especially in communities that national programmes have found hard to reach.</p>
            <h2>How the partnership works</h2>
            <p>The two organisations describe it as a public-private-community partnership, with each side doing what it is best placed to do:</p>
            <ul>
                <li><strong>MyDIGITAL Corporation</strong> provides national coordination, structured learning pathways and digital access through Rakyat Digital, Malaysia's national digital learning hub.</li>
                <li><strong>Pepper Labs</strong> brings community reach and delivers the learning on the ground through its Dapur Digital network.</li>
            </ul>
            <p>Dapur Digital works inside PPR communities. PPR (Program Perumahan Rakyat) is the government's public housing programme for low-income families. The Dapur Digital spaces there already serve women running small food businesses, and will now double as places to learn digital and AI skills.</p>
            <h2>Awareness, access, adoption</h2>
            <p>The partnership follows what both sides call a "3A" approach. People first need to know what the tools are (awareness), then be able to get to them (access), and finally use them in their work (adoption). Eligible participants get free access to Coursera courses through the hub's Digital Skills Hub.</p>
            <h2>Reach</h2>
            <p>The AI-Ready Malaysia courses on the hub are aimed at up to 50,000 Malaysians, including small businesses, university students and educators. They are supported by the AI Opportunity Fund for Asia Pacific, a collaboration between AVPN, Google.org and the Asian Development Bank.</p>
            <p>The work supports the government's Towards an AI Nation 2030 agenda, the Thirteenth Malaysia Plan, the Malaysia Digital 2030 Action Plan and the National AI Action Plan 2026-2030.</p>
            <h2>What MyDIGITAL said</h2>
            <blockquote>"Malaysia's AI Nation ambition will be realised not by technology alone, but whether people can use it confidently and responsibly to improve their lives and livelihoods."</blockquote>
            <p>That was Adrian Marcellus, Chief Executive Officer of MyDIGITAL Corporation. He described the partnership as connecting the national scale of Rakyat Digital with the community reach of Dapur Digital, especially for communities that online learning alone may not reach.</p>
            <p>Tech site Pokde.net made the same point more bluntly in its own commentary: bringing AI training into PPR community spaces, instead of keeping it all online, is a smart move, because that is exactly where a lot of people get left out.</p>
            ${source('MyDIGITAL Corporation, August 2026', 'https://www.mydigital.gov.my/mydigital-corporation-and-pepper-labs-expand-inclusive-ai-learning-through-rakyat-digital/')}
            ${source('Digital News Asia, 21 August 2026', 'https://www.digitalnewsasia.com/digital-economy/mydigital-corporation-and-pepper-labs-expand-inclusive-ai-learning-through-rakyat')}
        `
    },
    {
        id: 14,
        slug: "ai-opportunity-fund-selection",
        image: "/blog/data/images/ai-opportunity-fund-selection.jpg",
        sourceName: "Digital News Asia",
        title: "Selected to Train 50,000 Malaysians in AI",
        category: "avpn",
        date: "Apr 21, 2026",
        author: "Pepper Labs",
        status: "published",
        emoji: "🤖",
        excerpt: "Pepper Labs was chosen as a local training provider under the AI Opportunity Fund: Asia-Pacific, an AVPN initiative backed by Google.org and the Asian Development Bank.",
        content: `
            <p>Pepper Labs has been selected as a local training provider under Phase 2 of the AI Opportunity Fund: Asia-Pacific. Under it, Pepper Labs will deliver AI training to 50,000 Malaysians at no cost to them.</p>
            <h2>What the fund is</h2>
            <p>The AI Opportunity Fund is run by AVPN, the Asian Venture Philanthropy Network, a network of funders that back social causes across Asia. It is supported by Google.org, Google's charitable arm, and the Asian Development Bank. Its purpose is to pay for AI training for people who would otherwise be left out of it. Digital News Asia reported that 18 training providers were selected across the region in this phase.</p>
            <h2>What will be taught</h2>
            <p>The training is practical and hands-on. It covers three areas:</p>
            <ul>
                <li><strong>Generative AI</strong>: tools that produce text, images and other content from a written instruction.</li>
                <li><strong>Agentic AI</strong>: software that can carry out a task with several steps on its own.</li>
                <li><strong>Applied AI</strong>: using these tools on real problems at work, in a classroom or in a business.</li>
            </ul>
            <h2>Who it is for</h2>
            <p>The programme is aimed at students, at teachers and lecturers, and at the owners of micro, small and medium enterprises. Digital News Asia reported that it involves the Ministry of Education, the Ministry of Higher Education and the Ministry of Entrepreneur and Cooperatives Development.</p>
            <blockquote>"We are honoured to be selected as a partner of the AI Opportunity Fund: Asia-Pacific. This reinforces our commitment to expanding inclusive AI opportunities and empowering Malaysians to thrive in an increasingly digital future."</blockquote>
            <p>That was Selan Rajendran, Managing Director of Pepper Labs.</p>
            <p>The same report said Pepper Labs' earlier AI literacy programmes had already reached more than 350,000 learners.</p>
            <h2>What happened next</h2>
            <p>The programme was launched publicly four months later as <a href="/blog/post.html?slug=ai-ready-malaysia-50000">AI-Ready Malaysia</a>, at a summit in August 2026.</p>
            ${source('Digital News Asia, 21 April 2026', 'https://www.digitalnewsasia.com/business/pepper-labs-train-50000-malaysians-ai-under-avpn-googleorg-and-asian-development-bank')}
        `
    },
    {
        id: 15,
        slug: "dapur-digital-rm2-5-million",
        image: "/blog/data/images/dapur-digital-rm2-5-million.jpg",
        sourceName: "Bernama",
        title: "Dapur Digital Generates RM2.5 Million in 18 Months",
        category: "dapur-digital",
        date: "Jan 15, 2026",
        author: "Pepper Labs",
        status: "published",
        emoji: "🍳",
        excerpt: "The 15 Dapur Digital locations in Kuala Lumpur have generated RM2.5 million in economic returns, and 15 more locations are planned around the country.",
        content: `
            <p>The Dapur Digital kitchens across 15 locations in Kuala Lumpur have generated more than RM2.5 million in economic returns over 18 months, Bernama reported on 15 January 2026.</p>
            <blockquote>"I am extremely proud of all of you because this RM2.5 million is not a mere number, but a very significant amount."</blockquote>
            <p>That was Communications Minister Datuk Fahmi Fadzil, speaking to the participants. RTM reported him adding that the result shows how strategic cooperation and community empowerment can produce lasting economic impact.</p>
            <h2>For comparison</h2>
            <p>When the first five kitchens opened in October 2024, Pepper Labs hoped they would return around RM1.2 million over two years. Fifteen locations have now returned roughly twice that in a year and a half.</p>
            <h2>What participants said</h2>
            <p>Normah Hamzah, 48, is a participant from PPR Kerinchi and supports seven children. Before joining she earned RM60 to RM80 a day.</p>
            <blockquote>"Thanks to this initiative, I now have a clean and conducive kitchen to generate a good income."</blockquote>
            <p>She told RTM she has also learned to sell through live streams on TikTok, which lets her trade online as well as in person.</p>
            <p>Another participant, Suhailah Sharip, pointed to the digital side of the training:</p>
            <blockquote>"Through Dapur Digital, we learned to use social media, introduce ourselves, expand our business."</blockquote>
            <p>Others described the practical difference a proper kitchen makes. Intan Zarina Rosli said that with a fully equipped space she can now accept bigger orders. Norina Daud said participants have been able to win large orders, including government tenders, and that the programme should be expanded.</p>
            <h2>What comes next</h2>
            <p>Pepper Labs plans to take Dapur Digital to 15 more locations across the country.</p>
            ${source('Bernama, 15 January 2026', 'https://bernama.com/tv/news.php?id=2512988')}
            ${source('RTM Berita, 16 January 2026 (in Malay)', 'https://berita.rtm.gov.my/?p=325853')}
        `
    },
    {
        id: 16,
        slug: "dapur-digital-seri-perlis",
        sourceName: "The Star",
        title: "A New Kitchen at PPR Seri Perlis II",
        category: "dapur-digital",
        date: "Oct 5, 2025",
        author: "Pepper Labs",
        status: "published",
        emoji: "🍳",
        excerpt: "The Deputy Minister of Domestic Trade and Cost of Living launched the latest Dapur Digital kitchen in Datuk Keramat.",
        content: `
            <p>A new Dapur Digital kitchen has been launched at PPR Seri Perlis II, a public housing project in Datuk Keramat, Kuala Lumpur. The Star described it as the 13th edition of the initiative.</p>
            <p>The launch was attended by Datuk Dr Fuziah Salleh, Deputy Minister of Domestic Trade and Cost of Living. She called the programme "an innovative step that goes beyond promoting food entrepreneurship", pointing to what it does for the community and the local economy around each kitchen.</p>
            <p>She said 25 kitchens had been allocated under the year's budget, with 15 already running and the rest due by the end of the year. A further 25 are in the pipeline, and the programme is to expand across the country in stages.</p>
            ${source('The Star, 5 October 2025', 'https://thestartv.com/v/cooking-up-change-digital-kitchens-empower-communities-and-fuel-local-growth')}
        `
    },
    {
        id: 4,
        pinned: true,
        slug: "dapur-digital-15-locations",
        gallery: [
            { src: "/blog/data/images/dapur-digital-15-locations-2.jpg", caption: "A cooking demonstration at a Dapur Digital kitchen, September 2025. Photo: The Vibes" }
        ],
        sourceName: "The Vibes",
        image: "/blog/data/images/dapur-digital-15-locations.jpg",
        title: "Dapur Digital Reaches 15 Locations in Kuala Lumpur",
        category: "dapur-digital",
        date: "Sep 6, 2025",
        author: "Pepper Labs",
        status: "published",
        emoji: "🍳",
        excerpt: "The shared cloud kitchens that help low-income women earn from home-cooked food are now running in 15 public housing communities across the city.",
        content: `
            <p>Dapur Digital is now active in 15 locations across Kuala Lumpur, The Vibes reported from an event at PPR Hiliran Ampang on 6 September 2025.</p>
            <h2>What Dapur Digital is</h2>
            <p>Dapur Digital ("digital kitchen") gives women from low-income households in public housing flats a shared, properly equipped kitchen. Many of them are housewives or have been out of work. Along with the kitchen they get support to run the business digitally and are connected to food delivery platforms, so they can sell beyond their own block.</p>
            <p>A dedicated space in the community matters for a simple reason: a home kitchen limits how much one person can cook, and a shared kitchen makes hygiene and quality easier to manage.</p>
            <h2>Who is behind it</h2>
            <p>The programme is run with the Ministry of Finance, the Federal Territories Department, Kuala Lumpur City Hall and Yayasan Hasanah, and has been described as Malaysia's first public-private-philanthropic collaboration of its kind. Media Prima Television Network is also a partner.</p>
            <h2>At the event</h2>
            <p>Datuk Seri Johari Abdul Ghani, the Member of Parliament for Titiwangsa and Minister of Plantation and Commodities, attended and voiced his support for the programme as a real opportunity for low-income families to raise their household income. He stressed that the cooking must be clean, with no shortcuts, and made the point that when the food is good, people come back for it.</p>
            <p>Nini Yusof, Chief Executive Officer of Media Prima Television Network, said the programme introduces women and small entrepreneurs to digital ways of working that are faster and more organised.</p>
            <p>Pepper Labs founder Kuhan Pathy was also at the event.</p>
            <h2>Since then</h2>
            <p>A month later another kitchen was <a href="/blog/post.html?slug=dapur-digital-seri-perlis">launched at PPR Seri Perlis II</a> in Datuk Keramat. In January 2026, Bernama reported that the 15 Kuala Lumpur locations had <a href="/blog/post.html?slug=dapur-digital-rm2-5-million">generated RM2.5 million in 18 months</a>.</p>
            ${source('The Vibes, 6 September 2025', 'https://www.thevibes.com/articles/news/112454/digital-kitchens-help-b40-housewives-cook-up-extra-income-in-kuala-lumpur')}
        `
    },
    {
        id: 5,
        slug: "dorsett-kitchen-session",
        sourceName: "Dorsett Kuala Lumpur",
        image: "/blog/data/images/dorsett-kitchen-session.jpg",
        title: "Inside a Hotel Kitchen with Dorsett Kuala Lumpur",
        category: "dapur-digital",
        date: "Aug 25, 2025",
        author: "Pepper Labs",
        status: "published",
        emoji: "🍳",
        excerpt: "Twenty Dapur Digital entrepreneurs spent a session with the hotel's executive chef.",
        content: `
            <p>On 25 August 2025, Dorsett Kuala Lumpur hosted 20 aspiring food entrepreneurs from the Dapur Digital programme for a hands-on session in a professional kitchen.</p>
            <p>The session was led by the hotel's Executive Chef Azmi and covered kitchen workflow, hygiene practices and ingredient management. Participants toured the hotel's show kitchen, watched a live cooking demonstration and finished with a tasting.</p>
            <p>The aim was to show home-based cooks how a commercial kitchen is run, so they can bring those practices back to their own businesses.</p>
            ${source('Dorsett Kuala Lumpur, August 2025', 'https://www.dorsetthotels.com/news-events/empowering-aspiring-entrepreneurs-through-culinary-exposure.html')}
        `
    },
    {
        id: 6,
        slug: "perkeso-google-career-certificates",
        sourceName: "Focus Malaysia",
        image: "/blog/data/images/perkeso-google-career-certificates.jpg",
        title: "Google Career Certificate Scholarships for Unemployed Graduates",
        category: "youth",
        date: "Aug 5, 2025",
        author: "Pepper Labs",
        status: "published",
        emoji: "🎓",
        excerpt: "PERKESO and Pepper Labs are offering fully sponsored scholarships in AI, cybersecurity, data analytics, project management and digital marketing.",
        content: `
            <p>PERKESO, Malaysia's Social Security Organisation (also known as SOCSO), has partnered with Pepper Labs under the Google Gemilang initiative to help unemployed graduates move into work.</p>
            <h2>What is offered</h2>
            <p>Unemployed Malaysian youth and graduates can apply for fully sponsored scholarships for Google Career Certificates. These are job-focused courses designed by Google and delivered online through Coursera. They cover five fields:</p>
            <ul>
                <li>artificial intelligence</li>
                <li>cybersecurity</li>
                <li>data analytics</li>
                <li>project management</li>
                <li>digital marketing</li>
            </ul>
            <h2>Who does what</h2>
            <p>PERKESO identifies candidates through its MYFutureJobs platform and at career fairs. Pepper Labs is the lead implementation partner. Its role goes beyond the technical course: participants are also supported with soft skills, everyday living skills and preparation for how work is changing, and are then helped into a job placement.</p>
            <p>The first group of participants began training on 26 May 2025.</p>
            <h2>What the Minister said</h2>
            <blockquote>"Through this partnership between SOCSO and Pepper Labs, we're ensuring that unemployed graduates are not left behind in the digital transition."</blockquote>
            <p>That was Human Resources Minister Steven Sim Chee Keong, who described the initiative as a statement of belief in the potential of young Malaysian talent.</p>
            <p>The same report noted that Pepper Labs has helped more than 300,000 Malaysians build AI skills through its earlier programmes.</p>
            ${source('Focus Malaysia, 6 August 2025', 'https://focusmalaysia.my/?p=215568')}
        `
    },
    {
        id: 7,
        slug: "microsoft-aiformyfuture",
        sourceName: "Digital News Asia",
        image: "/blog/data/images/microsoft-aiformyfuture.jpg",
        title: "AIForMYFuture: Free AI Skills Training with Microsoft",
        category: "ai",
        date: "Apr 22, 2025",
        author: "Pepper Labs",
        status: "published",
        emoji: "🤖",
        excerpt: "Pepper Labs and Microsoft launched AIForMYFuture to make basic AI knowledge available to civil servants, students, teachers and community groups.",
        content: `
            <p>Pepper Labs and Microsoft have launched AIForMYFuture, short for "AI for Malaysia's Future". It is an AI skilling programme meant to make AI knowledge available to people across the country, not only to those already working in technology.</p>
            <h2>What people learn</h2>
            <p>The training starts from the basics. It covers foundational AI knowledge, how to use AI ethically, and practical applications people can try in their own work. It combines hands-on sessions with self-paced online modules, and it is free.</p>
            <h2>Who it is for</h2>
            <p>The programme is deliberately broad. Digital News Asia listed the groups it is meant to reach: civil servants, students, young people, teachers, grassroots communities, entrepreneurs, professionals in key industries and corporate leaders. It supports Prime Minister Anwar Ibrahim's plan for an AI-driven digital transformation of Malaysia.</p>
            <h2>Who is taking part</h2>
            <p>Sessions have been run with government bodies including the Ministry of Transport, the Ministry of National Unity, the National Audit Department, the Prime Minister's Department, the Department of Federal Territories and the Fire and Rescue Department, as well as Bank Simpanan Nasional.</p>
            <p>Universiti Utara Malaysia and Universiti Tun Hussein Onn are involved, along with neighbourhood groups (Komuniti Rukun Tetangga) and teacher networks.</p>
            <h2>Why now</h2>
            <blockquote>"Microsoft's 2024 Work Trend Index shows that 84% of Malaysian knowledge workers are already using AI at work. This demonstrates that AI fluency is no longer a luxury – it's a necessity."</blockquote>
            <p>That was Adilah Junid, Director of Legal and Government Affairs at Microsoft Malaysia.</p>
            <p>Pepper Labs founder Ir. Kuhan Pathy put the organisation's side of it this way:</p>
            <blockquote>"At Pepper Labs, we believe in harnessing technology for good. By leveraging our deep-rooted networks and commitment to social impact, we aim to empower communities, educators, and businesses to embrace AI with confidence."</blockquote>
            <h2>The target</h2>
            <p>Digital News Asia reported that the initiative aims to give 800,000 people AI knowledge by 2025.</p>
            <h2>How to join</h2>
            <p>The free learning modules are open to anyone at <a href="https://microsoft.pepperlabs.my" target="_blank" rel="noopener">microsoft.pepperlabs.my</a>.</p>
            ${source('Digital News Asia, 22 April 2025', 'https://www.digitalnewsasia.com/business/pepper-labs-collaborates-microsoft-empower-malaysians-ai-fluency')}
        `
    },
    {
        id: 8,
        slug: "k-youth-khazanah",
        gallery: [
            { src: "/blog/data/images/k-youth-khazanah-4.jpg", caption: "K-Youth participants. Photo: Malaysiakini" },
            { src: "/blog/data/images/k-youth-khazanah-5.jpg", caption: "Participants working in groups. Photo: Malaysiakini" }
        ],
        sourceName: "Malaysiakini",
        image: "/blog/data/images/k-youth-khazanah.jpg",
        title: "K-Youth: Working with Khazanah on Youth Unemployment",
        category: "youth",
        date: "Dec 5, 2024",
        author: "Pepper Labs",
        status: "published",
        emoji: "🎓",
        excerpt: "Pepper Labs is delivering the K-Youth Development Programme 2024 with Khazanah Nasional, pairing training in sustainability and AI with job placements.",
        content: `
            <p>Pepper Labs has partnered with Khazanah Nasional Berhad, Malaysia's sovereign wealth fund, to deliver the K-Youth Development Programme 2024. K-Youth is Khazanah's initiative, started in 2023, to make young, unemployed Malaysians more employable. This intake began on 2 May 2024.</p>
            <h2>The training</h2>
            <p>Participants take a mix of technical and soft-skills modules, each delivered by an organisation that works in the field:</p>
            <ul>
                <li><strong>Career Essentials in Sustainable Tech and Generative AI</strong>, from Microsoft.</li>
                <li><strong>ESG, Sustainability and Green Skills</strong>, from the UN Global Compact Network Malaysia &amp; Brunei. ESG stands for environmental, social and governance.</li>
                <li><strong>Industry 4.0</strong>, covering how factories and businesses are using connected, automated technology.</li>
            </ul>
            <p>Those who complete the programme are certified as Sustainability Associates.</p>
            ${figure('k-youth-khazanah-3.jpg', 'A briefing for K-Youth participants. Photo: Malaysiakini')}
            <h2>The jobs</h2>
            <p>Training is paired with a placement. Pepper Labs arranged placements with 28 companies in sectors including oil and gas, banking, engineering and green technology. Roles on offer included AI Developer, Sustainable Energy Associate and Digital IoT Sandbox Executive.</p>
            <h2>Two participants</h2>
            <p>Allya Shahira, a mechatronic engineering graduate, was placed at Keysight Technologies as a Manufacturing Engineer and was offered a permanent job within 45 days of the programme starting.</p>
            <blockquote>"The combination of technical training and real-world exposure allowed me to gain valuable work experience and secure a permanent role in my host company after the K-Youth programme."</blockquote>
            <p>Muhammad Izzuddin Mohd Azam had been unemployed for two years. He is now a permanent Environmental Sustainability Design Consultant at DME Solutions. In his words: "It has helped me and other participants prepare for better future careers."</p>
            <h2>Appointment letters</h2>
            <p>The Minister of Natural Resources and Environmental Sustainability, Nik Nazmi Nik Ahmad, presented appointment letters to participants.</p>
            ${figure('k-youth-khazanah-2.jpg', 'At a K-Youth session, December 2024. Photo: Malaysiakini')}
            ${source('Malaysiakini, 5 December 2024', 'https://www.malaysiakini.com/announcement/728071')}
        `
    },
    {
        id: 9,
        slug: "dapur-digital-launch",
        gallery: [
            { src: "/blog/data/images/dapur-digital-launch-2.jpg", caption: "Cooking in a Dapur Digital cloud kitchen. Photo: Vulcan Post" }
        ],
        sourceName: "Malaysia SME",
        image: "/blog/data/images/dapur-digital-launch.jpg",
        title: "Dapur Digital Opens Its First Cloud Kitchens",
        category: "dapur-digital",
        date: "Oct 24, 2024",
        author: "Pepper Labs",
        status: "published",
        emoji: "🍳",
        excerpt: "Five underused units in Kuala Lumpur's public housing flats have been turned into fully equipped kitchens for women running small food businesses.",
        content: `
            <p>Pepper Labs has launched Dapur Digital, a programme that turns underused units in Kuala Lumpur's PPR public housing flats into fully equipped cloud kitchens. A cloud kitchen prepares food for delivery and online orders only, with no dining area. Five are open, and 50 women are running food businesses from them.</p>
            <p>This article sets out who the kitchens are for, how the arrangement works, what the women are taught, and where the idea came from. It ends with what has happened since the launch.</p>
            ${figure('dapur-digital-launch-3.jpg', 'Inside one of the Dapur Digital kitchens. Photo: Vulcan Post')}
            <h2>Who it serves</h2>
            <p>The kitchens are for women micro-entrepreneurs from B40 households, the 40% of Malaysian households with the lowest incomes. PPR stands for Program Perumahan Rakyat, the People's Housing Programme, and the women the programme is built around live in those flats.</p>
            <p>Vulcan Post, which profiled the programme in October 2024, described what stands between these women and a business of their own. Those under 45 in particular face limited access to employment, childcare responsibilities and low levels of formal education. Many are single mothers or the main carers in their families. A woman in that position may well want to start a business, and still find it very hard to make happen.</p>
            <p>For a home-based cook, the biggest practical barriers to growing are space and rent. A cloud kitchen inside her own housing block removes both: she gets a commercial kitchen without paying for a shop, and she does not have to leave the building to use it.</p>
            <blockquote>"Dapur Digital is aimed at supporting our target group of women micro entrepreneurs with hands-on coaching and comprehensive training in operating a cloud kitchen behind-the-scenes and moving into the frontline crucial element of selling, just like any commercial restaurant would – minus an actual restaurant space or costs of rental."</blockquote>
            <p>That was Gevi Ananda Roe, Chief Executive Officer of Pepper Labs.</p>
            <h2>Where the idea came from</h2>
            <p>Dapur Digital was conceived in 2022, as Malaysia was recovering from the pandemic. Speaking to Vulcan Post, Gevi said low-income communities, particularly those in PPR flats, had been hit hardest. The programme grew out of work between Pepper Labs, the Ministry of Finance and Yayasan Hasanah, as part of a wider effort to raise women's incomes through food businesses run with digital tools.</p>
            <p>She was candid that the community had not asked for cloud kitchens. The model turned out to fit anyway, because it deals with the things that keep these women out of work. A kitchen downstairs lets a mother earn without leaving her family or her neighbourhood.</p>
            <blockquote>"This model, although not initially requested by the community, aligned perfectly with their needs and has since become a cornerstone of sustainable income generation."</blockquote>
            <p>There is a second benefit, to the buildings themselves. The kitchens are built in spaces that were unused, underused or run down. A unit that was sitting empty becomes a place where people in the block earn a living.</p>
            ${figure('dapur-digital-launch-4.jpg', 'Cooking together in a Dapur Digital kitchen. Photo: Vulcan Post')}
            <h2>The first 50 women</h2>
            <p>The five kitchens serve 50 women from five PPR communities. Seventeen of them are young people and eight are single mothers. Each kitchen comes with commercial cooking equipment, a workspace, Wi-Fi and computers.</p>
            <p>Several food brands now trade under Dapur Digital. Many were started for the programme. Others were small businesses that already existed and have grown with its support. Either way the brand belongs to the woman who runs it.</p>
            <blockquote>"We encourage participants to develop their own brands, giving them full ownership of their products and their business identity."</blockquote>
            <h2>The terms</h2>
            <ul>
                <li><strong>No rent for two years.</strong> Participants use the kitchen rent-free for that period.</li>
                <li><strong>They keep the sales.</strong> All of the sales revenue goes to the women. From it they set aside a share for running costs such as maintenance and delivery platform fees.</li>
                <li><strong>Their own brands.</strong> Participants are encouraged to build their own food brands and own them fully.</li>
                <li><strong>A sales target.</strong> Each business aims for RM10,000 in sales a month. When a business falls short, Pepper Labs reviews its approach with the owner and gives more guidance and training.</li>
            </ul>
            <p>Customers order through Grab, foodpanda and Shopee Food. Companies can also support the kitchens by ordering catering and meal boxes, and Dapur Digital hosts team-building sessions inside the PPR complexes.</p>
            ${figure('dapur-digital-launch-5.jpg', 'Checking an order on the phone. Photo: Vulcan Post')}
            <h2>Training</h2>
            <p>The programme is more than a set of keys. Malaysia SME reported that it gives participants business coaching alongside the cooking, and takes them through:</p>
            <ul>
                <li>product development;</li>
                <li>digital marketing;</li>
                <li>managing food delivery platforms;</li>
                <li>running a cloud kitchen day to day, with hands-on coaching in sales.</li>
            </ul>
            <p>Through UNITAR they can earn a micro-credential certificate in cloud kitchen technology. The kitchens also use connected (IoT) equipment and food technology tools.</p>
            <p>A micro-credential is a short, focused qualification. Vulcan Post reported that this one is the first in cloud kitchen management in Malaysia, and that it has four parts: an introduction to cloud kitchens, operations management, financial planning and marketing strategies.</p>
            <blockquote>"The course is designed to provide practical knowledge and skills to manage and grow cloud kitchen businesses effectively. Each participant will be graduating from UNITAR with a micro-credential, advancing their education level which is mostly SPM qualified."</blockquote>
            <p>The SPM is the secondary school certificate. For most participants, then, this is the first formal qualification they have earned since leaving school.</p>
            <p>Professional chefs also mentor each kitchen on food standards.</p>
            ${figure('dapur-digital-launch-6.jpg', 'Participants with visiting chefs. Photo: Vulcan Post')}
            <h2>The launch</h2>
            <p>The opening was marked at Dapur Digital Wangsa Sari, where a mock key was handed over. Malaysia SME named those who took part: YB Dr. Zaliha Mustafa, Minister in the Prime Minister's Department (Federal Territories); Dato' Seri TPr (Dr.) Maimunah Mohd Sharif, Mayor of Kuala Lumpur; Datuk Indera Noridah Abdul Rahim, Director General of the Federal Territories Department; Siti Kamariah Ahmad Subki, Managing Director of Yayasan Hasanah; and Gevi Ananda Roe for Pepper Labs.</p>
            <p>The same report placed the programme within national policy. It described Dapur Digital as an example of public, private and philanthropic bodies working together, in line with the Malaysia Madani framework and the 12th Malaysia Plan.</p>
            <h2>Partners</h2>
            <p>Dapur Digital is funded by the Ministry of Finance through Yayasan Hasanah, and supported by the Federal Territories Department, Kuala Lumpur City Hall and private sector partners.</p>
            <blockquote>"This initiative highlights the power of public-private-philanthropy partnerships in driving real economic and social impact."</blockquote>
            <p>Gevi's argument to companies is a practical one. A business that wants to meet its ESG (environmental, social and governance) commitments can do so by buying lunch from these kitchens.</p>
            ${figure('dapur-digital-launch-7.jpg', 'Food prepared in a Dapur Digital kitchen. Photo: Vulcan Post')}
            <h2>What Pepper Labs expects</h2>
            <p>Co-founder Ir Kuhan said Pepper Labs expects the five kitchens to generate an economic return of around RM1.2 million over two years, and hopes to expand to more areas and reach more women.</p>
            <blockquote>"We anticipate generating an economic return of around RM1.2mil in two years from the digital leverage of our collective five cloud kitchens. And moving forward, we are hopeful in expanding this initiative to more areas and scaling it to reach out to more women beneficiaries."</blockquote>
            <p>The idea is that participants "graduate" from the programme able to run their own food business. The kitchens are meant to fit around family life: the businesses are built to work with a household's schedule.</p>
            <p>At the time of the Vulcan Post profile, the plan was to reach 20 cloud kitchens by 2025.</p>
            <blockquote>"Our long-term vision is to replicate this model across Malaysia, with the hope of reaching women in every state."</blockquote>
            <h2>How Pepper Labs got here</h2>
            <p>Pepper Labs was founded in 2015 by a group of young professionals. Dapur Digital is the latest version of an idea the team has been working on since then.</p>
            <ul>
                <li><strong>2015.</strong> It began with a food truck, <a href="/blog/post.html?slug=masala-wheels-origins">Masala Wheels</a>, selling RM5 meals near KLCC.</li>
                <li><strong>2021.</strong> A three-month programme with Yayasan Hasanah taught <a href="/blog/post.html?slug=microentrepreneurs-rm100k">forty home cooks</a> to sell online. Between them they brought in RM100,000.</li>
                <li><strong>2021.</strong> <a href="/blog/post.html?slug=kitchen-craft-cloud-kitchens">Kitchen Craft</a> opened three cloud kitchens in Petaling Jaya for people who had lost work in the pandemic, with the promise that they would own the business after six months.</li>
                <li><strong>2022.</strong> Those kitchens were launched formally as the <a href="/blog/post.html?slug=masala-wheels-cloud-kitchens">Masala Wheels cloud kitchens</a>, in restaurant, mall and home-based versions.</li>
                <li><strong>2022.</strong> The first Dapur Digital programme ran as a home-based pilot. <a href="/blog/post.html?slug=normah-dapur-digital">Normah Tekah</a>, a single mother from PPR Gombak Setia, was one of its participants.</li>
            </ul>
            <p>The October 2024 launch moved the kitchen out of the participant's home and into her housing block.</p>
            ${figure('dapur-digital-launch-8.jpg', 'A chef speaking with participants outside a kitchen. Photo: Vulcan Post')}
            <h2>What happened next</h2>
            <p>This article was first written at the launch. The programme has moved quickly since.</p>
            <ul>
                <li><strong>October 2024.</strong> In the same month, Pepper Labs received <a href="/blog/post.html?slug=budget-2025-dapur-digital">RM5 million under Budget 2025</a> to set up 20 more locations around the country.</li>
                <li><strong>August 2025.</strong> Twenty participants spent a session in a <a href="/blog/post.html?slug=dorsett-kitchen-session">hotel kitchen at Dorsett Kuala Lumpur</a> with its executive chef.</li>
                <li><strong>September 2025.</strong> Dapur Digital was <a href="/blog/post.html?slug=dapur-digital-15-locations">active in 15 locations</a> across Kuala Lumpur.</li>
                <li><strong>October 2025.</strong> A kitchen opened at <a href="/blog/post.html?slug=dapur-digital-seri-perlis">PPR Seri Perlis II</a> in Datuk Keramat.</li>
                <li><strong>January 2026.</strong> Bernama reported that the Kuala Lumpur kitchens had <a href="/blog/post.html?slug=dapur-digital-rm2-5-million">generated RM2.5 million in 18 months</a>, about twice the return Pepper Labs had hoped for from the first five in two years.</li>
            </ul>
            ${source('Malaysia SME, 24 October 2024', 'https://www.malaysiasme.com.my/?p=2843')}
            ${source('Vulcan Post, 15 October 2024', 'https://vulcanpost.com/873502/dapur-digital-cloud-kitchen-pepper-labs-social-enterprise-malaysia/')}
        `
    },
    {
        id: 10,
        slug: "budget-2025-dapur-digital",
        sourceName: "Bernama",
        image: "/blog/data/images/budget-2025-dapur-digital.jpg",
        title: "Budget 2025 Funds 20 More Dapur Digital Kitchens",
        category: "dapur-digital",
        date: "Oct 19, 2024",
        author: "Pepper Labs",
        status: "published",
        emoji: "🍳",
        excerpt: "Pepper Labs received RM5 million under Budget 2025 to set up 20 more Dapur Digital locations around the country.",
        content: `
            <p>Pepper Labs has received RM5 million under Malaysia's Budget 2025 to set up 20 more Dapur Digital locations nationwide over the coming years, Bernama reported.</p>
            <blockquote>"This is the first time a social enterprise has been identified as a key ally to the government in the annual national budget – a vote of confidence as a trusted operator."</blockquote>
            <p>That was Kuhan Pathy, co-founder of Pepper Labs.</p>
            <h2>What the pilot showed</h2>
            <p>The funding follows a pilot in which five units in Kuala Lumpur's PPR public housing flats were refurbished into cloud kitchens. Bernama reported that the pilot kitchens brought in more than RM30,000 in combined revenue, and that 50 people were trained through a micro-credential programme on how to run a cloud kitchen business, all within six months.</p>
            <h2>How it is run</h2>
            <p>Dapur Digital is run in partnership with the Ministry of Finance, the Federal Territories Department, Kuala Lumpur City Hall and Yayasan Hasanah.</p>
            <h2>What the money did</h2>
            <p>Within a year the programme had grown from five kitchens to <a href="/blog/post.html?slug=dapur-digital-15-locations">15 locations in Kuala Lumpur</a>. By January 2026 those locations had <a href="/blog/post.html?slug=dapur-digital-rm2-5-million">generated RM2.5 million</a> between them.</p>
            ${source('Bernama via The Sun, 19 October 2024', 'https://thesun.my/?p=205214')}
        `
    },
    {
        id: 11,
        slug: "normah-dapur-digital",
        gallery: [
            { src: "/blog/data/images/normah-dapur-digital-2.jpg", caption: "At the stall featured in the Wiki Impact story. Photo: Wiki Impact" }
        ],
        sourceName: "Wiki Impact",
        image: "/blog/data/images/normah-dapur-digital.jpg",
        title: "Normah's Story",
        category: "dapur-digital",
        date: "Jun 13, 2023",
        author: "Pepper Labs",
        status: "published",
        emoji: "🍳",
        excerpt: "A single mother from PPR Gombak Setia joined the 2022 Dapur Digital programme and went on to open her own stall in Kuala Lumpur.",
        content: `
            <p>Normah Tekah is a single mother of three from PPR Gombak Setia. Before 2022 she cooked meals for customers from a modest kitchen at home and earned about RM500 a month. Wiki Impact told her story in 2023.</p>
            <blockquote>"One of my children is in college now, one is in secondary school and the other is in primary school. Expenses are increasing today."</blockquote>
            ${figure('normah-dapur-digital-3.jpg', 'Cooking at the wok. Photo: Wiki Impact')}
            <h2>One of a million</h2>
            <p>Wiki Impact set her story against the numbers. Normah is one of about a million micro, small and medium enterprises in Malaysia. For many households a microenterprise is the main source of income, and most of them are small: the report said nearly 78% earn less than RM300,000 a year.</p>
            <p>The pandemic was hard on them. Around 28,000 microenterprises closed.</p>
            <h2>Finding the programme</h2>
            <p>Normah came across Dapur Digital on social media. She registered straight away and went to its workshops, looking for a way to earn more.</p>
            <p>The 2022 Dapur Digital programme was run by Pepper Labs, the team behind Masala Wheels, and was one of 132 programmes Yayasan Hasanah supported that year. It was set up to help home-based food sellers recover after the pandemic. Co-founder Kuhan Pathy explained the thinking:</p>
            <blockquote>"We realise that it's time for us to step out from Pepper Labs and help other micro-enterprises to digitalise and improve their business development."</blockquote>
            <h2>The programme</h2>
            <p>It began with a two-day workshop for 40 people on marketing, costing and pricing.</p>
            <blockquote>"The workshops taught us about marketing, costing and pricing. I learned a lot about running a business. Before this, all this knowledge was foreign to me."</blockquote>
            <p>Thirty of the 40 were then chosen for guided mentoring and given kitchen equipment. They cooked through a home-based cloud kitchen model for three months, each assigned a set number of households to cook for.</p>
            <blockquote>"We actually gave them a three-month contract and this contract had attachments to corporations and to civil societies."</blockquote>
            <p>That was Kuhan again. The contracts mattered because they gave each cook a steady flow of orders while she learned, from customers she would not have reached on her own.</p>
            <h2>Three months</h2>
            <p>During the contract Normah took on other projects as well.</p>
            <blockquote>"There were two days when I received a large number of orders. Cooking lunch for an office was one of them. That month, my income jumped to RM10,000."</blockquote>
            <p>Wiki Impact reported that her income over the three months came to RM19,820.</p>
            <p>Across the programme, Kuhan said participants saw income growth ranging from 77% to 500%.</p>
            <h2>The closing ceremony</h2>
            <p>The programme ended with a ceremony at Masala Wheels, where Normah was presented with a certificate. She found it exciting and nerve-racking in equal measure.</p>
            <blockquote>"I felt like, 'alamak'! Can I walk up the stage to receive the certificate – in front of a large audience?"</blockquote>
            <p><em>Alamak</em> is roughly "oh no". She puts her success down to two things: <em>rezeki</em>, the blessings that come one's way, and her own determination to keep finding orders.</p>
            ${figure('normah-dapur-digital-4.jpg', 'At a community event. Photo: Wiki Impact')}
            <h2>What happened next</h2>
            <p>After the programme ended, Normah's income settled at RM4,000 to RM5,000 a month. She opened a stall in Kuala Lumpur selling <em>masakan panas</em> (hot cooked dishes), and at the time of the report was preparing a second stall for ice-blended drinks and fried chicken.</p>
            <p>Moving out of a home kitchen brings its own difficulties, and she still leans on the people who trained her:</p>
            <blockquote>"I am grateful that I have mentors who support me. When I'm down, these mentors will give me advice on how to boost my business. I am glad that the mentors are there to back us, budding micro-entrepreneurs and give us words of encouragement to move forward and do better."</blockquote>
            <p>Wiki Impact's reporter noted her resilience. Normah expects more difficulties, and says that as a mother, securing a better future for her children is what keeps her going.</p>
            <h2>Why the model works</h2>
            <p>Anita Ahmad, Head of Community Development at Yayasan Hasanah, explained the difference a shared kitchen makes:</p>
            <blockquote>"They brought together micro-entrepreneurs, into their cloud kitchen, which allowed the microentrepreneurs to produce larger amounts of food and to reach corporate clients; their income increased at a much higher rate than running their business on their own from their homes."</blockquote>
            <h2>Where the programme went</h2>
            <p>The 2022 programme was a pilot. Two years later, in October 2024, <a href="/blog/post.html?slug=dapur-digital-launch">Dapur Digital opened its first cloud kitchens</a> inside Kuala Lumpur's PPR flats, so that women like Normah could cook in a commercial kitchen in their own block. By September 2025 it was <a href="/blog/post.html?slug=dapur-digital-15-locations">running in 15 locations</a>.</p>
            ${source('Wiki Impact, 13 June 2023', 'https://www.wikiimpact.com/normahs-recipe-for-success-from-rm500-to-rm19k-in-three-months-with-dapur-digital/')}
        `
    },
    {
        id: 12,
        slug: "masala-wheels-cloud-kitchens",
        gallery: [
            { src: "/blog/data/images/masala-wheels-cloud-kitchens-3.jpg", caption: "A certificate presentation at the launch. Photo: Malaysiakini" },
            { src: "/blog/data/images/masala-wheels-cloud-kitchens-4.jpg", caption: "Certificate recipients at the launch. Photo: Malaysiakini" },
            { src: "/blog/data/images/masala-wheels-cloud-kitchens-5.jpg", caption: "The Masala Wheels food truck and kitchen team. Photo: Says" }
        ],
        sourceName: "Malaysiakini",
        image: "/blog/data/images/masala-wheels-cloud-kitchens.jpg",
        title: "Masala Wheels Launches Three Cloud Kitchens",
        category: "milestones",
        date: "Feb 28, 2022",
        author: "Pepper Labs",
        status: "published",
        emoji: "🚚",
        excerpt: "The food-truck social enterprise started by Pepper Labs opened restaurant, mall and home-based cloud kitchens to create jobs for low-income communities.",
        content: `
            <p>Masala Wheels began in 2015 as a food truck that trained and employed young people at risk. Seven years on, on 20 February 2022, it launched three cloud kitchen models in partnership with MRANTI, to create jobs and income for people from low-income communities.</p>
            <h2>Three kinds of kitchen</h2>
            <ul>
                <li><strong>Restaurant-based</strong>, using an existing restaurant's kitchen.</li>
                <li><strong>Mall-based</strong>, such as the kitchen at Damansara City Mall.</li>
                <li><strong>Home-based</strong>, for people who need to work from where they live.</li>
            </ul>
            <h2>The launch</h2>
            <p>The launch was officiated by the Minister of Human Resources, Datuk Seri M. Saravanan, with Dato' Shahira Ahmed Bazari, Managing Director of Yayasan Hasanah, also taking part. Fifteen people from B40 (low-income) households received certificates of appointment as entrepreneurs. Each committed to a minimum monthly revenue of RM1,400.</p>
            ${figure('masala-wheels-cloud-kitchens-2.jpg', 'At the cloud kitchen launch, February 2022. Photo: Malaysiakini')}
            <p>At Damansara City Mall, the mall's management handed over a symbolic key to Kalidass, the beneficiary leading the kitchen there.</p>
            <h2>The months before</h2>
            <p>The launch was the end of a longer run-up. In November 2021, Says reported that Masala Wheels was setting up three cloud kitchens for 15 micro-entrepreneurs from low-income households under an initiative called Tech For Good, with BEYOND4 and the Malaysian Global Innovation and Creativity Centre (MaGIC), and that the places came with a year's free sponsorship. The first kitchens, known as <a href="/blog/post.html?slug=kitchen-craft-cloud-kitchens">Kitchen Craft</a>, were set up in Petaling Jaya around the same time.</p>
            <p>The plan behind it was to move away from running a single restaurant and towards kitchens that many people could run, so that more of them could earn from it.</p>
            <h2>Handing over ownership</h2>
            <p>Pepper Labs, the parent company, transferred full ownership of the Masala Wheels restaurant to a group of its former beneficiaries. Says named two of them, P. Thiviya and Harvinder Singh, who took over the restaurant in Petaling Jaya. It also committed 20,000 meals as a seed fund for the new entrepreneurs. Those meals went to 180 households, about 900 people, saving the households an estimated RM160,000.</p>
            <h2>One of the fifteen</h2>
            <p>Puan Masri Harun, 38, lives in PPR Kerinchi and has four children, three of them in school. She lost her job during the pandemic lockdowns, and her husband has health problems. A home-based kitchen lets her look after her three-year-old and her husband while still meeting the family's monthly commitments.</p>
            ${source('Malaysiakini, 28 February 2022', 'https://www.malaysiakini.com/announcement/612402')}
            ${source('Says, 10 November 2021', 'https://says.com/my/lifestyle/four-things-you-dont-know-about-masala-wheels')}
        `
    },
    {
        id: 13,
        slug: "asean-business-awards-2021",
        gallery: [
            { src: "/blog/data/images/asean-business-awards-2021-3.jpg", caption: "A food safety training session. Photo: Malaysiakini" },
            { src: "/blog/data/images/asean-business-awards-2021-5.jpg", caption: "A training session for micro-entrepreneurs. Photo: Malaysiakini" }
        ],
        sourceName: "Malaysiakini",
        image: "/blog/data/images/asean-business-awards-2021.jpg",
        title: "Pepper Labs Wins at the ASEAN Business Awards 2021",
        category: "milestones",
        date: "Dec 3, 2021",
        author: "Pepper Labs",
        status: "published",
        emoji: "🏆",
        excerpt: "Pepper Labs won the Inclusive Business award, recognising its work to build skills and income for disadvantaged communities.",
        content: `
            <p>Pepper Labs won the Inclusive Business award at the ASEAN Business Awards 2021. The result was announced at the awards' gala night, which was held online.</p>
            ${figure('asean-business-awards-2021-2.jpg', 'The ASEAN Business Awards 2021 broadcast. Photo: Malaysiakini')}
            <h2>About the awards</h2>
            <p>The ASEAN Business Awards have been run every year since 2007 by the ASEAN Business Advisory Council to recognise businesses contributing to the region's economy. In 2021 they drew 126 nominations from across ASEAN. Pepper Labs was nominated through SME Corp. Malaysia.</p>
            <h2>What was recognised</h2>
            <p>The award recognised Pepper Labs' work in building skills and creating lasting digital and economic opportunities for disadvantaged communities, and its resilience through the COVID-19 pandemic. An "inclusive business" is one whose ordinary commercial activity brings low-income people in as workers, suppliers or owners.</p>
            <p>Two things Pepper Labs did that year show what that means in practice:</p>
            <ul>
                <li>In August 2021 it handed over the full operations and ownership of Masala Wheels, its food social enterprise, to a team of former beneficiaries.</li>
                <li>In October it set up three cloud kitchen spaces for unemployed culinary graduates, with the plan that they take over ownership within six months. That project is covered in <a href="/blog/post.html?slug=kitchen-craft-cloud-kitchens">Kitchen Craft</a>.</li>
            </ul>
            <p>The pandemic years behind the "resilience" part of the citation are told in <a href="/blog/post.html?slug=pay-it-forward-lockdown-meals">Feeding People Through the Lockdown</a>.</p>
            ${figure('asean-business-awards-2021-4.jpg', 'Masala Wheels trainees preparing food. Photo: Malaysiakini')}
            <h2>Accreditation</h2>
            <p>Pepper Labs holds Social Enterprise Accreditation (SE.A) Plus status from the Malaysian Global Innovation and Creativity Centre (MaGIC).</p>
            ${source('Malaysiakini, 3 December 2021', 'https://www.malaysiakini.com/announcement/601654')}
        `
    },
    {
        id: 17,
        slug: "kitchen-craft-cloud-kitchens",
        image: "/blog/data/images/kitchen-craft-cloud-kitchens.jpg",
        sourceName: "Free Malaysia Today",
        title: "Kitchen Craft: A Kitchen You End Up Owning",
        category: "milestones",
        date: "Nov 29, 2021",
        author: "Pepper Labs",
        status: "published",
        emoji: "🍳",
        excerpt: "Three cloud kitchens in Petaling Jaya give 15 people who lost work in the pandemic a salary, training and, after six months, the business itself.",
        content: `
            <p>Pepper Labs has set up three cloud kitchens at its space in Midtown, Petaling Jaya, under the name Kitchen Craft. A cloud kitchen cooks only for delivery, so it needs no dining room and no shopfront. Fifteen people will run food businesses from the three kitchens.</p>
            <h2>Who it is for</h2>
            <p>Kitchen Craft is aimed at three groups the pandemic hit hard:</p>
            <ul>
                <li>young people who cannot find work, including fresh graduates;</li>
                <li>people from B40 households, the lowest-earning 40% in Malaysia, who lost their jobs;</li>
                <li>micro-entrepreneurs who want to grow a food business they already have.</li>
            </ul>
            <p>A cooking background is not required. Applicants without one are mentored by chefs and other professionals.</p>
            <h2>How it works</h2>
            <p>Each of the 15 chooses a cuisine and is trained both to get the food right and to run the business behind it. They are paid a base salary of RM1,200 a month, and they keep what their business earns. Orders come through a website that works like a virtual food court, with each entrepreneur as a stall.</p>
            <blockquote>"After six months we will hand ownership of the business over to them."</blockquote>
            <p>That was Kuhan Pathy, co-founder of Pepper Labs, speaking to Free Malaysia Today. The handover is the point of the programme: the aim is for people to leave owning a business.</p>
            <h2>The first two chefs</h2>
            <p>The first two chefs to join had each been out of work for close to two years because of the pandemic. One of them, Muhammad Haziq, is 25 and a culinary arts graduate. He told Free Malaysia Today he hopes Kitchen Craft will help raise standards of living, especially for people in the B40 community.</p>
            <h2>What followed</h2>
            <p>Three months later the model was launched formally, in three versions, as the <a href="/blog/post.html?slug=masala-wheels-cloud-kitchens">Masala Wheels cloud kitchens</a>. The same idea, a shared kitchen that its cooks come to own, later became <a href="/blog/post.html?slug=dapur-digital-launch">Dapur Digital</a>.</p>
            ${source('Free Malaysia Today, 29 November 2021', 'https://www.freemalaysiatoday.com/category/leisure/food/2021/11/29/cloud-kitchen-initiative-aims-to-create-jobs-future-business-owners/')}
        `
    },
    {
        id: 18,
        slug: "microentrepreneurs-rm100k",
        image: "/blog/data/images/microentrepreneurs-rm100k.jpg",
        sourceName: "Vulcan Post",
        title: "Forty Home Cooks, RM100,000 in Three Months",
        category: "milestones",
        date: "Aug 16, 2021",
        author: "Pepper Labs",
        status: "published",
        emoji: "🚚",
        excerpt: "A three-month training programme run with Yayasan Hasanah taught home-based food sellers to market and sell online. Together they brought in RM100,000.",
        content: `
            <p>Forty home-based food sellers from low-income households earned RM100,000 between them in three months, after a training programme run by Masala Wheels with Yayasan Hasanah. Vulcan Post reported the result in August 2021.</p>
            ${figure('microentrepreneurs-rm100k-2.jpg', 'A training session at Masala Wheels. Photo: Vulcan Post')}
            <h2>What was taught</h2>
            <p>The training was about selling, since the participants could already cook. Masala Wheels' team of 25 taught three things:</p>
            <ul>
                <li>reaching customers through social media;</li>
                <li>handling orders and customer service with simple tools such as WhatsApp Business;</li>
                <li>getting a product to market, including through online sales partners.</li>
            </ul>
            <blockquote>"We help them in outreach via social media platforms, customer service management through basic tools (i.e. WhatsApp Business), and go-to-market strategies."</blockquote>
            <p>That was co-founder Kuhan Pathy. Trainees were also listed on mobilefood.my, an online marketplace for home-made food.</p>
            ${figure('microentrepreneurs-rm100k-5.jpg', 'Food sellers listed on the online marketplace. Photo: Vulcan Post')}
            <h2>What came of it</h2>
            <p>Besides the RM100,000 in combined revenue, one participant landed a deal to supply corporate gifts to BMW for Hari Raya.</p>
            ${figure('microentrepreneurs-rm100k-4.jpg', 'Orders packed and ready. Photo: Vulcan Post')}
            <h2>Beyond the Klang Valley</h2>
            <p>Through partner social enterprises, the work reached Kedah, Penang and Negeri Sembilan. The Implementation Coordination Unit of the Prime Minister's Department took notice, and Masala Wheels began passing what it learned on the ground back to the unit as input for policy.</p>
            <h2>The next round</h2>
            <p>A second programme was planned for 200 participants. Each place is worth RM3,000 and is fully sponsored by individuals and organisations, so participants pay nothing.</p>
            ${figure('microentrepreneurs-rm100k-3.jpg', 'Trainees preparing food. Photo: Vulcan Post')}
            <blockquote>"Alone, we're probably creating an innovative path of a sustainable future for our beneficiaries. It's a journey, and this would require collective action from both private and public entities."</blockquote>
            <p>The report also noted a change of direction: the restaurant in Petaling Jaya was to give way to digital cloud kitchens, a model that could be repeated elsewhere. That became <a href="/blog/post.html?slug=kitchen-craft-cloud-kitchens">Kitchen Craft</a> a few months later.</p>
            ${source('Vulcan Post, 16 August 2021', 'https://vulcanpost.com/756714/masala-wheels-social-enterprise-training-b40-microentrepreneurs/')}
        `
    },
    {
        id: 19,
        slug: "pay-it-forward-lockdown-meals",
        image: "/blog/data/images/pay-it-forward-lockdown-meals.jpg",
        sourceName: "Tatler Asia",
        title: "Feeding People Through the Lockdown",
        category: "milestones",
        date: "Dec 29, 2020",
        author: "Pepper Labs",
        status: "published",
        emoji: "🍛",
        excerpt: "When Malaysia shut down in March 2020, Masala Wheels lost most of its income within days. It spent the year cooking for frontliners, welfare homes and stranded students.",
        content: `
            <p>Malaysia's movement control order (MCO), the nationwide lockdown, began on 18 March 2020. For Masala Wheels, the food social enterprise Pepper Labs grew out of, it meant losing 90% of its shop revenue and 70% of its catering revenue.</p>
            <blockquote>"When the MCO was announced on March 18, we weren't prepared."</blockquote>
            <p>That was co-founder Kuhan Pathy, looking back on the year in Tatler Asia. His greatest fear, he said, was not being able to go on supporting the people the enterprise employs and trains.</p>
            <h2>One phone call</h2>
            <p>The change of direction started with a request. A university student got in touch asking for packed food for students stuck in their campus rooms. Masala Wheels supplied 240 meals, paid for by members of the public.</p>
            <blockquote>"In less than 30 minutes, we secured sponsors and more came forward later."</blockquote>
            <h2>Pay It Forward</h2>
            <p>That became a standing arrangement called Pay It Forward. Anyone could buy packed meals in advance, and Masala Wheels cooked and delivered them to people who needed them: medical frontliners, residents of welfare homes, university students and families short of money.</p>
            <p>The Star reported on it in April 2020. "We have been offering meals at subsidised costs to those facing difficulties because of the nationwide shutdown," Kuhan said then.</p>
            <h2>The count</h2>
            <p>By the end of 2020, Tatler Asia reported, the effort had delivered:</p>
            <ul>
                <li>26,054 meals;</li>
                <li>397 parcels of provisions;</li>
                <li>576 separate deliveries.</li>
            </ul>
            <p>The meals kept going. By August 2021 the total had passed 31,000, according to Vulcan Post. Says reported that on one occasion the team cooked, packed and distributed 7,000 meals within 72 hours.</p>
            <h2>What Kuhan took from it</h2>
            <blockquote>"Be prepared to pivot. Act fast. Even if it fails, learn and adapt to circumstances quickly."</blockquote>
            ${source('Tatler Asia, 29 December 2020', 'https://www.tatlerasia.com/the-scene/people-parties/social-entrepreneurs-on-surviving-2020-new-years-wishes')}
            ${source('The Star, 8 April 2020', 'https://www.thestar.com.my/metro/metro-news/2020/04/08/paying-it-forward-with-packed-meals')}
        `
    },
    {
        id: 20,
        slug: "kcom-robots-ai-food-truck",
        image: "/blog/data/images/kcom-robots-ai-food-truck.jpg",
        sourceName: "Vulcan Post",
        title: "Bringing AI into a Food Truck Kitchen",
        category: "milestones",
        date: "Feb 13, 2019",
        author: "Pepper Labs",
        status: "published",
        emoji: "🚚",
        excerpt: "A partnership with digital firm KCOM Group set out to build an automated kitchen, and to teach the young people working in it how the technology runs.",
        content: `
            <p>In February 2019, Masala Wheels announced an equity partnership with KCOM Group, a Malaysian digital solutions company founded in 2014. The exchange of documents between Kuhan Pathy of Masala Wheels and KCOM chief executive Rubaneswaran was witnessed by the Prime Minister at the time, Tun Dr Mahathir Mohamad.</p>
            <h2>The plan</h2>
            <p>The two set out to build an automated kitchen run on an AI platform. The technology was meant to do two jobs: keep the food consistent from one day to the next, and help tailor what is offered to what customers want.</p>
            <p>For a social enterprise, the more important part was who would learn from it. The young people Masala Wheels trains would be taught how the technology works, so they leave with skills beyond cooking. With machines taking on more of the routine kitchen work, they would also spend more time dealing with customers. Kuhan told Vulcan Post the aim was to improve their chances of finding work, and that a successful model could be repeated around Malaysia.</p>
            <p>The partnership also included digital education for children from poor families, with free meals provided.</p>
            <h2>Where Masala Wheels stood</h2>
            <p>By then the enterprise had changed since its food-truck beginnings. From late 2016 it had moved from raising money for charity to training people from disadvantaged communities on the job, in cooking, catering and management, so they could earn while they learned. It had won The Star Golden Hearts Award and the Perdana Young Indian Entrepreneur Award for Social Enterprise Excellence. Vulcan Post reported that it doubled in size after completing an accelerator programme run by MaGIC, the Malaysian Global Innovation and Creativity Centre.</p>
            ${figure('kcom-robots-ai-food-truck-2.jpg', 'The Masala Wheels truck outside its restaurant. Photo: Vulcan Post')}
            <h2>Why it mattered at the time</h2>
            <p>Social enterprises in Malaysia were often mistaken for charities and assumed to be unable to grow. An outside company buying a stake in one was a signal that the model could be treated as a real business. The government was moving the same way: the Ministry of Entrepreneur Development had set up a Department of Social Entrepreneurship, and Budget 2019 introduced tax incentives for private investment in social enterprises.</p>
            ${source('Vulcan Post, 13 February 2019', 'https://vulcanpost.com/656515/masala-wheels-kcom-group-social-entrepreneurship-malaysia/')}
        `
    },
    {
        id: 21,
        slug: "masala-wheels-origins",
        image: "/blog/data/images/masala-wheels-origins-3.jpg",
        gallery: [
            { src: "/blog/data/images/masala-wheels-origins.jpg", caption: "Masala Wheels as pictured in 2016. Photo: Free Malaysia Today" },
            { src: "/blog/data/images/masala-wheels-origins-2.jpg", caption: "Masala Wheels services in its early years. Photo: Vulcan Post" }
        ],
        sourceName: "Vulcan Post",
        title: "Where It Started: A RM5 Meal from a Food Truck",
        category: "milestones",
        date: "Apr 5, 2016",
        author: "Pepper Labs",
        status: "published",
        emoji: "🚚",
        excerpt: "Before Pepper Labs there was Masala Wheels, a food truck near KLCC selling home-cooked Indian meals for RM5 and giving its profits away.",
        content: `
            <p>Pepper Labs began with a food truck. Masala Wheels started trading in October 2015 and sold 100 packs of food on its first day. Vulcan Post wrote about it six months later, and Free Malaysia Today covered its official launch at the end of 2016.</p>
            <p>This is the long version of that story: what the truck sold, who ran it, where the money went, and how a lunch business turned into the training and enterprise programmes Pepper Labs runs today.</p>
            <h2>The problem it set out to solve</h2>
            <p>Vulcan Post's article appeared in April 2016, close to a year after Malaysia introduced the goods and services tax. It opened with the cost of eating. Food is an expense nobody can cut out, cooking at home is hard to fit around a working day, and delivery services cost more than a home-cooked meal.</p>
            <p>Food trucks had become the office worker's middle path, cheaper than delivery and quicker than cooking. Masala Wheels was a new one, and it was aimed squarely at people who were paying too much for lunch.</p>
            <h2>The meal</h2>
            <p>For RM5, a customer got rice, a vegetable, meat, the curry of the day and a dessert. Fridays were for biryani, a treat at the end of the working week.</p>
            <p>The curry changed daily, and the team kept it a surprise on purpose.</p>
            <blockquote>"We maintain an element of surprise with our customers with regards to our curry-of-the-day, which metaphorically adds spices to their busy day at work in a positive manner."</blockquote>
            <p>The spice blend came from a Sri Lankan family recipe using turmeric, clove and fenugreek. The family still blends its own spices instead of buying them off the shelf, and Masala Wheels did the same. The blending was done by local working women, who earned extra income producing it.</p>
            ${figure('masala-wheels-origins-4.jpg', 'Curries of the day. Photo: Vulcan Post')}
            <h2>Where it parked</h2>
            <p>The truck parked at Megan Avenue 1 on weekdays, near Kuala Lumpur City Centre, and delivered across Kuala Lumpur and Selangor. Free Malaysia Today described it as bright orange and hard to miss.</p>
            <p>It grew beyond the lunch queue quickly. By April 2016 the team was catering and delivering pre-packed meals for board meetings in the offices around KLCC, including the Petronas Twin Towers and the offices of Hess and Halliburton. It was talking to food delivery startups about carrying its meals, and it had launched an online ordering system. From time to time it was invited to fund-raising events, where the profits went to charitable organisations.</p>
            ${figure('masala-wheels-origins-5.jpg', 'A catering spread. Photo: Vulcan Post')}
            <h2>Who ran it</h2>
            <p>Masala Wheels was led by Kuhan Pathy and S. Ravindran. The core team of four had ordinary day jobs: an oil and gas engineer, two IT engineers with their own firm, and a restaurateur. One of them ran the central kitchen, the truck and the orders full time. The others did the accounts, social media, IT and publications in the evenings and at weekends.</p>
            <p>Three more co-founders, also working professionals, supported them. A group of mothers advised the full-time chefs, each bringing her own home recipes, which is where the food got its home-cooked character.</p>
            <p>Volunteers did much of the rest. That mattered for the sums: with volunteers giving their time, overheads stayed low.</p>
            <h2>Where the money went</h2>
            <p>The team called the idea #Eat2Donate. After paying for the chefs and ingredients, everything the truck earned went to charitable work, chiefly feeding people who could not afford a meal. The team's view was that hunger should not exist in a modern country, and yet it kept appearing in the news.</p>
            <blockquote>"We firmly believe that no one gets poorer by giving and in order to see the change, we have to be the ones initiating it."</blockquote>
            <p>They were clear about how this set them apart from the other trucks on the street.</p>
            <blockquote>"While for other food trucks, profit shall be the primary focus as they are a business entity whereas for Masala Wheels, our social agenda shall be prioritised."</blockquote>
            <p>They also described themselves, with some humour, as "the legally modern Robin-hood".</p>
            ${figure('masala-wheels-origins-6.jpg', 'Packed meals ready to go out. Photo: Vulcan Post')}
            <h2>From giving food to giving work</h2>
            <p>The model changed within the year. When Free Malaysia Today covered the official launch in December 2016, attended by Treasury Secretary-General Irwan Serigar Abdullah, Kuhan explained why:</p>
            <blockquote>"We realise that it is not about just giving food (to the underprivileged), we must empower people to make a living for themselves."</blockquote>
            <p>Masala Wheels began bringing in refugees, single mothers and people from poor households to prepare and sell the food themselves and earn from it. Kuhan described how that worked, and why it kept the meals cheap:</p>
            <blockquote>"We teach them how to prepare the food and from then on, they earn their own income and a small amount goes back to Masala Wheels."</blockquote>
            <p>Irwan Serigar praised the approach at the launch, saying the team was training new entrepreneurs in the community as well as feeding people.</p>
            ${figure('masala-wheels-origins-7.jpg', 'The official launch. Photo: Vulcan Post')}
            <h2>Plans at the time</h2>
            <p>Kuhan told Free Malaysia Today that the next step was to go beyond the city: to schoolchildren, to rural areas and to estates. People there would be taught how the business worked and then brought on board under a franchise.</p>
            <p>That same year the United States Embassy chose Masala Wheels to represent Malaysia at the Global Entrepreneurship Summit 2016 in San Francisco, which President Barack Obama attended.</p>
            ${figure('masala-wheels-origins-8.jpg', 'Serving at a Masala Wheels event. Photo: Vulcan Post')}
            <h2>What the truck became</h2>
            <p>The move from handing out meals to helping people earn their own living is the idea every later Pepper Labs programme is built on. The ten years since can be read as that one idea applied in new places.</p>
            <h3>2019: technology in the kitchen</h3>
            <p>By 2019 Masala Wheels was training people from disadvantaged communities on the job, in cooking, catering and management. It had won The Star Golden Hearts Award and the Perdana Young Indian Entrepreneur Award for Social Enterprise Excellence. That February it announced <a href="/blog/post.html?slug=kcom-robots-ai-food-truck">an equity partnership with KCOM Group</a> to build an automated kitchen run on an AI platform, and to teach its trainees how the technology worked.</p>
            <h3>2020: the lockdown</h3>
            <p>When Malaysia shut down in March 2020, Masala Wheels lost 90% of its shop revenue and 70% of its catering revenue. It spent the year <a href="/blog/post.html?slug=pay-it-forward-lockdown-meals">cooking for frontliners, welfare homes and stranded students</a> through an arrangement called Pay It Forward. By the end of the year it had delivered 26,054 meals.</p>
            <h3>2021: forty home cooks</h3>
            <p>A three-month programme with Yayasan Hasanah taught <a href="/blog/post.html?slug=microentrepreneurs-rm100k">forty home-based food sellers</a> to market and sell online. Together they brought in RM100,000. In August that year Pepper Labs handed the full operations and ownership of Masala Wheels to a team of its former beneficiaries.</p>
            <h3>2021: kitchens people come to own</h3>
            <p>In November, <a href="/blog/post.html?slug=kitchen-craft-cloud-kitchens">Kitchen Craft</a> opened three cloud kitchens in Petaling Jaya for 15 people who had lost work in the pandemic. They were paid a base salary, and after six months the business was to be theirs. In December, Pepper Labs won the Inclusive Business award at the <a href="/blog/post.html?slug=asean-business-awards-2021">ASEAN Business Awards 2021</a>.</p>
            <h3>2022: three kinds of cloud kitchen</h3>
            <p>On 20 February 2022 the model was <a href="/blog/post.html?slug=masala-wheels-cloud-kitchens">launched formally</a> in restaurant, mall and home-based versions. The first Dapur Digital programme ran the same year, and <a href="/blog/post.html?slug=normah-dapur-digital">Normah Tekah</a> was one of its participants.</p>
            <h3>2024 onwards: Dapur Digital</h3>
            <p>In October 2024 the kitchens moved into public housing. <a href="/blog/post.html?slug=dapur-digital-launch">Dapur Digital</a> opened five cloud kitchens in Kuala Lumpur's PPR flats for 50 women. By September 2025 it was <a href="/blog/post.html?slug=dapur-digital-15-locations">running in 15 locations</a>, and by January 2026 those kitchens had <a href="/blog/post.html?slug=dapur-digital-rm2-5-million">generated RM2.5 million</a>.</p>
            <h2>The same idea, ten years on</h2>
            <p>The team's ambition in 2016 was large for a single truck. They talked about expanding well beyond Malaysia and about giving people everywhere an equal chance at good food.</p>
            <p>What actually spread was the method. The truck taught its founders that a meal helps for a day and a skill helps for longer, and each programme since has been built that way. Today that includes <a href="/blog/post.html?slug=ai-ready-malaysia-50000">AI training for 50,000 Malaysians</a>, which has little to do with curry and a great deal to do with helping people earn their own living.</p>
            ${source('Vulcan Post, 5 April 2016', 'https://vulcanpost.com/563931/masala-wheels-malaysian-food-truck/')}
            ${source('Free Malaysia Today, 19 December 2016', 'https://www.freemalaysiatoday.com/category/nation/2016/12/19/masala-wheels-giving-free-food-and-making-entrepreneurs-2/')}
        `
    }
];

window.BLOG_SAMPLE_POSTS = SAMPLE_POSTS;

// A browser that has saved its own copy of the posts no longer reads the list above, so pictures
// added to a sample post later would never reach it. This copies them across: a saved post that
// has never had a main image or a gallery set takes the sample's. One that was set and then
// emptied by a moderator ("" or []) is left as the moderator chose.
// Pictures placed inside a sample article arrive with the article text, so that is taken too,
// but only while the saved article has no pictures in it and no moderator has edited it.
window.blogFillSamplePictures = posts => {
    const samples = new Map(SAMPLE_POSTS.map(post => [post.slug, post]));
    posts.forEach(post => {
        const sample = post && samples.get(post.slug);
        if (!sample) return;
        if (post.image === undefined && sample.image) post.image = sample.image;
        if (post.gallery === undefined && sample.gallery) post.gallery = sample.gallery.map(photo => ({ ...photo }));
        const edited = Array.isArray(post.history) && post.history.some(entry => entry.action === 'edited');
        if (!edited && sample.content.includes('post-figure') && !String(post.content || '').includes('<img')) {
            post.content = sample.content;
            // A photo that moved into the article is not shown a second time under the main picture.
            if (Array.isArray(post.gallery)) post.gallery = post.gallery.filter(photo => !sample.content.includes(photo.src));
        }
    });
    return posts;
};
