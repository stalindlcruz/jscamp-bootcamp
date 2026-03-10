import { useRouter } from "../hooks/useRouter.jsx";

export function Route({ path, component: Component }) {
  const { currentPathname } = useRouter();

  if (currentPathname !== path) {
    return null;
  }

  return <Component />;
}
