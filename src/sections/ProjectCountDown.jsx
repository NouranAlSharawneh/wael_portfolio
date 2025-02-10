import { useState, useEffect, useRef } from "react";
import projectImage from "/assets/projectImgs/image13.JPG";
import { BsHousesFill } from "react-icons/bs";
import { GiSofa } from "react-icons/gi";
import Modal from "../components/Modal";
import { IoIosArrowDown } from "react-icons/io";

const ProjectCountDown = () => {
  const [projectNum, setProjectNum] = useState(0);
  const targetNum = 125;
  const [isVisible, setIsVisible] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(""); // Track modal type (architecture or interior)
  const sectionRef = useRef("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [sectionRef]);

  useEffect(() => {
    if (isVisible) {
      let currentNum = 0;
      const interval = setInterval(() => {
        currentNum += 1;
        setProjectNum(currentNum);
        if (currentNum === targetNum) {
          clearInterval(interval);
        }
      }, 30);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const handleModal = (type) => {
    setModalType(type); // Set the type of modal (either 'architecture' or 'interior')
    setOpenModal((prev) => !prev);
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="countdown-section"
        id="countdown-section"
      >
        <div className="countdown_wrapper">
          <div className="countdown-grid">
            <div className="countdown-content">
              <h3>Projects +{projectNum}</h3>
              <p
                style={{
                  padding: "1rem 0",
                  width: "100%",
                  flex: "1",
                  fontWeight: "100",
                }}
              >
                I independently completed these projects, serving as an
                architect, an interior designer, or both in some cases. My work
                included design development, material selection, and overseeing
                execution to ensure both aesthetics and functionality.
                Additionally, I have contributed to and participated in many
                other projects, offering design insights and support throughout
                various stages of development.
              </p>
              <div className="countdown-type">
                <div
                  className="elment"
                  onClick={() => handleModal("architecture")}
                >
                  <span>
                    <BsHousesFill size={32} fill="#ffffff" />
                  </span>
                  <h4>Architecture Projects +60</h4>
                  <div className="details">
                    <p style={{ color: "#ffffff" }}>details</p>
                    <IoIosArrowDown fill="#ffffff" />
                  </div>
                </div>
                <div className="elment" onClick={() => handleModal("interior")}>
                  <span>
                    <GiSofa size={32} fill="#ffffff" />
                  </span>
                  <h4>Interior Projects +55</h4>
                  <div className="details">
                    <p style={{ color: "#ffffff" }}>details</p>
                    <IoIosArrowDown fill="#ffffff" />
                  </div>
                </div>
              </div>
            </div>
            <div className="countdown-image">
              <img src={projectImage} alt="Countdown illustration" />
            </div>
          </div>
        </div>
      </section>

      {openModal && modalType === "architecture" && (
        <Modal
          title="Architecture Projects"
          setOpenModal={setOpenModal}
          openModal={openModal}
        >
          <ul>
            <h3
              style={{
                paddingTop: "10px",
                paddingBottom: "10px",
                color: "#ffffff",
              }}
            >
              Residential Architecture (40+ Projects)
            </h3>
            <li
              style={{
                paddingBottom: "10px",
                color: "rgba(255, 255, 255, 0.644)",
              }}
            >
              Some examples:
            </li>
            <li style={{ color: "#ffffff" }}>&bull; SA Residential Complex.</li>
            <li style={{ color: "#ffffff" }}>
              &bull; 70 Duplex design project under Wafi in Dammam.
            </li>
            <li style={{ color: "#ffffff" }}>
              &bull; Designed residential buildings for various Real Estate
              companies.
            </li>
            <h3
              style={{
                paddingTop: "10px",
                paddingBottom: "10px",
                color: "#ffffff",
              }}
            >
              Commercial Architecture (20+ Projects)
            </h3>
            <li
              style={{
                paddingBottom: "10px",
                paddingTop: "10px",
                color: "rgba(255, 255, 255, 0.644)",
              }}
            >
              Some examples:
            </li>
            <li style={{ color: "#ffffff" }}>
              &bull; Mazaya petrol stations (multiple locations).
            </li>
            <li style={{ color: "#ffffff" }}>
              &bull; Aldrees Petroleum petrol station.
            </li>
            <li style={{ color: "#ffffff" }}>&bull; Several car services.</li>
            <li style={{ color: "#ffffff" }}>
              &bull; Salama cooling expert&rsquo;s warehouse.
            </li>
            <li style={{ color: "#ffffff" }}>&bull; Strip mall in Aziziyah.</li>
            <li style={{ color: "#ffffff" }}>
              &bull; Roundabouts in the Southern region of Saudi Arabia.
            </li>
          </ul>
        </Modal>
      )}

      {openModal && modalType === "interior" && (
        <Modal
          title="Interior Projects"
          setOpenModal={setOpenModal}
          openModal={openModal}
        >
          <ul>
            <h3
              style={{
                paddingTop: "10px",
                paddingBottom: "10px",
                color: "#ffffff",
              }}
            >
              Residential Interior Design (35+ Projects)
            </h3>
            <li
              style={{
                paddingBottom: "10px",
                color: "rgba(255, 255, 255, 0.644)",
              }}
            >
              Some examples:
            </li>
            <li style={{ color: "#ffffff" }}>
              &bull; Villa display interior design.
            </li>
            <li style={{ color: "#ffffff" }}>
              &bull; Large private villa interior design projects.
            </li>
            <li style={{ color: "#ffffff" }}>
              &bull; Apartment interior design projects.
            </li>
            <h3
              style={{
                paddingTop: "10px",
                paddingBottom: "10px",
                color: "#ffffff",
              }}
            >
              Commercial Interior Design (20+ Projects)
            </h3>
            <li
              style={{
                paddingBottom: "10px",
                paddingTop: "10px",
                color: "rgba(255, 255, 255, 0.644)",
              }}
            >
              Some examples:
            </li>
            <li style={{ color: "#ffffff" }}>
              &bull; Hotels: Designed interiors for 2 hotels, including all main
              areas and rooms.
            </li>
            <li style={{ color: "#ffffff" }}>
              &bull; Restaurants: Food restaurant in Asala University, Al Deek
              Alromie, Saklance restaurant, etc.
            </li>
            <li style={{ color: "#ffffff" }}>
              &bull; Cafes: Designed interiors for cafes including Gluck cafe,
              hookah lounge, etc.
            </li>
            <li style={{ color: "#ffffff" }}>
              &bull; Shops: Designed interiors for shops, including a studio and
              spa (e.g., Sharhane money exchange shop in Jeddah airport, Bareeq
              Alaa studio, etc.).
            </li>
          </ul>
        </Modal>
      )}
    </>
  );
};

export default ProjectCountDown;
