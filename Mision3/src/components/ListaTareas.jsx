import Tarea from "./Tarea.jsx";

const mensajes = {
  todas: "Todavía no has añadido tareas.",
  pendientes: "No tienes tareas pendientes.",
  hechas: "Todavía no has terminado ninguna tarea.",
  importantes: "No tienes tareas prioritarias pendientes.",
};

export default function ListaTareas({ tareas, filtro, onCambiar, onPrioridad, onBorrar }) {
  if (tareas.length === 0) {
    return <p className="vacio">{mensajes[filtro]}</p>;
  }

  return (
    <ul className="lista">
      {tareas.map((tarea) => (
        <Tarea
          key={tarea.id}
          tarea={tarea}
          onCambiar={onCambiar}
          onPrioridad={onPrioridad}
          onBorrar={onBorrar}
        />
      ))}
    </ul>
  );
}
