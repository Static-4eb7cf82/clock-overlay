import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  const displayMinutes = minutes.toString().padStart(2, "0");

  return (
    <main className="overlay">
      <div className="clock" role="timer" aria-live="polite">
        {displayHours}:{displayMinutes} {hours >= 12 ? "PM" : "AM"}
      </div>
    </main>
  );
}

export default App;
