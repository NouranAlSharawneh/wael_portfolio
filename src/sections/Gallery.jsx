import Image1 from "../../public/assets/projectImgs/image1.JPG";
// import Image2 from "../../public/assets/projectImgs/image2.png";
import Image3 from "../../public/assets/projectImgs/image3.JPG";
// import Image4 from "../../public/assets/projectImgs/image4.png";
import Image5 from "../../public/assets/projectImgs/image5.JPG";
import Image6 from "../../public/assets/projectImgs/image6.JPG";
import Image7 from "../../public/assets/projectImgs/image7.JPG";
import Image8 from "../../public/assets/projectImgs/image8.JPG";
import Image9 from "../../public/assets/projectImgs/image9.JPG";
import Image10 from "../../public/assets/projectImgs/image10.JPG";
import Image11 from "../../public/assets/projectImgs/image11.JPG";
import Image12 from "../../public/assets/projectImgs/image12.JPG";
import Image13 from "../../public/assets/projectImgs/image13.JPG";
import Image14 from "../../public/assets/projectImgs/image14.JPG";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

const Gallery = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const images = [
    {
      src: Image1,
      scale: scale4,
    },
    {
      src: Image14,
      scale: scale5,
    },
    {
      src: Image3,
      scale: scale6,
    },
    {
      src: Image11,
      scale: scale5,
    },
    {
      src: Image5,
      scale: scale6,
    },
    {
      src: Image6,
      scale: scale8,
    },
    {
      src: Image7,
      scale: scale9,
    },
  ];

  return (
    <section ref={container} className="gallery-section">
      <div className="gallery_sticky">
        {images.map(({ src, scale }, index) => {
          return (
            <motion.div
              key={index}
              style={{ scale }}
              className="gallery_element"
            >
              <div className="gallery_imgContainer">
                <img src={src} alt="image" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Gallery;
