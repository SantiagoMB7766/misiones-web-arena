import Tarea from "./Tarea.jsx";

export default function ListaTareas({ tareas, onCambiar, onBorrar }) {
  if (tareas.length === 0) {
    return <p className="vacio">No hay tareas en esta lista.</p>;
  }

  return (
    <ul className="lista">
      {tareas.map((tarea) => (
        <Tarea
          key={tarea.id}
          tarea={tarea}
          onCambiar={onCambiar}
          onBorrar={onBorrar}
        />
      ))}
    </ul>
  );
}
