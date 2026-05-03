import { useAuthStore } from "../store/authStore";
import { useLogout } from "../hooks/useLogout";

export function HeaderUserButton() {
  const { isLoggedIn, login } = useAuthStore();
  const { handleLogout } = useLogout();

  return isLoggedIn ? (
    <button onClick={handleLogout}>Cerrar Sesion</button>
  ) : (
    <button onClick={login}>Iniciar Sesion</button>
  );
}
