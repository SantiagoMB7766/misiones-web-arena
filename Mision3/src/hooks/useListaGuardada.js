import { useState, useEffect } from "react";

export default function useListaGuardada(clave) {
  const [lista, setLista] = useState(() => {
    try {
      const datos = JSON.parse(localStorage.getItem(clave));
      return Array.isArray(datos) ? datos : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(clave, JSON.stringify(lista));
    } catch {
      console.error("No se han podido guardar las tareas");
    }
  }, [clave, lista]);

  return [lista, setLista];
}
