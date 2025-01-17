import Header from "../components/Header";

const Hero = () => {
  return (
    <section className="hero-section">
      <Header />
      <div className="content">
        <h1>
          Urban <span>Space </span>
        </h1>
        <div className="img">
          <img src="../../public/assets/hero.webp" alt="" />
          <div className="hero-text">
            <p>
              <span>-Since 2010</span>
              Architecture, Bold Designs, Planning
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
