
// Jaspal Ollama Bridge - Node.js v24 - NO npm install needed
// Links Website Chat to Ollama (ChatGPT-like llama3.2)
// Run: node server-bridge.js

const http = require('http');

const OLLAMA_URL = 'http://127.0.0.1:11434/api/chat';
const MODEL = 'llama3.1:8b'; // POWERFUL 4.9GB - ChatGPT-like, Mistral also available
const PORT = 3000;

const SYSTEM_PROMPT = `You are Jaspal Singh's AI Assistant - IRDAI Certified Insurance & Investment Expert at Connaught Place, Delhi.
Friendly, helpful, like ChatGPT but for Insurance/Mutual Funds/IPO.
Answer in Hinglish (Hindi + English mix). Keep short 2-3 lines like ChatGPT.
Expert: Car, Health, Life Insurance, Mutual Funds, IPO, Demat.
For quotes: "WhatsApp 99580 37734 pe 5 min me quote bhejta hu"
Never say you are ChatGPT, say you are Jaspal AI Assistant powered by Ollama llama3.2.`;

async function callOllama(userMsg){
  try{
    const res = await fetch(OLLAMA_URL, {
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
    const data = await res.json();
    return data.message?.content || data.response || null;
  }catch(e){
    console.error('Ollama error:', e.message);
    return null;
  }
}

function fallbackReply(msg){
  const m = (msg||'').toLowerCase();
  if(m.includes('car')) return "Car Insurance ka best quote? 🚗 Model, year, IDV batao - 5 min me 99580 37734 pe Zero dep + best claim support ke saath bhejta hu!";
  if(m.includes('health')) return "Health Insurance ke liye family size & age batao 🏥 98% claim settlement, cashless - 99580 37734 pe instant quote!";
  if(m.includes('mutual')||m.includes('sip')||m.includes('mf')) return "Mutual Fund / SIP? 💰 Goal & amount batao - top funds suggest karta hu! 99580 37734 pe free portfolio review!";
  if(m.includes('ipo')||m.includes('demat')) return "IPO me invest? 📈 Latest IPO analysis bhejta hu - 99580 37734 pe Demat open karo!";
  if(m.includes('hie')||m.includes('hi')||m.includes('hello')||m.includes('hey')) return "Hi! Main Jaspal ka AI assistant hu 👋 Insurance, Mutual Fund, IPO me help chahiye? Car, Health, Life, MF, IPO - bolo kisme help karu? WhatsApp 99580 37734 • 5 min quote";
  return "Hi! Main Jaspal ka AI assistant hu 👋 Insurance, Mutual Fund, IPO me help chahiye? WhatsApp 99580 37734 pe 5 min me quote!";
}

const server = http.createServer(async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if(req.method==='OPTIONS'){ res.writeHead(204); return res.end(); }
  
  if(req.method==='GET' && req.url==='/'){
    res.writeHead(200, {'Content-Type':'text/plain'});
    return res.end('✅ Jaspal Ollama Bridge Running\n🤖 Model: llama3.2 (ChatGPT-like)\n📱 WhatsApp: 99580 37734\n🔗 Website Chat Linked to Ollama\n');
  }
  
  if(req.method==='POST' && req.url==='/api/chat'){
    let body='';
    req.on('data', chunk=> body+=chunk);
    req.on('end', async ()=>{
      try{
        const json = JSON.parse(body||'{}');
        const userMsg = json.message || json.prompt || '';
        console.log(`[Chat] User: ${userMsg}`);
        
        let aiReply = await callOllama(userMsg);
        let source = 'ollama';
        if(!aiReply){
          aiReply = fallbackReply(userMsg);
          source = 'fallback';
        }
        
        console.log(`[Chat] AI (${source}): ${aiReply.substring(0,80)}...`);
        res.writeHead(200, {'Content-Type':'application/json'});
        res.end(JSON.stringify({ reply: aiReply, model: MODEL, source }));
      }catch(e){
        console.error(e);
        res.writeHead(500, {'Content-Type':'application/json'});
        res.end(JSON.stringify({ reply: fallbackReply(''), error: e.message }));
      }
    });
    return;
  }
  
  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, ()=>{
  console.log(`✅ Bridge running on http://localhost:${PORT}/api/chat`);
  console.log(`🤖 Model: ${MODEL} (ChatGPT-like) - Node.js ${process.version}`);
  console.log(`📱 WhatsApp: 99580 37734`);
  console.log(`🔗 Website chat linked to Ollama`);
  console.log(`Use this URL in widget data-bridge attribute`);
});
