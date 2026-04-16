import { useNavigate, useLocation } from "react-router";

export function useRouter() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;

  function navigateTo(path) {
    navigate(path);
  }

  return {
    currentPath,
    navigateTo,
  };
}
