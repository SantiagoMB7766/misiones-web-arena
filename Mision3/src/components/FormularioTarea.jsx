import { useState } from "react";

export default function FormularioTarea({ onAgregar }) {
  const [texto, setTexto] = useState("");

  function enviar(evento) {
    evento.preventDefault();
    const nombre = texto.trim();
    if (nombre === "") return;
    onAgregar(nombre);
    setTexto("");
  }

  return (
    <form onSubmit={enviar} className="formulario">
      <label htmlFor="nueva-tarea">Nueva tarea</label>
      <div className="fila">
        <input
          id="nueva-tarea"
          value={texto}
          onChange={(evento) => setTexto(evento.target.value)}
          placeholder="Ej: repasar componentes"
          maxLength={80}
        />
        <button type="submit">Añadir</button>
      </div>
    </form>
  );
}
