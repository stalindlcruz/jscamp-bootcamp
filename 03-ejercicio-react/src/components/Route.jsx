import { useRouter } from "../hooks/useRouter.jsx";
import { NotFoundPage } from "../pages/404.jsx";

export function Route() {
  const { route: Component } = useRouter();

  // if (route) {
  //   return <route.component />;
  // }

  return <Component />;
}
