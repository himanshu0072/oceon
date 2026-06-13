import React from "react";
import "../css/Home.css";

export default function Home() {
  const whatsappLink =
    "https://wa.me/919205968389?text=Hi%20OCEON,%20I%20am%20interested%20in%20your%20products.%20Please%20share%20more%20details.";

  return (
    <div className="home-page">
      {/* ================= NAVBAR ================= */}

      <header className="home-navbar">
        <div className="brand">
          <div className="brand-logo">O</div>
          <div>
            <h2>OCEON</h2>
            <span>Premium Household Products</span>
          </div>
        </div>

        <nav>
          <a href="#products">Products</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            Order on WhatsApp
          </a>
        </nav>
      </header>

      {/* ================= HERO ================= */}

      <section className="hero-section">
        <div className="hero-left">
          <span className="badge badge-blue">Trusted Across India 🇮🇳</span>

          <h1>
            Premium Grocery &
            <br />
            Household Products
          </h1>

          <p>
            Discover high-quality household essentials designed for everyday
            use. OCEON offers reliable products with affordable pricing and
            quick delivery for homes, shops, offices, and businesses.
          </p>

          <div className="hero-buttons">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary btn-lg"
            >
              🟢 Buy Now
            </a>

            <a href="tel:+919205968389" className="btn btn-outline btn-lg">
              📞 Call Now
            </a>
          </div>
        </div>

        <div className="hero-right">
          <div className="stat-card">
            <div className="stat-label">Premium Quality</div>
            <div className="stat-value">100%</div>
            <div className="stat-sub">Carefully selected products</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Fast Support</div>
            <div className="stat-value">24×7</div>
            <div className="stat-sub">WhatsApp assistance</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Affordable Pricing</div>
            <div className="stat-value">₹₹</div>
            <div className="stat-sub">Best value guaranteed</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Customer Focus</div>
            <div className="stat-value">❤</div>
            <div className="stat-sub">Satisfaction comes first</div>
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}

      <section className="section" id="products">
        <div className="section-header">
          <span className="badge badge-green">Our Products</span>

          <h2>Everything You Need For A Cleaner Home</h2>

          <p>
            We provide quality household and cleaning products suitable for
            homes and businesses.
          </p>
        </div>

        <div className="features-grid">
          <div className="card">
            <h3>🧴 Liquid Cleaners</h3>
            <p>Powerful cleaning solutions for daily household use.</p>
          </div>

          <div className="card">
            <h3>🧼 Hand Wash</h3>
            <p>Gentle yet effective hygiene products for your family.</p>
          </div>

          <div className="card">
            <h3>🧽 Dish Wash</h3>
            <p>Tough on grease while being safe for utensils.</p>
          </div>

          <div className="card">
            <h3>🏠 Floor Cleaners</h3>
            <p>Keep your home fresh, hygienic, and sparkling clean.</p>
          </div>

          <div className="card">
            <h3>🧺 Laundry Solutions</h3>
            <p>Effective products for fresh and spotless clothes.</p>
          </div>

          <div className="card">
            <h3>📦 Bulk Orders</h3>
            <p>Contact us for wholesale pricing and larger quantities.</p>
          </div>
        </div>
      </section>

      {/* ================= WHY OCEON ================= */}

      <section className="section">
        <div className="section-header">
          <span className="badge badge-purple">Why Choose OCEON</span>

          <h2>Trusted By Customers</h2>
        </div>

        <div className="features-grid">
          <div className="card">
            <h3>✅ Premium Quality</h3>
            <p>
              High-quality products manufactured to maintain excellent
              standards.
            </p>
          </div>

          <div className="card">
            <h3>🚚 Fast Delivery</h3>
            <p>Timely dispatch and reliable delivery support.</p>
          </div>

          <div className="card">
            <h3>💰 Affordable Prices</h3>
            <p>Competitive pricing without compromising quality.</p>
          </div>

          <div className="card">
            <h3>🤝 Trusted Service</h3>
            <p>Friendly customer support from inquiry to delivery.</p>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}

      <section className="cta-section">
        <span className="badge badge-orange">Ready to Order?</span>

        <h2>Let's Connect on WhatsApp</h2>

        <p>
          Have questions or want to place an order? Contact our team directly
          and receive quick assistance.
        </p>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary btn-lg"
        >
          💬 Order on WhatsApp
        </a>
      </section>

      {/* ================= ABOUT ================= */}

      <section className="section" id="about">
        <div className="section-header">
          <span className="badge badge-blue">About Us</span>

          <h2>About OCEON</h2>

          <p>
            OCEON is committed to delivering reliable household and cleaning
            products with exceptional customer service. We believe quality,
            affordability, and trust should go hand in hand.
          </p>
        </div>
      </section>

      {/* ================= CONTACT ================= */}

      <footer className="footer" id="contact">
        <div>
          <h2>OCEON</h2>

          <p>Quality Products • Trusted Service • Fast Delivery</p>
        </div>

        <div>
          <h4>Contact</h4>

          <p>📞 +91 9205968389</p>

          <p>💬 WhatsApp Available</p>

          <p>🌐 www.oceon.in</p>
        </div>

        <div>
          <h4>Quick Action</h4>

          <a href={whatsappLink} target="_blank" rel="noreferrer">
            Order Now →
          </a>
        </div>
      </footer>

      {/* Floating WhatsApp */}

      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        className="floating-whatsapp"
      >
        💬
      </a>
    </div>
  );
}
