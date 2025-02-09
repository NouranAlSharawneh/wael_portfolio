import Image1 from "/assets/projectImgs/image1.JPG";
import Image3 from "/assets/projectImgs/image3.JPG";
import Image5 from "/assets/projectImgs/image5.JPG";
import Image6 from "/assets/projectImgs/image6.JPG";
import Image7 from "/assets/projectImgs/image7.JPG";
import Image11 from "/assets/projectImgs/image11.JPG";
import Image15 from "/assets/projectImgs/image15.png";
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
      src: Image7,
      scale: scale4,
    },
    {
      src: Image15,
      scale: scale5,
    },
    {
      src: Image3,
      scale: scale6,
    },
    {
      src: Image1,
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
      src: Image11,
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
