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
import Types from "./sections/Types";
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
        {/* Default route */}
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
              <Types />
            </main>
          }
        />

        {/* Route for the Videos page */}
        <Route path="/videos" element={<Videos />} />

        {/* Redirect unknown routes to the home page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
