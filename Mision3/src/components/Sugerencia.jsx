export default function Sugerencia({ pendientes, recomendada, onElegir }) {
  return (
    <section className="sugerencia">
      <button onClick={onElegir} disabled={pendientes === 0}>
        Elige por mí
      </button>
      {recomendada && (
        <p>Empieza por: <strong>{recomendada.texto}</strong></p>
      )}
    </section>
  );
}
