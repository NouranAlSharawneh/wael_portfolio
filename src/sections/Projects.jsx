import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import image from "/assets/projectImgs/image9.JPG";
import { Link } from "react-router-dom";
const Projects = () => {
  return (
    <section className="projects-section" id="projects">
      <div className="relative-project">
        <div className="project-layout">
          <div className="project-main-area_img">
            <div className="img">
              <img src={image} alt="" />
            </div>
            <div className="project-main-area_caption">
              <p>Interior Design Residential</p>
              <span>Khobar - 2024</span>
            </div>
            <hr />
          </div>
          <div className="project-side-area_title">
            <h5>Projects</h5>
          </div>
          <div className="project-side-area">
            <span>&#x2197;</span>
            <div className="project-side-area_buttons">
              <Link to="/videos">
                <div className="project-side_btns">
                  <p>
                    All Projects
                    <span>
                      <FaArrowUpRightFromSquare fill="#ffffff" size={13} />
                    </span>
                  </p>
                </div>
              </Link>

              <Link to="/videos?playlistId=PLeEExte-NV5l792UiD24XLgan-mra2r3D">
                <div className="project-side_btns">
                  <p>
                    Architecture Projects
                    <span>
                      <FaArrowUpRightFromSquare fill="#ffffff" size={13} />
                    </span>
                  </p>
                </div>
              </Link>
              <Link to="/videos?playlistId=PLeEExte-NV5kxOK2YHMrgkIJ6_L2Zw5Mc">
                <div className="project-side_btns">
                  <p>
                    Interior Projects{" "}
                    <span>
                      <FaArrowUpRightFromSquare fill="#ffffff" size={13} />
                    </span>
                  </p>
                </div>
              </Link>
            </div>
            <p>
              Over the past years, I have established myself as a trusted
              partner. My unwavering commitment to delivering exceptional value
              and quality positions me as a significant player in both
              residential and commercial urban development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
