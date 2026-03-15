import styles from "./Contact.module.css";

import { useId } from "react";
import { useContactForm } from "../hooks/useContactForm";

export function ContactPage() {
  const idInput = useId();
  const idEmail = useId();
  const idTextarea = useId();

  const {
    nombre,
    email,
    mensaje,
    handleNombreChange,
    handleEmailChange,
    handleMensajeChange,
    errors,
    handleSubmit,
    successMessage,
    isLoading,
  } = useContactForm();

  return (
    <>
      <main className={styles.contactMain}>
        <div className={styles.contactDiv}>
          <h1 className={styles.title}>Contactanos</h1>
          <p className={styles.subtitle}>Siempre disponible para ayudarte</p>
        </div>

        {successMessage && (
          <p className={styles.successMessage}>{successMessage}</p>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor={idInput}>Nombre Completo</label>
          <div className={styles.formSearchBar}>
            <input
              className={styles.inputName}
              id={idInput}
              type="text"
              value={nombre}
              onChange={handleNombreChange}
              placeholder="Escribe tu nombre y apellido"
            />
          </div>
          {errors.nombre && <p className={styles.NameError}>{errors.nombre}</p>}

          <label htmlFor={idEmail}>Email Address</label>
          <div className={styles.formSearchBar}>
            <input
              className={styles.inputEmail}
              id={idEmail}
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Escribe tu email"
            />
          </div>
          {errors.email && <p className={styles.EmailError}>{errors.email}</p>}

          <label htmlFor={idTextarea}>Mensaje</label>
          <textarea
            className={styles.textarea}
            id={idTextarea}
            rows={5}
            placeholder="Escribe tu mensaje"
            value={mensaje}
            onChange={handleMensajeChange}
          ></textarea>
          {errors.mensaje && (
            <p className={styles.MessageError}>{errors.mensaje}</p>
          )}

          <button className={styles.btn} type="submit" disabled={isLoading}>
            {isLoading ? "Enviando..." : "Enviar Mensaje"}
          </button>
        </form>
      </main>
    </>
  );
}
