// Solo se ocupa de pedir datos a la API.
export async function buscarLibros(consulta) {
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(consulta)}&limit=12&fields=title,author_name,first_publish_year`;
  const respuesta = await fetch(url);

  if (!respuesta.ok) {
    throw new Error(`Error HTTP ${respuesta.status}`);
  }

  const datos = await respuesta.json();
  if (!Array.isArray(datos.docs)) {
    throw new Error("Respuesta inesperada de la API");
  }

  return datos.docs;
}
