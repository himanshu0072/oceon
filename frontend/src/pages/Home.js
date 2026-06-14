import "../css/Home.css";

export default function Home() {
  const whatsapp =
    "https://wa.me/919205968389?text=Hi%20OCEON,%20I%20want%20to%20order%20groceries.";

  const products = [
    {
      emoji: "🌾",
      title: "Premium Rice",
      desc: "Finest Basmati from trusted farms.",
      image: "/ourproducts/rice2.png",
    },
    {
      emoji: "🫓",
      title: "Fresh Atta",
      desc: "Stone-ground for soft, healthy rotis.",
      image: "/ourproducts/atta.png",
    },
    {
      emoji: "🫘",
      title: "Pulses & Dal",
      desc: "Protein-rich, guaranteed fresh.",
      image: "/ourproducts/pulses.png",
    },
    {
      emoji: "🌶️",
      title: "Indian Spices",
      desc: "Authentic masalas, rich in aroma.",
      image: "/ourproducts/spices.png",
    },
    {
      emoji: "🫙",
      title: "Cooking Oils",
      desc: "Refined and cold-pressed options.",
      image: "/ourproducts/cookingoils.png",
    },
    {
      emoji: "🥜",
      title: "Dry Fruits",
      desc: "Almonds, cashews, raisins & more.",
      image: "/ourproducts/dryfruites.png",
    },
    {
      emoji: "🍪",
      title: "Snacks",
      desc: "Biscuits, namkeen & ready-to-eat.",
      image: "/ourproducts/snacks.png",
    },
    {
      emoji: "🧂",
      title: "Daily Essentials",
      desc: "Sugar, salt, tea and every staple.",
      image: "/ourproducts/daily.png",
    },
  ];

  return (
    <div className="home">
      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="logoArea">
          <div className="logoBox">
            <img src="/logo.png" alt="OCEON" />
          </div>
          <div className="logoText">
            <span className="logoSub">Premium Grocery Store</span>
          </div>
        </div>
        <div className="navLinks">
          <a href="#categories">Products</a>
          <a href="#about">About</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
          <a
            href={whatsapp}
            className="navCta"
            target="_blank"
            rel="noreferrer"
          >
            Order now ↗
          </a>
        </div>
        <a
          href={whatsapp}
          className="navCtaMobile"
          target="_blank"
          rel="noreferrer"
        >
          Order ↗
        </a>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="heroGlow" />
        <div className="heroInner">
          <div className="heroLeft">
            <div className="heroPill">
              <span className="heroPillDot" />
              Serving Gurugram
            </div>
            <h1 className="heroTitle">
              Fresh groceries,
              <br />
              <em>delivered fast.</em>
            </h1>
            <p className="heroDesc">
              Premium rice, atta, pulses, spices and daily essentials — ordered
              in seconds on WhatsApp.
            </p>
            <div className="heroActions">
              <a
                href={whatsapp}
                className="btnPrimary"
                target="_blank"
                rel="noreferrer"
              >
                Order on WhatsApp ↗
              </a>
              <a href="#categories" className="btnGhost">
                Browse products →
              </a>
            </div>
            <div className="heroTrust">
              <span>
                <span className="trustCheck">✓</span> Quality checked
              </span>
              <span>
                <span className="trustCheck">✓</span> Fast delivery
              </span>
              <span>
                <span className="trustCheck">✓</span> Best prices
              </span>
            </div>
          </div>
          <div className="heroRight">
            <div className="heroImageWrap">
              <img src="/hero-grocery.png" alt="Fresh groceries" />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <div className="statsBand">
        {[
          { num: "500+", label: "Happy customers" },
          { num: "50+", label: "Premium products" },
          { num: "100%", label: "Quality checked" },
          { num: "24×7", label: "WhatsApp support" },
        ].map((s, i) => (
          <div className="statItem" key={i}>
            <span className="statNum">{s.num}</span>
            <span className="statLabel">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── PRODUCTS ── */}
      <section className="productsSection" id="categories">
        <div className="sectionHead">
          <span className="eyebrow">Our products</span>
          <h2>Everything your kitchen needs</h2>
          <p>Carefully sourced for freshness, taste and value.</p>
        </div>
        <div className="productGrid">
          {products.map((item, i) => (
            <div className="productCard" key={i}>
              <div className="productCardImg">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="productCardBody">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <a
                  href="https://wa.me/919205968389?text=Hi%20OCEON,%20I'm%20interested%20in%20your%20products."
                  target="_blank"
                  rel="noreferrer"
                  className="productEnquiry"
                >
                  Enquire →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="whySection" id="about">
        <div className="whyLeft">
          <span className="eyebrow">Why choose us</span>
          <h2>
            Trusted by families
            <br />
            across Gurugram
          </h2>
          <p>
            OCEON focuses on quality, freshness and customer satisfaction. Every
            product is carefully selected to give you the best grocery
            experience possible.
          </p>
          <div className="whyFeatures">
            {[
              ["✅", "Premium quality products"],
              ["🚚", "Fast local delivery"],
              ["💰", "Affordable pricing"],
              ["📦", "Fresh stock every day"],
              ["📱", "Easy WhatsApp ordering"],
              ["❤️", "Trusted customer support"],
            ].map(([icon, text], i) => (
              <div className="whyFeature" key={i}>
                <span className="whyIcon">{icon}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="whyRight">
          <img src="/about-grocery.png" alt="Fresh grocery" />
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonialsSection">
        <div className="sectionHead">
          <span className="eyebrow">Testimonials</span>
          <h2>What our customers say</h2>
        </div>
        <div className="testimonialsGrid">
          {[
            {
              quote:
                "Amazing quality products and very smooth ordering experience. Delivery was quick too.",
              name: "Rahul Sharma",
              city: "Gurugram",
            },
            {
              quote:
                "Fresh groceries at affordable prices. OCEON has become our preferred grocery partner.",
              name: "Neha Gupta",
              city: "Gurugram",
            },
            {
              quote:
                "Loved the WhatsApp ordering process. Super convenient and professional service.",
              name: "Amit Verma",
              city: "Gurugram",
            },
          ].map((t, i) => (
            <div className="testimonialCard" key={i}>
              <div className="stars">★★★★★</div>
              <p>"{t.quote}"</p>
              <div className="testimonialAuthor">
                <div className="authorAvatar">{t.name[0]}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.city}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="faqSection" id="faq">
        <div className="sectionHead">
          <span className="eyebrow">FAQ</span>
          <h2>Frequently asked questions</h2>
        </div>
        <div className="faqGrid">
          {[
            {
              q: "Do you deliver across Gurugram?",
              a: "Yes, OCEON currently serves customers throughout Gurugram.",
            },
            {
              q: "How can I place an order?",
              a: "Simply click the WhatsApp button and send us your requirements.",
            },
            {
              q: "Do you provide quality assurance?",
              a: "Every product is quality checked before reaching our customers.",
            },
            {
              q: "Can businesses order from OCEON?",
              a: "Yes, we can cater to bulk and business orders as well.",
            },
          ].map((item, i) => (
            <div className="faqCard" key={i}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="ctaSection">
        <div className="ctaCard">
          <div className="ctaGlow" />
          <div className="ctaText">
            <span className="eyebrow" style={{ color: "#7eb3ff" }}>
              Ready to shop?
            </span>
            <h2>
              Get premium groceries
              <br />
              delivered to your doorstep
            </h2>
            <p>
              Fresh products, affordable pricing, one WhatsApp message away.
            </p>
          </div>
          <a
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
            className="ctaBtn"
          >
            Order on WhatsApp →
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer" id="contact">
        <div className="footerTop">
          <div className="footerBrand">
            <div className="footerLogo">
              <img src="/logo.png" alt="OCEON" />
              <p>
                Premium Grocery Store serving Gurugram with quality products and
                reliable service.
              </p>
            </div>
          </div>
          <div className="footerCol">
            <h4>Quick links</h4>
            <a href="#">Home</a>
            <a href="#categories">Products</a>
            <a href="#about">About</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="footerCol">
            <h4>Contact</h4>
            <p>📞 +91 9205968389</p>
            <p>
              <a
                href="https://maps.app.goo.gl/YTKPyyLn3hJZ2UeQ7"
                target="_blank"
                rel="noreferrer"
              >
                📍 Gurugram, Haryana
              </a>
            </p>
            <p>🌐 www.oceon.in</p>
          </div>
        </div>
        <div className="footerBottom">
          <span>© {new Date().getFullYear()} OCEON. All rights reserved.</span>
          <div className="footerLinks">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </footer>

      {/* ── FLOATING WHATSAPP ── */}
      <a
        href="https://wa.me/919205968389?text=Hi%20OCEON,%20I'm%20interested%20in%20your%20grocery%20products."
        className="floatingWhatsapp"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <img src="/images/wa.png" alt="WhatsApp" />
      </a>
    </div>
  );
}
