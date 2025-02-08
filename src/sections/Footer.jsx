import { BsLinkedin, BsWhatsapp } from "react-icons/bs";
import { MdMarkEmailRead } from "react-icons/md";

const Footer = () => {
  return (
    <section className="footer-section">
      <div className="footer-content">
        <div className="footer-inner">
          <div className="footer-desc">
            <ul>
              <li onClick={() => window.open("https://wa.me/+966530544029")}>
                <BsWhatsapp size={22} />
              </li>

              <li
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/wael-alsharawneh-834b06203"
                  )
                }
              >
                <BsLinkedin size={22} />
              </li>
              <li
                onClick={() =>
                  window.open("mailto:waelsharawna2010@hotmail.com")
                }
              >
                <MdMarkEmailRead size={22} />
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
