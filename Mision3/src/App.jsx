import { useState, useEffect } from "react";
import FormularioTarea from "./components/FormularioTarea.jsx";
import Filtros from "./components/Filtros.jsx";
import ListaTareas from "./components/ListaTareas.jsx";

function cargarTareas() {
  try {
    const guardadas = JSON.parse(localStorage.getItem("tareas-estudio"));
    return Array.isArray(guardadas) ? guardadas : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [tareas, setTareas] = useState(cargarTareas);
  const [filtro, setFiltro] = useState("todas");
  const [elegidaId, setElegidaId] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem("tareas-estudio", JSON.stringify(tareas));
    } catch {
      console.log("No se pueden guardar las tareas");
    }
  }, [tareas]);

  function agregarTarea(texto) {
    const nueva = { id: crypto.randomUUID(), texto, hecha: false };
    setTareas((anteriores) => [...anteriores, nueva]);
  }

  function cambiarTarea(id) {
    setTareas((anteriores) =>
      anteriores.map((tarea) =>
        tarea.id === id ? { ...tarea, hecha: !tarea.hecha } : tarea
      )
    );
  }

  function borrarTarea(id) {
    setTareas((anteriores) => anteriores.filter((tarea) => tarea.id !== id));
  }

  const pendientes = tareas.filter((tarea) => !tarea.hecha);
  const terminadas = tareas.length - pendientes.length;
  const recomendada = pendientes.find((tarea) => tarea.id === elegidaId);

  const visibles = tareas.filter((tarea) => {
    if (filtro === "pendientes") return !tarea.hecha;
    if (filtro === "hechas") return tarea.hecha;
    return true;
  });

  function elegirTarea() {
    const indice = Math.floor(Math.random() * pendientes.length);
    setElegidaId(pendientes[indice].id);
  }

  return (
    <main className="contenedor">
      <h1>Mi lista de estudio</h1>
      <p>Apunta lo que tienes pendiente y ve terminándolo.</p>

      <FormularioTarea onAgregar={agregarTarea} />

      <section className="sugerencia">
        <button onClick={elegirTarea} disabled={pendientes.length === 0}>
          Elige por mí
        </button>
        {recomendada && <p>Empieza por: <strong>{recomendada.texto}</strong></p>}
      </section>

      <section aria-label="Tareas de estudio">
        <p className="resumen">Terminadas: {terminadas} de {tareas.length}</p>
        <Filtros filtro={filtro} onFiltrar={setFiltro} />
        <ListaTareas tareas={visibles} onCambiar={cambiarTarea} onBorrar={borrarTarea} />
      </section>
    </main>
  );
}
