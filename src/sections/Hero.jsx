import { useRef, useEffect } from "react";
import gsap from "gsap";
import heroVideo from "../../public/assets/vidoes/hero-t.mp4";
import Header from "../components/Header";

const Hero = () => {
  const titleRef = useRef(null);
  const videoRef = useRef(null);
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

      const isMobile = window.innerWidth < 768;

      tl.to(titleRef.current, {
        fontSize: isMobile ? "1.5rem" : "3rem",
        x: isMobile ? -15 : -25,
        y: isMobile ? -5 : 0,
        paddingTop: isMobile ? "3rem" : undefined,
        paddingLeft: isMobile ? "" : "1.3rem",
        startAt: {
          x: isMobile ? -15 : "",
        },
        ease: "power1.out",
        backgroundColor: "var(--bunker-blue)",
      });

      tl.to(videoRef.current, {
        scaleX: isMobile ? 1.1 : 1.01,
        scaleY: 1,
        ease: "power1.out",
      });

      tl.to(heroSectionRef.current, {
        paddingLeft: "0.3rem",
        paddingRight: "0.3rem",
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

  const year = new Date().getFullYear();

  return (
    <>
      <Header />
      <section ref={heroSectionRef} className="hero-section">
        <div className="content">
          <h1 ref={titleRef}>
            Port<span>folio </span>
          </h1>
          <div className="img">
            <video
              src={heroVideo}
              autoPlay
              ref={videoRef}
              type="video/quicktime"
              muted
              loop
              playsInline
              // loading="lazy"
            />
            <div className="hero-text">
              <p>
                Wael Al-Sharawneh -{year}
                <span>
                  This website showcases all my work, created exclusively by me.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
