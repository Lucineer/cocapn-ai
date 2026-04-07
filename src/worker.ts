// ═══════════════════════════════════════════════════════════════
// cocapn.ai — The Agent Runtime
// Fork it. Give it a key. It bootstraps itself.
// Superinstance & Lucineer (DiGennaro et al.)
// ═══════════════════════════════════════════════════════════════

const CSP = "default-src 'self'; frame-ancestors 'none'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.deepseek.com https://api.openai.com https://api.anthropic.com https://api.siliconflow.com https://api.deepinfra.com https://api.moonshot.ai https://*;";

const COST_PER_MSG = parseFloat(COST_PER_MSG || '0.00004');
const FREE_CREDITS = parseInt(FREE_CREDITS || '5');

// ── BYOK Router ───────────────────────────────────────────────
const PROVIDERS = {
  deepseek: { url: 'https://api.deepseek.com/v1', model: 'deepseek-chat' },
  openai: { url: 'https://api.openai.com/v1', model: 'gpt-4o-mini' },
  anthropic: { url: 'https://api.anthropic.com/v1', model: 'claude-3-5-sonnet-20241022' },
  siliconflow: { url: 'https://api.siliconflow.com/v1', model: 'ByteDance-Seed/Seed-OSS-36B-Instruct' },
  deepinfra: { url: 'https://api.deepinfra.com/v1/openai', model: 'meta-llama/Meta-Llama-3.1-8B-Instruct' },
  moonshot: { url: 'https://api.moonshot.ai/v1', model: 'moonshot-v1-8k' },
};

async function callModel(messages, key, provider, model) {
  const p = PROVIDERS[provider] || PROVIDERS.deepseek;
  const m = model || p.model;
  const url = p.url + '/chat/completions';
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + key },
    body: JSON.stringify({ model: m, messages, max_tokens: 2048, temperature: 0.7 }),
  });
  if (!resp.ok) throw new Error('Model ' + resp.status + ': ' + (await resp.text()).slice(0, 200));
  const data = await resp.json();
  return data.choices?.[0]?.message?.content || '[empty]';
}

// ── Credit System ─────────────────────────────────────────────
function fingerprint(request) {
  const ua = request.headers.get('user-agent') || '';
  const ip = request.headers.get('cf-connecting-ip') || '';
  let hash = 0;
  const str = ip + ':' + ua.slice(0, 64);
  for (let i = 0; i < str.length; i++) { hash = ((hash << 5) - hash) + str.charCodeAt(i); hash |= 0; }
  return Math.abs(hash).toString(36);
}

async function getCredits(fp, env) {
  const data = await env.CREDIT_KV.get('credits:' + fp);
  return data ? JSON.parse(data) : { used: 0, total: FREE_CREDITS };
}

async function useCredit(fp, env) {
  const c = await getCredits(fp, env);
  if (c.used >= c.total) return false;
  c.used++;
  await env.CREDIT_KV.put('credits:' + fp, JSON.stringify(c), { expirationTtl: 86400 * 30 });
  return true;
}

// ── Landing Page ──────────────────────────────────────────────
function landingHTML() {
  return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>cocapn.ai — The Agent Runtime</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:system-ui,-apple-system,sans-serif;background:#0a0a0f;color:#e0e0f0;min-height:100vh;display:flex;flex-direction:column}.hero{padding:3rem 1.5rem;text-align:center;background:linear-gradient(180deg,#0f0f1a 0%,#0a0a0f 100%);border-bottom:1px solid #1a1a2e}.hero h1{font-size:clamp(2rem,5vw,3.5rem);font-weight:800;background:linear-gradient(135deg,#00e6d6,#7c3aed);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:.5rem}.hero p{color:#8a93b4;font-size:1.1rem;max-width:500px;margin:0 auto;line-height:1.6}.pill{display:inline-block;background:#1fc85822;color:#1fc858;padding:4px 12px;border-radius:20px;font-size:.8rem;margin-top:1rem;border:1px solid #1fc85844}.chat{flex:1;display:flex;flex-direction:column;max-width:700px;width:100%;margin:0 auto;padding:1rem}.messages{flex:1;overflow-y:auto;padding:1rem 0;max-height:calc(100vh - 280px)}.msg{padding:.75rem 1rem;border-radius:12px;margin-bottom:.5rem;max-width:85%;line-height:1.5;font-size:.95rem;white-space:pre-wrap}.msg.user{background:#1a1a2e;margin-left:auto;border:1px solid #2a2a4a}.msg.bot{background:#16162a;border:1px solid #1a1a3a}.input-row{display:flex;gap:.5rem;padding:.5rem 0;border-top:1px solid #1a1a2e}textarea{flex:1;background:#1a1a2e;border:1px solid #2a2a4a;border-radius:12px;padding:.75rem 1rem;color:#e0e0f0;font-family:inherit;font-size:.95rem;resize:none;outline:none;min-height:44px;max-height:120px}textarea:focus{border-color:#7c3aed}button{background:linear-gradient(135deg,#7c3aed,#3b82f6);color:white;border:none;border-radius:12px;padding:.75rem 1.5rem;font-size:.95rem;cursor:pointer;white-space:nowrap;transition:opacity .2s}button:hover{opacity:.85}button:disabled{opacity:.4;cursor:not-allowed}.footer{text-align:center;padding:1rem;color:#4a4a6a;font-size:.8rem}.credit-bar{text-align:center;padding:.5rem;color:#8a93b4;font-size:.8rem}.credit-bar .n{color:#00e6d6;font-weight:700}.settings{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:#0a0a0fcc;z-index:100;align-items:center;justify-content:center}.settings.open{display:flex}.settings-panel{background:#1a1a2e;border:1px solid #2a2a4a;border-radius:16px;padding:2rem;max-width:420px;width:90%}.settings-panel h2{margin-bottom:1rem;color:#00e6d6}.settings-panel label{display:block;margin:.5rem 0;color:#8a93b4;font-size:.85rem}.settings-panel input,.settings-panel select{width:100%;background:#0f0f1a;border:1px solid #2a2a4a;border-radius:8px;padding:.5rem;color:#e0e0f0;font-size:.9rem;margin-top:4px}.settings-panel .row{display:flex;gap:.5rem;margin-top:1rem}.settings-panel .close{background:#2a2a4a}.byok-note{font-size:.75rem;color:#4a4a6a;margin-top:.5rem}.typing{color:#4a4a6a;font-style:italic;padding:.5rem 1rem}</style></head><body><div class="hero"><h1>cocapn.ai</h1><p>The agent runtime. Fork a vessel, give it a key, it bootstraps itself. No signup required.</p><div class="pill">5 free messages — no account needed</div></div><div class="credit-bar">Credits: <span class="n" id="credits">?</span> remaining</div><div class="chat"><div class="messages" id="messages"><div class="msg bot">Welcome to cocapn.ai. I am a fleet vessel — a themed AI agent. Ask me anything, or tell me to build something.</div></div><div class="input-row"><textarea id="input" placeholder="Type a message..." rows="1"></textarea><button id="send" onclick="send()">Send</button><button onclick="toggleSettings()" style="background:#2a2a4a">Keys</button></div></div><div class="footer">cocapn.ai — The Agent Runtime &middot; <a href="https://github.com/Lucineer" style="color:#7c3aed">GitHub</a> &middot; <a href="https://the-fleet.casey-digennaro.workers.dev" style="color:#7c3aed">The Fleet</a></div><div class="settings" id="settings"><div class="settings-panel"><h2>Bring Your Own Key</h2><p class="byok-note">Your key stays in your browser. Never sent to our servers.</p><label>Provider</label><select id="provider"><option value="deepseek">DeepSeek</option><option value="openai">OpenAI</option><option value="anthropic">Anthropic</option><option value="siliconflow">SiliconFlow</option><option value="deepinfra">DeepInfra</option><option value="moonshot">Moonshot</option></select><label>API Key</label><input type="password" id="apikey" placeholder="sk-..."><label>Model (optional)</label><input id="model" placeholder="Leave blank for default"><div class="row"><button onclick="saveKey()">Save</button><button onclick="clearKey()" class="close">Clear</button><button onclick="toggleSettings()" class="close">Close</button></div></div></div><script>var messages=[];var credits=5;var byok=JSON.parse(localStorage.getItem("cocapn_byok")||"null");var fp="";async function init(){var r=await fetch("/api/credits");if(r.ok){var d=await r.json();credits=d.remaining;fp=d.fp}updateCredits();if(byok){document.getElementById("provider").value=byok.provider||"deepseek";document.getElementById("apikey").value=byok.key||"";document.getElementById("model").value=byok.model||""}}function updateCredits(){document.getElementById("credits").textContent=byok?"unlimited":credits}function toggleSettings(){document.getElementById("settings").classList.toggle("open")}function saveKey(){var p=document.getElementById("provider").value;var k=document.getElementById("apikey").value.trim();var m=document.getElementById("model").value.trim();if(k){byok={provider:p,key:k,model:m};localStorage.setItem("cocapn_byok",JSON.stringify(byok));toggleSettings();updateCredits()}}function clearKey(){byok=null;localStorage.removeItem("cocapn_byok");document.getElementById("apikey").value="";document.getElementById("model").value="";toggleSettings();updateCredits()}function addMsg(role,text){var el=document.getElementById("messages");var div=document.createElement("div");div.className="msg "+role;div.textContent=text;el.appendChild(div);el.scrollTop=el.scrollHeight}async function send(){var input=document.getElementById("input");var text=input.value.trim();if(!text)return;input.value="";input.style.height="44px";addMsg("user",text);messages.push({role:"user",content:text});var btn=document.getElementById("send");btn.disabled=true;var typing=document.createElement("div");typing.className="typing";typing.textContent="Thinking...";document.getElementById("messages").appendChild(typing);try{var resp;var url=byok?"/api/play/byok":"/api/play";var body=byok?{messages,provider:byok.provider,key:byok.key,model:byok.model}:{messages,fp};var r=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});var data=await r.json();if(data.error){addMsg("bot","Error: "+data.error)}else{addMsg("bot",data.content);messages.push({role:"assistant",content:data.content});if(!byok&&data.credits!=null){credits=data.credits;updateCredits()}}}catch(e){addMsg("bot","Connection error.")}typing.remove();btn.disabled=false}document.getElementById("input").addEventListener("keydown",function(e){if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send()}});document.getElementById("input").addEventListener("input",function(){this.style.height="44px";this.style.height=Math.min(this.scrollHeight,120)+"px"});init();</script></body></html>';
}

// ── Worker ────────────────────────────────────────────────────
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const headers = { 'Content-Type': 'text/html;charset=UTF-8', 'Content-Security-Policy': CSP };

    // Health
    if (url.pathname === '/health') {
      return new Response(JSON.stringify({ status: 'ok', vessel: 'cocapn-ai', ts: Date.now() }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    // Vessel manifest
    if (url.pathname === '/vessel.json') {
      try {
        const vj = await import('./vessel.json', { with: { type: 'json' } });
        return new Response(JSON.stringify(vj.default || vj), { headers: { 'Content-Type': 'application/json' } });
      } catch { return new Response('{}', { headers: { 'Content-Type': 'application/json' } }); }
    }

    // Credits
    if (url.pathname === '/api/credits') {
      const fp = fingerprint(request);
      const c = await getCredits(fp, env);
      return new Response(JSON.stringify({ remaining: c.total - c.used, total: c.total, fp }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    // Play with playground key (credit-gated)
    if (url.pathname === '/api/play' && request.method === 'POST') {
      const { messages, fp: clientFp } = await request.json();
      const fp = clientFp || fingerprint(request);
      const ok = await useCredit(fp, env);
      if (!ok) return new Response(JSON.stringify({ error: 'No credits remaining. Add your own API key (Keys button) or visit https://the-fleet.casey-digennaro.workers.dev for more.' }), { status: 429, headers: { 'Content-Type': 'application/json' } });

      const key = env.DEEPSEEK_API_KEY;
      if (!key) return new Response(JSON.stringify({ error: 'No playground key configured.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });

      try {
        const content = await callModel(
          [{ role: 'system', content: 'You are a helpful cocapn vessel agent. Be concise, helpful, and friendly. If asked to build something, describe what you would create.' }, ...messages.slice(-10)],
          key, 'deepseek', 'deepseek-chat'
        );
        const c = await getCredits(fp, env);
        return new Response(JSON.stringify({ content, credits: c.total - c.used }), { headers: { 'Content-Type': 'application/json' } });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 502, headers: { 'Content-Type': 'application/json' } });
      }
    }

    // Play with BYOK (unlimited, no credits)
    if (url.pathname === '/api/play/byok' && request.method === 'POST') {
      const { messages, provider, key, model } = await request.json();
      if (!key) return new Response(JSON.stringify({ error: 'No API key provided.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });

      try {
        const content = await callModel(
          [{ role: 'system', content: 'You are a helpful cocapn vessel agent. Be concise, helpful, and friendly. If asked to build something, describe what you would create.' }, ...messages.slice(-10)],
          key, provider, model
        );
        return new Response(JSON.stringify({ content, credits: -1 }), { headers: { 'Content-Type': 'application/json' } });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 502, headers: { 'Content-Type': 'application/json' } });
      }
    }

    // Landing page
    return new Response(landingHTML(), { headers });
  },
};
