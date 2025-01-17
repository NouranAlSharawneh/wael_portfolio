import Divider from "./components/Divider";
import About from "./sections/About";
import Creations from "./sections/Creations";
import Hero from "./sections/Hero";
import Message from "./sections/Message";

const App = () => {
  return (
    <>
      <Hero />
      <Divider />
      <About />
      <Message />
      <Divider />
      <Creations />
    </>
  );
};

export default App;
