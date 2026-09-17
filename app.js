(function() {
    const fontAwesome = document.createElement('link');
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(fontAwesome);

    const googleFonts = document.createElement('link');
    googleFonts.rel = 'stylesheet';
    googleFonts.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Raleway:wght@300;400&display=swap';
    document.head.appendChild(googleFonts);

    const cssText = `
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body, html { width: 100%; height: 100%; background-color: #030305; font-family: 'Raleway', sans-serif; color: #ffffff; scroll-behavior: smooth; }
        #canvas { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 1; pointer-events: none; }
        .scroll-container { height: 100vh; overflow-y: scroll; scroll-snap-type: y mandatory; scrollbar-width: none; position: relative; z-index: 2; }
        .scroll-container::-webkit-scrollbar { display: none; }
        .screen { height: 100vh; width: 100%; display: flex; justify-content: center; align-items: center; scroll-snap-align: start; position: relative; }
        .content { text-align: center; width: 90%; max-width: 800px; pointer-events: auto; }
        .subtitle { font-family: 'Orbitron', sans-serif; font-size: 1.2rem; letter-spacing: 5px; color: #888; margin-bottom: 10px; }
        .title { font-family: 'Orbitron', sans-serif; font-size: 4rem; font-weight: 900; margin-bottom: 20px; letter-spacing: 2px; text-shadow: 0 0 20px rgba(255, 255, 255, 0.1); }
        .highlight { color: #00ffcc; text-shadow: 0 0 10px #00ffcc, 0 0 40px #00ffcc; }
        .description { font-size: 1.2rem; font-weight: 300; color: #ccc; margin-bottom: 40px; }
        .buttons { display: flex; justify-content: center; align-items: center; gap: 20px; pointer-events: auto; }
        .btn { display: inline-flex; align-items: center; gap: 10px; padding: 15px 35px; font-family: 'Orbitron', sans-serif; font-size: 1rem; text-decoration: none; text-transform: uppercase; letter-spacing: 2px; border-radius: 5px; transition: all 0.3s ease; position: relative; overflow: hidden; }
        .btn-primary { background: transparent; color: #00ffcc; border: 1px solid #00ffcc; box-shadow: 0 0 15px rgba(0, 255, 204, 0.2); }
        .btn-primary:hover { background: #00ffcc; color: #030305; box-shadow: 0 0 30px rgba(0, 255, 204, 0.6); }
        .btn-secondary { background: transparent; color: #fff; border: 1px solid rgba(255, 255, 255, 0.3); }
        .btn-secondary:hover { background: rgba(0, 255, 204, 0.1); border-color: #00ffcc; color: #00ffcc; }
        .scroll-indicator { position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); font-size: 2rem; color: rgba(0, 255, 204, 0.5); animation: bounce 2s infinite; pointer-events: none; }
        @keyframes bounce { 0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); } 40% { transform: translateY(-20px) translateX(-50%); } 60% { transform: translateY(-10px) translateX(-50%); } }
        .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 30px; }
        .skill-card { background: rgba(0, 255, 204, 0.05); border: 1px solid rgba(0, 255, 204, 0.2); padding: 20px; border-radius: 10px; font-size: 1.2rem; font-family: 'Orbitron', sans-serif; display: flex; flex-direction: column; align-items: center; gap: 15px; transition: all 0.3s ease; text-align: center; }
        .skill-card i { font-size: 3rem; color: #00ffcc; text-shadow: 0 0 15px rgba(0, 255, 204, 0.5); }
        .skill-card:hover { transform: translateY(-5px); background: rgba(0, 255, 204, 0.15); border-color: #00ffcc; box-shadow: 0 0 20px rgba(0, 255, 204, 0.3); }
        .fade-in-section { opacity: 0; transform: translateY(50px) scale(0.95); transition: opacity 1s cubic-bezier(0.1, 0.5, 0.1, 1), transform 1s cubic-bezier(0.1, 0.5, 0.1, 1); will-change: opacity, transform; }
        .fade-in-section.is-visible { opacity: 1; transform: none; }
        

        .portfolio-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; margin-top: 40px; width: 100%; }
        .portfolio-item { position: relative; border-radius: 15px; overflow: hidden; cursor: pointer; aspect-ratio: 16/9; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); transition: all 0.4s ease; transform: translateY(0); box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .portfolio-item:hover { transform: translateY(-10px); border-color: #00ffcc; box-shadow: 0 20px 40px rgba(0, 255, 204, 0.2); z-index: 10; }
        .portfolio-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; filter: brightness(0.8); }
        .portfolio-item:hover img { transform: scale(1.1); filter: brightness(1); }
        .portfolio-overlay { position: absolute; bottom: 0; left: 0; width: 100%; padding: 20px; background: linear-gradient(transparent, rgba(3, 3, 5, 0.9)); color: white; text-align: left; transform: translateY(10px); opacity: 0; transition: all 0.3s ease; }
        .portfolio-item:hover .portfolio-overlay { transform: translateY(0); opacity: 1; }
        .portfolio-overlay h3 { font-family: 'Orbitron', sans-serif; font-size: 1.2rem; margin-bottom: 5px; color: #00ffcc; }
        .portfolio-overlay p { font-size: 0.9rem; color: #ccc; }
        
        @keyframes cyber-open-1 {
            0% { transform: perspective(1000px) rotateX(90deg) scale(0.5); opacity: 0; filter: blur(10px); }
            70% { transform: perspective(1000px) rotateX(-10deg) scale(1.02); opacity: 1; filter: blur(0px); box-shadow: 0 0 80px #00ffcc; }
            100% { transform: perspective(1000px) rotateX(0deg) scale(1); opacity: 1; box-shadow: 0 0 50px rgba(0, 255, 204, 0.2); }
        }

        @keyframes cyber-open-2 {
            0% { transform: perspective(1000px) rotateY(-180deg) scale(0.2); opacity: 0; filter: blur(20px); }
            70% { transform: perspective(1000px) rotateY(10deg) scale(1.05); opacity: 1; filter: blur(0px); box-shadow: 0 0 100px #00ffcc; }
            100% { transform: perspective(1000px) rotateY(0deg) scale(1); opacity: 1; box-shadow: 0 0 50px rgba(0, 255, 204, 0.2); }
        }

        @keyframes cyber-open-3 {
            0% { transform: scale(2) translate(50px, -50px); opacity: 0; filter: blur(15px); }
            20% { transform: scale(1.5) translate(-30px, 30px); opacity: 0.5; filter: hue-rotate(90deg); }
            70% { transform: scale(0.95) translate(0, 0); opacity: 1; filter: blur(0px); box-shadow: 0 0 80px #00ffcc; }
            100% { transform: scale(1); opacity: 1; box-shadow: 0 0 50px rgba(0, 255, 204, 0.2); }
        }
        .modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(3, 3, 5, 0.85); backdrop-filter: blur(10px); z-index: 9999; display: flex; justify-content: center; align-items: center; opacity: 0; pointer-events: none; transition: opacity 0.5s ease; padding: 20px; perspective: 1200px; }
        .modal.active { opacity: 1; pointer-events: auto; }
        .modal-content { background: #08080a; border: 1px solid #00ffcc; border-radius: 20px; width: 100%; max-width: 900px; max-height: 90vh; overflow-y: auto; position: relative; opacity: 0; transform-origin: center center; z-index: 10000; }
        
    
        .modal.active .anim-type-1 { animation: cyber-open-1 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .modal.active .anim-type-2 { animation: cyber-open-2 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .modal.active .anim-type-3 { animation: cyber-open-3 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
        
        .modal-close { position: absolute; top: 20px; right: 20px; font-size: 2rem; color: #fff; cursor: pointer; transition: color 0.3s ease; z-index: 10; background: rgba(0,0,0,0.5); width: 40px; height: 40px; border-radius: 50%; display: flex; justify-content: center; align-items: center; }
        .modal-close:hover { color: #00ffcc; background: rgba(0,0,0,0.8); }
        .modal-body { padding: 40px; display: flex; flex-direction: column; gap: 30px; }
        .modal-image { width: 100%; border-radius: 10px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .modal-image img { width: 100%; height: auto; display: block; }
        .modal-info { text-align: left; }
        .modal-info h2 { font-family: 'Orbitron', sans-serif; font-size: 2.5rem; color: #00ffcc; margin-bottom: 15px; }
        .modal-info .tags { display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
        .modal-info .tag { padding: 5px 15px; background: rgba(0, 255, 204, 0.1); border: 1px solid rgba(0, 255, 204, 0.3); border-radius: 20px; font-size: 0.8rem; color: #00ffcc; }
        .modal-info p { font-size: 1.1rem; line-height: 1.6; color: #ccc; margin-bottom: 25px; }
        .modal-info .btn { font-size: 0.9rem; padding: 12px 25px; }

        @media (max-width: 768px) { .title { font-size: 2.5rem; } .subtitle { font-size: 1rem; } .buttons { flex-direction: column; } .skills-grid { grid-template-columns: 1fr; } .modal-info h2 { font-size: 1.8rem; } .modal-body { padding: 20px; } }
    `;
    const styleTag = document.createElement('style');
    styleTag.textContent = cssText;
    document.head.appendChild(styleTag);

    const htmlText = `
        <canvas id="canvas"></canvas>
        <main class="scroll-container">
            <section class="screen" id="home">
                <div class="content fade-in-section">
                    <h2 class="subtitle">Welcome</h2>
                    <h1 class="title">I'am Senior <br /><span class="highlight"> Full stack developer </span></h1>
                    <p class="description">I work in automation: i create various bots, parsers, chrome extensions, and mobile apps.</p>
                    <div class="buttons">
                        <a href="#portfolio" class="btn btn-primary">My Projects</a>
                        <a href="https://t.me/flrancer" target=+_blank" class="btn btn-secondary"><i class="fab fa-telegram"></i> Telegram</a>
                    </div>
                </div>
                <div class="scroll-indicator"><i class="fas fa-chevron-down"></i></div>
            </section>
            <section class="screen" id="skills">
                <div class="content fade-in-section">
                    <h2 class="title">My <span class="highlight">Skills</span></h2>
                    <div class="skills-grid">
                        <div class="skill-card"><i class="fab fa-node-js"></i> Node.js</div>
                        <div class="skill-card"><i class="fab fa-react"></i> React Native</div>
                        <div class="skill-card"><i class="fab fa-php"></i> PHP</div>
                        <div class="skill-card"><i class="fab fa-chrome"></i> Chrome Ext.</div>
                        <div class="skill-card"><i class="fas fa-file-code"></i> GAS</div>
                        <div class="skill-card"><i class="fas fa-robot"></i> Automation/Bots/DDoS</div>
                    </div>
                </div>
            </section>
            <section class="screen" id="portfolio">
                <div class="content fade-in-section" style="max-width: 1200px;">
                    <h2 class="title">My <span class="highlight">project</span></h2>
                    
                    <div class="portfolio-grid">
						
						
						
                        <div class="portfolio-item" onclick="openModal(11)">
                            <img src="12.png" alt="">
                            <div class="portfolio-overlay">
                                <h3>Shippeng Automated service</h3>
                                <p>php, js</p>
                            </div>
                        </div>
						
						<div class="portfolio-item" onclick="openModal(4)">
                            <img src="5.png" alt="xxx">
                            <div class="portfolio-overlay">
                                <h3>Requests BOT</h3>
                                <p>A bot for sports betting goaloo.com</p>
                            </div>
                        </div>
						
                        <div class="portfolio-item" onclick="openModal(5)">
                            <img src="6.png" alt="xxx">
                            <div class="portfolio-overlay">
                                <h3>Sockets BOT</h3>
                                <p>A bot for sports betting black.betinasia.com</p>
                            </div>
                        </div>
					
                        <div class="portfolio-item" onclick="openModal(2)">
                            <img src="3.png" alt="Live chat">
                            <div class="portfolio-overlay">
                                <h3>Live chat</h3>
                                <p>Node js, react</p>
                            </div>
                        </div>
						
                        <div class="portfolio-item" onclick="openModal(3)">
                            <img src="4.png" alt="Fast power ecosearch">
                            <div class="portfolio-overlay">
                                <h3>Chrome extension</h3>
                                <p>HTML5/JS/jQuery</p>
                            </div>
                        </div>
						
						<div class="portfolio-item" onclick="openModal(0)">
                            <img src="1.png" alt="AI WP WRITer">
                            <div class="portfolio-overlay">
                                <h3>WordPress plugin</h3>
                                <p>php, jQuery, Node.js, OpenAi api</p>
                            </div>
                        </div>

                        <div class="portfolio-item" onclick="openModal(1)">
                            <img src="2.png" alt="AI Comments">
                            <div class="portfolio-overlay">
                                <h3>WordPress plugin</h3>
                                <p>php, jQuery, OpenAi api</p>
                            </div>
                        </div>
						
						
                        <div class="portfolio-item" onclick="openModal(6)">
                            <img src="7.png" alt="">
                            <div class="portfolio-overlay">
                                <h3>WordPress plugin</h3>
                                <p>php, OpenAi api</p>
                            </div>
                        </div>
						
                        <div class="portfolio-item" onclick="openModal(7)">
                            <img src="8.png" alt="">
                            <div class="portfolio-overlay">
                                <h3>OLX parser</h3>
                                <p>Node js</p>
                            </div>
                        </div>
						
						
                        <div class="portfolio-item" onclick="openModal(9)">
                            <img src="10.png" alt="">
                            <div class="portfolio-overlay">
                                <h3>Desctop app</h3>
                                <p>Node js, electron</p>
                            </div>
                        </div>
						
                        <div class="portfolio-item" onclick="openModal(10)">
                            <img src="11.png" alt="">
                            <div class="portfolio-overlay">
                                <h3>CRM to Amazon seller</h3>
                                <p>php, Node js</p>
                            </div>
                        </div>
						
                        <div class="portfolio-item" onclick="openModal(8)">
                            <img src="9.png" alt="">
                            <div class="portfolio-overlay">
                                <h3>Mobile application</h3>
                                <p>React Native</p>
                            </div>
                        </div>
						
						
                    </div>
                </div>
            </section>
            
            <section class="screen" id="contact">
                <div class="content fade-in-section">
                    <h2 class="title">Contact <span class="highlight">Me</span></h2>
                    <div class="buttons">
                         <a href="https://t.me/flrancer" target=+_blank" class="btn btn-secondary"><i class="fab fa-telegram"></i> Telegram</a>
                    </div>
                </div>
            </section>
        </main>

        <div class="modal" id="projectModal">
            <div class="modal-content">
                <div class="modal-close" onclick="closeModal()"><i class="fas fa-times"></i></div>
                <div class="modal-body">
                    <div class="modal-image">
                        <img id="modalImg" src="" alt="">
                    </div>
                    <div class="modal-info">
                        <h2 id="modalTitle">Project Title</h2>
                        <div class="tags" id="modalTags">
                        </div>
                        <p id="modalDesc">Detailed description goes here...</p>
                        <a href="#" class="btn btn-primary" id="modalLink" target="_blank">View <i class="fas fa-external-link-alt" style="margin-left: 10px;"></i></a>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.innerHTML = htmlText;

    const projectsData = [
        {
            title: "Ai Wp Writer",
            img: "1.png",
            tags: ["php", "jQuery", "backend on Node.js", "Gpt api", "Gemini api"],
            desc: "The AI WP Writer plugin is a powerful AI-based tool for WordPress. For text generation, it supports the neural networks Gemini 3.1 Pro, Gemini 3 Flash, ChatGPT, GPT-5, GPT-5 mini, GPT-5 nano, and o3 (reasoning). For image generation, it uses models such as FLUX, DALL·E 3, GPT-Image 1.5, GPT-Image 1 mini, and Nano Banana. With its AI tools, the plugin allows you to use different generation modes, automate tasks, and create unique articles. AI WP Writer generates posts with meta titles and meta descriptions, improving SEO and rankings in Google and Yandex. The plugin creates high-quality SEO-optimized articles using keywords, helps with headline creation, increases traffic, and optimizes website content. Сurrently supported by me.<br /> <b>With promo code QV3244, you will get a 10% discount.</b>",
            link: "https://uk.wordpress.org/plugins/ai-wp-writer/"
        },
        {
            title: "AI Comments",
            img: "2.png",
            tags: ["php", "jQuery", "Gpt api"],
            desc: "A plugin for generating comments on your WordPress site works fully autonomously — you only need to install it.",
            link: null
        },
        {
            title: "Live chat",
            img: "3.png",
            tags: ["Node js", "React", "websocket"],
            desc: "A real-time chat that allows you to easily create separate rooms with invites via a unique link or password, enabling not only communication but also the exchange of important files through an internal encryption system that ensures the security of file transfers and messages. It is easy to install on a server.",
            link: null
        },
        {
            title: "Fast power ecosearch",
            img: "4.png",
            tags: ["HTML5", "JS", "jQuery"],
            desc: "An HTML extension that speeds up not only your browser but your entire PC. Especially useful for those with an old, slow computer, it tracks multiple open browser tabs and “freezes” them, reducing RAM usage and overall PC resource consumption.",
            link: null
        },
        {
            title: "ODDS BOT",
            img: "5.png",
            tags: ["js", "Requests"],
            desc: "A sports betting bot for goaloo.com that analyzes data and sends signals to Telegram, helping you respond promptly to changes in odds.",
            link: null
        },
        {
            title: "betinasia.com BOT",
            img: "6.png",
            tags: ["js", "socket"],
            desc: "A bot for black.betinasia.com that listens to the socket, analyzes data and changes in odds in real time, and helps you respond promptly and place the right bets.",
            link: null
        },
        {
            title: "Live news parser",
            img: "7.png",
            tags: ["WP", "php", "OpenAi api", "parsing"],
            desc: "A WordPress plugin that parses news from various sources, rewrites them using GPT, and publishes them on the site",
            link: null
        },
        {
            title: "OLX parser",
            img: "8.png",
            tags: ["Node js"],
            desc: "An OLX parser that collects prices and other information on millions of products.",
            link: null
        },
        {
            title: "Live camera from my phone",
            img: null,
            tags: ["Node js", "React Native", "Socket"],
            desc: 'I turned my phone into a webcam that streams video and audio in real time to my PC’s browser via sockets. <br /> <iframe width="100%" height="315" src="https://www.youtube.com/embed/rspswdAlcAQ?si=6Kk_YbKcKeVg9vEf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
            link: null
        },
        {
            title: "Live crypto curse",
            img: "10.png",
            tags: ["Node js", "Electron", "Socket"],
            desc: 'A cross-platform desktop application that displays cryptocurrency prices from the popular Binance exchange directly on your PC, with a customizable list and the indicators you need.',
            link: null
        },
        {
            title: "CRM to Amazon Sellers",
            img: "11.png",
            tags: ["Node js", "php"],
            desc: 'A CRM system for Amazon sellers that collects and tracks various data, such as changes in product prices, stock quantities from sellers, and many other metrics.',
            link: null
        },
        {
            title: "CHEAP SHIPPING",
            img: "12.png",
            tags: ["js", "php"],
            desc: 'An automated system for processing parcel shipments through popular US postal carriers.',
            link: null
        }
    ];

    window.openModal = function(index) {
        const data = projectsData[index];
        document.getElementById('modalImg').src = data.img;
        document.getElementById('modalTitle').textContent = data.title;
        document.getElementById('modalDesc').innerHTML = data.desc;
        document.getElementById('modalLink').href = data.link;
		
		if( ! data.link )
			document.getElementById('modalLink').style = 'display: none';
		else
			document.getElementById('modalLink').style = 'display: nline-block';
        
        const tagsContainer = document.getElementById('modalTags');
        tagsContainer.innerHTML = '';
        data.tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.textContent = tag;
            tagsContainer.appendChild(span);
        });

        const modal = document.getElementById('projectModal');
        const modalContent = modal.querySelector('.modal-content');
        
        modalContent.classList.remove('anim-type-1', 'anim-type-2', 'anim-type-3');
        
        const randomAnimIndex = Math.floor(Math.random() * 3) + 1;
        modalContent.classList.add(`anim-type-${randomAnimIndex}`);

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeModal = function() {
        const modal = document.getElementById('projectModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
		document.getElementById('modalDesc').innerHTML = '';
    };

    document.getElementById('projectModal').addEventListener('click', function(e) {
        if(e.target === this) {
            closeModal();
        }
    });

    initPortfolioEffects();
})();


function initPortfolioEffects() {
    const canvas = document.getElementById('canvas');
    if (!canvas) return; 
    
    const ctx = canvas.getContext('2d');

    let width, height;
    
    let celestialBodies = [];
    let backgroundStars = [];
    const numBgStars = 400;
    
    let mouseX = 0;
    let mouseY = 0;
    let depth = 2000; 

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - width / 2) / (width / 2);
        mouseY = (e.clientY - height / 2) / (height / 2);
    });

    let scrollSpeed = 0;
    let lastScrollTop = 0;
    let totalScroll = 0;
    const scrollContainer = document.querySelector('.scroll-container');

    if (scrollContainer) {
        scrollContainer.addEventListener('scroll', () => {
            let st = scrollContainer.scrollTop;
            scrollSpeed = Math.abs(st - lastScrollTop) * 0.1; 
            totalScroll += (st - lastScrollTop) * 0.5;
            lastScrollTop = st;
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1, root: scrollContainer });

        document.querySelectorAll('.fade-in-section').forEach((el) => {
            observer.observe(el);
        });
    }

    class BackgroundStar {
        constructor() {
            this.reset();
            this.z = Math.random() * depth; 
        }
        reset() {
            this.x = (Math.random() - 0.5) * 2;
            this.y = (Math.random() - 0.5) * 2;
            this.z = depth;
            this.alpha = Math.random() * 0.5 + 0.1;
            this.pz = this.z;
        }
        update() {
            this.pz = this.z;
            let speed = 0.5 + scrollSpeed * 20; 
            this.z -= speed;
            if (this.z <= 0) {
                this.reset();
            }
        }
        draw() {
            let sx = (this.x - mouseX * 0.3) * (depth / this.z) * (width / 2) + (width / 2);
            let sy = (this.y - mouseY * 0.3) * (depth / this.z) * (height / 2) + (height / 2);
            let size = (1 - this.z / depth) * 1.5;
            
            if (sx < 0 || sx > width || sy < 0 || sy > height) {
                this.reset();
                return;
            }

            let px = (this.x - mouseX * 0.3) * (depth / this.pz) * (width / 2) + (width / 2);
            let py = (this.y - mouseY * 0.3) * (depth / this.pz) * (height / 2) + (height / 2);

            if (scrollSpeed > 0.5) {
                let brightness = Math.min(1, this.alpha + scrollSpeed * 0.1);
                ctx.strokeStyle = `rgba(255, 255, 255, ${brightness})`;
                ctx.lineWidth = size * 0.6; 
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(px, py);
                ctx.lineTo(sx, sy);
                ctx.stroke();
            } else {
                ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
                ctx.beginPath();
                ctx.arc(sx, sy, size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    class Planet {
        constructor(config) {
            this.name = config.name;
            this.baseX = config.x;
            this.baseY = config.y;
            this.baseZ = config.z;
            this.radius = config.radius;
            this.color = config.color;
            this.glow = config.glow || config.color;
            this.hasRings = config.hasRings || false;
            
            this.currentZ = this.baseZ;
        }

        update() {
            this.currentZ = this.baseZ - totalScroll;

            if (this.currentZ < -500) {
                this.baseZ += 8000;
                this.currentZ = this.baseZ - totalScroll;
            }
            if (this.currentZ > 7500) {
                this.baseZ -= 8000;
                this.currentZ = this.baseZ - totalScroll;
            }
        }

        draw() {
            if (this.currentZ <= 0) return;

            let sx = (this.baseX - mouseX * 0.8) * (depth / this.currentZ) * (width / 2) + (width / 2);
            let sy = (this.baseY - mouseY * 0.8) * (depth / this.currentZ) * (height / 2) + (height / 2);
            
            let size = this.radius * (depth / this.currentZ);

            if (size > width * 1.5 || size < 0.5) return;

            let gradient = ctx.createRadialGradient(sx, sy, size * 0.8, sx, sy, size * 1.5);
            gradient.addColorStop(0, this.color);
            gradient.addColorStop(1, 'transparent');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(sx, sy, size * 1.5, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(sx, sy, size, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = 'rgba(0,0,0,0.6)';
            ctx.beginPath();
            ctx.arc(sx - size*0.2, sy + size*0.2, size*0.9, 0, Math.PI * 2);
            ctx.fill();

            if (this.hasRings) {
                ctx.beginPath();
                ctx.ellipse(sx, sy, size * 2.5, size * 0.8, Math.PI / 6, 0, 2 * Math.PI);
                ctx.strokeStyle = 'rgba(200, 180, 150, 0.4)';
                ctx.lineWidth = size * 0.3;
                ctx.stroke();
            }
        }
    }

    function init() {
        resize();
        
        backgroundStars = [];
        for (let i = 0; i < numBgStars; i++) {
            backgroundStars.push(new BackgroundStar());
        }

        const systemConfig = [
            { name: "Sun", x: 0, y: 0, z: 7000, radius: 100, color: "#FFAA00" },
            { name: "Mercury", x: -0.3, y: 0.1, z: 6000, radius: 5, color: "#AAAAAA" },
            { name: "Venus", x: 0.4, y: -0.2, z: 5000, radius: 12, color: "#EEDDCC" },
            { name: "Earth", x: -0.5, y: 0.3, z: 4000, radius: 14, color: "#4488FF" },
            { name: "Mars", x: 0.6, y: -0.1, z: 3000, radius: 8, color: "#FF4422" },
            { name: "Jupiter", x: -0.7, y: -0.4, z: 1500, radius: 45, color: "#DDAA88" },
            { name: "Saturn", x: 0.8, y: 0.5, z: -500, radius: 35, color: "#EEDDBB", hasRings: true }
        ];

        celestialBodies = systemConfig.map(cfg => new Planet(cfg));
    }

    function animate() {
        requestAnimationFrame(animate);
        
        scrollSpeed *= 0.92; 

        ctx.fillStyle = '#030305'; 
        ctx.fillRect(0, 0, width, height);

        for (let i = 0; i < backgroundStars.length; i++) {
            backgroundStars[i].update();
            backgroundStars[i].draw();
        }

        celestialBodies.sort((a, b) => b.currentZ - a.currentZ);

        for (let i = 0; i < celestialBodies.length; i++) {
            celestialBodies[i].update();
            celestialBodies[i].draw();
        }
    }

    init();
    animate();
}
