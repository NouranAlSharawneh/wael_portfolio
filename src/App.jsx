import { useState } from "react";
import Divider from "./components/Divider";
import Header from "./components/Header";
import Videos from "./components/Videos";
import About from "./sections/About";
import Creations from "./sections/Creations";
import Hero from "./sections/Hero";
import Message from "./sections/Message";
import ProjectCountDown from "./sections/ProjectCountDown";
import Types from "./sections/Types";

const App = () => {
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
          <Types />
        </main>
      ) : (
        <Videos />
      )}
    </>
  );
};

export default App;
