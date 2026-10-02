import { useState } from "react";
import "../css/Home.css";

export default function Home() {
  const [legalPage, setLegalPage] = useState(null);

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

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#f7f9fc",
      color: "#172033",
      fontFamily:
        'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      lineHeight: 1.7,
    },

    header: {
      background: "#fff",
      borderBottom: "1px solid #e7ebf2",
      padding: "18px 24px",
    },

    headerInner: {
      maxWidth: 1040,
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
    },

    brand: {
      color: "#1769e0",
      fontSize: 21,
      fontWeight: 750,
      textDecoration: "none",
    },

    homeLink: {
      color: "#43516a",
      fontSize: 14,
      fontWeight: 600,
      textDecoration: "none",
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 0,
    },

    content: {
      maxWidth: 840,
      margin: "0 auto",
      padding: "56px 24px 72px",
    },

    eyebrow: {
      color: "#1769e0",
      fontSize: 12,
      fontWeight: 750,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
    },

    title: {
      margin: "8px 0 10px",
      fontSize: "clamp(32px, 5vw, 46px)",
      lineHeight: 1.15,
      letterSpacing: "-0.04em",
    },

    intro: {
      color: "#59667a",
      fontSize: 16,
      maxWidth: 680,
      margin: 0,
    },

    nav: {
      display: "flex",
      flexWrap: "wrap",
      gap: 10,
      margin: "28px 0 36px",
    },

    navLink: {
      display: "inline-block",
      padding: "9px 15px",
      borderRadius: 999,
      background: "#eaf1ff",
      color: "#1459bd",
      fontSize: 14,
      fontWeight: 650,
      textDecoration: "none",
      border: "none",
      cursor: "pointer",
    },

    section: {
      background: "#fff",
      border: "1px solid #e7ebf2",
      borderRadius: 16,
      padding: "28px clamp(20px, 5vw, 38px)",
      marginBottom: 22,
      boxShadow: "0 6px 22px rgba(23, 32, 51, 0.035)",
    },

    sectionTitle: {
      margin: "0 0 6px",
      fontSize: 25,
      letterSpacing: "-0.025em",
    },

    updated: {
      margin: "0 0 22px",
      color: "#7b8798",
      fontSize: 13,
    },

    heading: {
      margin: "24px 0 7px",
      fontSize: 17,
    },

    paragraph: {
      margin: "0 0 12px",
      color: "#4d5a6d",
      fontSize: 15,
    },

    list: {
      margin: "0 0 14px",
      paddingLeft: 22,
      color: "#4d5a6d",
      fontSize: 15,
    },
  };

  function Section({ id, title, children }) {
    return (
      <section id={id} style={styles.section}>
        <h2 style={styles.sectionTitle}>{title}</h2>
        <p style={styles.updated}>Last updated: June 2025</p>
        {children}
      </section>
    );
  }

  function Subheading({ children }) {
    return <h3 style={styles.heading}>{children}</h3>;
  }

  function Copy({ children }) {
    return <p style={styles.paragraph}>{children}</p>;
  }

  /*
   * ============================================================
   * TERMS / PRIVACY PAGE
   * ============================================================
   *
   * This is only rendered when legalPage is "terms" or "privacy".
   * On the normal homepage it does not exist in the DOM.
   */

  if (legalPage) {
    return (
      <div style={styles.page}>
        {/* LEGAL CONTENT */}
        <main style={styles.content}>
          <span style={styles.eyebrow}>The important details</span>

          <h1 style={styles.title}>
            {legalPage === "terms" ? "Terms of Service" : "Privacy Policy"}
          </h1>

          <p style={styles.intro}>
            {legalPage === "terms"
              ? "Please read these terms to understand the rules for using Oceon and our services."
              : "Please read our privacy notice to understand how information may be handled when you use Oceon."}
          </p>

          {/* PAGE SWITCH BUTTONS */}
          <nav aria-label="Terms and privacy sections" style={styles.nav}>
            <button
              type="button"
              style={{
                ...styles.navLink,
                background: legalPage === "terms" ? "#1769e0" : "#eaf1ff",
                color: legalPage === "terms" ? "#fff" : "#1459bd",
              }}
              onClick={() => {
                setLegalPage("terms");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Terms of Service
            </button>

            <button
              type="button"
              style={{
                ...styles.navLink,
                background: legalPage === "privacy" ? "#1769e0" : "#eaf1ff",
                color: legalPage === "privacy" ? "#fff" : "#1459bd",
              }}
              onClick={() => {
                setLegalPage("privacy");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Privacy Policy
            </button>
          </nav>

          {/* TERMS */}
          {legalPage === "terms" && (
            <Section id="terms" title="Terms of Service">
              <Copy>
                These terms apply to your access to and use of the Oceon
                website, application, and related services (the “Services”). By
                using the Services, you agree to these terms. If you do not
                agree, please do not use the Services.
              </Copy>

              <Subheading>Using Oceon</Subheading>

              <Copy>
                You must use the Services lawfully and in a way that does not
                interfere with other people’s use. You are responsible for the
                accuracy of information you submit and for keeping your account
                credentials secure. Please let us know if you suspect
                unauthorized access to your account.
              </Copy>

              <Copy>
                You may not misuse the Services, attempt to gain unauthorized
                access, introduce harmful code, or use the Services in a way
                that violates another person’s rights or applicable law.
              </Copy>

              <Subheading>Your content</Subheading>

              <Copy>
                You retain ownership of content you submit. You give Oceon
                permission to host, process, and display that content only as
                reasonably necessary to operate, maintain, and provide the
                Services. You are responsible for ensuring you have the rights
                needed to submit it.
              </Copy>

              <Subheading>Availability and changes</Subheading>

              <Copy>
                We may update, suspend, or discontinue parts of the Services to
                maintain or improve them. We will make reasonable efforts to
                provide notice of material changes when appropriate. The
                Services are provided on an “as available” basis to the extent
                permitted by law.
              </Copy>

              <Subheading>Termination</Subheading>

              <Copy>
                You may stop using the Services at any time. We may restrict or
                end access if these terms are violated, if required by law, or
                when necessary to protect the Services or their users.
              </Copy>

              <Subheading>Liability and updates</Subheading>

              <Copy>
                Nothing in these terms limits rights or remedies that cannot be
                limited under applicable law. To the extent permitted by law,
                Oceon is not responsible for indirect or consequential loss
                arising from use of the Services. We may revise these terms from
                time to time; continued use after an updated version takes
                effect means you accept the revised terms.
              </Copy>

              <Subheading>Contact</Subheading>

              <Copy>
                Questions about these terms? Contact the Oceon team through the
                contact options provided in the app or on our website.
              </Copy>
            </Section>
          )}

          {/* PRIVACY */}
          {legalPage === "privacy" && (
            <Section id="privacy" title="Privacy Policy">
              <Copy>
                This notice describes the types of information Oceon may handle
                when you use the Services, why it may be used, and the choices
                available to you. The information actually collected depends on
                the features you use.
              </Copy>

              <Subheading>Information we may handle</Subheading>

              <ul style={styles.list}>
                <li>
                  <strong>Information you provide:</strong> account details,
                  contact information, and content or messages you submit.
                </li>

                <li>
                  <strong>Service and device information:</strong> log data,
                  browser or device details, and interactions needed to operate
                  and secure the Services.
                </li>

                <li>
                  <strong>Support communications:</strong> information you
                  choose to provide when requesting help or contacting us.
                </li>
              </ul>

              <Subheading>How information may be used</Subheading>

              <Copy>
                We may use information to provide and maintain the Services,
                respond to requests, protect against abuse and security issues,
                troubleshoot problems, and meet legal obligations. Where
                required, we will ask for your consent before using information
                for other purposes.
              </Copy>

              <Subheading>Sharing and retention</Subheading>

              <Copy>
                We do not sell personal information. Information may be shared
                with service providers that help operate the Services, where
                required by law, or to protect the rights, safety, and security
                of Oceon and its users. Service providers are expected to handle
                information appropriately.
              </Copy>

              <Copy>
                We keep information only as long as reasonably needed for the
                purposes described above, unless a longer period is required or
                permitted by law. Retention periods can vary depending on the
                information and feature involved.
              </Copy>

              <Subheading>Security and your choices</Subheading>

              <Copy>
                We use reasonable safeguards designed to protect information,
                but no method of transmission or storage is completely secure.
                Depending on where you live, you may have rights to access,
                correct, delete, or restrict certain uses of your personal
                information. Contact us to make a request; we may need to verify
                your identity and legal exceptions may apply.
              </Copy>

              <Subheading>Children’s privacy</Subheading>

              <Copy>
                The Services are not intended for children who are not permitted
                to use them under applicable law. We do not knowingly collect
                personal information from children in violation of applicable
                requirements. If you believe a child has provided us
                information, contact us so we can review it.
              </Copy>

              <Subheading>Changes and contact</Subheading>

              <Copy>
                We may update this notice as the Services or applicable
                requirements change. The latest version will be posted here with
                its updated date. For privacy questions or requests, contact the
                Oceon team through the contact options provided in the app or on
                our website.
              </Copy>
            </Section>
          )}

          {/* BACK TO HOME */}
          <div
            style={{
              textAlign: "center",
              marginTop: 20,
            }}
          >
            <button
              type="button"
              onClick={() => {
                setLegalPage(null);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={{
                border: "none",
                background: "#1769e0",
                color: "#fff",
                padding: "11px 20px",
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 650,
                cursor: "pointer",
              }}
            >
              ← Back to Home
            </button>
          </div>
        </main>
      </div>
    );
  }

  /*
   * ============================================================
   * NORMAL HOME PAGE
   * ============================================================
   */

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
            Order now
          </a>
        </div>

        <a
          href={whatsapp}
          className="navCtaMobile"
          target="_blank"
          rel="noreferrer"
        >
          Order
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
                Order on WhatsApp
              </a>

              <a href="#categories" className="btnGhost">
                Browse products
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
                  Enquire
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
            Order on WhatsApp
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

          <span>
            {" "}
            Developed and managed by{" "}
            <a
              href="https://himanshukaportfolio.vercel.app/"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#7eb3ff" }}
            >
              Himanshu Development Group pvt. ltd.
            </a>
          </span>

          <div className="footerLinks">
            {/* PRIVACY BUTTON */}
            <a
              href="#privacy"
              onClick={(e) => {
                e.preventDefault();

                setLegalPage("privacy");

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              Privacy
            </a>

            {/* TERMS BUTTON */}
            <a
              href="#terms"
              onClick={(e) => {
                e.preventDefault();

                setLegalPage("terms");

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              Terms
            </a>
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
