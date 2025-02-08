import { useState, useEffect, useRef } from "react";
import projectImage from "/assets/projectImgs/image14.JPG";
import { BsHousesFill } from "react-icons/bs";
import { GiSofa } from "react-icons/gi";
import Modal from "../components/Modal";

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
              <div className="countdown-type">
                <div
                  className="elment"
                  onClick={() => handleModal("architecture")}
                >
                  <span>
                    <BsHousesFill size={32} fill="#ffffff" />
                  </span>
                  <h4>Architecture Projects +60</h4>
                </div>
                <div className="elment" onClick={() => handleModal("interior")}>
                  <span>
                    <GiSofa size={32} fill="#ffffff" />
                  </span>
                  <h4>Interior Projects +55</h4>
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
          title="Architecture"
          setOpenModal={setOpenModal}
          openModal={openModal}
        >
          <ul>
            <h5 style={{ paddingTop: "10px", paddingBottom: "10px" }}>
              Residential Architecture (40+ Projects)
            </h5>
            <li style={{ paddingBottom: "10px" }}>Some examples:</li>
            <li>&bull; SA Residential Complex.</li>
            <li>&bull; 70 Duplex design project under Wafi in Dammam.</li>
            <li>
              &bull; Designed residential buildings for various Real Estate
              companies.
            </li>
            <h5 style={{ paddingTop: "10px", paddingBottom: "10px" }}>
              Commercial Architecture (20+ Projects)
            </h5>
            <li style={{ paddingBottom: "10px", paddingTop: "10px" }}>
              Some examples:
            </li>
            <li>&bull; Mazaya petrol stations (multiple locations).</li>
            <li>&bull; Aldrees Petroleum petrol station.</li>
            <li>&bull; Several car services.</li>
            <li>&bull; Salama cooling expert&rsquo;s warehouse.</li>
            <li>&bull; Strip mall in Aziziyah.</li>
            <li>&bull; Roundabouts in the Southern region of Saudi Arabia.</li>
          </ul>
        </Modal>
      )}

      {openModal && modalType === "interior" && (
        <Modal
          title="Interior"
          setOpenModal={setOpenModal}
          openModal={openModal}
        >
          <ul>
            <h5 style={{ paddingTop: "10px", paddingBottom: "10px" }}>
              Residential Interior Design (35+ Projects)
            </h5>
            <li style={{ paddingBottom: "10px" }}>Some examples:</li>
            <li>&bull; Villa display interior design.</li>
            <li>&bull; Large private villa interior design projects.</li>
            <li>&bull; Apartment interior design projects.</li>
            <h5 style={{ paddingTop: "10px", paddingBottom: "10px" }}>
              Commercial Interior Design (20+ Projects)
            </h5>
            <li style={{ paddingBottom: "10px", paddingTop: "10px" }}>
              Some examples:
            </li>
            <li>
              &bull; Hotels: Designed interiors for 2 hotels, including all main
              areas and rooms.
            </li>
            <li>
              &bull; Restaurants: Food restaurant in Asala University, Al Deek
              Alromie, Saklance restaurant, etc.
            </li>
            <li>
              &bull; Cafes: Designed interiors for cafes including Gluck cafe,
              hookah lounge, etc.
            </li>
            <li>
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
