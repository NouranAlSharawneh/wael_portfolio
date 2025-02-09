import { useEffect, useState } from "react";
import { IoArrowDownCircle } from "react-icons/io5";

const ScrollToTop = () => {
  const [rotation, setRotation] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxRotation = 180;
      const scrollThreshold = 1000;

      const newRotation = Math.min(
        (scrollTop / scrollThreshold) * maxRotation,
        maxRotation
      );
      setRotation(newRotation);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 4500);

    return () => clearTimeout(timeoutId);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "10px",
        opacity: isVisible ? 1 : 0,
        cursor: "pointer",
        zIndex: 1000,
        transition: "opacity 0.3s ease",
      }}
    >
      <span onClick={scrollToTop}>
        <IoArrowDownCircle
          size={40}
          fill="#e4e4e4"
          className={rotation === 0 ? "bounce" : ""}
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: "transform 0.3s ease",
          }}
        />
      </span>
    </div>
  );
};

export default ScrollToTop;
