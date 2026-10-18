import { buscarLibros } from "./api.js";
import { prepararLibros, ordenarLibros, obtenerEstadisticas } from "./datos.js";
import { mostrarEstado, limpiarResultados, mostrarLibros } from "./render.js";

const formulario = document.querySelector("#buscador");
const campo = document.querySelector("#consulta");
const boton = document.querySelector("#boton");
const orden = document.querySelector("#orden");
const reintentar = document.querySelector("#reintentar");

let librosActuales = [];
let ultimaConsulta = "";
let controladorActual = null;

function pintarLibros() {
  const ordenados = ordenarLibros(librosActuales, orden.value);
  mostrarLibros(ordenados, obtenerEstadisticas(librosActuales));
}

function mensajeDeError(error, tiempoAgotado) {
  if (tiempoAgotado) return "La búsqueda ha tardado demasiado. Puedes reintentarlo.";
  if (error.message.startsWith("HTTP")) return `Open Library ha respondido con ${error.message}. Inténtalo más tarde.`;
  if (error.message === "FORMATO_INVALIDO" || error instanceof SyntaxError) {
    return "Open Library ha enviado una respuesta inesperada.";
  }
  if (error instanceof TypeError) return "No hay conexión con Open Library. Comprueba tu red.";
  return "Ha ocurrido un error inesperado. Puedes reintentarlo.";
}

async function cargarLibros(consulta) {
  ultimaConsulta = consulta;

  // Una búsqueda nueva sustituye a la anterior, aunque todavía esté cargando.
  if (controladorActual) controladorActual.abort();
  const controlador = new AbortController();
  controladorActual = controlador;
  let tiempoAgotado = false;
  const temporizador = setTimeout(() => {
    tiempoAgotado = true;
    controlador.abort();
  }, 10000);

  boton.textContent = "Buscando...";
  reintentar.hidden = true;
  orden.disabled = true;
  limpiarResultados();
  mostrarEstado("Cargando libros...");

  try {
    const { docs, deCache } = await buscarLibros(consulta, controlador.signal);
    if (controladorActual !== controlador) return;

    librosActuales = prepararLibros(docs);
    if (librosActuales.length === 0) {
      mostrarEstado("No se encontraron libros. Prueba con otra búsqueda.");
    } else {
      orden.disabled = false;
      pintarLibros();
      mostrarEstado(deCache ? "Resultados guardados en este navegador." : "Resultados de Open Library.");
    }
  } catch (error) {
    if (controladorActual !== controlador) return;
    mostrarEstado(mensajeDeError(error, tiempoAgotado));
    reintentar.hidden = false;
  } finally {
    clearTimeout(temporizador);
    if (controladorActual === controlador) {
      controladorActual = null;
      boton.textContent = "Buscar libros";
    }
  }
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const consulta = campo.value.trim();
  if (consulta) cargarLibros(consulta);
});

orden.addEventListener("change", pintarLibros);
reintentar.addEventListener("click", () => cargarLibros(ultimaConsulta));

cargarLibros(campo.value.trim());
