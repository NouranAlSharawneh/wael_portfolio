import { useRef, useEffect } from "react";
import gsap from "gsap";
import heroImage from "../../public/assets/hero.webp";

const Hero = () => {
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const heroSectionRef = useRef(null);

  const useGsap = () => {
    useEffect(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
          pin: true,
          pinSpacing: false,
          // markers: true,
        },
      });

      tl.to(titleRef.current, {
        fontSize: () => {
          if (window.innerWidth < 768) {
            return "1.5rem";
          }
          return "3rem";
        },
        x: () => {
          if (window.innerWidth < 768) {
            return -15;
          }
          return -25;
        },
        y: () => {
          if (window.innerWidth < 768) {
            return -5;
          }
          return 0;
        },

        paddingTop: () => {
          if (window.innerWidth < 768) {
            return "0rem";
          }
        },
        paddingLeft: "1.3rem",
        ease: "power1.out",
        backgroundColor: "var(--bunker-blue)",
      });

      tl.to(imageRef.current, {
        scaleX: () => {
          if (window.innerWidth < 768) {
            return 1.1;
          }
          return 1.01;
        },
        scaleY: 1,
        ease: "power1.out",
      });

      tl.to(heroSectionRef.current, {
        paddingLeft: "0.8rem",
        paddingRight: "0.8rem",
        ease: "power1.out",
      });

      return () => {
        if (tl) {
          tl.kill();
        }
      };
    }, []);
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
