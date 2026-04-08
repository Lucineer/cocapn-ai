javascript
const HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>cocapn-ai | AI Infrastructure Platform</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --accent: #00d4ff;
            --bg: #0a0a0f;
            --surface: #151520;
            --text: #f0f0f0;
            --text-secondary: #a0a0b0;
            --border: #2a2a3a;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', sans-serif;
            background: var(--bg);
            color: var(--text);
            line-height: 1.6;
            overflow-x: hidden;
        }
        
        .container {
            width: 100%;
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
            background: var(--bg);
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
        }
        
        .nav-links a {
            color: var(--text);
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s;
        }
        
        .nav-links a:hover {
            color: var(--accent);
        }
        
        /* Hero */
        .hero {
            padding: 80px 0;
            text-align: center;
        }
        
        .hero h1 {
            font-size: 48px;
            font-weight: 700;
            margin-bottom: 20px;
            background: linear-gradient(90deg, var(--accent), #00a8ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .hero p {
            font-size: 20px;
            color: var(--text-secondary);
            max-width: 600px;
            margin: 0 auto 40px;
        }
        
        .cta-button {
            display: inline-block;
            background: var(--accent);
            color: var(--bg);
            padding: 16px 32px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            font-size: 18px;
            transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
        }
        
        /* Features */
        .features {
            padding: 80px 0;
        }
        
        .section-title {
            text-align: center;
            font-size: 36px;
            margin-bottom: 60px;
            color: var(--text);
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 30px;
        }
        
        .feature-card {
            background: var(--surface);
            padding: 30px;
            border-radius: 12px;
            border: 1px solid var(--border);
            transition: transform 0.3s, border-color 0.3s;
        }
        
        .feature-card:hover {
            transform: translateY(-5px);
            border-color: var(--accent);
        }
        
        .feature-icon {
            font-size: 32px;
            margin-bottom: 20px;
            color: var(--accent);
        }
        
        .feature-card h3 {
            font-size: 20px;
            margin-bottom: 15px;
        }
        
        .feature-card p {
            color: var(--text-secondary);
        }
        
        /* Pricing */
        .pricing {
            padding: 80px 0;
        }
        
        .pricing-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
        }
        
        .pricing-card {
            background: var(--surface);
            padding: 40px 30px;
            border-radius: 12px;
            border: 1px solid var(--border);
            text-align: center;
            transition: transform 0.3s;
        }
        
        .pricing-card.featured {
            border-color: var(--accent);
            transform: scale(1.05);
        }
        
        .pricing-card h3 {
            font-size: 24px;
            margin-bottom: 20px;
        }
        
        .price {
            font-size: 48px;
            font-weight: 700;
            color: var(--accent);
            margin-bottom: 30px;
        }
        
        .price span {
            font-size: 16px;
            color: var(--text-secondary);
        }
        
        .pricing-features {
            list-style: none;
            margin-bottom: 30px;
        }
        
        .pricing-features li {
            padding: 10px 0;
            color: var(--text-secondary);
            border-bottom: 1px solid var(--border);
        }
        
        /* Footer */
        footer {
            padding: 60px 0;
            border-top: 1px solid var(--border);
            text-align: center;
            color: var(--text-secondary);
        }
        
        .footer-links {
            display: flex;
            justify-content: center;
            gap: 30px;
            margin-bottom: 30px;
        }
        
        .footer-links a {
            color: var(--text-secondary);
            text-decoration: none;
            transition: color 0.3s;
        }
        
        .footer-links a:hover {
            color: var(--accent);
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .nav-links {
                display: none;
            }
            
            .hero h1 {
                font-size: 36px;
            }
            
            .hero p {
                font-size: 18px;
            }
            
            .section-title {
                font-size: 28px;
            }
            
            .pricing-card.featured {
                transform: none;
            }
            
            .footer-links {
                flex-direction: column;
                gap: 15px;
            }
        }
    </style>
</head>
<body>
    <nav>
        <div class="container nav-content">
            <a href="#" class="logo">cocapn-ai</a>
            <div class="nav-links">
                <a href="#features">Features</a>
                <a href="#pricing">Pricing</a>
                <a href="#">Documentation</a>
                <a href="#">Sign In</a>
            </div>
        </div>
    </nav>

    <main>
        <section class="hero">
            <div class="container">
                <h1>AI Infrastructure for the Next Generation</h1>
                <p>Deploy, scale, and manage AI models with unprecedented simplicity and performance. Built for developers who demand excellence.</p>
                <a href="#pricing" class="cta-button">Start Building Today</a>
            </div>
        </section>

        <section id="features" class="features">
            <div class="container">
                <h2 class="section-title">Powerful Features</h2>
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon">⚡</div>
                        <h3>Lightning Fast</h3>
                        <p>Global edge network with sub-50ms latency for AI inference worldwide.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">🔒</div>
                        <h3>Enterprise Security</h3>
                        <p>End-to-end encryption and compliance with industry security standards.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">📊</div>
                        <h3>Real-time Analytics</h3>
                        <p>Comprehensive monitoring and insights into model performance and usage.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">🔄</div>
                        <h3>Auto Scaling</h3>
                        <p>Intelligent resource allocation that adapts to your traffic patterns automatically.</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="pricing" class="pricing">
            <div class="container">
                <h2 class="section-title">Simple, Transparent Pricing</h2>
                <div class="pricing-grid">
                    <div class="pricing-card">
                        <h3>Hobby</h3>
                        <div class="price">$0<span>/month</span></div>
                        <ul class="pricing-features">
                            <li>10K requests/month</li>
                            <li>1 GB storage</li>
                            <li>Community support</li>
                            <li>Basic analytics</li>
                        </ul>
                        <a href="#" class="cta-button">Get Started</a>
                    </div>
                    <div class="pricing-card featured">
                        <h3>Pro</h3>
                        <div class="price">$9<span>/month</span></div>
                        <ul class="pricing-features">
                            <li>100K requests/month</li>
                            <li>10 GB storage</li>
                            <li>Priority support</li>
                            <li>Advanced analytics</li>
                        </ul>
                        <a href="#" class="cta-button">Most Popular</a>
                    </div>
                    <div class="pricing-card">
                        <h3>Team</h3>
                        <div class="price">$29<span>/month</span></div>
                        <ul class="pricing-features">
                            <li>1M requests/month</li>
                            <li>100 GB storage</li>
                            <li>24/7 support</li>
                            <li>Custom domains</li>
                        </ul>
                        <a href="#" class="cta-button">For Teams</a>
                    </div>
                    <div class="pricing-card">
                        <h3>Enterprise</h3>
                        <div class="price">$99<span>/month</span></div>
                        <ul class="pricing-features">
                            <li>10M requests/month</li>
                            <li>1 TB storage</li>
                            <li>Dedicated support</li>
                            <li>SLA guarantee</li>
                        </ul>
                        <a href="#" class="cta-button">Contact Sales</a>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer>
        <div class="container">
            <div class="footer-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Documentation</a>
                <a href="#">Contact</a>
                <a href="#">Twitter</a>
                <a href="#">GitHub</a>
            </div>
            <p>&copy; 2024 cocapn-ai. All rights reserved.</p>
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
        
        // Simple mobile menu toggle (optional enhancement)
        console.log('cocapn-ai loaded successfully');
    </script>
</body>
</html>
`;

export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    // Health endpoint
    if (url.pathname === '/health') {
      return new Response(
        JSON.stringify({
          status: 'healthy',
          timestamp: new Date().toISOString(),
          service: 'cocapn-ai'
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
          }
        }
      );
    }
    
    // Main landing page
    return new Response(HTML, {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'X-Frame-Options': 'DENY',
        'Content-Security-Policy': "default-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; script-src 'self' 'unsafe-inline';"
      }
    });
  }
};