import houseImage from "../../public/assets/house.jpg";

const About = () => {
  return (
    <section className="about-section">
      <div className="main-layout">
        <div className="main-text">
          <span>About</span>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
            similique rerum error vitae dolores dolor dicta commodi, nihil
            voluptates omnis. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Obcaecati consequatur corporis quasi, odit saepe, libero.
          </p>
        </div>
        <div className="main-title">
          <h2>Spaces</h2>
        </div>
        <div className="main-side_content">
          <span>&#x2197;</span>
          <div className="main-side_img">
            <img src={houseImage} alt="" />
            <div className="main-img_desc">
              <p>Year Completed: 2021</p>
              <p>Location: Khobar, Saudi Arbia</p>
              <p>Type: Architecture Studio</p>
            </div>
          </div>
        </div>
        <div className="main-img">
          {/* <img src="../../public/assets/buliding.jpg" alt="" /> */}
        </div>
      </div>
    </section>
  );
};

export default About;
