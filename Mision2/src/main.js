import { buscarLibros } from "./api.js";
import { prepararLibros } from "./datos.js";
import { mostrarEstado, mostrarLibros } from "./render.js";

const formulario = document.querySelector("#buscador");
const campo = document.querySelector("#consulta");
const boton = document.querySelector("#boton");

async function cargarLibros(consulta) {
  if (boton.disabled) return;

  mostrarEstado("Cargando libros...");
  boton.disabled = true;

  try {
    const documentos = await buscarLibros(consulta);
    const libros = prepararLibros(documentos);
    mostrarLibros(libros);
  } catch (error) {
    mostrarEstado("No se pudieron cargar los libros. Comprueba tu conexión e inténtalo otra vez.");
    console.error(error);
  } finally {
    boton.disabled = false;
  }
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const consulta = campo.value.trim();
  if (consulta) cargarLibros(consulta);
});

// Búsqueda de ejemplo al abrir la aplicación.
cargarLibros(campo.value);
