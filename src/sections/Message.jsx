import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const Message = () => {
  const textRef = useRef(null);
  useEffect(() => {
    const textElement = textRef.current;

    const splitText = new SplitType(textElement, { types: "words" });

    gsap.fromTo(
      splitText.words,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textElement,
          start: "top 80%",
          end: "bottom 10%",
          scrub: 1,
        },
      }
    );

    return () => {
      splitText.revert();
    };
  }, []);

  return (
    <section className="message-section" ref={textRef}>
      <div className="relative-message">
        <h4>
          I strive to design thoughtful and sustainable spaces that can serve
          and inspire future generations, blending architecture and interior
          design to create environments that stand the test of time.
        </h4>
      </div>
    </section>
  );
};

export default Message;
