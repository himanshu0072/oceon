import React from "react";
import "../css/Home.css";

export default function Home() {
  const whatsappLink =
    "https://wa.me/919205968389?text=Hi%20OCEON,%20I%20want%20to%20order%20grocery%20products.";

  return (
    <div className="home">
      {/* Navbar */}

      <header className="navbar">
        <div className="logo">
          <span className="logo-circle">O</span>
          <span>OCEON</span>
        </div>

        <nav>
          <a href="#categories">Categories</a>
          <a href="#why">Why Us</a>
          <a href="#delivery">Delivery</a>
          <a href="#contact">Contact</a>
        </nav>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="nav-btn"
        >
          Order Now
        </a>
      </header>

      {/* Hero */}

      <section className="hero">
        <div className="hero-left">
          <span className="location-badge">
            📍 Currently Serving Gurugram Only ( 10 - 30 Minutes )
          </span>

          <h1>
            Fresh Grocery Products
            <br />
            Delivered With
            <span> Quality & Trust</span>
          </h1>

          <p>
            OCEON brings premium grocery essentials including rice, atta,
            pulses, spices, oils, snacks and daily household products directly
            to your doorstep in Gurugram.
          </p>

          <div className="hero-buttons">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="primary-btn"
            >
              Order on WhatsApp
            </a>

            <a href="tel:+919205968389" className="secondary-btn">
              Call Now
            </a>
          </div>

          <div className="hero-stats">
            <div>
              <h2>1000+</h2>
              <span>Happy Customers</span>
            </div>

            <div>
              <h2>50+</h2>
              <span>Products</span>
            </div>

            <div>
              <h2>Same Day</h2>
              <span>Delivery with in 10 - 30 Minutes</span>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e"
            alt="Fresh Grocery"
          />
        </div>
      </section>

      {/* Categories */}

      <section id="categories" className="categories">
        <h2>Our Categories</h2>

        <p>Everything you need for your kitchen in one place.</p>

        <div className="category-grid">
          <div className="category-card">
            🍚
            <h3>Rice</h3>
          </div>

          <div className="category-card">
            🌾
            <h3>Atta</h3>
          </div>

          <div className="category-card">
            🥜
            <h3>Pulses</h3>
          </div>

          <div className="category-card">
            🌶️
            <h3>Spices</h3>
          </div>

          <div className="category-card">
            🧴
            <h3>Cooking Oils</h3>
          </div>

          <div className="category-card">
            🍪
            <h3>Snacks</h3>
          </div>

          <div className="category-card">
            ☕<h3>Tea & Coffee</h3>
          </div>

          <div className="category-card">
            🛒
            <h3>Daily Essentials</h3>
          </div>
        </div>
      </section>

      {/* Why Choose OCEON */}

      <section id="why" className="why-section">
        <div className="section-header">
          <span>WHY CHOOSE US</span>
          <h2>Experience Premium Grocery Shopping</h2>
          <p>
            We don't just deliver groceries. We deliver freshness, quality and
            trust to every doorstep in Gurugram.
          </p>
        </div>

        <div className="why-grid">
          <div className="why-card">
            <div className="why-icon">🌿</div>
            <h3>Fresh Products</h3>
            <p>
              Every product is carefully selected to maintain premium quality.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon">🚚</div>
            <h3>Fast Delivery</h3>
            <p>Same-day delivery available across Gurugram.</p>
          </div>

          <div className="why-card">
            <div className="why-icon">💰</div>
            <h3>Best Pricing</h3>
            <p>Competitive pricing without compromising on quality.</p>
          </div>

          <div className="why-card">
            <div className="why-icon">🤝</div>
            <h3>Trusted Service</h3>
            <p>Hundreds of satisfied customers trust OCEON every day.</p>
          </div>
        </div>
      </section>

      {/* Delivery Banner */}

      <section id="delivery" className="delivery-banner">
        <div className="delivery-content">
          <div>
            <span className="delivery-tag">📍 Gurugram Exclusive</span>

            <h2>Currently Delivering Only in Gurugram</h2>

            <p>
              To ensure quick deliveries and exceptional service, OCEON
              currently serves customers across Gurugram. Expansion to nearby
              cities is coming soon.
            </p>
          </div>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="delivery-btn"
          >
            Check Availability
          </a>
        </div>
      </section>

      {/* Featured Products */}

      <section className="featured-products">
        <div className="section-header">
          <span>POPULAR PRODUCTS</span>
          <h2>Kitchen Essentials You'll Love</h2>
        </div>

        <div className="product-grid">
          <div className="product-card">
            <img
              src="https://images.unsplash.com/photo-1586201375761-83865001e31c"
              alt="Rice"
            />
            <h3>Premium Rice</h3>
            <p>Finest quality grains for everyday cooking.</p>
          </div>

          <div className="product-card">
            <img
              src="https://images.unsplash.com/photo-1603048297172-c92544798d5a"
              alt="Spices"
            />
            <h3>Fresh Meats</h3>
            <p>High-quality meats for delicious meals.</p>
          </div>

          <div className="product-card">
            <img
              src="https://images.unsplash.com/photo-1573246123716-6b1782bfc499"
              alt="Flour"
            />
            <h3>Fresh fruits</h3>
            <p>Organic and seasonal fruits for a healthy lifestyle.</p>
          </div>
        </div>
      </section>

      {/* Statistics */}

      <section className="stats-section">
        <div className="stat-box">
          <h2>1000+</h2>
          <span>Happy Families</span>
        </div>

        <div className="stat-box">
          <h2>50+</h2>
          <span>Premium Products</span>
        </div>

        <div className="stat-box">
          <h2>100%</h2>
          <span>Quality Checked</span>
        </div>

        <div className="stat-box">
          <h2>24×7</h2>
          <span>WhatsApp Support</span>
        </div>
      </section>

      {/* Customer Reviews */}

      <section className="testimonial-section">
        <div className="section-header">
          <span>TESTIMONIALS</span>
          <h2>What Customers Say</h2>
        </div>

        <div className="testimonial-grid">
          <div className="testimonial-card">
            ⭐⭐⭐⭐⭐
            <p>
              "Fresh products, quick delivery and excellent customer service."
            </p>
            <h4>Rahul Sharma</h4>
          </div>

          <div className="testimonial-card">
            ⭐⭐⭐⭐⭐
            <p>"Ordering through WhatsApp is so simple and convenient."</p>
            <h4>Priya Verma</h4>
          </div>

          <div className="testimonial-card">
            ⭐⭐⭐⭐⭐
            <p>"The quality of rice and spices is outstanding."</p>
            <h4>Aman Gupta</h4>
          </div>
        </div>
      </section>

      {/* Call To Action */}

      <section className="cta-section">
        <h2>Need Groceries Today?</h2>

        <p>
          Order directly on WhatsApp and get instant assistance from our team.
        </p>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="cta-btn"
        >
          🟢 Order on WhatsApp
        </a>
      </section>

      {/* Footer */}

      <footer id="contact" className="footer">
        <div className="footer-logo">
          <span className="logo-circle">O</span>
          <span>OCEON</span>
        </div>

        <p>Premium grocery products delivered with quality and trust.</p>

        <div className="footer-info">
          <span>📍 Gurugram, Haryana</span>
          <span>📞 +91 9205968389</span>
        </div>

        <p className="copyright">© 2025 OCEON. All Rights Reserved.</p>
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
