"use client";

import { useEffect } from "react";

export default function SecurityProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent F12
      if (e.key === "F12") {
        e.preventDefault();
      }
      
      // Prevent Ctrl+Shift+I (DevTools)
      if (e.ctrlKey && e.shiftKey && e.key === "I") {
        e.preventDefault();
      }
      
      // Prevent Ctrl+Shift+J (DevTools Console)
      if (e.ctrlKey && e.shiftKey && e.key === "J") {
        e.preventDefault();
      }

      // Prevent Ctrl+U (View Source)
      if (e.ctrlKey && e.key === "u") {
        e.preventDefault();
      }

      // Prevent Ctrl+S (Save As)
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
      }
      
      // Prevent Ctrl+Shift+C (Inspect Element)
      if (e.ctrlKey && e.shiftKey && e.key === "C") {
         e.preventDefault();
      }
    };

    // Add global listeners
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      // Cleanup
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return <>{children}</>;
}
