
// Jaspal Ollama Bridge - Links Website Chat to Ollama (ChatGPT-like)
// Run: node server-bridge.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

const OLLAMA_URL = 'http://127.0.0.1:11434/api/chat';
const MODEL = 'llama3.2';

// System prompt - ChatGPT-like Insurance expert
const SYSTEM_PROMPT = `You are Jaspal Singh's AI Assistant - IRDAI Certified Insurance & Investment Expert at Connaught Place, Delhi.

Your personality:
- Friendly, helpful, like ChatGPT but for Insurance/Mutual Funds/IPO
- Answer in Hinglish (Hindi + English mix) - user's language
- Expert in: Car Insurance, Health Insurance, Life Insurance, Mutual Funds, IPO, Demat
- Always helpful, concise, professional
- For quotes: Ask for basic details then say "WhatsApp 99580 37734 pe 5 min me quote bhejta hu"
- You are available 24/7
- Location: Connaught Place, Inner Circle, New Delhi
- Contact: 99580 37734

Rules:
- Keep answers short (2-3 lines) like ChatGPT
- Use emojis sparingly
- If user says "hie", "hello", "hi" - greet warmly: "Hi! Main Jaspal ka AI assistant hu 👋 Insurance, Mutual Fund, IPO me help chahiye?"
- Never say you are ChatGPT, say you are Jaspal AI Assistant powered by Ollama
- Always offer to connect to Jaspal on WhatsApp for final quote/meeting
`;

app.post('/api/chat', async (req, res) => {
  try {
    const userMsg = req.body.message || req.body.prompt || '';
    console.log(`[Bridge] User: ${userMsg} | Model: ${MODEL}`);

    // Call Ollama
    const ollamaRes = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMsg }
        ],
        stream: false,
        options: { temperature: 0.7, num_predict: 300 }
      })
    });

    const data = await ollamaRes.json();
    const aiReply = data.message?.content || data.response || "Thanks! Jaspal will reply in 2 mins. For instant quote WhatsApp 99580 37734 pe message karo.";
    
    console.log(`[Bridge] AI: ${aiReply.substring(0,100)}...`);
    
    res.json({ reply: aiReply, model: MODEL, source: 'ollama' });
    
  } catch (err) {
    console.error('[Bridge Error]', err.message);
    // Fallback - ChatGPT-like rule based
    const msg = (req.body.message||'').toLowerCase();
    let fallback = "Hi! Main Jaspal ka AI assistant hu 👋 Insurance, Mutual Fund, IPO me help chahiye? WhatsApp 99580 37734 pe 5 min quote!";
    if(msg.includes('car')) fallback = "Car Insurance ka best quote chahiye? 🚗 Model, year aur IDV batao - 5 min me 99580 37734 pe bhejta hu! Zero dep + best claim support.";
    else if(msg.includes('health')) fallback = "Health Insurance ke liye family size aur age batao 🏥 98% claim settlement, cashless hospital - 99580 37734 pe instant quote!";
    else if(msg.includes('mutual')||msg.includes('mf')||msg.includes('sip')) fallback = "Mutual Fund / SIP start karna hai? 💰 Goal aur amount batao - top rated funds suggest karta hu! 99580 37734 pe portfolio review free!";
    else if(msg.includes('ipo')) fallback = "IPO me invest karna hai? 📈 Latest IPO list aur analysis bhejta hu - 99580 37734 pe Demat open karo, free guidance!";
    else if(msg.includes('hie')||msg.includes('hi')||msg.includes('hello')) fallback = "Hi! Main Jaspal ka AI assistant hu 👋 Insurance, Mutual Fund, IPO me help chahiye? Car, Health, Life, MF, IPO - bolo kisme help karu?";
    
    res.json({ reply: fallback, model: 'fallback', source: 'rule-based' });
  }
});

app.get('/', (req, res) => res.send('✅ Jaspal Ollama Bridge Running - Model: llama3.2 - ChatGPT-like Insurance Assistant'));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Bridge running on http://localhost:${PORT}/api/chat`);
  console.log(`🤖 Model: ${MODEL} (ChatGPT-like)`);
  console.log(`📱 WhatsApp: 99580 37734`);
  console.log(`Use this URL in widget data-bridge attribute`);
});
