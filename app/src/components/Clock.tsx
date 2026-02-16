import { useEffect, useState, useRef } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";

function Clock() {
  const [now, setNow] = useState(() => new Date());
  const [isDragging, setIsDragging] = useState(false);
  const clockRef = useRef<HTMLDivElement>(null);

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

  const handleMouseDown = async () => {
    const appWindow = getCurrentWindow();
    setIsDragging(true);
    try {
      await appWindow.startDragging();
    } catch (e) {
      console.error("Failed to start dragging:", e);
    }
    setIsDragging(false);
  };

  return (
    <div
        ref={clockRef}
        className={`clock ${isDragging ? "dragging" : ""}`}
        onMouseDown={handleMouseDown}
      >
        {displayHours}:{displayMinutes} {hours >= 12 ? "PM" : "AM"}
    </div>
  )
}

export default Clock