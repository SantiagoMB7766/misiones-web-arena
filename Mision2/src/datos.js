// Quita resultados incorrectos o repetidos y conserva los datos que mostramos.
export function prepararLibros(documentos) {
  const vistos = new Set();

  return documentos
    .filter((libro) => libro && typeof libro.title === "string" && libro.title.trim() !== "")
    .map((libro) => ({
      titulo: libro.title.trim(),
      autor: Array.isArray(libro.author_name) && libro.author_name[0]
        ? libro.author_name[0]
        : "Autor desconocido",
      anio: Number.isInteger(libro.first_publish_year) && libro.first_publish_year > 0
        ? libro.first_publish_year
        : null,
      portada: Number.isInteger(libro.cover_i) && libro.cover_i > 0 ? libro.cover_i : null,
      clave: typeof libro.key === "string" ? libro.key : "",
    }))
    .filter((libro) => {
      const id = libro.clave || `${libro.titulo.toLowerCase()}-${libro.autor.toLowerCase()}`;
      if (vistos.has(id)) return false;
      vistos.add(id);
      return true;
    });
}

export function ordenarLibros(libros, orden) {
  if (orden === "recientes") {
    return libros.toSorted((a, b) => (b.anio ?? 0) - (a.anio ?? 0));
  }
  if (orden === "titulo") {
    return libros.toSorted((a, b) => a.titulo.localeCompare(b.titulo, "es"));
  }
  return libros;
}

// reduce agrupa los libros por década, en vez de limitarse a contar elementos.
export function obtenerEstadisticas(libros) {
  const porDecada = libros.reduce((grupos, libro) => {
    if (libro.anio !== null) {
      const decada = Math.floor(libro.anio / 10) * 10;
      grupos[decada] = (grupos[decada] ?? 0) + 1;
    }
    return grupos;
  }, {});

  const masFrecuente = Object.entries(porDecada)
    .toSorted((a, b) => b[1] - a[1])[0];

  return {
    total: libros.length,
    conAnio: libros.filter((libro) => libro.anio !== null).length,
    decada: masFrecuente ? `${masFrecuente[0]} (${masFrecuente[1]} libros)` : "sin datos",
  };
}
