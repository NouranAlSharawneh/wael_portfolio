import { useLayoutEffect } from "react";
import gsap from "gsap";

const AnimationRevealLoader = () => {
  useLayoutEffect(() => {
    const tl = gsap.timeline();

    tl.set([".top-panel", ".bottom-panel"], { height: 0 });

    tl.to([".top-panel", ".bottom-panel"], {
      height: "50%",
      ease: "power3.inOut",
      duration: 2,
    });

    tl.to(
      ".loader_text",
      {
        opacity: 1,
        duration: 3,
        ease: "power3.inOut",
      },
      "-=0.5"
    );
    tl.to(
      ".loader_text",
      {
        opacity: 0,
        duration: 2,
        scale: 1.5,
        ease: "power3.inOut",
      },
      "-=0.5"
    );

    tl.to(
      ".loader_container",
      {
        backgroundColor: "var(--mist-grey)",
        ease: "power3.inOut",
      },
      "-=3.5"
    );

    tl.to(
      [".loader", ".loader_container"],
      {
        stagger: 0.4,
        duration: 4,
        clipPath: "polygon(0 0, 100% 0, 100% 0%, 0% 0%)",
        ease: "power3.inOut",
      },
      "-=0.5"
    );
  }, []);

  return (
    <div className="loader_container">
      <div className="loader">
        {/* Top growing panel */}
        <div className="top-panel" />
        {/* Bottom growing panel */}
        <div className="bottom-panel" />

        <h2 className="loader_text">Welcome</h2>
      </div>
    </div>
  );
};

export default AnimationRevealLoader;
