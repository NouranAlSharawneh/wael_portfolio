import Divider from "./components/Divider";
import Header from "./components/Header";
import About from "./sections/About";
import Creations from "./sections/Creations";
import Hero from "./sections/Hero";
import Message from "./sections/Message";
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
      <Types />
    </>
  );
};

export default App;
