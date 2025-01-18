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

      // Title animation
      tl.to(titleRef.current, {
        fontSize: () => {
          if (window.innerWidth < 768) {
            return "2rem";
          }
          return "3rem";
        },
        x: -25,
        y: () => {
          if (window.innerWidth < 768) {
            return -15;
          }
          return 0;
        },
        paddingLeft: "1.3rem",
        ease: "power1.out",
        backgroundColor: "var(--bunker-blue)",
      });

      // Image scaling animation
      tl.to(imageRef.current, {
        scaleX: 1.03,
        scaleY: 1,
        ease: "power1.out",
      });

      // Adjust padding of the hero section as you scroll
      tl.to(heroSectionRef.current, {
        paddingLeft: "1rem",
        paddingRight: "1rem",
        ease: "power1.out",
      });

      // Cleanup the timeline when the component unmounts
      return () => {
        if (tl) {
          tl.kill();
        }
      };
    }, []),
      [heroSectionRef, titleRef, imageRef];
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
