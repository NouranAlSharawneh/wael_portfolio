import { useState } from "react";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <header>
      <div className="nav_menu">
        <div className="nav_logo">
          <p>Wael Al-Sharawneh</p>
        </div>
        <div className="nav_items">
          <nav>
            <ul>
              <li>About</li>
              <li>Projects</li>
              <li>Experience</li>
            </ul>
          </nav>
        </div>
        <div className="nav_links">
          <a
            href="../../public/assets/pdf/Wael_Al-sharawneh_CV_Architect.pdf"
            download="Wael_Al-sharawneh_CV_Architect.pdf"
          >
            Resume
          </a>
          <a href="#">Contact</a>
        </div>
        <button onClick={handleMenu}>{menu ? "Close" : "Menu"}</button>
      </div>
      {menu && (
        <div className="mobile_menu">
          <nav>
            <ul>
              <li>About</li>
              <li>Projects</li>
              <li>Experience</li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
