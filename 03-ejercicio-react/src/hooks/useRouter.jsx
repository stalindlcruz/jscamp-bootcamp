import { useState, useEffect } from "react";

import { HomePage } from "../pages/Home";
import { SearchPage } from "../pages/Search";
import { ContactPage } from "../pages/Contact";
import { NotFoundPage } from "../pages/404";

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

  // const routes = [
  //   { path: "/", component: HomePage },
  //   { path: "/search", component: SearchPage },
  //   { path: "/contact", component: ContactPage },
  // ];

  const routes = {
    "/": HomePage,
    "/search": SearchPage,
    "/contact": ContactPage,
  };

  // const route = routes.find((route) => route.path === currentPathname);

  const route = routes[currentPathname] || NotFoundPage;

  return { currentPathname, navigateTo, route };
}
