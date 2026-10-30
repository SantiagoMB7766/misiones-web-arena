export default function Tarea({ tarea, onCambiar, onBorrar }) {
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
      <button type="button" className="borrar" onClick={() => onBorrar(tarea.id)}>
        Borrar
      </button>
    </li>
  );
}
