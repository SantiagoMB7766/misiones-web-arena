# LibroRadar — Misión 2
Buscador de libros con JavaScript y la API pública de Open Library. **No utiliza React ni otras bibliotecas de interfaz.** Se limita a los contenidos de las unidades 1 y 2.

## Ejecutar
Abre una terminal dentro de `Mision2`:

```bash
npm install
npm run dev
```
En PowerShell, si `npm.ps1` está bloqueado, usa `npm.cmd install` y `npm.cmd run dev`.
Abre la dirección que indique Vite (normalmente `http://localhost:5173/`). No abras el HTML haciendo doble clic.

Para comprobar la compilación:

```bash
npm run build
```

## Qué hace
- Busca libros por título o autor en Open Library, sin clave API.
- Enseña un estado de carga, resultados, lista vacía o errores diferenciados.
- Muestra portadas cuando existen, año, autor y enlace a la ficha del libro.
- Ordena por relevancia, año o título sin volver a pedir los datos.
- Quita resultados duplicados y calcula, mediante `reduce`, cuántos libros hay por década.
- Guarda cada búsqueda durante 24 horas en `localStorage` para no repetir peticiones.
- Si comienza otra búsqueda, cancela la anterior con `AbortController`; también corta una petición que tarde más de 10 segundos. Tras un error aparece el botón «Reintentar búsqueda».

## Estructura
|     Archivo     |                                Función                                |
|   `index.html`  |                Estructura HTML, formulario y controles                |
| `src/style.css` |                       Estilos y diseño adaptable                      |
|  `src/api.js`   |        `fetch`, `response.ok`, validación JSON y caché de 24 h        |
| `src/datos.js`  |            `filter`, `map`, `reduce`, `Set` y `toSorted`              |
| `src/render.js` |            Construcción de tarjetas con DOM y `textContent`           |
|  `src/main.js`  | Eventos, `async/await`, `try/catch/finally`, cancelación y reintentos |

## Uso de IA
Se ha utilizado ChatGPT (GPT-6) para elaborar el código inicial y esta revisión después de recibir una evaluación de 54/70. También se ha utilizado para corregir la carga de CSS y módulos ES.

Dos instrucciones reales utilizadas durante el trabajo fueron:

1. «Haz lo más simple posible que se ajuste a la rúbrica».
2. «Revisa el tema 2 de las fuentes no hagas nada que no sea del tema 1 y 2, ahora mismo aparece asi, arreglalo y dejalo lo más simple y sencillo posible pero que se ciña a un 10 en la rúbrica».

## Autopsia
1. Caché durante 24 horas o pedir siempre a la API.Se eligió `localStorage` porque evita repetir peticiones idénticas y cubre el bonus de la misión. La alternativa era hacer un `fetch` siempre, más simple, pero innecesario en búsquedas recientes. A cambio, durante esas 24 horas pueden mostrarse resultados antiguos.
2. Cancelar búsquedas anteriores o bloquear el botón. Se eligió `AbortController` para que el usuario pueda lanzar una segunda búsqueda sin esperar a la primera. Se descartó desactivar el botón hasta el final, porque no permitiría cambiar de búsqueda si la red fuese lenta. Esto añade unas pocas líneas para controlar la petición vigente.

## Pruebas manuales antes de entregar
- [ ] `npm install` y `npm run dev` funcionan.
- [ ] Buscar `Dune` muestra libros, portadas y enlaces.
- [ ] Cambiar el orden modifica las tarjetas sin nuevas solicitudes.
- [ ] Buscar lo mismo dos veces muestra «Resultados guardados en este navegador».
- [ ] Buscar `zzzxxyy987654321` indica que no hay resultados.
- [ ] Desactivar la red en F12 → Network y buscar una consulta nueva muestra un error y permite reintentar.
- [ ] Dos búsquedas seguidas rápidamente conservan la última.
- [ ] `npm run build` termina correctamente.
- [ ] Se ha verificado con `git status` que `node_modules/` y `dist/` no se subirán.
