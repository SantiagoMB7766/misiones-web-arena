// Transforma la respuesta en datos sencillos para mostrar.
export function prepararLibros(documentos) {
  return documentos
    .filter((libro) => typeof libro.title === "string" && libro.title.trim() !== "")
    .map((libro) => ({
      titulo: libro.title.trim(),
      autor: libro.author_name?.[0] ?? "Autor desconocido",
      anio: Number.isInteger(libro.first_publish_year) ? libro.first_publish_year : null,
    }));
}

// Cuenta los libros para los que conocemos el año de publicación.
export function contarConAnio(libros) {
  return libros.reduce((total, libro) => total + (libro.anio === null ? 0 : 1), 0);
}
