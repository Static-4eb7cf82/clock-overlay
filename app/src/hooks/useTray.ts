import { useEffect, useRef } from "react";
import { TrayIcon, TrayIconOptions } from "@tauri-apps/api/tray";
import { Menu } from "@tauri-apps/api/menu/menu";
import { defaultWindowIcon } from "@tauri-apps/api/app";

function useTray() {
  const initialized = useRef(false);

  useEffect(() => {
    // Prevent running more than once even with StrictMode
    if (initialized.current) return;
    initialized.current = true;

    const initTray = async () => {
      try {
        const menu = await Menu.new({
          items: [
            {
              id: "quit",
              text: "Quit",
              action: async () => {
                console.log("quit pressed");
              },
            },
          ],
        });

        let icon = await defaultWindowIcon();
        if (!icon) {
          throw new Error("Failed to load default window icon");
        }
        const options: TrayIconOptions = {
          menu: menu,
          icon: icon,
          tooltip: "Clock Overlay",
        };

        await TrayIcon.new(options);
      } catch (error) {
        console.error("Failed to create tray icon:", error);
      }
    };

    initTray();
  }, []);
}

export default useTray;
