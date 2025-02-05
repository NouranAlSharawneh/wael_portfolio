const Footer = () => {
  return (
    <section className="footer-section">
      <div className="footer-content">
        <div className="footer-inner">
          <div className="footer-desc">
            <ul>
              <li onClick={() => window.open("https://wa.me/+966530544029")}>
                WhatsApp
              </li>

              <li
                onClick={() =>
                  window.open(
                    "https://sa.linkedin.com/in/wael-sharawna-b57589ab"
                  )
                }
              >
                Linkedin
              </li>
              <li
                onClick={() =>
                  window.open("mailto:waelsharawna2002@hotmail.com")
                }
              >
                Email
              </li>
            </ul>
            <h3>Wael&apos;s Portfolio</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
