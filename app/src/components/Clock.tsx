import { useEffect, useState, useRef } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { invoke } from "@tauri-apps/api/core";

function Clock() {
  const [now, setNow] = useState(() => new Date());
  const [isDragging, setIsDragging] = useState(false);
  const clockRef = useRef<HTMLDivElement>(null);

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  const displayMinutes = minutes.toString().padStart(2, "0");
  const clockDisplayString = `${displayHours}:${displayMinutes} ${hours >= 12 ? "PM" : "AM"}`;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (clockRef.current) {
      const rect = clockRef.current.getBoundingClientRect();
      const width = Math.ceil(rect.width);
      const height = Math.ceil(rect.height);
      console.log("Resizing window to (time update):", width, height);
      invoke<void>("resize_window", {
        width,
        height,
      }).catch((e) => console.error("Failed to resize window:", e));
    }
  }, [clockDisplayString]);

  const handleMouseDown = async () => {
    setIsDragging(true);
    try {
      const appWindow = getCurrentWindow();
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
        {clockDisplayString}
    </div>
  )
}

export default Clock