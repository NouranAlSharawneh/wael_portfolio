import { useRef, useEffect } from "react";
import gsap from "gsap";
import heroImage from "../../public/assets/hero.webp";

const Hero = () => {
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const heroSectionRef = useRef(null);

  const useGsap = () => {
    useEffect(() => {
      // Initialize ScrollTrigger timeline without extra complexity
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
          pin: true,
          pinSpacing: false,
          // markers: true, // Uncomment for debugging if needed
        },
      });

      // Title animation (font size and position change only on smaller screens)
      tl.to(titleRef.current, {
        fontSize: () => {
          if (window.innerWidth < 768) {
            return "1.5rem"; // Smaller font for mobile
          }
          return "3rem"; // Larger font for desktop
        },
        x: () => {
          if (window.innerWidth < 768) {
            return -15; // Adjust vertical position for mobile
          }
          return -25; // No vertical change for desktop
        },
        y: () => {
          if (window.innerWidth < 768) {
            return -5; // Adjust vertical position for mobile
          }
          return 0; // No vertical change for desktop
        },
        paddingLeft: "1.3rem",
        ease: "power1.out",
        backgroundColor: "var(--bunker-blue)",
      });

      // Image scaling animation (only scale horizontally on mobile)
      tl.to(imageRef.current, {
        scaleX: () => {
          if (window.innerWidth < 768) {
            return 1.1; // Slightly scale the image on mobile
          }
          return 1.01; // No scaling on desktop
        },
        scaleY: 1, // Keep the vertical scale the same
        ease: "power1.out",
      });

      // Adjust padding of the hero section
      tl.to(heroSectionRef.current, {
        paddingLeft: "0.8rem",
        paddingRight: "0.8rem",
        ease: "power1.out",
      });

      // Cleanup the timeline when the component unmounts
      return () => {
        if (tl) {
          tl.kill();
        }
      };
    }, []); // Dependencies should remain empty to run only once
  };

  useGsap();

  return (
    <section ref={heroSectionRef} className="hero-section">
      <div className="content">
        <h1 ref={titleRef}>
          Urban <span>Space </span>
        </h1>
        <div className="img">
          <img ref={imageRef} src={heroImage} alt="Hero" />
          <div className="hero-text">
            <p>
              <span>-Since 2010</span>
              Architecture, Bold Designs, Planning
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
