import { useState } from "react";
import FormularioTarea from "./components/FormularioTarea.jsx";
import Filtros from "./components/Filtros.jsx";
import ListaTareas from "./components/ListaTareas.jsx";
import Sugerencia from "./components/Sugerencia.jsx";
import useListaGuardada from "./hooks/useListaGuardada.js";

export default function App() {
  const [tareas, setTareas] = useListaGuardada("tareas-estudio");
  const [filtro, setFiltro] = useState("todas");
  const [elegidaId, setElegidaId] = useState(null);

  function agregarTarea(texto) {
    const nueva = { id: crypto.randomUUID(), texto, hecha: false, importante: false };
    setTareas((anteriores) => [...anteriores, nueva]);
    setElegidaId(null);
  }

  function cambiarTarea(id) {
    setTareas((anteriores) =>
      anteriores.map((tarea) =>
        tarea.id === id ? { ...tarea, hecha: !tarea.hecha } : tarea
      )
    );
    setElegidaId(null);
  }

  function cambiarPrioridad(id) {
    setTareas((anteriores) =>
      anteriores.map((tarea) =>
        tarea.id === id ? { ...tarea, importante: !tarea.importante } : tarea
      )
    );
    setElegidaId(null);
  }

  function borrarTarea(id) {
    setTareas((anteriores) => anteriores.filter((tarea) => tarea.id !== id));
    setElegidaId(null);
  }

  const pendientes = tareas.filter((tarea) => !tarea.hecha);
  const terminadas = tareas.length - pendientes.length;
  const importantes = pendientes.filter((tarea) => tarea.importante);
  const recomendada = pendientes.find((tarea) => tarea.id === elegidaId);

  const visibles = tareas.filter((tarea) => {
    if (filtro === "pendientes") return !tarea.hecha;
    if (filtro === "hechas") return tarea.hecha;
    if (filtro === "importantes") return !tarea.hecha && tarea.importante;
    return true;
  });

  function elegirTarea() {
    const opciones = importantes.length > 0 ? importantes : pendientes;
    if (opciones.length === 0) return;
    const indice = Math.floor(Math.random() * opciones.length);
    setElegidaId(opciones[indice].id);
  }

  return (
    <main className="contenedor">
      <h1>Mi lista de estudio</h1>
      <p>Apunta lo que tienes pendiente y ve terminándolo.</p>

      <FormularioTarea onAgregar={agregarTarea} />
      <Sugerencia
        pendientes={pendientes.length}
        recomendada={recomendada}
        onElegir={elegirTarea}
      />

      <section aria-label="Tareas de estudio">
        <p className="resumen">Terminadas: {terminadas} de {tareas.length}</p>
        <Filtros filtro={filtro} onFiltrar={setFiltro} />
        <ListaTareas
          tareas={visibles}
          filtro={filtro}
          onCambiar={cambiarTarea}
          onPrioridad={cambiarPrioridad}
          onBorrar={borrarTarea}
        />
      </section>
    </main>
  );
}
