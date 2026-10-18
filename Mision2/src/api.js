const DURACION_CACHE = 24 * 60 * 60 * 1000; // 24 horas

// La caché evita repetir la misma petición si se acaba de hacer.
export async function buscarLibros(consulta, signal) {
  const clave = `libroradar:${consulta.toLowerCase().trim()}`;

  try {
    const guardado = JSON.parse(localStorage.getItem(clave));
    if (guardado && Array.isArray(guardado.docs) && Date.now() - guardado.fecha < DURACION_CACHE) {
      return { docs: guardado.docs, deCache: true };
    }
  } catch {
    // Si el almacenamiento está bloqueado o corrupto, seguimos con la API.
  }

  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(consulta)}&limit=12&fields=key,title,author_name,first_publish_year,cover_i`;
  const respuesta = await fetch(url, { signal });

  if (!respuesta.ok) {
    throw new Error(`HTTP ${respuesta.status}`);
  }

  const datos = await respuesta.json();
  if (!datos || !Array.isArray(datos.docs)) {
    throw new Error("FORMATO_INVALIDO");
  }

  try {
    localStorage.setItem(clave, JSON.stringify({ fecha: Date.now(), docs: datos.docs }));
  } catch {
    // La aplicación también funciona sin almacenamiento local.
  }

  return { docs: datos.docs, deCache: false };
}
