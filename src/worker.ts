export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    
    // Health endpoint
    if (url.pathname === '/health') {
      return new Response(JSON.stringify({ status: "ok" }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // HTML response
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cocapn.ai - Agent Runtime Platform</title>
  <meta name="description" content="Runtime agent platform for A2A, A2UI, A2C, and MCP">
  <style>
    :root {
      --bg: #0a0a0a;
      --surface: #1a1a1a;
      --text: #f0f0f0;
      --text-secondary: #888;
      --accent: #00d4ff;
      --accent-dark: #0088aa;
      --border: #333;
      --radius: 8px;
      --transition: 0.2s ease;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      overflow-x: hidden;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    /* Header & Navigation */
    header {
      background: var(--surface);
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    
    .nav-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
    }
    
    .logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--accent);
      text-decoration: none;
    }
    
    .nav-desktop {
      display: none;
    }
    
    .nav-desktop a {
      color: var(--text);
      text-decoration: none;
      margin-left: 2rem;
      transition: color var(--transition);
    }
    
    .nav-desktop a:hover {
      color: var(--accent);
    }
    
    .mobile-menu-btn {
      background: none;
      border: none;
      color: var(--text);
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0.5rem;
    }
    
    .mobile-menu {
      position: fixed;
      top: 70px;
      left: 0;
      right: 0;
      background: var(--surface);
      border-top: 1px solid var(--border);
      padding: 1rem;
      display: none;
      flex-direction: column;
      gap: 1rem;
    }
    
    .mobile-menu.active {
      display: flex;
    }
    
    .mobile-menu a {
      color: var(--text);
      text-decoration: none;
      padding: 0.75rem;
      border-bottom: 1px solid var(--border);
    }
    
    /* Hero */
    .hero {
      padding: 4rem 0;
      text-align: center;
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
    }
    
    .hero h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      background: linear-gradient(90deg, var(--accent), #00ffaa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .hero-subtitle {
      font-size: 1.2rem;
      color: var(--text-secondary);
      max-width: 800px;
      margin: 0 auto 2rem;
    }
    
    /* Cards */
    .section {
      padding: 3rem 0;
    }
    
    .section-title {
      font-size: 1.8rem;
      margin-bottom: 2rem;
      text-align: center;
      color: var(--accent);
    }
    
    .cards-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
      margin-bottom: 3rem;
    }
    
    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 1.5rem;
      transition: transform var(--transition), border-color var(--transition);
    }
    
    .card:hover {
      transform: translateY(-4px);
      border-color: var(--accent);
    }
    
    .card-title {
      font-size: 1.3rem;
      margin-bottom: 1rem;
      color: var(--accent);
    }
    
    /* Features */
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }
    
    .feature {
      background: var(--surface);
      padding: 1.5rem;
      border-radius: var(--radius);
      border: 1px solid var(--border);
    }
    
    /* Pricing */
    .pricing-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    
    .pricing-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 2rem;
      text-align: center;
    }
    
    .pricing-card.featured {
      border-color: var(--accent);
      transform: scale(1.05);
    }
    
    .price {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--accent);
      margin: 1rem 0;
    }
    
    .price-period {
      color: var(--text-secondary);
      font-size: 0.9rem;
    }
    
    .pricing-features {
      list-style: none;
      margin: 1.5rem 0;
    }
    
    .pricing-features li {
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--border);
    }
    
    .cta-button {
      display: inline-block;
      background: var(--accent);
      color: var(--bg);
      padding: 0.75rem 2rem;
      border-radius: var(--radius);
      text-decoration: none;
      font-weight: 600;
      transition: background var(--transition);
      border: none;
      cursor: pointer;
      width: 100%;
    }
    
    .cta-button:hover {
      background: var(--accent-dark);
    }
    
    /* Footer */
    footer {
      background: var(--surface);
      border-top: 1px solid var(--border);
      padding: 3rem 0;
      margin-top: 3rem;
    }
    
    .footer-links {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 2rem;
      margin-bottom: 2rem;
    }
    
    .footer-links a {
      color: var(--text-secondary);
      text-decoration: none;
      transition: color var(--transition);
    }
    
    .footer-links a:hover {
      color: var(--accent);
    }
    
    .copyright {
      text-align: center;
      color: var(--text-secondary);
      font-size: 0.9rem;
    }
    
    /* Responsive */
    @media (min-width: 768px) {
      .mobile-menu-btn {
        display: none;
      }
      
      .nav-desktop {
        display: flex;
      }
      
      .hero h1 {
        font-size: 3.5rem;
      }
      
      .cards-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (min-width: 1024px) {
      .cards-grid {
        grid-template-columns: repeat(4, 1fr);
      }
      
      .hero h1 {
        font-size: 4rem;
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="container nav-container">
      <a href="/" class="logo">Cocapn.ai</a>
      
      <nav class="nav-desktop">
        <a href="#home">Home</a>
        <a href="#protocol">Protocol</a>
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#docs">Docs</a>
      </nav>
      
      <button class="mobile-menu-btn" id="mobileMenuBtn">☰</button>
    </div>
    
    <nav class="mobile-menu" id="mobileMenu">
      <a href="#home">Home</a>
      <a href="#protocol">Protocol</a>
      <a href="#features">Features</a>
      <a href="#pricing">Pricing</a>
      <a href="#docs">Docs</a>
    </nav>
  </header>

  <main>
    <section class="hero" id="home">
      <div class="container">
        <h1>The Agent Runtime</h1>
        <p class="hero-subtitle">
          A2A agent-to-agent communication. A2UI agent-generated interfaces. 
          A2C agent content pipelines. MCP model context protocol. 
          The agent IS the git repo.
        </p>
        <a href="#pricing" class="cta-button">Get Started</a>
      </div>
    </section>

    <section class="section" id="protocol">
      <div class="container">
        <h2 class="section-title">Protocol</h2>
        <div class="cards-grid">
          <div class="card">
            <h3 class="card-title">A2A (Agent to Agent)</h3>
            <p>Agents coordinate, share knowledge, fleet orchestration</p>
          </div>
          <div class="card">
            <h3 class="card-title">A2UI (Agent to UI)</h3>
            <p>Agents generate web, mobile, and TUI interfaces dynamically</p>
          </div>
          <div class="card">
            <h3 class="card-title">A2C (Agent to Content)</h3>
            <p>Agents manage content pipelines - social media, blogs, docs</p>
          </div>
          <div class="card">
            <h3 class="card-title">MCP (Model Context Protocol)</h3>
            <p>Connect any model, any tool, any provider via standard protocol</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="features">
      <div class="container">
        <h2 class="section-title">Features</h2>
        <div class="features-grid">
          <div class="feature">
            <h3>Git-native agents</h3>
            <p>Your agent lives in a git repository</p>
          </div>
          <div class="feature">
            <h3>BYOK</h3>
            <p>Bring your own keys and models</p>
          </div>
          <div class="feature">
            <h3>TUI in repo</h3>
            <p>Terminal UI included with every agent</p>
          </div>
          <div class="feature">
            <h3>Hardware optional</h3>
            <p>Works with or without dedicated hardware</p>
          </div>
          <div class="feature">
            <h3>Fork-first</h3>
            <p>Start by forking existing agents</p>
          </div>
          <div class="feature">
            <h3>Zero lock-in</h3>
            <p>Export your agent anytime</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="pricing">
      <div class="container">
        <h2 class="section-title">Pricing</h2>
        <div class="pricing-grid">
          <div class="pricing-card">
            <h3>Free</h3>
            <div class="price">$0</div>
            <div class="price-period">per month</div>
            <ul class="pricing-features">
              <li>1 instance</li>
              <li>Basic features</li>
              <li>Community support</li>
            </ul>
            <button class="cta-button">Get Started</button>
          </div>
          
          <div class="pricing-card featured">
            <h3>Standard</h3>
            <div class="price">$9</div>
            <div class="price-period">per month</div>
            <ul class="pricing-features">
              <li>5 instances</li>
              <li>Cloud sync</li>
              <li>Priority support</li>
            </ul>
            <button class="cta-button">Get Started</button>
          </div>
          
          <div class="pricing-card">
            <h3>Pro</h3>
            <div class="price">$29</div>
            <div class="price-period">per month</div>
            <ul class="pricing-features">
              <li>Unlimited instances</li>
              <li>Capitaine access</li>
              <li>Advanced features</li>
            </ul>
            <button class="cta-button">Get Started</button>
          </div>
          
          <div class="pricing-card">
            <h3>Enterprise</h3>
            <div class="price">$99</div>
            <div class="price-period">per seat / month</div>
            <ul class="pricing-features">
              <li>Custom deployment</li>
              <li>Dedicated support</li>
              <li>SLA guarantee</li>
            </ul>
            <button class="cta-button">Contact Sales</button>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div class="container">
      <div class="footer-links">
        <a href="https://deckboss.ai">Deckboss.ai</a>
        <a href="https://deckboss.net">Deckboss.net</a>
        <a href="https://cocapn.ai">Cocapn.ai</a>
        <a href="https://cocapn.com">Cocapn.com</a>
        <a href="https://capitaine.ai">Capitaine.ai</a>
        <a href="https://github.com/Lucineer">github.com/Lucineer</a>
      </div>
      <p class="copyright">© 2024 Cocapn.ai. Built for software developers and content creators.</p>
    </div>
  </footer>

  <script>
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
      });
      
      // Close menu when clicking a link
      mobileMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
          mobileMenu.classList.remove("active");
        });
      });
    }
    
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
        }
      });
    });
  </script>
</body>
</html>`;

    return new Response(html, {
      headers: {
        "Content-Type": "text/html;charset=UTF-8",
        "Content-Security-Policy": "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline';",
        "X-Frame-Options": "DENY",
        "X-Content-Type-Options": "nosniff"
      }
    });
  }
};