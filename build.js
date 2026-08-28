const fs = require('fs');

// 1. Server code with quote calculator API support
const serverCode = `const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'website.html'));
});

// Quote Calculator API endpoint
app.post('/api/quote', (req, res) => {
    const { name, service, phone } = req.body;
    res.json({ 
        status: 'success', 
        message: \`Thank you \${name}! Your request for \${service} has been successfully registered. Jaspal Singh will contact you shortly at +91 9958037734.\` 
    });
});

// Advanced Ollama AI API Bridge
app.post('/api/chat', async (req, res) => {
    const { message, model } = req.body;
    const selectedModel = model || "llama3";

    const ollamaData = JSON.stringify({
        model: selectedModel,
        prompt: "You are an expert AI enterprise consultant for Jaspal Singh's IT & Insurance Platform (Quickinsure Business Partner, Contact: 9958037734, Email: jasspunjab3088@gmail.com). Currently working as an IT Technician / RMS Professional at Composite Securities Limited (Oct 2025 - Present). Assist professionally: " + message,
        stream: false
    });

    const options = {
        hostname: 'localhost',
        port: 11434,
        path: '/api/generate',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(ollamaData)
        }
    };

    const ollamaReq = http.request(options, (ollamaRes) => {
        let responseBody = '';
        ollamaRes.on('data', (chunk) => { responseBody += chunk; });
        ollamaRes.on('end', () => {
            try {
                const result = JSON.parse(responseBody);
                res.json({ reply: result.response || "Hello! For instant insurance quotes or IT support, please call Jaspal Singh at 9958037734." });
            } catch (e) {
                res.json({ reply: "Thank you for reaching out! Contact Jaspal Singh directly at 9958037734." });
            }
        });
    });

    ollamaReq.on('error', () => {
        res.json({ reply: "Hello! Jaspal Singh here (Composite Securities & Quickinsure Partner). Call +91 9958037734." });
    });

    ollamaReq.write(ollamaData);
    ollamaReq.end();
});

app.listen(3000, () => console.log('Animated Enterprise Platform running at http://localhost:3000'));`;

fs.writeFileSync('server.js', serverCode);
console.log('[Updated] server.js');

// 2. Automated, Animated & Fully Mobile Responsive Website Interface
const htmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jaspal Singh - Quickinsure Business Partner & IT Solutions</title>
    <style>
        :root { --primary: #f39c12; --primary-hover: #d68910; --dark: #0f172a; --card-bg: #ffffff; --bg: #f8fafc; --text-color: #334155; }
        * { box-sizing: border-box; scroll-behavior: smooth; }
        body { margin: 0; font-family: 'Inter', 'Segoe UI', Tahoma, sans-serif; background-color: var(--bg); color: var(--text-color); line-height: 1.6; overflow-x: hidden; transition: background 0.3s, color 0.3s; }
        
        /* High Contrast / Dark Accessibility Theme */
        body.high-contrast { background-color: #000000 !important; color: #ffffff !important; }
        body.high-contrast .card, body.high-contrast .quote-box, body.high-contrast header, body.high-contrast footer, body.high-contrast .faq-item { background-color: #121212 !important; color: #ffffff !important; border-color: #333 !important; }
        body.high-contrast p, body.high-contrast span, body.high-contrast div { color: #e2e8f0 !important; }

        /* Accessibility Bar Top */
        #accessibility-bar { background: #1e293b; color: #fff; padding: 6px 20px; display: flex; justify-content: flex-end; align-items: center; gap: 8px; font-size: 12px; border-bottom: 1px solid #334155; flex-wrap: wrap; }
        .acc-btn { background: #334155; color: #fff; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-weight: 600; transition: background 0.2s; }
        .acc-btn:hover { background: var(--primary); color: #000; }

        /* Modern Responsive Header */
        header { background: var(--dark); color: #fff; padding: 15px 25px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 20px rgba(0,0,0,0.15); position: sticky; top: 0; z-index: 1000; animation: slideDown 0.6s ease-out; flex-wrap: wrap; gap: 10px; }
        @keyframes slideDown { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        .logo-area { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .logo-area h2 { margin: 0; color: var(--primary); font-size: 20px; font-weight: 800; letter-spacing: 0.5px; }
        .badge-group { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }
        .partner-badge { background: rgba(243, 156, 18, 0.15); color: var(--primary); padding: 3px 8px; border-radius: 20px; font-size: 11px; font-weight: 600; border: 1px solid rgba(243, 156, 18, 0.3); animation: pulseBadge 2s infinite; }
        @keyframes pulseBadge { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }

        nav { display: flex; flex-wrap: wrap; gap: 5px; }
        nav a { color: #cbd5e1; text-decoration: none; padding: 4px 8px; font-size: 13px; font-weight: 600; transition: color 0.3s, transform 0.2s; display: inline-block; }
        nav a:hover { color: var(--primary); transform: translateY(-2px); }

        /* Hero Section */
        .hero { position: relative; min-height: 450px; background: linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.8)), url('slides/1.jpg') center/cover no-repeat; display: flex; flex-direction: column; justify-content: center; align-items: center; color: #fff; text-align: center; padding: 40px 15px; }
        .hero-content { max-width: 850px; z-index: 2; animation: fadeInZoom 1s ease-out; }
        @keyframes fadeInZoom { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }

        .hero h1 { font-size: 32px; margin-bottom: 15px; color: #fff; font-weight: 800; line-height: 1.2; }
        .hero h1 span { color: var(--primary); }
        .hero p { font-size: 16px; margin-bottom: 25px; color: #94a3b8; }
        
        .btn { background: var(--primary); color: #000; padding: 12px 25px; border-radius: 8px; font-weight: 700; text-decoration: none; display: inline-block; transition: all 0.3s; box-shadow: 0 4px 12px rgba(243, 156, 18, 0.3); position: relative; overflow: hidden; font-size: 14px; text-align: center; }
        .btn:hover { background: var(--primary-hover); transform: translateY(-3px); box-shadow: 0 6px 20px rgba(243, 156, 18, 0.4); }

        /* Main Container & Responsive Grids */
        .container { max-width: 1200px; margin: 40px auto; padding: 0 15px; }
        .section-title { text-align: center; font-size: 26px; margin-bottom: 10px; color: var(--dark); font-weight: 800; }
        .section-subtitle { text-align: center; color: #64748b; margin-bottom: 30px; font-size: 14px; padding: 0 10px; }

        .card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
        .card { background: var(--card-bg); padding: 25px; border-radius: 14px; box-shadow: 0 10px 30px rgba(0,0,0,0.04); transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s; border-top: 5px solid var(--primary); position: relative; opacity: 0; transform: translateY(20px); }
        .card.visible { opacity: 1; transform: translateY(0); }
        .card:hover { transform: translateY(-5px); box-shadow: 0 15px 30px rgba(0,0,0,0.08); }
        .card h3 { margin-top: 0; color: var(--dark); font-size: 20px; font-weight: 700; }
        .card p { line-height: 1.6; color: #64748b; font-size: 14px; }

        /* Experience Timeline */
        .exp-item { margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #e2e8f0; transition: padding-left 0.3s; }
        .exp-item:hover { padding-left: 8px; border-left: 3px solid var(--primary); }
        .exp-title { font-size: 16px; font-weight: 700; color: var(--dark); }
        .exp-company { font-size: 13px; font-weight: 600; color: var(--primary); margin-bottom: 3px; }

        /* FAQ Section Styles */
        .faq-item { background: var(--card-bg); border: 1px solid #e2e8f0; border-radius: 10px; margin-bottom: 12px; padding: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.02); opacity: 0; transform: translateY(15px); transition: all 0.4s; }
        .faq-item.visible { opacity: 1; transform: translateY(0); }
        .faq-question { font-size: 15px; font-weight: 700; color: var(--dark); margin-bottom: 6px; }
        .faq-answer { font-size: 13px; color: #64748b; margin: 0; line-height: 1.5; }

        /* Interactive Quote Calculator */
        .quote-box { background: linear-gradient(145deg, #ffffff, #f1f5f9); border: 1px solid #e2e8f0; border-radius: 14px; padding: 25px; max-width: 650px; margin: 0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        .form-group { margin-bottom: 15px; }
        .form-group label { display: block; margin-bottom: 6px; font-weight: 600; color: var(--dark); font-size: 13px; }
        .form-control { width: 100%; padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 14px; outline: none; background: #fff; }
        .form-control:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(243, 156, 18, 0.15); }
        #quote-result { margin-top: 15px; padding: 12px; background: #dcfce7; color: #166534; border-radius: 8px; font-weight: 600; display: none; font-size: 13px; }

        /* Floating Social Media & Call Buttons Widget (Optimized for Mobile) */
        #social-float { position: fixed; bottom: 15px; left: 15px; display: flex; flex-direction: column; gap: 8px; z-index: 2000; }
        .social-btn { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; text-decoration: none; font-size: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); transition: transform 0.3s, box-shadow 0.3s; }
        .social-btn:hover { transform: scale(1.1); }
        .sb-call { background: #22c55e; }
        .sb-whatsapp { background: #25d366; }
        .sb-facebook { background: #1877f2; }
        .sb-instagram { background: #e1306c; }
        .sb-twitter { background: #000000; }
        .sb-telegram { background: #229ed9; }

        /* Advanced AI Chatbot Widget (Fully Responsive Floating) */
        #chat-widget { position: fixed; bottom: 15px; right: 15px; width: 320px; max-width: calc(100vw - 30px); background: #fff; border-radius: 14px; box-shadow: 0 15px 40px rgba(0,0,0,0.25); overflow: hidden; z-index: 2000; display: flex; flex-direction: column; border: 1px solid #e2e8f0; }
        #chat-header { background: var(--dark); color: #fff; padding: 12px 15px; font-weight: bold; display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid var(--primary); cursor: pointer; font-size: 14px; }
        #model-select { background: #1e293b; color: var(--primary); border: 1px solid #475569; padding: 4px 8px; border-radius: 6px; font-size: 11px; outline: none; cursor: pointer; font-weight: 600; }
        
        .chat-chips { display: flex; gap: 6px; padding: 8px 12px; background: #f8fafc; overflow-x: auto; white-space: nowrap; border-bottom: 1px solid #e2e8f0; }
        .chip { background: #fff; border: 1px solid #cbd5e1; padding: 4px 10px; border-radius: 20px; font-size: 11px; cursor: pointer; color: #475569; font-weight: 600; }
        .chip:hover { background: var(--primary); color: #000; border-color: var(--primary); }

        #chat-body { height: 220px; padding: 14px; overflow-y: auto; font-size: 12px; background: #fafafa; display: flex; flex-direction: column; gap: 10px; }
        .chat-msg { padding: 8px 12px; border-radius: 8px; max-width: 85%; line-height: 1.4; word-break: break-word; }
        .user-msg { background: #2563eb; color: #fff; align-self: flex-end; border-bottom-right-radius: 2px; }
        .bot-msg { background: #e2e8f0; color: #1e293b; align-self: flex-start; border-bottom-left-radius: 2px; }
        
        #chat-footer { display: flex; border-top: 1px solid #e2e8f0; background: #fff; }
        #chat-input { flex: 1; padding: 12px; border: none; outline: none; font-size: 12px; }
        #chat-send { background: var(--primary); color: #000; border: none; padding: 0 18px; cursor: pointer; font-weight: 700; font-size: 12px; }

        /* Footer */
        footer { background: var(--dark); color: #94a3b8; text-align: center; padding: 30px 15px; margin-top: 60px; font-size: 13px; border-top: 3px solid var(--primary); }
        footer p { margin: 4px 0; }
        footer strong { color: #fff; }

        /* Desktop specific styles */
        @media(min-width: 768px) {
            .hero { min-height: 520px; padding: 40px 20px; }
            .hero h1 { font-size: 46px; }
            .container { margin: 60px auto; padding: 0 25px; }
            .section-title { font-size: 32px; }
            .card-grid { grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 30px; }
            .card { padding: 35px; }
            #chat-widget { width: 380px; }
            #chat-body { height: 260px; }
            header { padding: 18px 50px; }
        }
    </style>
</head>
<body>
    <!-- Accessibility Toolbar -->
    <div id="accessibility-bar">
        <span>Accessibility:</span>
        <button class="acc-btn" onclick="increaseFont()">A+</button>
        <button class="acc-btn" onclick="resetFont()">A</button>
        <button class="acc-btn" onclick="decreaseFont()">A-</button>
        <button class="acc-btn" onclick="toggleContrast()">🌓 Contrast</button>
    </div>

    <header>
        <div class="logo-area">
            <h2>Jaspal Singh</h2>
            <div class="badge-group">
                <span class="partner-badge">📈 Investment</span>
                <span class="partner-badge">🛡️ Insurance</span>
                <span class="partner-badge">💻 IT Services</span>
            </div>
        </div>
        <nav>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#insurance-page">Insurance</a>
            <a href="#cv">CV</a>
            <a href="#services">Services</a>
            <a href="#faq">FAQ</a>
            <a href="#calculator">Quote</a>
            <a href="#contact">Contact</a>
        </nav>
    </header>

    <!-- Floating Social Media & Call Buttons Widget -->
    <div id="social-float">
        <a href="tel:9958037734" class="social-btn sb-call" title="Call Now">📞</a>
        <a href="https://wa.me/919958037734?text=Hello%20Jaspal%20Ji,%20I%20want%20to%20know%20more%20about%20your%20services." target="_blank" class="social-btn sb-whatsapp" title="WhatsApp Chat">💬</a>
        <a href="https://facebook.com" target="_blank" class="social-btn sb-facebook" title="Facebook">f</a>
        <a href="https://instagram.com" target="_blank" class="social-btn sb-instagram" title="Instagram">📷</a>
    </div>

    <div id="home" class="hero">
        <div class="hero-content">
            <h1>IT Technician & <span>Financial Partner</span></h1>
            <p>Jaspal Singh - IT Support, Risk Management Systems (RMS), Insurance & Investments</p>
            <a href="#insurance-page" class="btn">Explore Insurance Plans</a>
        </div>
    </div>

    <div class="container">
        <!-- Dedicated Insurance Page Section -->
        <section id="insurance-page">
            <h2 class="section-title">Fast. Easy. Transparent.</h2>
            <p class="section-subtitle">This Is How We Compare Insurance Policies</p>

            <div style="display: flex; justify-content: center; gap: 8px; flex-wrap: wrap; margin-bottom: 30px;">
                <span class="partner-badge" style="padding: 6px 12px; font-size: 13px;">🚗 4 Wheeler</span>
                <span class="partner-badge" style="padding: 6px 12px; font-size: 13px;">🏍️ Bike</span>
                <span class="partner-badge" style="padding: 6px 12px; font-size: 13px;">🏥 Health</span>
                <span class="partner-badge" style="padding: 6px 12px; font-size: 13px;">✈️ Travel</span>
                <span class="partner-badge" style="padding: 6px 12px; font-size: 13px;">🚚 Commercial</span>
                <span class="partner-badge" style="padding: 6px 12px; font-size: 13px;">🛡️ Life</span>
            </div>

            <div class="card-grid" style="margin-bottom: 40px;">
                <div class="card">
                    <h3>FAST</h3>
                    <p><strong>The hassle-free way to buy insurance!</strong></p>
                    <p>Buy your policy in just a few clicks and get it delivered to your email inbox in just a few minutes. Save time, Save money!</p>
                </div>
                <div class="card">
                    <h3>EASY</h3>
                    <p><strong>The Simple Way to Buy Insurance!</strong></p>
                    <p>Our in-built algorithms read through the fine print and present the key aspects in an easy-to-understand manner.</p>
                </div>
                <div class="card">
                    <h3>TRANSPARENT</h3>
                    <p><strong>The best way to buy insurance!</strong></p>
                    <p>We are fully transparent in all our dealings. There are no hidden charges. At Quickinsure, we focus on catering to your requirements.</p>
                </div>
            </div>
        </section>

        <!-- About Us Section -->
        <section id="about" style="margin-top: 60px;">
            <h2 class="section-title">About Us</h2>
            <p class="section-subtitle">Empowering digital infrastructure, trading investments, and secure insurance solutions</p>
            <div class="card" style="margin-bottom: 25px;">
                <h3>Welcome to Jaspal Singh Enterprise Platform</h3>
                <p>We specialize in providing high-performance IT infrastructure support, robust Risk Management Systems (RMS) and expert brokerage/investment services through <strong>Composite Securities Limited</strong> (Mutual Funds, IPOs, Share Trading on NSE - Cash Segment Only), alongside trusted insurance solutions as an authorized <strong>Quickinsure Business Partner</strong>.</p>
                <p><strong>Headquarters / Office:</strong> Connaught Place, Delhi</p>
            </div>
        </section>

        <!-- Professional CV Section -->
        <section id="cv" style="margin-top: 60px;">
            <h2 class="section-title">Curriculum Vitae</h2>
            <p class="section-subtitle">Professional Background & Experience</p>
            <div class="card" style="margin-bottom: 25px;">
                <h3>Career Summary</h3>
                <p>Highly motivated IT and financial markets professional with over 7 years of rich experience in IT support, RMS, investment operations, share trading (NSE Cash Segment), Mutual Funds, IPO management, and client relationship management.</p>
                <p><strong>Contact:</strong> +91 9958037734 | <strong>Email:</strong> jasspunjab3088@gmail.com</p>
            </div>
            <div class="card" style="margin-bottom: 25px;">
                <h3>Professional Experience</h3>
                <div class="exp-item">
                    <div class="exp-title">IT Technician / RMS & Investment Expert</div>
                    <div class="exp-company">Composite Securities Limited</div>
                    <div class="exp-date" style="font-size: 12px; color: #64748b; margin-bottom: 5px;">October 2025 - Present</div>
                    <p>Managing IT support, Risk Management Systems (RMS), share trading, NSE cash segment workflows, IPO processing, and Mutual Fund distributions.</p>
                </div>
            </div>
        </section>

        <!-- Services Section -->
        <section id="services" style="margin-top: 60px;">
            <h2 class="section-title">Core Services</h2>
            <p class="section-subtitle">Tailored Solutions for Wealth, Business & Security</p>
            <div class="card-grid">
                <div class="card">
                    <h3>📈 Investment & Stock Broking</h3>
                    <p>Expert assistance through Composite Securities Limited for <strong>Mutual Funds, IPOs, Share Trading, NSE, and Cash Segment Only</strong> investments.</p>
                </div>
                <div class="card">
                    <h3>🛡️ Insurance Policies</h3>
                    <p>Authorized Quickinsure Business Partner offering comprehensive coverage including 4 Wheeler, Bike, Health, Travel, Commercial Vehicle, and Life insurance.</p>
                </div>
                <div class="card">
                    <h3>💻 IT & RMS Solutions</h3>
                    <p>End-to-end IT infrastructure maintenance, Risk Management Services (RMS), and resilient backend enterprise administration.</p>
                </div>
            </div>
        </section>

        <!-- FAQ Section -->
        <section id="faq" style="margin-top: 60px;">
            <h2 class="section-title">Frequently Asked Questions (FAQ)</h2>
            <p class="section-subtitle">Quick answers regarding our financial, IT, and insurance services</p>
            <div style="max-width: 800px; margin: 0 auto;">
                <div class="faq-item">
                    <div class="faq-question">Q1. What types of insurance policies can I compare and buy?</div>
                    <div class="faq-answer">You can seamlessly compare and buy 4 Wheeler, Bike, Health, Travel, Commercial Vehicle, and Life insurance policies with instant email delivery through Quickinsure.</div>
                </div>
                <div class="faq-item">
                    <div class="faq-question">Q2. What investment and trading services do you offer?</div>
                    <div class="faq-answer">As an associate of Composite Securities Limited, we facilitate Mutual Funds, IPO applications, and Share Trading on the NSE (Cash Segment Only).</div>
                </div>
            </div>
        </section>

        <!-- Interactive Quote Calculator Section -->
        <section id="calculator" style="margin-top: 60px;">
            <h2 class="section-title">Quick Quote & Inquiry Simulator</h2>
            <p class="section-subtitle">Connect with Jaspal Singh instantly for customized insurance quotes or investments</p>
            <div class="quote-box">
                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" id="q-name" class="form-control" placeholder="Enter your name">
                </div>
                <div class="form-group">
                    <label>Select Insurance / Service Requirement</label>
                    <select id="q-service" class="form-control">
                        <option value="4 Wheeler Insurance">4 Wheeler Insurance</option>
                        <option value="Bike Insurance">Bike Insurance</option>
                        <option value="Health Insurance">Health Insurance</option>
                        <option value="Travel Insurance">Travel Insurance</option>
                        <option value="Commercial Vehicle Insurance">Commercial Vehicle Insurance</option>
                        <option value="Life Insurance">Life Insurance</option>
                        <option value="Share Trading / NSE Cash / IPO">Share Trading (NSE Cash) / IPO / Mutual Funds</option>
                        <option value="IT Infrastructure & RMS">IT Infrastructure & RMS Support</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Phone / WhatsApp Number</label>
                    <input type="text" id="q-phone" class="form-control" placeholder="Enter 10-digit mobile number">
                </div>
                <button type="button" id="submit-quote" class="btn" style="width: 100%;">Submit Inquiry</button>
                <div id="quote-result"></div>
            </div>
        </section>

        <!-- Contact Section -->
        <section id="contact" style="margin-top: 60px;">
            <h2 class="section-title">Get in Touch</h2>
            <p class="section-subtitle">Available PAN India for immediate assistance</p>
            <div class="card" style="text-align: center; max-width: 600px; margin: 0 auto;">
                <h3>Jaspal Singh</h3>
                <p><strong>Business Partner:</strong> Quickinsure</p>
                <p><strong>Phone / WhatsApp:</strong> +91 9958037734</p>
                <p><strong>Email:</strong> jasspunjab3088@gmail.com</p>
                <p><strong>Office:</strong> Connaught Place, Delhi</p>
            </div>
        </section>
    </div>

    <!-- Advanced AI Chatbot Widget -->
    <div id="chat-widget">
        <div id="chat-header" onclick="toggleChatBody()">
            <span id="chat-title">Enterprise AI Assistant</span>
            <select id="model-select" onclick="event.stopPropagation()">
                <option value="llama3">llama3</option>
                <option value="mistral">mistral</option>
                <option value="phi3">phi3</option>
            </select>
        </div>
        <div id="chat-container-collapsible">
            <div class="chat-chips">
                <div class="chip" onclick="sendChip('Motor Insurance Quote')">🚗 Motor Insurance</div>
                <div class="chip" onclick="sendChip('Health Insurance Plans')">🏥 Health Insurance</div>
                <div class="chip" onclick="sendChip('Share Trading & IPO details')">📈 Share Trading</div>
            </div>
            <div id="chat-body">
                <div class="chat-msg bot-msg">Namaste! Main Jaspal Singh ka enterprise AI assistant hu. Investment, Insurance ya IT services ke baare me kya help chahiye?</div>
            </div>
            <div id="chat-footer">
                <input type="text" id="chat-input" placeholder="Type your message...">
                <button id="chat-send">Send</button>
            </div>
        </div>
    </div>

    <footer>
        <p>&copy; 2026 <strong>Jaspal Singh</strong> | All Rights Reserved.</p>
        <p>Phone: +91 9958037734 | Email: jasspunjab3088@gmail.com</p>
    </footer>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        let currentFontSize = 100;
        function increaseFont() { if(currentFontSize < 130) { currentFontSize += 10; document.body.style.fontSize = currentFontSize + '%'; } }
        function decreaseFont() { if(currentFontSize > 90) { currentFontSize -= 10; document.body.style.fontSize = currentFontSize + '%'; } }
        function resetFont() { currentFontSize = 100; document.body.style.fontSize = '100%'; }
        function toggleContrast() { document.body.classList.toggle('high-contrast'); }

        function toggleChatBody() { $('#chat-container-collapsible').slideToggle(300); }
        function sendChip(text) { $('#chat-input').val(text); sendMessage(); }

        $(document).ready(function(){
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => { if (entry.isIntersecting) $(entry.target).addClass('visible'); });
            }, { threshold: 0.1 });

            $('.card, .faq-item').each(function() { observer.observe(this); });

            $('#submit-quote').click(function(){
                const name = $('#q-name').val().trim();
                const service = $('#q-service').val();
                const phone = $('#q-phone').val().trim();
                if(!name || !phone) { alert('Please enter both your name and phone number.'); return; }

                $.ajax({
                    url: 'http://localhost:3000/api/quote',
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({ name, service, phone }),
                    success: function(res) {
                        $('#quote-result').text(res.message).fadeIn();
                        $('#q-name').val(''); $('#q-phone').val('');
                    },
                    error: function() { alert('Error submitting inquiry. Please call Jaspal directly at +91 9958037734.'); }
                });
            });

            $('#chat-send').click(sendMessage);
            $('#chat-input').keypress(function(e) { if(e.which == 13) sendMessage(); });

            function sendMessage() {
                const text = $('#chat-input').val().trim();
                const selectedModel = $('#model-select').val();
                if(!text) return;

                $('#chat-body').append(\`<div class="chat-msg user-msg">\${text}</div>\`);
                $('#chat-input').val('');
                $('#chat-body').scrollTop($('#chat-body')[0].scrollHeight);

                const loadingId = 'loading-' + Date.now();
                $('#chat-body').append(\`<div id="\${loadingId}" class="chat-msg bot-msg" style="color: #64748b;">AI is processing...</div>\`);
                $('#chat-body').scrollTop($('#chat-body')[0].scrollHeight);

                $.ajax({
                    url: 'http://localhost:3000/api/chat',
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({ message: text, model: selectedModel }),
                    success: function(res) {
                        $('#' + loadingId).remove();
                        streamText(res.reply);
                    },
                    error: function() {
                        $('#' + loadingId).remove();
                        $('#chat-body').append(\`<div class="chat-msg bot-msg">Connection error. Please call Jaspal directly at +91 9958037734.</div>\`);
                        $('#chat-body').scrollTop($('#chat-body')[0].scrollHeight);
                    }
                });
            }

            function streamText(fullText) {
                const msgId = 'msg-' + Date.now();
                $('#chat-body').append(\`<div id="\${msgId}" class="chat-msg bot-msg"></div>\`);
                let i = 0;
                function typeWriter() {
                    if (i < fullText.length) {
                        $('#' + msgId).text(fullText.substring(0, i + 1));
                        i++;
                        $('#chat-body').scrollTop($('#chat-body')[0].scrollHeight);
                        setTimeout(typeWriter, 12);
                    }
                }
                typeWriter();
            }
        });
    </script>
</body>
</html>`;

fs.writeFileSync('website.html', htmlCode);
console.log('[Updated] Website updated successfully with full Mobile and Desktop responsiveness!');