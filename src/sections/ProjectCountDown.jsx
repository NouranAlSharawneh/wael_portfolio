import { useState, useEffect, useRef } from "react";
import side from "../../public/assets/side.jpg";

const ProjectCountDown = ({ setVideoPage }) => {
  const [projectNum, setProjectNum] = useState(0); // Initial count is 0
  const targetNum = 55;
  const [isVisible, setIsVisible] = useState(false); // Tracks if section is visible
  const sectionRef = useRef(null); // Reference to the section

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 } // Trigger when 50% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      let currentNum = 0;
      const interval = setInterval(() => {
        currentNum += 1;
        setProjectNum(currentNum);
        if (currentNum === targetNum) {
          clearInterval(interval); // Stop the interval when it reaches the target
        }
      }, 50); // Adjust the interval speed as needed (50ms here)

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="countdown-section">
      <div className="countdown-grid">
        <div className="countdown-content">
          <h3>Projects +{projectNum}</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla,
            accusamus. Veniam suscipit, rem cum blanditiis aspernatur dolor
            iusto labore odit, quos accusantium iste maxime incidunt! Amet
            officiis reiciendis minima ea. Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Rerum error atque possimus ipsam hic
            quod dignissimos, dolores, sit, repellendus ipsa placeat molestiae
            explicabo ducimus laudantium consequuntur veritatis at nulla
            asperiores. Lorem ipsum, dolor sit amet consectetur adipisicing
            elit. Debitis voluptatem maxime vel? Explicabo nostrum enim
            consequatur eius, obcaecati aliquam magni distinctio quaerat ullam
            saepe labore commodi velit doloribus ipsum illum!
          </p>
        </div>
        <div>
          <img
            src={side}
            alt="Countdown illustration"
            onClick={() => setVideoPage(false)}
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectCountDown;
