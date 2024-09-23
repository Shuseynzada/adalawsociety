import { useState, useEffect } from "react";

function useHash() {
  const [hash, setHash] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return; // Prevent access to window during SSR

    let lastHash = window.location.hash;

    const checkHashChange = () => {
      if (window.location.hash !== lastHash) {
        lastHash = window.location.hash;
        setHash(window.location.hash);
      }
    };

    const interval = setInterval(checkHashChange, 100); // Check every 100ms

    return () => {
      clearInterval(interval);
    };
  }, []);

  return hash;
}

export default useHash;
