import { useEffect, useState } from "react";
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

const App = () => {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  const [videoPage, setVideoPage] = useState(true);

  return (
    <>
      <Header />
      {videoPage ? (
        <main>
          <Hero />
          <Divider />
          <About />
          <Message />
          <Divider />
          <Creations />
          <ProjectCountDown setVideoPage={setVideoPage} />
          <Gallery />
          <Types />
        </main>
      ) : (
        <Videos />
      )}
    </>
  );
};

export default App;
