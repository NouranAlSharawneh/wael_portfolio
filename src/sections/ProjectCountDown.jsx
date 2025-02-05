import { useState, useEffect, useRef } from "react";
import projectImage from "/assets/projectImgs/image14.JPG";
import { CgDesignmodo } from "react-icons/cg";
import * as React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";

const Fade = React.forwardRef(function Fade(props, ref) {
  const { children, in: open, onClick, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  fontFamily: "Aeonik",
};

const ProjectCountDown = () => {
  const [projectNum, setProjectNum] = useState(0); // Initial count is 0
  const targetNum = 125;
  const [isVisible, setIsVisible] = useState(false); // Tracks if section is visible
  const [openModal, setOpenModal] = useState(null); // Tracks which modal is open
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
      }, 30); // Adjust the interval speed as needed (50ms here)

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [isVisible]);

  // Handlers for opening modals
  const handleOpenArchitecture = () => setOpenModal("architecture");
  const handleOpenInterior = () => setOpenModal("interior");
  const handleClose = () => setOpenModal(null);

  return (
    <section ref={sectionRef} className="countdown-section">
      <div className="countdown_wrapper">
        <div className="countdown-grid">
          <div className="countdown-content">
            <h3>Projects +{projectNum}</h3>
            <div className="countdown-type">
              <div className="elment" onClick={handleOpenArchitecture}>
                <span>
                  <CgDesignmodo />
                </span>
                <h4>Architecture +60</h4>
              </div>
              <div className="elment" onClick={handleOpenInterior}>
                <span>
                  <CgDesignmodo />
                </span>
                <h4>Interior +55</h4>
              </div>
            </div>
          </div>
          <div className="countdown-image">
            <img src={projectImage} alt="Countdown illustration" />
          </div>
        </div>
      </div>

      {/* Modal for Architecture */}
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={openModal === "architecture"}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={openModal === "architecture"}>
          <Box sx={style}>
            <Typography id="spring-modal-title" variant="h6" component="h2">
              Architectural & Interior Design Projects
            </Typography>
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              <strong>Residential Architecture (40+ Projects)</strong>
              <ul>
                <li>SA Residential Complex.</li>
                <li>70 Duplex design project under Wafi in Dammam.</li>
                <li>
                  Designed residential buildings for various Real Estate
                  companies.
                </li>
              </ul>
              <strong>Commercial Architecture (20+ Projects)</strong>
              <ul>
                <li>Mazaya petrol stations (multiple locations).</li>
                <li>Aldrees Petroleum petrol station.</li>
                <li>Several car services.</li>
                <li>Salama cooling expert’s warehouse.</li>
                <li>Strip mall in Aziziyah.</li>
                <li>Roundabouts in the Southern region of Saudi Arabia.</li>
              </ul>
            </Typography>
          </Box>
        </Fade>
      </Modal>

      {/* Modal for Interior */}
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={openModal === "interior"}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={openModal === "interior"}>
          <Box sx={style}>
            <Typography id="spring-modal-title" variant="h6" component="h2">
              Architectural & Interior Design Projects
            </Typography>
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              <strong>Residential Interior Design (35+ Projects)</strong>
              <ul>
                <li>Villa display interior design.</li>
                <li>Large private villa interior design projects.</li>
                <li>Apartment interior design projects.</li>
              </ul>
              <strong>Commercial Interior Design (20+ Projects)</strong>
              <ul>
                <li>
                  Hotels: Designed interiors for 2 hotels, including all main
                  areas and rooms.
                </li>
                <li>
                  Restaurants: Food restaurant in Asala University, Al Deek
                  Alromie, Saklance restaurant, etc.
                </li>
                <li>
                  Cafes: Designed interiors for cafes including Gluck cafe,
                  hookah lounge, etc.
                </li>
                <li>
                  Shops: Designed interiors for shops, including a studio and
                  spa (e.g., Sharhane money exchange shop in Jeddah airport,
                  Bareeq Alaa studio, etc.).
                </li>
              </ul>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </section>
  );
};

export default ProjectCountDown;
