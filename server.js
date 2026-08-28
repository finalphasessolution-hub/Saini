const express = require('express');
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
        message: `Thank you ${name}! Your request for ${service} has been successfully registered. Jaspal Singh will contact you shortly at +91 9958037734.` 
    });
});

// Advanced Ollama AI API Bridge
app.post('/api/chat', async (req, res) => {
    const { message, model } = req.body;
    const selectedModel = model || "llama3";

    const ollamaData = JSON.stringify({
        model: selectedModel,
        prompt: "You are an expert AI enterprise consultant for Jaspal Singh's IT & Insurance Platform (Digit Partner ID: 1162534, Contact: 9958037734, Email: jass3088@gmail.com). Currently working as an IT Technician / RMS Professional at Composite Securities Limited (Oct 2025 - Present). Assist professionally: " + message,
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
        res.json({ reply: "Hello! Jaspal Singh here (Composite Securities & Digit Partner ID: 1162534). Call +91 9958037734." });
    });

    ollamaReq.write(ollamaData);
    ollamaReq.end();
});

app.listen(3000, () => console.log('Animated Enterprise Platform running at http://localhost:3000'));