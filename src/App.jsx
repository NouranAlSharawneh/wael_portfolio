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
import Creations from "./sections/Creations";
import Hero from "./sections/Hero";
import Message from "./sections/Message";
import ProjectCountDown from "./sections/ProjectCountDown";
import Gallery from "./sections/Gallery";
import Lenis from "lenis";
import ContactForm from "./sections/ContactForm";

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
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Hero />
              <Divider />
              <About />
              <Message />
              <Divider />
              <Creations />
              <ProjectCountDown />
              <Gallery />
              <ContactForm />
            </main>
          }
        />

        <Route path="/videos" element={<Videos />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
