export function ErrorFetch({ error }) {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div style={{ textAlign: "center" }}>
      <p>Error al cargar los trabajos: {error}</p>
      <button onClick={handleReload}>Recargar</button>
    </div>
  );
}
