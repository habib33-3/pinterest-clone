import "./App.css";
import LeftBar from "./components/LeftBar/LeftBar";
import Gallery from "./components/gallery/gallery";
import TopBar from "./components/topBar/topBar";

const App = () => {
  return (
    <div className="app">
      <LeftBar />
      <div className="content">
        <TopBar />
        <Gallery />
      </div>
    </div>
  );
};

export default App;
