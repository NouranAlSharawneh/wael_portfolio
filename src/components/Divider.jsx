import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Divider = () => {
  const dividerRef = useRef(null);

  useEffect(() => {
    // Create the GSAP animation with ScrollTrigger
    const animation = gsap.fromTo(
      dividerRef.current,
      { width: "0%" }, // Starting width
      {
        width: "100%", // Ending width
        duration: 1, // Duration of the animation
        ease: "power2.out", // Easing function
        scrollTrigger: {
          trigger: dividerRef.current, // Element that triggers the animation
          start: "top bottom", // Start the animation when the top of the element is at the bottom of the viewport
          end: "top center", // End point (optional, for finer control)
          toggleActions: "play reset play reset", // Controls the animation playback on scroll events
        },
      }
    );

    return () => {
      // Clean up the animation and scroll trigger
      animation.scrollTrigger.kill();
    };
  }, []);

  return (
    <div className="divider-wrapper">
      <div className="divider" ref={dividerRef}></div>
    </div>
  );
};

export default Divider;
