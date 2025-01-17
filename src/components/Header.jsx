const Header = () => {
  return (
    <header>
      <div className="nav_menu">
        <div className="nav_logo">
          <p>
            Studio<span>&apos;77</span>
          </p>
        </div>
        <nav>
          <ul>
            <li>About</li>
            <li>Services</li>
            <li>Projects</li>
          </ul>
        </nav>
        <div className="nav_links">
          <a href="#">Resume</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
