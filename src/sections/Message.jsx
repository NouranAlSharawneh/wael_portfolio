import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type"; // Utility for splitting text into words/letters

gsap.registerPlugin(ScrollTrigger);

const Message = () => {
  const textRef = useRef(null); // Reference for the text
  const imgRef = useRef(null); // Reference for the image

  useEffect(() => {
    const textElement = textRef.current;
    const imgElement = imgRef.current;

    // Split the text into words
    const splitText = new SplitType(textElement, { types: "words" });

    // Animate each word
    gsap.fromTo(
      splitText.words,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1, // Delay between each word's animation
        ease: "power2.out",
        scrollTrigger: {
          trigger: textElement,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      }
    );

    // Animate the image
    gsap.fromTo(
      imgElement,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        scrollTrigger: {
          trigger: imgElement,
          start: "top 85%",
          end: "bottom 25%",
          scrub: 1,
        },
      }
    );

    // Cleanup SplitType on unmount
    return () => {
      splitText.revert();
    };
  }, []);

  return (
    <section className="message-section">
      <h4 ref={textRef}>
        Their attention to details and ability to merge{" "}
        <div className="message-img" ref={imgRef}></div> aesthetics with
        functionality exceeded our expectations.
      </h4>
    </section>
  );
};

export default Message;
