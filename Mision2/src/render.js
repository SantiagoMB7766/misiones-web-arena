import { contarConAnio } from "./datos.js";

const estado = document.querySelector("#estado");
const resumen = document.querySelector("#resumen");
const resultados = document.querySelector("#resultados");

export function mostrarEstado(mensaje) {
  estado.textContent = mensaje;
  resumen.textContent = "";
  resultados.replaceChildren();
}

export function mostrarLibros(libros) {
  if (libros.length === 0) {
    mostrarEstado("No se encontraron libros. Prueba otra búsqueda.");
    return;
  }

  estado.textContent = "";
  resumen.textContent = `${libros.length} libros encontrados · ${contarConAnio(libros)} con año conocido`;

  const tarjetas = libros.map((libro) => {
    const tarjeta = document.createElement("li");
    const titulo = document.createElement("h2");
    const detalle = document.createElement("p");

    titulo.textContent = libro.titulo;
    detalle.textContent = `${libro.autor} · ${libro.anio ?? "Año desconocido"}`;
    tarjeta.append(titulo, detalle);
    return tarjeta;
  });

  resultados.replaceChildren(...tarjetas);
}
