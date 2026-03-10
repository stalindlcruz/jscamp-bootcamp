import { useRouter } from "../hooks/useRouter.jsx";
import { HomePage } from "../pages/Home";
import { SearchPage } from "../pages/Search";
import { NotFoundPage } from "../pages/404.jsx";

export function Route() {
  const { currentPathname } = useRouter();

  const routes = [
    { path: "/", component: HomePage },
    { path: "/search", component: SearchPage },
  ];

  const route = routes.find((route) => route.path === currentPathname);

  if (route) {
    return <route.component />;
  }

  return <NotFoundPage />;
}
