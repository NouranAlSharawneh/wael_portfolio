import Divider from "./components/Divider";
import About from "./sections/About";
import Creations from "./sections/Creations";
import Hero from "./sections/Hero";
import Message from "./sections/Message";
import ProjectCountDown from "./sections/ProjectCountDown";
import Types from "./sections/Types";

const App = () => {
  return (
    <>
      <Hero />
      <Divider />
      <About />
      <Message />
      <Divider />
      <Creations />
      <ProjectCountDown />
      <Types />
    </>
  );
};

export default App;
