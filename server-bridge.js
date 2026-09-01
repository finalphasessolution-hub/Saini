
// Jaspal Ollama Bridge Server - Fixes CORS for GitHub Pages -> localhost:11434
// Run: npm i express cors
// Then: node server-bridge.js
// Keep running: OLLAMA_ORIGINS=* already set via env or use this bridge

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({origin: '*'}));
app.use(express.json({limit: '2mb'}));

app.get('/', (req,res)=>res.send('Jaspal Ollama Bridge running. POST /api/chat'));

app.post('/api/chat', async (req,res)=>{
  try{
    const body = {
      model: req.body.model || 'llama3.2',
      messages: req.body.messages || [{role:'user', content: req.body.prompt || 'Hello'}],
      stream: false,
      options: {temperature: 0.7}
    };
    // Add system prompt if not present
    if(!body.messages.some(m=>m.role==='system')){
      body.messages.unshift({role:'system', content: 'You are Jaspal Singh Quickinsure Partner Connaught Place Delhi. Help with Car DL8C Rs12450, Health Floater Rs18200, Life 1Cr, Mutual Fund Nifty +14.2% Rs2.4L, IPOs. Hinglish friendly, concise. Always mention WhatsApp 9958037734 for 5 min quote.'});
    }
    const r = await fetch('http://localhost:11434/api/chat', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(body)
    });
    const data = await r.json();
    res.json(data);
  }catch(e){
    console.error(e);
    res.status(500).json({error: e.message, fallback: true, message: {content: 'Ollama not running. Start with: ollama serve. Meanwhile WhatsApp 99580 37734 for instant quote.'}});
  }
});

app.post('/api/tags', async (req,res)=>{
  try{ const r=await fetch('http://localhost:11434/api/tags'); const d=await r.json(); res.json(d); }catch(e){ res.status(500).json({error:e.message}); }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`✅ Bridge running on http://localhost:${PORT}/api/chat\nUse this URL in widget data-bridge attribute`));
