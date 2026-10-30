export default function Filtros({ filtro, onFiltrar }) {
  return (
    <div className="filtros" aria-label="Filtrar tareas">
      <button className={filtro === "todas" ? "activo" : ""} onClick={() => onFiltrar("todas")}>Todas</button>
      <button className={filtro === "pendientes" ? "activo" : ""} onClick={() => onFiltrar("pendientes")}>Pendientes</button>
      <button className={filtro === "hechas" ? "activo" : ""} onClick={() => onFiltrar("hechas")}>Terminadas</button>
    </div>
  );
}
