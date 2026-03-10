import { useState, useEffect } from "react";

export function useRouter() {
  const [currentPathname, setCurrentPathname] = useState(
    window.location.pathname,
  );

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPathname(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  function navigateTo(path) {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  return { currentPathname, navigateTo };
}
