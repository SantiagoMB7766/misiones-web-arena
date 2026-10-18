const estado = document.querySelector("#estado");
const resumen = document.querySelector("#resumen");
const resultados = document.querySelector("#resultados");

export function mostrarEstado(mensaje) {
  estado.textContent = mensaje;
}

export function limpiarResultados() {
  resumen.textContent = "";
  resultados.replaceChildren();
}

export function mostrarLibros(libros, estadisticas) {
  resumen.textContent = `${estadisticas.total} libros · ${estadisticas.conAnio} con año · Década más frecuente: ${estadisticas.decada}`;

  const tarjetas = libros.map((libro) => {
    const tarjeta = document.createElement("li");
    tarjeta.className = "tarjeta";

    if (libro.portada !== null) {
      const imagen = document.createElement("img");
      imagen.src = `https://covers.openlibrary.org/b/id/${libro.portada}-M.jpg`;
      imagen.alt = `Portada de ${libro.titulo}`;
      imagen.loading = "lazy";
      tarjeta.append(imagen);
    } else {
      const sinPortada = document.createElement("div");
      sinPortada.className = "sin-portada";
      sinPortada.textContent = "Sin portada";
      tarjeta.append(sinPortada);
    }

    const texto = document.createElement("div");
    texto.className = "datos-libro";
    const titulo = document.createElement("h2");
    const detalle = document.createElement("p");
    detalle.textContent = `${libro.autor} · ${libro.anio ?? "Año desconocido"}`;

    // Únicamente enlazamos las claves de obra que conocemos de Open Library.
    if (/^\/works\/OL\d+W$/.test(libro.clave)) {
      const enlace = document.createElement("a");
      enlace.href = `https://openlibrary.org${libro.clave}`;
      enlace.target = "_blank";
      enlace.rel = "noopener noreferrer";
      enlace.textContent = libro.titulo;
      titulo.append(enlace);
    } else {
      titulo.textContent = libro.titulo;
    }

    texto.append(titulo, detalle);
    tarjeta.append(texto);
    return tarjeta;
  });

  resultados.replaceChildren(...tarjetas);
}
