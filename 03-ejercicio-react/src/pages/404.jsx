/* Crea aquí tu archivo 404 */
export function NotFoundPage() {
  return (
    <>
      <main
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          marginTop: "2rem",
        }}
      >
        <h1>404 - Página no encontrada</h1>
        <p>Lo sentimos, la página que buscas no existe.</p>
      </main>
    </>
  );
}
