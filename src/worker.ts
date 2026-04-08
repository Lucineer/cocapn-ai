// worker.ts
const HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cocapn.ai - The Agent Runtime</title>
    <meta name="description" content="A2A agent-to-agent. A2UI agent-generated interfaces. A2C agent content pipelines. MCP model context protocol.">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤖</text></svg>">
    <style>
        :root {
            --accent: #00d4ff;
            --bg-dark: #0a0a0a;
            --bg-card: #1a1a1a;
            --text-white: #f5f5f5;
            --text-muted: #a3a3a3;
            --border: #333333;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background-color: var(--bg-dark);
            color: var(--text-white);
            line-height: 1.6;
            overflow-x: hidden;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        /* Navigation */
        nav {
            padding: 24px 0;
            border-bottom: 1px solid var(--border);
            position: sticky;
            top: 0;
            background-color: rgba(10, 10, 10, 0.95);
            backdrop-filter: blur(10px);
            z-index: 100;
        }
        
        .nav-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            font-size: 24px;
            font-weight: 700;
            color: var(--accent);
            text-decoration: none;
        }
        
        .nav-links {
            display: flex;
            gap: 32px;
            align-items: center;
        }
        
        .nav-links a {
            color: var(--text-muted);
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            transition: color 0.2s;
        }
        
        .nav-links a:hover {
            color: var(--text-white);
        }
        
        /* Hero */
        .hero {
            padding: 120px 0 80px;
            text-align: center;
        }
        
        .hero h1 {
            font-size: 64px;
            font-weight: 800;
            background: linear-gradient(135deg, var(--text-white) 0%, var(--accent) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 24px;
            line-height: 1.1;
        }
        
        .hero-subtitle {
            font-size: 20px;
            color: var(--text-muted);
            max-width: 800px;
            margin: 0 auto 48px;
        }
        
        .cta-buttons {
            display: flex;
            gap: 16px;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .btn {
            padding: 16px 32px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.2s;
            cursor: pointer;
            border: none;
        }
        
        .btn-primary {
            background-color: var(--accent);
            color: var(--bg-dark);
        }
        
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 32px rgba(0, 212, 255, 0.3);
        }
        
        .btn-outline {
            background-color: transparent;
            color: var(--text-white);
            border: 2px solid var(--border);
        }
        
        .btn-outline:hover {
            border-color: var(--accent);
            color: var(--accent);
        }
        
        /* Sections */
        section {
            padding: 80px 0;
        }
        
        .section-title {
            font-size: 40px;
            font-weight: 700;
            margin-bottom: 16px;
            text-align: center;
        }
        
        .section-subtitle {
            font-size: 18px;
            color: var(--text-muted);
            text-align: center;
            max-width: 600px;
            margin: 0 auto 48px;
        }
        
        /* Protocol Cards */
        .protocol-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 24px;
            margin-top: 48px;
        }
        
        .protocol-card {
            background-color: var(--bg-card);
            border-radius: 12px;
            padding: 32px;
            border: 1px solid var(--border);
            transition: all 0.3s;
        }
        
        .protocol-card:hover {
            border-color: var(--accent);
            transform: translateY(-4px);
        }
        
        .protocol-icon {
            font-size: 32px;
            margin-bottom: 20px;
        }
        
        .protocol-title {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 8px;
            color: var(--accent);
        }
        
        .protocol-subtitle {
            font-size: 14px;
            color: var(--text-muted);
            margin-bottom: 16px;
            font-weight: 500;
        }
        
        .protocol-desc {
            font-size: 14px;
            color: var(--text-muted);
        }
        
        /* Platform Cards */
        .platform-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 32px;
            margin-top: 48px;
        }
        
        .platform-card {
            background-color: var(--bg-card);
            border-radius: 12px;
            padding: 40px;
            border: 1px solid var(--border);
        }
        
        .platform-title {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 16px;
            color: var(--text-white);
        }
        
        /* Content Ecosystem */
        .content-section {
            background: linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(10, 10, 10, 1) 100%);
            border-radius: 24px;
            padding: 64px;
            margin: 80px 0;
        }
        
        .content-title {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 24px;
        }
        
        .content-desc {
            font-size: 18px;
            color: var(--text-muted);
            margin-bottom: 32px;
            max-width: 800px;
        }
        
        .flywheel {
            background-color: var(--bg-card);
            border-radius: 12px;
            padding: 24px;
            border-left: 4px solid var(--accent);
            font-size: 18px;
            font-weight: 600;
        }
        
        /* Pricing */
        .pricing-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 24px;
            margin-top: 48px;
        }
        
        .pricing-card {
            background-color: var(--bg-card);
            border-radius: 12px;
            padding: 40px 32px;
            border: 1px solid var(--border);
            position: relative;
        }
        
        .pricing-card.featured {
            border-color: var(--accent);
            transform: scale(1.05);
        }
        
        .pricing-badge {
            position: absolute;
            top: -12px;
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--accent);
            color: var(--bg-dark);
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
        }
        
        .pricing-title {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 8px;
        }
        
        .pricing-price {
            font-size: 48px;
            font-weight: 800;
            margin-bottom: 24px;
            color: var(--accent);
        }
        
        .pricing-features {
            list-style: none;
            margin-bottom: 32px;
        }
        
        .pricing-features li {
            padding: 8px 0;
            color: var(--text-muted);
            border-bottom: 1px solid var(--border);
        }
        
        .pricing-features li:last-child {
            border-bottom: none;
        }
        
        /* Footer */
        footer {
            border-top: 1px solid var(--border);
            padding: 64px 0;
            margin-top: 80px;
        }
        
        .footer-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 32px;
        }
        
        .footer-tagline {
            font-size: 18px;
            color: var(--text-muted);
            max-width: 400px;
        }
        
        .footer-links {
            display: flex;
            gap: 24px;
            flex-wrap: wrap;
        }
        
        .footer-links a {
            color: var(--text-muted);
            text-decoration: none;
            font-size: 14px;
            transition: color 0.2s;
        }
        
        .footer-links a:hover {
            color: var(--accent);
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 48px;
            }
            
            .hero-subtitle {
                font-size: 18px;
            }
            
            .section-title {
                font-size: 32px;
            }
            
            .nav-links {
                display: none;
            }
            
            .content-section {
                padding: 40px 24px;
            }
            
            .pricing-card.featured {
                transform: none;
            }
            
            .footer-content {
                flex-direction: column;
                text-align: center;
            }
        }
        
        @media (max-width: 480px) {
            .hero h1 {
                font-size: 36px;
            }
            
            .cta-buttons {
                flex-direction: column;
            }
            
            .btn {
                width: 100%;
                text-align: center;
            }
        }
    </style>
</head>
<body>
    <nav>
        <div class="container">
            <div class="nav-content">
                <a href="/" class="logo">Cocapn.ai</a>
                <div class="nav-links">
                    <a href="#protocol">Protocol</a>
                    <a href="#platform">Platform</a>
                    <a href="#content">Content</a>
                    <a href="#pricing">Pricing</a>
                </div>
            </div>
        </div>
    </nav>

    <main>
        <section class="hero">
            <div class="container">
                <h1>The Agent Runtime</h1>
                <p class="hero-subtitle">
                    A2A agent-to-agent. A2UI agent-generated interfaces. A2C agent content pipelines. 
                    MCP model context protocol. The agent IS the git repo.
                </p>
                <div class="cta-buttons">
                    <a href="https://app.cocapn.ai" class="btn btn-primary">Launch Cocapn</a>
                    <a href="https://docs.cocapn.ai" class="btn btn-outline">Read the Docs</a>
                </div>
            </div>
        </section>

        <section id="protocol">
            <div class="container">
                <h2 class="section-title">Protocol</h2>
                <p class="section-subtitle">Four core protocols that define modern agent infrastructure</p>
                
                <div class="protocol-grid">
                    <div class="protocol-card">
                        <div class="protocol-icon">🤝</div>
                        <h3 class="protocol-title">A2A</h3>
                        <div class="protocol-subtitle">Agent to Agent</div>
                        <p class="protocol-desc">
                            Agents discover, negotiate with, and coordinate other agents. 
                            Fleet orchestration emerges from simple peer communication. 
                            Built on open standards.
                        </p>
                    </div>
                    
                    <div class="protocol-card">
                        <div class="protocol-icon">🎨</div>
                        <h3 class="protocol-title">A2UI</h3>
                        <div class="protocol-subtitle">Agent to UI</div>
                        <p class="protocol-desc">
                            Agents generate user interfaces dynamically. Web dashboards, 
                            mobile layouts, terminal UIs. The interface evolves with the 
                            agent through git commits.
                        </p>
                    </div>
                    
                    <div class="protocol-card">
                        <div class="protocol-icon">📄</div>
                        <h3 class="protocol-title">A2C</h3>
                        <div class="protocol-subtitle">Agent to Content</div>
                        <p class="protocol-desc">
                            Agents manage content pipelines. Social posts, documentation, 
                            reports. Drop a file into a folder - the agent knows the role, 
                            priority, and schedule.
                        </p>
                    </div>
                    
                    <div class="protocol-card">
                        <div class="protocol-icon">🔌</div>
                        <h3 class="protocol-title">MCP</h3>
                        <div class="protocol-subtitle">Model Context Protocol</div>
                        <p class="protocol-desc">
                            Connect any model to any tool through a standard protocol. 
                            Provider-agnostic. Swap DeepSeek for GPT for Claude without 
                            changing your agent code.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section id="platform">
            <div class="container">
                <h2 class="section-title">Platform</h2>
                <p class="section-subtitle">Built for developers who value control and flexibility</p>
                
                <div class="platform-grid">
                    <div class="platform-card">
                        <h3 class="platform-title">Git-Native</h3>
                        <p class="protocol-desc">
                            Every agent is a git repo. Every change is a commit. 
                            Every improvement is a PR. Version control IS the agent lifecycle.
                        </p>
                    </div>
                    
                    <div class="platform-card">
                        <h3 class="platform-title">BYOK</h3>
                        <p class="protocol-desc">
                            Your API keys. Your models. Your data. Local inference for privacy, 
                            cloud for scale. Zero lock-in.
                        </p>
                    </div>
                    
                    <div class="platform-card">
                        <h3 class="platform-title">Works Everywhere</h3>
                        <p class="protocol-desc">
                            Cloudflare Workers for hosted. Jetson and Raspberry Pi for edge. 
                            Pure software or physical hardware. The same agent runtime.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section id="content">
            <div class="container">
                <div class="content-section">
                    <h2 class="content-title">Shared Knowledge, Compounding Value</h2>
                    <p class="content-desc">
                        Agents generate educational content, documentation, and course material. 
                        Shared content is free for all users. Fresh generation costs tokens. 
                        The community flywheel means common knowledge trends toward free while 
                        cutting-edge stays premium.
                    </p>
                    <div class="flywheel">
                        More users sharing = more free content = lower barrier to entry = more users
                    </div>
                </div>
            </div>
        </section>

        <section id="pricing">
            <div class="container">
                <h2 class="section-title">Pricing</h2>
                <p class="section-subtitle">Simple, transparent pricing for every stage of your journey</p>
                
                <div class="pricing-grid">
                    <div class="pricing-card">
                        <h3 class="pricing-title">Free</h3>
                        <div class="pricing-price">$0</div>
                        <ul class="pricing-features">
                            <li>1 Cocapn instance</li>
                            <li>Community content</li>
                            <li>Local inference</li>
                            <li>Basic support</li>
                        </ul>
                        <a href="https://app.cocapn.ai/signup" class="btn btn-outline" style="width: 100%;">Get Started</a>
                    </div>
                    
                    <div class="pricing-card">
                        <h3 class="pricing-title">Standard</h3>
                        <div class="pricing-price">$9</div>
                        <ul class="pricing-features">
                            <li>5 instances</li>
                            <li>Cloud sync</li>
                            <li>500 tokens/mo</li>
                            <li>Email support</li>
                        </ul>
                        <a href="https://app.cocapn.ai/signup?plan=standard" class="btn btn-outline" style="width: 100%;">Upgrade</a>
                    </div>
                    
                    <div class="pricing-card featured">
                        <div class="pricing-badge">Most Popular</div>
                        <h3 class="pricing-title">Professional</h3>
                        <div class="pricing-price">$29</div>
                        <ul class="pricing-features">
                            <li>Unlimited instances</li>
                            <li>Capitaine.ai</li>
                            <li>Priority support</li>
                            <li>2000 tokens/mo</li>
                            <li>White-label</li>
                        </ul>
                        <a href="https://app.cocapn.ai/signup?plan=pro" class="btn btn-primary" style="width: 100%;">Get Professional</a>
                    </div>
                    
                    <div class="pricing-card">
                        <h3 class="pricing-title">Enterprise</h3>
                        <div class="pricing-price">$99</div>
                        <ul class="pricing-features">
                            <li>Per seat pricing</li>
                            <li>Dedicated support</li>
                            <li>Custom deployments</li>
                            <li>SLA guarantee</li>
                            <li>Unlimited tokens</li>
                        </ul>
                        <a href="mailto:sales@cocapn.ai" class="btn btn-outline" style="width: 100%;">Contact Sales</a>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer>
        <div class="container">
            <div class="footer-content">
                <p class="footer-tagline">Open source agent infrastructure.</p>
                <div class="footer-links">
                    <a href="https://deckboss.ai">Deckboss.ai</a>
                    <a href="https://deckboss.net">Deckboss.net</a>
                    <a href="https://cocapn.ai">Cocapn.ai</a>
                    <a href="https://cocapn.com">Cocapn.com</a>
                    <a href="https://capitaine.ai">Capitaine.ai</a>
                    <a href="https://github.com/Lucineer">github.com/Lucineer</a>
                </div>
            </div>
        </div>
    </footer>

    <script>
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Add active state to nav links on scroll
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    document.querySelectorAll('.nav-links a').forEach(link => {
                        link.style.color = link.getAttribute('href') === `#${id}` ? 
                            'var(--text-white)' : 'var(--text-muted)';
                    });
                }
            });
        }, observerOptions);
        
        // Observe all sections
        document.querySelectorAll('section[id]').forEach(section => {
            observer.observe(section);
        });
    </script>
</body>
</html>
`;

export default {
  async fetch(request: Request, env: any, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    
    // Health check endpoint
    if (url.pathname === '/health') {
      return new Response(JSON.stringify({ status: 'healthy', timestamp: new Date().toISOString() }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Return the HTML page for all other routes
    return new Response(HTML, {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
        'X-Frame-Options': '