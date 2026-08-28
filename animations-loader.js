// animations-loader.js - Advanced Matte Gray & Metallic Silver FinTech UI
(function() {
    const head = document.head;
    
    const aosCss = document.createElement('link');
    aosCss.rel = 'stylesheet';
    aosCss.href = 'https://unpkg.com/aos@2.3.1/dist/aos.css';
    head.appendChild(aosCss);

    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';
    head.appendChild(fontLink);

    // Matte Gray & Metallic Silver Accent Styling (Zero Blue Text)
    const customStyle = document.createElement('style');
    customStyle.innerHTML = `
        :root {
            --bg-matte: #0F1115;
            --card-matte: rgba(22, 27, 34, 0.95);
            --silver-primary: #E2E8F0;
            --silver-bright: #F8FAFC;
            --silver-glow: rgba(226, 232, 240, 0.2);
            --border-silver: rgba(226, 232, 240, 0.25);
        }
        
        body {
            font-family: 'Plus Jakarta Sans', sans-serif !important;
            background-color: var(--bg-matte) !important;
            color: #E2E8F0 !important;
            overflow-x: hidden;
        }

        /* High contrast for paragraphs and list items */
        .faq-item p, .card p, .card span, li, p {
            color: #94A3B8 !important;
        }

        /* Matte Gray Cards with Silver Glow */
        .card, .calc-card, .form-card, .tool-card, .service-card, .faq-item {
            background: var(--card-matte) !important;
            backdrop-filter: blur(16px);
            border: 1px solid var(--border-silver) !important;
            border-radius: 16px !important;
            box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.6) !important;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        .card:hover, .calc-card:hover, .form-card:hover, .tool-card:hover, .service-card:hover {
            transform: translateY(-4px);
            border-color: var(--silver-primary) !important;
            box-shadow: 0 20px 40px -10px var(--silver-glow), 0 0 20px rgba(226, 232, 240, 0.1) !important;
        }

        /* Metallic Silver Headings and Questions (Overriding any blue text) */
        h1, h2, h3, h4, h5, h6, .faq-item h3, .faq-item strong, .card h3, .card h4, a {
            color: var(--silver-bright) !important;
        }
        
        h1 span, h2 span, .highlight {
            color: var(--silver-primary) !important;
            text-shadow: 0 0 20px rgba(226, 232, 240, 0.3);
        }

        /* Metallic Silver & Charcoal Buttons */
        button, .btn, .cta-btn {
            background: linear-gradient(135deg, #334155 0%, #1E293B 100%) !important;
            color: #F8FAFC !important;
            border: 1px solid var(--border-silver) !important;
            border-radius: 12px !important;
            font-weight: 600 !important;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            transition: all 0.25s ease !important;
        }

        button:hover, .btn:hover, .cta-btn:hover {
            background: linear-gradient(135deg, #475569 0%, #334155 100%) !important;
            border-color: var(--silver-primary) !important;
            box-shadow: 0 6px 20px var(--silver-glow);
            transform: translateY(-2px);
        }
    `;
    head.appendChild(customStyle);

    // Auto AOS Animations
    window.addEventListener('DOMContentLoaded', () => {
        const cards = document.querySelectorAll('.card, .calc-card, .form-card, .tool-card, .service-card, .faq-item');
        cards.forEach((el, index) => {
            if (!el.hasAttribute('data-aos')) {
                el.setAttribute('data-aos', index % 2 === 0 ? 'fade-up' : 'zoom-in');
                el.setAttribute('data-aos-duration', '800');
            }
        });

        const headings = document.querySelectorAll('h1, h2, h3');
        headings.forEach(el => {
            if (!el.hasAttribute('data-aos')) {
                el.setAttribute('data-aos', 'fade-right');
                el.setAttribute('data-aos-duration', '700');
            }
        });

        const aosScript = document.createElement('script');
        aosScript.src = 'https://unpkg.com/aos@2.3.1/dist/aos.js';
        aosScript.onload = function() {
            AOS.init({
                duration: 800,
                once: true,
                offset: 50
            });
        };
        document.body.appendChild(aosScript);
    });
})();