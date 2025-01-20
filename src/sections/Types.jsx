import Divider from "../components/Divider";
import image from "../../public/assets/dancing.jpg";
import image1 from "../../public/assets/image.webp";

const Types = () => {
  return (
    <section className="types-section">
      <div className="type-layout">
        <img src={image} alt="" className="img" />

        <div>
          <img src={image1} alt="" />
          <Divider />
          <div>
            <p>Projects</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Types;
