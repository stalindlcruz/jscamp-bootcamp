import { useState } from "react";
import { useAuthStore } from "../store/authStore";

export function ApplyBtn() {
  const [isApplied, setIsApplied] = useState(false);
  const { isLoggedIn } = useAuthStore();

  const handleApplyClick = () => {
    setIsApplied(true);
  };

  const buttonClasses = isApplied
    ? "button-apply-job is-applied"
    : "button-apply-job";

  const buttonText = isApplied ? "Aplicado" : "Aplicar";

  return (
    <button
      disabled={!isLoggedIn}
      className={buttonClasses}
      onClick={handleApplyClick}
    >
      {buttonText}
    </button>
  );
}
