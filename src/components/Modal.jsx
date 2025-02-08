import { useEffect } from "react";

const Modal = ({ title, setOpenModal, openModal, children }) => {
  // useEffect(() => {
  //   if (openModal) {
  //     document.body.style.overflow = "hidden";
  //     document.getElementById("countdown-section").style.position = "fixed";
  //     document.body.style.width = "100%";
  //   } else {
  //     document.body.style.overflow = "auto";
  //     document.getElementById("countdown-section").style.position = "relative";
  //   }

  //   return () => {
  //     document.body.style.overflow = "auto";
  //     document.getElementById("countdown-section").style.position = "relative";
  //   };
  // }, [openModal]);

  return (
    <div
      onClick={() => setOpenModal(false)}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(4px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000, // Ensure it's on top
        opacity: openModal ? 1 : 0,
        pointerEvents: openModal ? "auto" : "none",
        transition: "opacity 0.3s ease",
      }}
    >
      <div
        style={{
          position: "relative",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "70%",
          maxHeight: "80vh",
          maxWidth: "500px",
          textAlign: "center",
        }}
      >
        <h2>{title}</h2>

        <div style={{ textAlign: "left" }}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
