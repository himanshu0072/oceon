import "../css/Home.css";

export default function Home() {
  const whatsapp =
    "https://wa.me/919205968389?text=Hi%20OCEON,%20I%20want%20to%20order%20groceries.";

  return (
    <div className="home">
      {/* Navbar */}

      <nav className="navbar">
        <div className="logoArea">
          <img src="/logo.png" alt="OCEON" className="logo" />
          <div>
            <span id="logoTitle">Premium Grocery Store</span>
          </div>
        </div>

        <div className="navLinks">
          <a href="#categories">Categories</a>

          <a href="#about">About</a>

          <a href="#faq">FAQ</a>

          <a href="#contact">Contact</a>

          <a
            href={whatsapp}
            className="whatsappBtn"
            target="_blank"
            rel="noreferrer"
          >
            Order Now
          </a>
        </div>
      </nav>

      {/* Hero */}

      <section className="hero">
        <div className="heroLeft">
          <div className="heroBadge">Serving Gurugram Only</div>

          <h1 className="heroTitle">
            Fresh Groceries
            <br />
            Delivered To
            <span> Your Doorstep.</span>
          </h1>

          <p>
            Premium quality rice, atta, pulses, spices, cooking oils, snacks and
            daily essentials with simple WhatsApp ordering.
          </p>

          <div className="heroButtons">
            <a
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
              className="primaryBtn"
            >
              Buy on WhatsApp
            </a>

            <a href="#categories" className="secondaryBtn">
              Explore Products
            </a>
          </div>

          <div className="trust">
            <div>✓ Quality Checked</div>

            <div>✓ Fast Delivery</div>

            <div>✓ Best Prices</div>
          </div>
        </div>

        <div className="heroRight">
          <div className="floatingCard">
            <img src="/hero-grocery.png" alt="Groceries" />
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}

      <section className="categories" id="categories">
        <div className="sectionHeader">
          <span>OUR PRODUCTS</span>

          <h2 id="categoriesTitle">Everything You Need For Your Kitchen</h2>

          <p>
            Premium quality grocery products sourced carefully to ensure
            freshness, taste and value.
          </p>
        </div>

        <div className="categoryGrid">
          {[
            {
              image: "/ourproducts/rice2.png",
              title: "Premium Rice",
              desc: "Finest quality Basmati and daily cooking rice sourced from trusted farms.",
            },
            {
              image: "/ourproducts/atta.png",
              title: "Fresh Atta",
              desc: "Stone-ground wheat flour for soft rotis and healthy meals.",
            },
            {
              image: "/ourproducts/pulses.png",
              title: "Pulses & Dal",
              desc: "Protein-rich dals and legumes with guaranteed freshness.",
            },
            {
              image: "/ourproducts/spices.png",
              title: "Indian Spices",
              desc: "Authentic masalas packed with rich aroma and flavor.",
            },
            {
              image: "/ourproducts/cookingoils.png",
              title: "Cooking Oils",
              desc: "Healthy refined and cold-pressed oils for everyday cooking.",
            },
            {
              image: "/ourproducts/dryfruites.png",
              title: "Dry Fruits",
              desc: "Premium almonds, cashews, raisins and nutritious snacks.",
            },
            {
              image: "/ourproducts/snacks.png",
              title: "Snacks",
              desc: "Delicious biscuits, namkeen and ready-to-eat products.",
            },
            {
              image: "/ourproducts/daily.png",
              title: "Daily Essentials",
              desc: "Sugar, salt, tea, coffee and all household grocery needs.",
            },
          ].map((item, index) => (
            <div className="categoryCard" key={index}>
              <img
                src={item.image}
                alt={item.title}
                className="categoryImage"
              />

              <div className="categoryContent">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>

                <a
                  href="https://wa.me/919205968389?text=Hi%20OCEON,%20I'm%20interested%20in%20your%20products."
                  target="_blank"
                  rel="noreferrer"
                  className="productEnquiry"
                >
                  Enquire Now →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* ================= FEATURED PRODUCTS ================= */}

      <section className="featuredSection">
        <div className="sectionHeader">
          <span>BEST SELLERS</span>

          <h2>Popular Grocery Products</h2>

          <p>
            Carefully selected products trusted by hundreds of families in
            Gurugram.
          </p>
        </div>

        <div className="featuredGrid">
          {[
            {
              image: "/products/rice.jpeg",
              title: "Premium Basmati Rice",
              desc: "Long grain, aromatic & perfect for every occasion.",
            },
            {
              image: "/products/atta.jpg",
              title: "Whole Wheat Atta",
              desc: "Freshly milled for soft and healthy rotis.",
            },
            {
              image: "/products/pulses.jpg",
              title: "Premium Pulses",
              desc: "Protein-rich dals with exceptional quality.",
            },
          ].map((item, index) => (
            <div className="productCard" key={index}>
              <img src={item.image} alt={item.title} />

              <div className="productBody">
                <h3>{item.title}</h3>

                <p>{item.desc}</p>

                <a
                  href="https://wa.me/919205968389?text=Hi%20OCEON,%20I'm%20interested%20in%20this%20product."
                  target="_blank"
                  rel="noreferrer"
                  className="productBtn"
                >
                  Order Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= WHY OCEON ================= */}
      <hr></hr>
      <section className="whySection" id="about">
        <div className="whyLeft">
          <img src="/about-grocery.png" alt="Fresh Grocery" />
        </div>

        <div className="whyRight">
          <span className="miniTitle">WHY CHOOSE US</span>

          <h2>Trusted Grocery Partner For Families In Gurugram</h2>

          <p>
            OCEON focuses on quality, freshness and customer satisfaction. Every
            product is carefully selected to provide the best shopping
            experience.
          </p>

          <div className="featureGrid">
            <div>✅ Premium Quality Products</div>

            <div>🚚 Fast Local Delivery</div>

            <div>💰 Affordable Pricing</div>

            <div>📦 Fresh Stock Everyday</div>

            <div>📱 Easy WhatsApp Ordering</div>

            <div>❤️ Trusted Customer Support</div>
          </div>
        </div>
      </section>
      <hr></hr>

      {/* ================= STATS ================= */}

      <section className="statsSection">
        <div className="statCard">
          <h2>500+</h2>

          <span>Happy Customers</span>
        </div>

        <div className="statCard">
          <h2>50+</h2>

          <span>Premium Products</span>
        </div>

        <div className="statCard">
          <h2>100%</h2>

          <span>Quality Checked</span>
        </div>

        <div className="statCard">
          <h2>24×7</h2>

          <span>WhatsApp Support</span>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}

      <section className="testimonialSection">
        <div className="sectionHeader">
          <span>TESTIMONIALS</span>

          <h2 className="testimonialTitle">What Our Customers Say</h2>
        </div>

        <div className="testimonialGrid">
          <div className="testimonialCard">
            <div className="stars">★★★★★</div>

            <p>
              "Amazing quality products and very smooth ordering experience.
              Delivery was quick too."
            </p>

            <h4>Rahul Sharma</h4>

            <span>Gurugram</span>
          </div>

          <div className="testimonialCard">
            <div className="stars">★★★★★</div>

            <p>
              "Fresh groceries at affordable prices. OCEON has become our
              preferred grocery partner."
            </p>

            <h4>Neha Gupta</h4>

            <span>Gurugram</span>
          </div>

          <div className="testimonialCard">
            <div className="stars">★★★★★</div>

            <p>
              "Loved the WhatsApp ordering process. Super convenient and
              professional service."
            </p>

            <h4>Amit Verma</h4>

            <span>Gurugram</span>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}

      <section className="faqSection" id="faq">
        <div className="sectionHeader">
          <span>FAQ</span>

          <h2 id="faqTitle">Frequently Asked Questions</h2>
        </div>

        <div className="faqList">
          <div className="faqItem">
            <h3>Do you deliver across Gurugram?</h3>

            <p>Yes, OCEON currently serves customers throughout Gurugram.</p>
          </div>

          <div className="faqItem">
            <h3>How can I place an order?</h3>

            <p>
              Simply click on the WhatsApp button and send us your requirements.
            </p>
          </div>

          <div className="faqItem">
            <h3>Do you provide quality assurance?</h3>

            <p>
              Every product is quality checked before reaching our customers.
            </p>
          </div>

          <div className="faqItem">
            <h3>Can businesses also order from OCEON?</h3>

            <p>Yes, we can cater to bulk and business orders as well.</p>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <div className="divider">
        <section className="ctaBanner">
          <div>
            <span>READY TO SHOP?</span>

            <h2>Get Premium Grocery Products Delivered To Your Doorstep</h2>

            <p>
              Fresh products, affordable pricing and quick WhatsApp ordering.
            </p>
          </div>

          <a
            href="https://wa.me/919205968389?text=Hi%20OCEON,%20I%20want%20to%20place%20an%20order."
            target="_blank"
            rel="noreferrer"
            className="ctaButton"
          >
            Order on WhatsApp →
          </a>
        </section>
      </div>

      {/* ================= FOOTER ================= */}

      <footer className="footer" id="contact">
        <div className="footerTop">
          <div>
            <img src="/logo.png" alt="OCEON" className="footerLogo" />

            <p>
              Premium Grocery Store serving customers across Gurugram with
              quality products and reliable service.
            </p>
          </div>

          <div>
            <h3>Quick Links</h3>

            <a href="#">Home</a>

            <a href="#categories">Categories</a>

            <a href="#about">About</a>

            <a href="#faq">FAQ</a>
          </div>

          <div>
            <h3>Contact</h3>

            <p>📞 +91 9205968389</p>

            <p>📍 Gurugram, Haryana</p>

            <p>🌐 www.oceon.in</p>
          </div>
        </div>

        <div className="footerBottom">
          © {new Date().getFullYear()} OCEON. All Rights Reserved.
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919205968389?text=Hi%20OCEON,%20I'm%20interested%20in%20your%20grocery%20products."
        className="floatingWhatsapp"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <img
          src="/images/wa.png"
          alt="WhatsApp"
          style={{ width: "34px", height: "34px" }}
        />
      </a>
    </div>
  );
}
