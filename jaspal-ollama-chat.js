
// Jaspal Universal Ollama Live Chat Widget - Embed on ANY website
(function(){
  const cfg = document.currentScript?.dataset || {};
  const PHONE = cfg.phone || '919958037734';
  const MODEL = cfg.model || 'llama3.2';
  const BRIDGE = cfg.bridge || 'http://localhost:3000/api/chat'; // or direct http://localhost:11434/api/chat if OLLAMA_ORIGINS=*
  const DIRECT = cfg.direct || 'http://localhost:11434/api/chat';

  // CSS
  const css = `
  #jaspal-chat-btn{position:fixed;bottom:20px;right:20px;width:62px;height:62px;border-radius:50%;background:linear-gradient(135deg,#1e40af,#3b82f6);color:#fff;border:none;box-shadow:0 8px 24px rgba(30,64,175,.4);cursor:pointer;z-index:999999;display:flex;align-items:center;justify-content:center;font-size:28px;transition:transform .2s}
  #jaspal-chat-btn:hover{transform:scale(1.08)}
  #jaspal-chat-btn .ai-badge{position:absolute;top:-4px;right:-4px;background:#f97316;color:#fff;font-size:10px;font-weight:800;padding:2px 6px;border-radius:10px}
  #jaspal-chat-win{position:fixed;bottom:90px;right:20px;width:360px;max-width:calc(100vw - 40px);height:480px;background:#fff;border-radius:20px;box-shadow:0 16px 48px rgba(0,0,0,.18);z-index:999999;display:none;flex-direction:column;overflow:hidden;border:1px solid #e5e7eb;font-family:system-ui,-apple-system,Segoe UI,Roboto}
  #jaspal-chat-win.open{display:flex}
  .jch-head{background:linear-gradient(135deg,#0f172a,#1e40af);color:#fff;padding:14px 16px;display:flex;align-items:center;justify-content:space-between}
  .jch-head b{font-size:14px} .jch-head small{opacity:.8;font-size:11px}
  .jch-body{flex:1;overflow:auto;padding:14px;background:#f8fafc;display:flex;flex-direction:column;gap:10px}
  .jch-msg{max-width:80%;padding:10px 12px;border-radius:14px;font-size:13px;line-height:1.4}
  .jch-msg.user{align-self:flex-end;background:#1e40af;color:#fff;border-bottom-right-radius:4px}
  .jch-msg.bot{align-self:flex-start;background:#fff;border:1px solid #e5e7eb;color:#0f172a;border-bottom-left-radius:4px}
  .jch-input{display:flex;gap:8px;padding:12px;border-top:1px solid #e5e7eb;background:#fff}
  .jch-input input{flex:1;border:1px solid #e5e7eb;border-radius:24px;padding:10px 14px;font-size:13px;outline:none}
  .jch-input button{background:#1e40af;color:#fff;border:none;border-radius:24px;padding:10px 16px;font-weight:700;cursor:pointer}
  .jch-quick{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0}
  .jch-quick button{font-size:11px;padding:6px 10px;border-radius:20px;border:1px solid #dbeafe;background:#eff6ff;color:#1e40af;cursor:pointer}
  `;
  const style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);

  // HTML
  const btn = document.createElement('button'); btn.id='jaspal-chat-btn'; btn.innerHTML='💬<span class="ai-badge">AI+LIVE</span>';
  const win = document.createElement('div'); win.id='jaspal-chat-win';
  win.innerHTML=`
    <div class="jch-head"><div><b>💬 Jaspal AI Assistant</b><br><small><span style="display:inline-block;width:8px;height:8px;background:#22c55e;border-radius:50%;margin-right:4px"></span>Live • AI + Human • 2 min reply</small></div><button id="jch-close" style="background:rgba(255,255,255,.2);border:none;color:#fff;width:28px;height:28px;border-radius:50%;cursor:pointer">✕</button></div>
    <div class="jch-body" id="jch-body">
      <div class="jch-msg bot">Hi! Main Jaspal ka AI assistant hu 👋<br>Insurance, Mutual Fund, IPO me help chahiye?<br><small style="opacity:.7">WhatsApp 99580 37734 • 5 min quote</small></div>
      <div class="jch-quick"><button data-q="Car Insurance DL8C quote">Car Insurance</button><button data-q="Health Family Floater">Health</button><button data-q="Mutual Fund Nifty 50">Mutual Fund</button><button data-q="IPO details">IPO</button><button data-q="Talk to Jaspal directly">Talk to Jaspal</button></div>
    </div>
    <div class="jch-input"><input id="jch-input" placeholder="Type your message..."/><button id="jch-send">Send</button></div>
  `;
  document.body.appendChild(btn); document.body.appendChild(win);

  const body = win.querySelector('#jch-body');
  const input = win.querySelector('#jch-input');
  const sendBtn = win.querySelector('#jch-send');
  let history = [{role:'system', content: 'You are Jaspal Singh Quickinsure Partner Connaught Place Delhi. Help with Car DL8C Rs12450, Health Floater Rs18200, Life 1Cr, Mutual Fund Nifty +14.2% Rs2.4L, IPOs. Hinglish friendly, concise, helpful. Always mention WhatsApp 9958037734 for 5 min quote. If complex query, say Jaspal will call in 5 mins.'}];

  function addMsg(text, who){
    const d=document.createElement('div'); d.className='jch-msg '+who; d.innerHTML=text; body.appendChild(d); body.scrollTop=body.scrollHeight;
    // Notify admin + phone popup
    try{
      const payload={page:location.href, text, who, time:new Date().toISOString(), visitor: 'Visitor-'+Math.floor(Math.random()*9000+1000)};
      localStorage.setItem('jaspal_last_chat', JSON.stringify(payload));
      localStorage.setItem('jaspal_chat_'+Date.now(), JSON.stringify(payload));
      const bc=new BroadcastChannel('jaspal_chat'); bc.postMessage(payload); bc.close();
      // WhatsApp trigger after user msg
      if(who==='user'){
        const waMsg = encodeURIComponent(`New Lead from ${location.href}\nMsg: ${text}\nTime: ${new Date().toLocaleString()}\nReply: https://wa.me/${PHONE.replace(/\D/g,'')}`);
        // Optional: open after 2nd msg, not every time to avoid spam - here just log
        console.log('WhatsApp lead:', waMsg);
      }
    }catch(e){}
  }

  async function askOllama(userText){
    addMsg('🤖 AI typing...', 'bot');
    const typingEl = body.lastChild;
    // Try bridge first, then direct
    const endpoints = [BRIDGE, DIRECT];
    for(let url of endpoints){
      try{
        const res = await fetch(url, {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({model: MODEL, messages: [...history, {role:'user', content: userText}], stream:false})
        });
        if(!res.ok) throw new Error('HTTP '+res.status);
        const data = await res.json();
        const reply = data.message?.content || data.response || 'Jaspal will call you in 5 mins - WhatsApp 99580 37734';
        typingEl.remove();
        addMsg(reply.replace(/\n/g,'<br>'), 'bot');
        history.push({role:'user', content:userText},{role:'assistant', content:reply});
        return;
      }catch(e){
        console.warn('Ollama endpoint failed', url, e);
        continue;
      }
    }
    // Fallback
    typingEl.remove();
    const fallback = `Thanks! Jaspal will reply in 2 mins. For instant quote WhatsApp <a href="https://wa.me/${PHONE.replace(/\D/g,'')}?text=${encodeURIComponent(userText)}" target="_blank" style="color:#1e40af;font-weight:700">99580 37734</a> pe message karo. Page: ${location.hostname}`;
    addMsg(fallback, 'bot');
    history.push({role:'user', content:userText},{role:'assistant', content:'Fallback reply'});
  }

  function send(){
    const txt=input.value.trim(); if(!txt) return;
    addMsg(txt,'user'); input.value='';
    askOllama(txt);
  }

  btn.onclick=()=>{win.classList.toggle('open')};
  win.querySelector('#jch-close').onclick=()=>win.classList.remove('open');
  sendBtn.onclick=send;
  input.onkeydown=e=>{if(e.key==='Enter') send()};
  win.querySelectorAll('.jch-quick button').forEach(b=>b.onclick=()=>{input.value=b.dataset.q; send();});

  console.log('Jaspal Ollama Chat loaded - Model:', MODEL, 'Phone:', PHONE);
})();
