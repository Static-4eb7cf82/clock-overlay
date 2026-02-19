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

  const resizeWindowToClock = () => {
    if (!clockRef.current) {
      return;
    }
    const rect = clockRef.current.getBoundingClientRect();
    const width = Math.ceil(rect.width);
    const height = Math.ceil(rect.height);
    console.log("Resizing window to:", width, height);
    invoke<void>("resize_window", {
      width,
      height,
    }).catch((e) => console.error("Failed to resize window:", e));
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    resizeWindowToClock();
    if (document.fonts?.ready) {
      document.fonts.ready.then(resizeWindowToClock).catch(() => undefined);
    }
  }, []);

  useEffect(() => {
    resizeWindowToClock();
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

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div
        ref={clockRef}
        className={`clock ${isDragging ? "dragging" : ""}`}
        onMouseDown={handleMouseDown}
        onContextMenu={handleContextMenu}
      >
        {clockDisplayString}
    </div>
  )
}

export default Clock