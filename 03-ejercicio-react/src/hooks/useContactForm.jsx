import { useState, useEffect } from "react";

export function useContactForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

  const resetForm = () => {
    setNombre("");
    setEmail("");
    setMensaje("");
    setErrors({ nombre: "", email: "", mensaje: "" });
  };

  const validateNombre = (value) => {
    if (!value.trim()) {
      return "El nombre es requerido";
    }
    return "";
  };

  const validateEmail = (value) => {
    if (!value.trim()) {
      return "El email es requerido";
    } else if (!regexEmail.test(value)) {
      return "El email no es valido";
    }
    return "";
  };

  const validateMensaje = (value) => {
    if (!value.trim()) {
      return "El mensaje es requerido";
    }
    return "";
  };

  const handleNombreChange = (event) => {
    const value = event.target.value;
    setNombre(value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      nombre: validateNombre(value),
    }));
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      email: validateEmail(value),
    }));
  };

  const handleMensajeChange = (event) => {
    const value = event.target.value;
    setMensaje(value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      mensaje: validateMensaje(value),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      setTimeout(() => {
        setSuccessMessage("¡Formulario enviado correctamente!");
        resetForm();
        setIsLoading(false);
      }, 2000);
    } else {
      console.log("❌ Formulario con errores");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    }

    if (!email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!regexEmail.test(email)) {
      newErrors.email = "El email no es valido";
    }

    if (!mensaje.trim()) {
      newErrors.mensaje = "El mensaje es requerido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return {
    nombre,
    email,
    mensaje,
    handleNombreChange,
    handleEmailChange,
    handleMensajeChange,
    errors,
    validateForm,
    handleSubmit,
    successMessage,
    isLoading,
  };
}
