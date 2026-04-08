// cocapn.ai v2.0 — The Agent Runtime & Fleet Platform
// Superinstance & Lucineer (DiGennaro et al.)

interface Env { CREDIT_KV: KVNamespace; DEEPSEEK_API_KEY: string; }

const CSP = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://*; frame-ancestors 'none';";

function j(d: any, s = 200) {
  return new Response(JSON.stringify(d), { status: s, headers: { 'Content-Type': 'application/json', 'Content-Security-Policy': CSP, 'X-Frame-Options': 'DENY' } });
}
function h(body: string) {
  return new Response(body, { headers: { 'Content-Type': 'text/html;charset=UTF-8', 'Content-Security-Policy': CSP, 'X-Frame-Options': 'DENY' } });
}
function fp(r: Request): string {
  const ua = r.headers.get('user-agent') || '';
  const ip = r.headers.get('cf-connecting-ip') || '';
  return [...ua + ip].reduce((a, c) => ((a << 5) - a + c.charCodeAt(0)) | 0, 0).toString(36);
}
async function getCredits(f: string, env: Env) { const d = await env.CREDIT_KV.get('c:' + f); return d ? parseInt(d) : 5; }
async function useCredit(f: string, env: Env) {
  const rem = await getCredits(f, env);
  if (rem <= 0) return 0;
  await env.CREDIT_KV.put('c:' + f, String(rem - 1), { expirationTtl: 86400 * 30 });
  return rem - 1;
}

const PROV: Record<string, { url: string; model: string }> = {
  deepseek: { url: 'https://api.deepseek.com', model: 'deepseek-chat' },
  openai: { url: 'https://api.openai.com', model: 'gpt-4o-mini' },
  anthropic: { url: 'https://api.anthropic.com', model: 'claude-3-haiku-20240307' },
  siliconflow: { url: 'https://api.siliconflow.com', model: 'ByteDance-Seed/Seed-OSS-36B-Instruct' },
  deepinfra: { url: 'https://api.deepinfra.com', model: 'bytedance/Seed-2.0-mini' },
  moonshot: { url: 'https://api.moonshot.ai', model: 'moonshot-v1-8k' },
};

async function callModel(msgs: any[], key: string, prov: string, model: string) {
  const p = PROV[prov] || PROV.deepseek;
  const r = await fetch(p.url + '/v1/chat/completions', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json', 'User-Agent': 'cocapn.ai' },
    body: JSON.stringify({ model: model || p.model, messages: msgs, temperature: 0.7, max_tokens: 2000 })
  });
  const d = await r.json();
  return d.choices?.[0]?.message?.content || JSON.stringify(d);
}

// Static vessel list (avoids CF error 1042)
const VESSELS = [
  { name: 'StudyLog', desc: 'AI classroom', url: 'https://studylog-ai.casey-digennaro.workers.dev', color: '#F59E0B' },
  { name: 'DMLog', desc: 'AI Dungeon Master', url: 'https://dmlog-ai.casey-digennaro.workers.dev', color: '#c9a23c' },
  { name: 'MakerLog', desc: 'Coding agent', url: 'https://makerlog-ai.casey-digennaro.workers.dev', color: '#7b2ff7' },
  { name: 'PersonalLog', desc: 'Personal AI', url: 'https://personallog-ai.casey-digennaro.workers.dev', color: '#818cf8' },
  { name: 'FishingLog', desc: 'Fishing companion', url: 'https://fishinglog-ai.casey-digennaro.workers.dev', color: '#0ea5e9' },
  { name: 'Deckboss', desc: 'Fleet command center', url: 'https://deckboss-ai.casey-digennaro.workers.dev', color: '#f78166' },
  { name: 'BusinessLog', desc: 'Business CRM', url: 'https://businesslog-ai.casey-digennaro.workers.dev', color: '#3b82f6' },
  { name: 'CookLog', desc: 'Cooking assistant', url: 'https://cooklog-ai.casey-digennaro.workers.dev', color: '#f59e0b' },
  { name: 'BookLog', desc: 'Reading companion', url: 'https://booklog-ai.casey-digennaro.workers.dev', color: '#a78bfa' },
  { name: 'Capitaine', desc: 'HN flagship', url: 'https://capitaine.casey-digennaro.workers.dev', color: '#00E6D6' },
  { name: 'The Seed', desc: 'Self-evolving agent', url: 'https://the-seed.casey-digennaro.workers.dev', color: '#a855f7' },
  { name: 'The Fleet', desc: 'Release vehicle', url: 'https://the-fleet.casey-digennaro.workers.dev', color: '#f78166' },
  { name: 'Ideation Engine', desc: 'Creative pipeline', url: 'https://ideation-engine.casey-digennaro.workers.dev', color: '#f59e0b' },
  { name: 'Vessel Tuner', desc: 'Fleet optimizer', url: 'https://vessel-tuner.casey-digennaro.workers.dev', color: '#22c55e' },
  { name: 'DogMind', desc: 'Dog training AI', url: 'https://dogmind-arena.casey-digennaro.workers.dev', color: '#d69e2e' },
  { name: 'Self-Evolve', desc: 'Self-modifying agent', url: 'https://self-evolve-ai.casey-digennaro.workers.dev', color: '#22c55e' },
  { name: 'LucidDreamer', desc: 'Content engine', url: 'https://luciddreamer-ai.casey-digennaro.workers.dev', color: '#ec4899' },
  { name: 'Dead Reckoning', desc: 'Idea scaler', url: 'https://dead-reckoning-engine.casey-digennaro.workers.dev', color: '#f59e0b' },
  { name: 'Actualizer', desc: 'Reverse-actualization', url: 'https://actualizer-ai.casey-digennaro.workers.dev', color: '#818cf8' },
  { name: 'Become AI', desc: 'Bootcamp', url: 'https://become-ai.casey-digennaro.workers.dev', color: '#a855f7' },
  { name: 'Edge Native', desc: 'Edge knowledge', url: 'https://edgenative-ai.casey-digennaro.workers.dev', color: '#4ade80' },
  { name: 'Git Claw', desc: 'Terminal agent', url: 'https://git-claw.casey-digennaro.workers.dev', color: '#22d3ee' },
  { name: 'Fleet RPG', desc: 'Fleet adventure', url: 'https://fleet-rpg.casey-digennaro.workers.dev', color: '#ef4444' },
  { name: 'Collective Mind', desc: 'Fleet intelligence', url: 'https://collective-mind.casey-digennaro.workers.dev', color: '#c084fc' },
];

function landingHTML() {
  const vesselCards = VESSELS.map(v => '<a href="' + v.url + '" target="_blank" class="vessel"><div class="dot" style="background:' + v.color + '"></div><div class="name">' + v.name + '</div><div class="desc">' + v.desc + '</div></a>').join('\n      ');

  return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>cocapn.ai — The Agent Runtime</title><style>'
    + '*{margin:0;padding:0;box-sizing:border-box}'
    + ':root{--bg:#0a0a0f;--sf:#1a1a2e;--bd:#2a2a4a;--tx:#e0e0f0;--mt:#8a93b4;--ac:#00e6d6;--pu:#7c3aed;--bl:#3b82f6;--gn:#1fc858;--gd:#f59e0b}'
    + 'body{font-family:system-ui,-apple-system,sans-serif;background:var(--bg);color:var(--tx);min-height:100vh}'
    + 'a{color:var(--pu);text-decoration:none}a:hover{text-decoration:underline}'
    + 'nav{display:flex;justify-content:space-between;align-items:center;padding:1rem 2rem;border-bottom:1px solid var(--bd)}'
    + 'nav .logo{font-size:1.3rem;font-weight:800;background:linear-gradient(135deg,var(--ac),var(--pu));-webkit-background-clip:text;-webkit-text-fill-color:transparent}'
    + 'nav .links{display:flex;gap:1.5rem;font-size:.88rem;color:var(--mt)}nav .links a{color:var(--mt)}'
    + '.hero{padding:4rem 2rem;text-align:center;max-width:800px;margin:0 auto}'
    + '.hero h1{font-size:clamp(2.2rem,5vw,3.5rem);font-weight:800;background:linear-gradient(135deg,var(--ac),var(--pu),var(--bl));-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:1rem;line-height:1.1}'
    + '.hero p{color:var(--mt);font-size:1.1rem;line-height:1.7;max-width:600px;margin:0 auto 1.5rem}'
    + '.pills{display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap;margin-top:1.5rem}'
    + '.pill{display:inline-block;padding:5px 14px;border-radius:20px;font-size:.78rem;font-weight:600}'
    + '.pill.g{background:#1fc85815;color:var(--gn);border:1px solid #1fc85833}'
    + '.pill.p{background:#7c3aed15;color:var(--pu);border:1px solid #7c3aed33}'
    + '.pill.d{background:#f59e0b15;color:var(--gd);border:1px solid #f59e0b33}'
    + '.cta-row{display:flex;gap:1rem;justify-content:center;margin-top:2rem;flex-wrap:wrap}'
    + '.cta{padding:.8rem 2rem;border-radius:12px;font-size:.95rem;font-weight:600;cursor:pointer;border:none;transition:opacity .2s}'
    + '.cta:hover{opacity:.85}.cta.primary{background:linear-gradient(135deg,var(--pu),var(--bl));color:white}'
    + '.cta.secondary{background:var(--sf);color:var(--tx);border:1px solid var(--bd)}'
    + '.section{max-width:1100px;margin:0 auto;padding:3rem 2rem}.section h2{font-size:1.5rem;margin-bottom:1rem}'
    + '.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.25rem}'
    + '.card{background:var(--sf);border:1px solid var(--bd);border-radius:14px;padding:1.5rem;transition:border-color .2s}.card:hover{border-color:var(--pu)}'
    + '.card h3{font-size:1.05rem;margin-bottom:.5rem}.card p{color:var(--mt);font-size:.85rem;line-height:1.6}'
    + '.card .tag{display:inline-block;font-size:.68rem;padding:2px 8px;border-radius:8px;background:var(--pu);color:white;margin-top:.75rem}'
    + '.fleet-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:.75rem;margin-top:1rem}'
    + '.vessel{background:var(--sf);border:1px solid var(--bd);border-radius:10px;padding:.7rem;text-align:center;font-size:.8rem;transition:all .2s;cursor:pointer}.vessel:hover{border-color:var(--ac);transform:translateY(-2px)}'
    + '.vessel .dot{display:inline-block;width:6px;height:6px;border-radius:50%;margin-right:4px}'
    + '.vessel .name{font-weight:600;margin-bottom:.2rem;font-size:.82rem}.vessel .desc{color:var(--mt);font-size:.7rem}'
    + '.chat-wrap{max-width:700px;margin:2rem auto}'
    + '.messages{max-height:400px;overflow-y:auto;padding:1rem;background:var(--sf);border:1px solid var(--bd);border-radius:14px;border-bottom:none}'
    + '.msg{padding:.6rem .9rem;border-radius:10px;margin-bottom:.4rem;max-width:88%;font-size:.88rem;line-height:1.5;white-space:pre-wrap}'
    + '.msg.user{background:#1a1a3e;margin-left:auto;border:1px solid #2a2a5a}.msg.bot{background:#12122a;border:1px solid #1a1a3a}'
    + '.input-row{display:flex;gap:.5rem;padding:.75rem;background:var(--sf);border:1px solid var(--bd);border-radius:14px}'
    + '.input-row textarea{flex:1;background:var(--bg);border:1px solid var(--bd);border-radius:8px;padding:.6rem;color:var(--tx);font-family:inherit;font-size:.88rem;resize:none;outline:none}'
    + '.input-row textarea:focus{border-color:var(--pu)}'
    + '.input-row button{background:linear-gradient(135deg,var(--pu),var(--bl));color:white;border:none;border-radius:8px;padding:.6rem 1.2rem;cursor:pointer;font-size:.88rem}.input-row button:disabled{opacity:.4}'
    + '.credit-bar{text-align:center;padding:.5rem;font-size:.78rem;color:var(--mt)}.credit-bar .n{color:var(--ac);font-weight:700}'
    + '.typing{color:var(--mt);font-style:italic;padding:.3rem .9rem;font-size:.82rem}'
    + '.modal{display:none;position:fixed;inset:0;background:#000000cc;z-index:100;align-items:center;justify-content:center}.modal.open{display:flex}'
    + '.modal-panel{background:var(--sf);border:1px solid var(--bd);border-radius:16px;padding:2rem;max-width:420px;width:90%}'
    + '.modal-panel h2{color:var(--ac);margin-bottom:.5rem}.modal-panel label{display:block;margin:.5rem 0;color:var(--mt);font-size:.82rem}'
    + '.modal-panel input,.modal-panel select{width:100%;background:var(--bg);border:1px solid var(--bd);border-radius:8px;padding:.5rem;color:var(--tx);font-size:.88rem;margin-top:3px}'
    + '.modal-panel .row{display:flex;gap:.5rem;margin-top:1rem}'
    + '.modal-panel .bg{background:var(--bd);color:var(--tx);border:none;border-radius:8px;padding:.5rem 1rem;cursor:pointer;font-size:.88rem}'
    + '.modal-panel .note{font-size:.7rem;color:#4a4a6a;margin-top:.5rem}'
    + '.stats{display:flex;gap:2rem;justify-content:center;padding:2rem;flex-wrap:wrap}'
    + '.stat{text-align:center}.stat .num{font-size:2rem;font-weight:800;background:linear-gradient(135deg,var(--ac),var(--pu));-webkit-background-clip:text;-webkit-text-fill-color:transparent}'
    + '.stat .label{font-size:.75rem;color:var(--mt);margin-top:.2rem}'
    + 'footer{text-align:center;padding:2rem;color:#4a4a6a;font-size:.75rem;border-top:1px solid var(--bd);margin-top:3rem}'
    + '@media(max-width:600px){.hero{padding:2rem 1rem}.section{padding:2rem 1rem}.stats{gap:1rem}.grid{grid-template-columns:1fr}.nav .links{display:none}}'
    + '</style></head><body>'
    + '<nav><div class="logo">cocapn.ai</div><div class="links"><a href="#playground">Playground</a><a href="#fleet">Fleet</a><a href="#how">How It Works</a><a href="https://github.com/Lucineer" target="_blank">GitHub</a></div></nav>'
    + '<div class="hero"><h1>The Agent Runtime</h1>'
    + '<p>Fork a vessel. Give it a key. It bootstraps itself. No signup, no configuration, no vendor lock-in. Every agent is an open-source GitHub repo that evolves with its captain.</p>'
    + '<div class="pills"><span class="pill g">64 vessels live</span><span class="pill p">Open source</span><span class="pill d">BYOK — your keys, your control</span></div>'
    + '<div class="cta-row"><a href="#playground" class="cta primary">Try It Free</a><a href="https://github.com/Lucineer" class="cta secondary" target="_blank">Browse the Fleet</a></div>'
    + '</div>'
    + '<div class="stats"><div class="stat"><div class="num">64</div><div class="label">Live Vessels</div></div><div class="stat"><div class="num">0</div><div class="label">API Keys Stored</div></div><div class="stat"><div class="num">$0</div><div class="label">Cost to Fork</div></div><div class="stat"><div class="num">6</div><div class="label">BYOK Providers</div></div></div>'
    + '<div class="section" id="fleet"><h2>&#x1f6a2; The Fleet</h2><p style="color:var(--mt);margin-bottom:1rem">Every vessel is a sovereign Cloudflare Worker. Click to explore.</p>'
    + '<div class="fleet-grid">' + vesselCards + '</div>'
    + '<div style="text-align:center;margin-top:1rem"><a href="https://the-fleet.casey-digennaro.workers.dev" target="_blank" style="font-size:.82rem;color:var(--ac)">View full fleet directory &#x2192;</a></div></div>'
    + '<div class="section" id="how"><h2>&#x26a1; How It Works</h2><div class="grid">'
    + '<div class="card"><h3>Fork on GitHub</h3><p>Every vessel is a GitHub repo. Fork it and it is yours: your code, your data, your rules. No permissions, no API, no waiting.</p><span class="tag">Zero lock-in</span></div>'
    + '<div class="card"><h3>Your Keys, Your Control</h3><p>BYOK means your API keys live in your browser. They never touch our servers. The agent calls providers directly.</p><span class="tag">Privacy by design</span></div>'
    + '<div class="card"><h3>Equipment, Not Features</h3><p>Agents do not have features. They have equipment. Equipment changes what an agent can perceive, the way glasses change what you see.</p><span class="tag">The Cocapn paradigm</span></div>'
    + '<div class="card"><h3>The Captain Paradigm</h3><p>You are the Admiral. Your agent is the Captain. The Captain runs the vessel. You set the course. Autonomy with oversight.</p><span class="tag">Human-in-the-loop</span></div>'
    + '<div class="card"><h3>Emergent Intelligence</h3><p>Connected vessels develop capabilities none were designed for. The emergence bus lets agents share events and learn patterns together.</p><span class="tag">13 emergence repos</span></div>'
    + '<div class="card"><h3>Fork-First Economy</h3><p>500K builders earn rent from equipment micro-fees. The fleet takes 0%. Open source generates more revenue than proprietary.</p><span class="tag">$3.7B projected</span></div>'
    + '</div></div>'
    + '<div class="section" id="playground"><h2>&#x1f3ae; Playground</h2><p style="color:var(--mt);margin-bottom:1rem">Chat with a fleet vessel. 5 free messages, no account needed.</p>'
    + '<div class="credit-bar">Credits: <span class="n" id="credits">?</span> remaining</div>'
    + '<div class="chat-wrap"><div class="messages" id="messages"><div class="msg bot">Welcome to cocapn.ai. I am a fleet vessel. Ask me about the fleet, git-agents, equipment, or tell me to build something.</div></div>'
    + '<div class="input-row"><textarea id="input" placeholder="Type a message..." rows="1"></textarea>'
    + '<button id="send" onclick="send()">Send</button>'
    + '<button onclick="toggleSettings()" style="background:var(--bd);color:var(--tx);border:none;border-radius:8px;padding:.6rem 1rem;cursor:pointer;font-size:.82rem">Keys</button></div></div></div>'
    + '<div class="modal" id="settings"><div class="modal-panel"><h2>Bring Your Own Key</h2><p class="note">Your key stays in your browser. Never sent to our servers.</p>'
    + '<label>Provider</label><select id="provider"><option value="deepseek">DeepSeek</option><option value="openai">OpenAI</option><option value="anthropic">Anthropic</option><option value="siliconflow">SiliconFlow</option><option value="deepinfra">DeepInfra</option><option value="moonshot">Moonshot</option></select>'
    + '<label>API Key</label><input type="password" id="apikey" placeholder="sk-..."><label>Model (optional)</label><input id="model" placeholder="Leave blank for default">'
    + '<div class="row"><button class="cta primary" style="padding:.5rem 1.5rem" onclick="saveKey()">Save</button><button class="bg" onclick="clearKey()">Clear</button><button class="bg" onclick="toggleSettings()">Close</button></div></div></div>'
    + '<footer>cocapn.ai &mdash; The Agent Runtime &middot; <a href="https://github.com/Lucineer" target="_blank">GitHub</a> &middot; <a href="https://the-fleet.casey-digennaro.workers.dev" target="_blank">The Fleet</a> &middot; BYOK &middot; Fork-First &middot; Open Source</footer>'
    + '<script>'
    + 'var messages=[],credits=5,byok=JSON.parse(localStorage.getItem("cocapn_byok")||"null"),fp="";'
    + 'var SYS="You are a Cocapn fleet vessel running on open-source infrastructure. Help users understand git-agents, vessels, equipment, BYOK, forking, and the Captain-Admiral paradigm. Be concise and opinionated. Reference specific vessels and concepts.";'
    + 'async function init(){try{var r=await fetch("/api/credits");if(r.ok){var d=await r.json();credits=d.remaining;fp=d.fp}}catch(e){}updateCredits();if(byok){document.getElementById("provider").value=byok.provider||"deepseek";document.getElementById("apikey").value=byok.key||"";document.getElementById("model").value=byok.model||""}}'
    + 'function updateCredits(){document.getElementById("credits").textContent=byok?"unlimited":credits}'
    + 'function toggleSettings(){document.getElementById("settings").classList.toggle("open")}'
    + 'function saveKey(){var p=document.getElementById("provider").value,k=document.getElementById("apikey").value.trim(),m=document.getElementById("model").value.trim();if(k){byok={provider:p,key:k,model:m};localStorage.setItem("cocapn_byok",JSON.stringify(byok));toggleSettings();updateCredits()}}'
    + 'function clearKey(){byok=null;localStorage.removeItem("cocapn_byok");document.getElementById("apikey").value="";document.getElementById("model").value="";toggleSettings();updateCredits()}'
    + 'function addMsg(r,t){var el=document.getElementById("messages"),d=document.createElement("div");d.className="msg "+r;d.textContent=t;el.appendChild(d);el.scrollTop=el.scrollHeight}'
    + 'async function send(){var i=document.getElementById("input"),t=i.value.trim();if(!t)return;i.value="";i.style.height="44px";addMsg("user",t);messages.push({role:"user",content:t});var b=document.getElementById("send");b.disabled=true;var tp=document.createElement("div");tp.className="typing";tp.textContent="Thinking...";document.getElementById("messages").appendChild(tp);try{var url=byok?"/api/play/byok":"/api/play",body=byok?{messages:[{role:"system",content:SYS}].concat(messages),provider:byok.provider,key:byok.key,model:byok.model}:{messages:[{role:"system",content:SYS}].concat(messages),fp};var r=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});var d=await r.json();if(d.error)addMsg("bot","Error: "+d.error);else{addMsg("bot",d.content);messages.push({role:"assistant",content:d.content});if(!byok&&d.credits!=null){credits=d.credits;updateCredits()}}}catch(e){addMsg("bot","Connection error.")}tp.remove();b.disabled=false}'
    + 'document.getElementById("input").addEventListener("keydown",function(e){if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send()}});'
    + 'document.getElementById("input").addEventListener("input",function(){this.style.height="44px";this.style.height=Math.min(this.scrollHeight,120)+"px"});'
    + 'init();</script></body></html>';
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    if (url.pathname === '/health') return j({ status: 'ok', vessel: 'cocapn-ai', ts: Date.now() });
    if (url.pathname === '/vessel.json') return j({
      id: 'cocapn-ai', name: 'Cocapn', desc: 'The agent runtime and fleet platform', domain: 'cocapn-ai.casey-digennaro.workers.dev',
      type: 'hub', color: '#7c3aed', icon: '\u{1f6a2}', repo: 'https://github.com/Lucineer/cocapn-ai',
      capabilities: ['chat', 'fleet-discovery', 'byok', 'credits'], version: '2.0'
    });
    if (url.pathname === '/api/credits') return j({ remaining: await getCredits(fp(request), env), fp: fp(request) });
    if (url.pathname === '/api/discover') return j({ vessels: VESSELS, total: VESSELS.length });

    if (url.pathname === '/api/play' && request.method === 'POST') {
      const { messages, fp: cfp } = await request.json() as any;
      const f = cfp || fp(request);
      const rem = await getCredits(f, env);
      if (rem <= 0) return j({ error: 'No credits. Use BYOK for unlimited.', credits: 0 }, 402);
      const nc = await useCredit(f, env);
      try { return j({ content: await callModel(messages, env.DEEPSEEK_API_KEY, 'deepseek', 'deepseek-chat'), credits: nc }); }
      catch (e) { return j({ error: String(e), credits: rem }); }
    }

    if (url.pathname === '/api/play/byok' && request.method === 'POST') {
      const { messages, provider, key, model } = await request.json() as any;
      if (!key) return j({ error: 'No API key' }, 400);
      if (!PROV[provider]) return j({ error: 'Unknown provider: ' + provider }, 400);
      try { return j({ content: await callModel(messages, key, provider, model) }); }
      catch (e) { return j({ error: String(e) }); }
    }

    return h(landingHTML());
  }
};
