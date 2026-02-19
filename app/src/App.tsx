import "./App.css";
import Clock from "./components/Clock";
import useTray from "./hooks/useTray";

function App() {
  useTray();

  return (
    <main className="overlay">
      <Clock />
    </main>
  );
}

export default App;
