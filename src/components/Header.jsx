import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { RiMenu3Fill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [menu, setMenu] = useState(false);

  const location = useLocation();
  const isVideosPage = location.pathname.includes("/videos");

  const handleMenu = () => {
    setMenu(!menu);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenu(false);
  };

  return (
    <header>
      <div className="nav_menu">
        <Link to="/" onClick={() => scrollToSection("hero")}>
          <div className="nav_logo navItem">
            <p>Wael Al-Sharawneh</p>
          </div>
        </Link>
        <div className="nav_items navItem">
          {!isVideosPage && (
            <nav>
              <ul>
                <li onClick={() => scrollToSection("about")}>About</li>
                <li onClick={() => scrollToSection("projects")}>Projects</li>
                <li onClick={() => scrollToSection("contact")}>Contact</li>
              </ul>
            </nav>
          )}
        </div>
        <div className="nav_links navItem">
          <a
            href="../../public/assets/pdf/Wael_Al-sharawneh_CV_Architect.pdf"
            download="Wael_Al-sharawneh_CV_Architect.pdf"
            target="_blank"
            title="download resume"
          >
            Resume
          </a>
        </div>

        {!isVideosPage && (
          <div
            className="menu btn"
            onClick={handleMenu}
            style={{ width: "6rem" }}
          >
            {menu ? <IoCloseSharp size={50} /> : <RiMenu3Fill size={50} />}
          </div>
        )}
      </div>
      {menu && (
        <div className="mobile_menu">
          <nav>
            <ul>
              <li onClick={() => scrollToSection("about")}>About</li>
              <li onClick={() => scrollToSection("projects")}>Projects</li>
              <li onClick={() => scrollToSection("contact")}>Contact</li>
              <li>
                <a
                  href="../../public/assets/pdf/Wael_Al-sharawneh_CV_Architect.pdf"
                  download="Wael_Al-sharawneh_CV_Architect.pdf"
                  target="_blank"
                  title="download resume"
                >
                  Resume
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
