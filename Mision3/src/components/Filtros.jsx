const opciones = [
  { valor: "todas", texto: "Todas" },
  { valor: "pendientes", texto: "Pendientes" },
  { valor: "hechas", texto: "Terminadas" },
  { valor: "importantes", texto: "Prioritarias" },
];

export default function Filtros({ filtro, onFiltrar }) {
  return (
    <div className="filtros" role="group" aria-label="Filtrar tareas">
      {opciones.map((opcion) => (
        <button
          key={opcion.valor}
          type="button"
          className={filtro === opcion.valor ? "activo" : ""}
          aria-pressed={filtro === opcion.valor}
          onClick={() => onFiltrar(opcion.valor)}
        >
          {opcion.texto}
        </button>
      ))}
    </div>
  );
}
