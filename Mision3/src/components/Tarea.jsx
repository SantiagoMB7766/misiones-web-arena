export default function Tarea({ tarea, onCambiar, onPrioridad, onBorrar }) {
  return (
    <li className="tarea">
      <label className={tarea.hecha ? "terminada" : ""}>
        <input
          type="checkbox"
          checked={tarea.hecha}
          onChange={() => onCambiar(tarea.id)}
        />
        <span>{tarea.texto}</span>
      </label>
      <div className="acciones">
        <button
          type="button"
          className={tarea.importante ? "prioridad marcada" : "prioridad"}
          aria-pressed={!!tarea.importante}
          onClick={() => onPrioridad(tarea.id)}
        >
          {tarea.importante ? "Prioritaria" : "Dar prioridad"}
        </button>
        <button type="button" className="borrar" onClick={() => onBorrar(tarea.id)}>
          Borrar
        </button>
      </div>
    </li>
  );
}
