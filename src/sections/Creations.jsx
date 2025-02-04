import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import image from "../../public/assets/projectImgs/image6.JPG";
const Creations = () => {
  return (
    <section className="creations-section">
      <div className="creation-layout">
        <div className="creation-main-area_img">
          <img src={image} alt="" />
          <div className="creation-main-area_caption">
            <p>Interior Design Residential</p>
            <span>Khobar - 2024</span>
          </div>
          <hr />
        </div>
        <div className="creation-side-area_title">
          <h5>Projects</h5>
        </div>
        <div className="creation-side-area">
          <span>&#x2197;</span>
          <div className="creation-side-area_buttons">
            <div className="creation-side_btns">
              <p>All Projects</p>
              <span>
                <FaArrowUpRightFromSquare size={13} />
              </span>
            </div>
            <div className="creation-side_btns">
              <p>Interior Projects</p>
              <span>
                <FaArrowUpRightFromSquare size={13} />
              </span>
            </div>
            <div className="creation-side_btns">
              <p>Architecture Projects</p>
              <span>
                <FaArrowUpRightFromSquare size={13} />
              </span>
            </div>
          </div>
          <p>
            I strive to design thoughtful and sustainable spaces that can serve
            and inspire future generations, blending architecture and interior
            design to create environments that stand the test of time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Creations;
