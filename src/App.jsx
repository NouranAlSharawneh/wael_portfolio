import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Divider from "./components/Divider";
import Header from "./components/Header";
import Videos from "./components/Videos";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Hero from "./sections/Hero";
import Message from "./sections/Message";
import ProjectCountDown from "./sections/ProjectCountDown";
import Gallery from "./sections/Gallery";
import Lenis from "lenis";
import ContactForm from "./sections/ContactForm";
import Footer from "./sections/Footer";
import AnimationRevealLoader from "./components/AnimationRevealLoader";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <Router>
      <>
        <AnimationRevealLoader />
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <main>
                <ToastContainer
                  position="top-center"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick={false}
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
                <ScrollToTop />
                <Hero />
                <Divider />
                <About />
                <Message />
                <Divider />
                <Projects />
                <ProjectCountDown />
                <Gallery />
                <ContactForm />
                <Footer />
              </main>
            }
          />
          <Route path="/videos" element={<Videos />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </>
    </Router>
  );
};

export default App;
