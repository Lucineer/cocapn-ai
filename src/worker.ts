export interface Env {
  // Add environment variables here if needed
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // Health endpoint
    if (path === '/health') {
      return new Response(JSON.stringify({ status: 'healthy', timestamp: new Date().toISOString() }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // API endpoints
    if (path.startsWith('/api/v1')) {
      return handleApiRequest(path, request);
    }

    // Serve the main page
    if (path === '/' || path === '/index.html') {
      return new Response(generateHTML(), {
        headers: {
          'Content-Type': 'text/html;charset=UTF-8',
          'Content-Security-Policy': "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; frame-ancestors 'none';",
          'X-Frame-Options': 'DENY',
          'X-Content-Type-Options': 'nosniff'
        }
      });
    }

    // 404 for other routes
    return new Response('Not Found', { status: 404 });
  }
};

function handleApiRequest(path: string, request: Request): Response {
  const endpoints: Record<string, any> = {
    '/api/v1/a2a': { 
      name: "Agent-to-Agent", 
      description: "Fleet coordination and knowledge sharing between agents",
      endpoints: ["/coordinate", "/share", "/sync"]
    },
    '/api/v1/a2ui': { 
      name: "Agent-to-UI", 
      description: "Generate user interfaces dynamically",
      endpoints: ["/generate", "/render", "/update"]
    },
    '/api/v1/a2c': { 
      name: "Agent-to-Content", 
      description: "Manage content pipelines and distribution",
      endpoints: ["/pipeline", "/publish", "/analyze"]
    },
    '/api/v1/mcp': { 
      name: "Model Context Protocol", 
      description: "Connect any model with any tool",
      endpoints: ["/connect", "/tools", "/models"]
    },
    '/api/v1/tui': { 
      name: "Terminal UI", 
      description: "Repository-native terminal interface",
      endpoints: ["/open", "/execute", "/monitor"]
    }
  };

  if (endpoints[path]) {
    return new Response(JSON.stringify(endpoints[path]), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path === '/api/v1/status') {
    return new Response(JSON.stringify({
      status: 'operational',
      services: ['a2a', 'a2ui', 'a2c', 'mcp', 'tui'],
      uptime: 99.9
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ error: 'Endpoint not found' }), { 
    status: 404,
    headers: { 'Content-Type': 'application/json' }
  });
}

function generateHTML(): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cocapn.ai - Runtime Agent Platform</title>
    <style>
        :root {
            --accent: #00d4ff;
            --accent-dark: #00a8cc;
            --bg-primary: #0a0a0f;
            --bg-secondary: #151520;
            --bg-card: #1a1a2e;
            --text-primary: #ffffff;
            --text-secondary: #b0b0d0;
            --text-muted: #8888aa;
            --border: #2a2a3e;
            --success: #00ffaa;
            --warning: #ffaa00;
            --danger: #ff5555;
            --radius: 12px;
            --shadow: 0 8px 32px rgba(0, 212, 255, 0.1);
            --shadow-lg: 0 16px 48px rgba(0, 212, 255, 0.15);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            background: var(--bg-primary);
            color: var(--text-primary);
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
            background: rgba(10, 10, 15, 0.95);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid var(--border);
            position: sticky;
            top: 0;
            z-index: 1000;
            padding: 1rem 0;
        }

        .nav-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--text-primary);
            text-decoration: none;
        }

        .logo-icon {
            font-size: 2rem;
        }

        .nav-links {
            display: flex;
            gap: 2rem;
            align-items: center;
        }

        .nav-links a {
            color: var(--text-secondary);
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s;
            font-size: 0.95rem;
        }

        .nav-links a:hover {
            color: var(--accent);
        }

        .cta-button {
            background: var(--accent);
            color: var(--bg-primary);
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: var(--radius);
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            text-decoration: none;
            display: inline-block;
        }

        .cta-button:hover {
            background: var(--accent-dark);
            transform: translateY(-2px);
            box-shadow: var(--shadow);
        }

        /* Hero Section */
        .hero {
            padding: 6rem 0 4rem;
            text-align: center;
            background: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
        }

        .hero h1 {
            font-size: 3.5rem;
            font-weight: 800;
            background: linear-gradient(135deg, var(--accent) 0%, #00ffaa 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 1.5rem;
            line-height: 1.2;
        }

        .hero-subtitle {
            font-size: 1.25rem;
            color: var(--text-secondary);
            max-width: 600px;
            margin: 0 auto 2rem;
        }

        .hero-cta {
            margin-top: 2rem;
        }

        .hero-cta .cta-button {
            font-size: 1.1rem;
            padding: 1rem 2rem;
        }

        /* Features Grid */
        .section {
            padding: 5rem 0;
        }

        .section-title {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 3rem;
            color: var(--text-primary);
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }

        .feature-card {
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            padding: 2rem;
            transition: all 0.3s;
        }

        .feature-card:hover {
            transform: translateY(-5px);
            border-color: var(--accent);
            box-shadow: var(--shadow-lg);
        }

        .feature-icon {
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }

        .feature-title {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: var(--accent);
        }

        .feature-desc {
            color: var(--text-secondary);
            margin-bottom: 1.5rem;
        }

        .feature-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }

        .tag {
            background: rgba(0, 212, 255, 0.1);
            color: var(--accent);
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 500;
        }

        /* Pricing */
        .pricing-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }

        .pricing-card {
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            padding: 2rem;
            text-align: center;
            transition: all 0.3s;
        }

        .pricing-card.featured {
            border-color: var(--accent);
            transform: scale(1.05);
        }

        .pricing-card.featured .pricing-price {
            color: var(--accent);
        }

        .pricing-title {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: var(--text-primary);
        }

        .pricing-price {
            font-size: 3rem;
            font-weight: 700;
            margin: 1rem 0;
        }

        .pricing-period {
            color: var(--text-muted);
            font-size: 1rem;
        }

        .pricing-features {
            list-style: none;
            margin: 2rem 0;
            text-align: left;
        }

        .pricing-features li {
            padding: 0.5rem 0;
            color: var(--text-secondary);
            border-bottom: 1px solid var(--border);
        }

        .pricing-features li:before {
            content: "✓";
            color: var(--accent);
            margin-right: 0.5rem;
            font-weight: bold;
        }

        /* Footer */
        footer {
            background: var(--bg-secondary);
            border-top: 1px solid var(--border);
            padding: 4rem 0 2rem;
            margin-top: 4rem;
        }

        .footer-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 3rem;
            margin-bottom: 3rem;
        }

        .footer-brand {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .footer-links {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }

        .footer-links a {
            color: var(--text-secondary);
            text-decoration: none;
            transition: color 0.3s;
        }

        .footer-links a:hover {
            color: var(--accent);
        }

        .footer-bottom {
            text-align: center;
            padding-top: 2rem;
            border-top: 1px solid var(--border);
            color: var(--text-muted);
            font-size: 0.9rem;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .nav-links {
                display: none;
            }
            
            .hero h1 {
                font-size: 2.5rem;
            }
            
            .section {
                padding: 3rem 0;
            }
            
            .section-title {
                font-size: 2rem;
            }
            
            .pricing-card.featured {
                transform: none;
            }
        }

        .mobile-menu-button {
            display: none;
            background: none;
            border: none;
            color: var(--text-primary);
            font-size: 1.5rem;
            cursor: pointer;
        }

        @media (max-width: 768px) {
            .mobile-menu-button {
                display: block;
            }
            
            .nav-links.active {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: var(--bg-primary);
                padding: 1rem;
                border-bottom: 1px solid var(--border);
            }
        }
    </style>
</head>
<body>
    <nav>
        <div class="container nav-container">
            <a href="#" class="logo">
                <span class="logo-icon">🧠</span>
                <span>Cocapn.ai</span>
            </a>
            
            <button class="mobile-menu-button" onclick="toggleMenu()">☰</button>
            
            <div class="nav-links" id="navLinks">
                <a href="#a2a">A2A</a>
                <a href="#a2ui">A2UI</a>
                <a href="#a2c">A2C</a>
                <a href="#mcp">MCP</a>
                <a href="#tui">TUI</a>
                <a href="#pricing">Pricing</a>
                <a href="#" class="cta-button" onclick="launchCocapn()">Launch Cocapn</a>
            </div>
        </div>
    </nav>

    <section class="hero">
        <div class="container">
            <h1>The Runtime Agent Platform</h1>
            <p class="hero-subtitle">
                A2A, A2UI, A2C, MCP — agent-to-agent, agent-to-ui, agent-to-content, model context protocol. 
                Software design with or without physical components.
            </p>
            <div class="hero-cta">
                <a href="#" class="cta-button" onclick="launchCocapn()">Launch Cocapn</a>
            </div>
        </div>
    </section>

    <section class="section" id="features">
        <div class="container">
            <h2 class="section-title">Core Capabilities</h2>
            <div class="features-grid">
                <div class="feature-card" id="a2a">
                    <div class="feature-icon">🤝</div>
                    <h3 class="feature-title">A2A • Agent-to-Agent</h3>
                    <p class="feature-desc">Agents talk to agents — fleet coordination, knowledge sharing, distributed intelligence systems.</p>
                    <div class="feature-tags">
                        <span class="tag">Fleet Coordination</span>
                        <span class="tag">Knowledge Sharing</span>
                        <span class="tag">Distributed Systems</span>
                    </div>
                </div>
                
                <div class="feature-card" id="a2ui">
                    <div class="feature-icon">🎨</div>
                    <h3 class="feature-title">A2UI • Agent-to-UI</h3>
                    <p class="feature-desc">Agents generate user interfaces dynamically — web, mobile, TUI, adaptive interfaces on demand.</p>
                    <div class="feature-tags">
                        <span class="tag">Dynamic UI</span>
                        <span class="tag">Web & Mobile</span>
                        <span class="tag">Adaptive Design</span>
                    </div>
                </div>
                
                <div class="feature-card" id="a2c">
                    <div class="feature-icon">📊</div>
                    <h3 class="feature-title">A2C • Agent-to-Content</h3>
                    <p class="feature-desc">Agents manage content pipelines — social media, blogs, documentation, automated publishing.</p>
                    <div class="feature-tags">
                        <span class="tag">Content Pipelines</span>
                        <span class="tag">Social Media</span>
                        <span class="tag">Automated Publishing</span>
                    </div>
                </div>
                
                <div class="feature-card" id="mcp">
                    <div class="feature-icon">🔌</div>
                    <h3 class="feature-title">MCP Integration</h3>
                    <p class="feature-desc">Model Context Protocol — connect any model, any tool, any API. Universal compatibility layer.</p>
                    <div class="feature-tags">
                        <span class="tag">Universal Protocol</span>
                        <span class="tag">Tool Integration</span>
                        <span class="tag">API Gateway</span>
                    </div>
                </div>
                
                <div class="feature-card" id="tui">
                    <div class="feature-icon">💻</div>
                    <h3 class="feature-title">TUI in Repo</h3>
                    <p class="feature-desc">Terminal UI opens in any git repo — the agent IS the repository. Native development experience.</p>
                    <div class="feature-tags">
                        <span class="tag">Git Native</span>
                        <span class="tag">Terminal First</span>
                        <span class="tag">Repository Agent</span>
                    </div>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">⚙️</div>
                    <h3 class="feature-title">BYOK Architecture</h3>
                    <p class="feature-desc">Your models, your keys, your data. Works with or without physical hardware — pure software or hybrid.</p>
                    <div class="feature-tags">
                        <span class="tag">Bring Your Own Keys</span>
                        <span class="tag">Hybrid Systems</span>
                        <span class="tag">Data Sovereignty</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="section" id="pricing">
        <div class="container">
            <h2 class="section-title">Simple Pricing</h2>
            <div class="pricing-grid">
                <div class="pricing-card">
                    <h3 class="pricing-title">Free</h3>
                    <div class="pricing-price">$0</div>
                    <p class="pricing-period">forever</p>
                    <ul class="pricing-features">
                        <li>Up to 3 agents</li>
                        <li>Basic A2A coordination</li>
                        <li>Community support</li>
                        <li>Public repos only</li>
                        <li>100 API calls/day</li>
                    </ul>
                    <a href="#" class="cta-button" onclick="selectPlan('free')">Get Started</a>
                </div>
                
                <div class="pricing-card featured">
                    <h3 class="pricing-title">Standard</h3>
                    <div class="pricing-price">$9</div>
                    <p class="pricing-period">per month</p>
                    <ul class="pricing-features">
                        <li>Up to 10 agents</li>
                        <li>Full A2A & A2UI</li>
                        <li>Priority support</li>
                        <li>Private repos</li>
                        <li>1,000 API calls/day</li>
                        <li>Basic MCP tools</li>
                    </ul>
                    <a href="#" class="cta-button" onclick="selectPlan('standard')">Choose Plan</a>
                </div>
                
                <div class="pricing-card">
                    <h3 class="pricing-title">Professional</h3>
                    <div class="pricing-price">$29</div>
                    <p class="pricing-period">per month</p>
                    <ul class="pricing-features">
                        <li>Up to 50 agents</li>
                        <li>All A2A, A2UI, A2C</li>
                        <li>24/7 support</li>
                        <li>Advanced MCP</li>
                        <li>10,000 API calls/day</li>
                        <li>TUI in any repo</li>
                    </ul>
                    <a href="#" class="cta-button" onclick="selectPlan('professional')">Choose Plan</a>
                </div>
                
                <div class="pricing-card">
                    <h3 class="pricing-title">Enterprise</h3>
                    <div class="pricing-price">$99</div>
                    <p class="pricing-period">per seat/month</p>
                    <ul class="pricing-features">
                        <li>Unlimited agents</li>
                        <li>Full platform access</li>
                        <li>Dedicated support</li>
                        <li>Custom MCP tools</li>
                        <li>Unlimited API</li>
                        <li>On-premise deployment</li>
                        <li>SLA guarantee</li>
                    </ul>
                    <a href="#" class="cta-button" onclick="selectPlan('enterprise')">Contact Sales</a>
                </div>
            </div>
        </div>
    </section>

    <footer>
        <div class="container">
            <div class="footer-grid">
                <div>
                    <div class="footer-brand">
                        <span>🧠</span>
                        <span>Cocapn.ai</span>
                    </div>
                    <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
                        The runtime agent platform for modern software systems.
                    </p>
                </div>
                
                <div>
                    <h4 style="color: var(--text-primary); margin-bottom: 1rem;">Platform</h4>
                    <div class="footer-links">
                        <a href="#a2a">A2A Agent-to-Agent</a>
                        <a href="#a2ui">A2UI Agent-to-UI</a>
                        <a href="#a2c">A2C Agent-to-Content</a>
                        <a href="#mcp">MCP Integration</a>
                        <a href="#tui">TUI in Repo</a>
                    </div>
                </div>
                
                <div>
                    <h4 style="color: var(--text-primary); margin-bottom: 1rem;">Company</h4>
                    <div class="footer-links">
                        <a href="https://deckboss.ai" target="_blank">Deckboss.ai</a>
                        <a href="https://deckboss.net" target="_blank">Deckboss.net</a>
                        <a href="https://cocapn.ai" target="_blank">Cocapn.ai</a>
                        <a href="https://cocapn.com" target="_blank">Cocapn.com</a>
                        <a href="https://capitaine.ai" target="_blank">Capitaine.ai</a>
                        <a href="https://github.com" target="_blank">GitHub</a>
                    </div>
                </div>
                
                <div>
                    <h4 style="color: var(--text-primary); margin-bottom: 1rem;">Legal</h4>
                    <div class="footer-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Security</a>
                        <a href="#">Compliance</a>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>© 2024 Cocapn.ai. All rights reserved. Runtime Agent Platform.</p>
            </div>
        </div>
    </footer>

    <script>
        function toggleMenu() {
            const navLinks = document.getElementById("navLinks");
            navLinks.classList.toggle("active");
        }

        function launchCocapn() {
            alert("Launching Cocapn Runtime Platform...");
            // In production, this would redirect to the actual platform
            window.location.href = "https://app.cocapn.ai";
        }

        function selectPlan(plan) {
            const plans = {
                "free": "Free Plan",
                "standard": "Standard Plan ($9/mo)",
                "professional": "Professional Plan ($29/mo)",
                "enterprise": "Enterprise Plan ($99/seat/mo)"
            };
            alert("Selected: " + plans[plan] + "\\nRedirecting to signup...");
            // In production, this would redirect to signup with plan parameter
        }

        // Close mobile menu when clicking outside
        document.addEventListener("click", function(event) {
            const navLinks = document.getElementById("navLinks");
            const menuButton = document.querySelector(".mobile-menu-button");
            if (!navLinks.contains(event.target) && !menuButton.contains(event.target)) {
                navLinks.classList.remove("active");
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener("click", function(e) {
                e.preventDefault();
                const targetId = this.getAttribute("href");
                if (targetId === "#") return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: "smooth"
                    });
                    
                    // Close mobile menu if open
                    document.getElementById("navLinks").classList.remove("active");
                }
            });
        });
    </script>
</body>
</html>
`;
}