# LibroRadar — Misión 2

Buscador sencillo de libros usando JavaScript, Vite y la API pública de Open Library.

## Cómo ejecutarlo

Necesitas Node.js y npm. Abre una terminal en esta carpeta y ejecuta:

```bash
npm install
npm run dev
```

**Abre la dirección que muestre Vite (normalmente http://localhost:5173/). No abras `index.html` con doble clic:** los módulos ES deben cargarse desde un servidor HTTP, no desde `file://`.

Para comprobar la compilación:

```bash
npm run build
```

## Cómo funciona

Escribe el título o autor de un libro y pulsa **Buscar**. Al abrir la página se busca «javascript» como ejemplo.

- Durante la petición aparece «Cargando libros...».
- Si hay resultados, aparecen tarjetas con título, autor y año, más un resumen.
- Si la API devuelve una lista vacía, aparece un aviso.
- Si falla la red o la respuesta HTTP, aparece un mensaje de error y puedes volver a buscar.

No se necesitan claves de API.

## Tecnología y archivos

- HTML y CSS (sin frameworks de interfaz).
- JavaScript con módulos ES, `fetch`, `async/await`, `try/catch/finally` y DOM.
- `filter` para descartar títulos vacíos, `map` para preparar y mostrar los libros, `reduce` para contar los libros con año.
- Vite para desarrollo y compilación (`package.json`).

| Archivo | Responsabilidad |
| --- | --- |
| `index.html` | Formulario, estados y lista de resultados. |
| `src/api.js` | Petición a Open Library; comprueba `response.ok` y `docs`. |
| `src/datos.js` | Filtra y transforma datos; hace el recuento con `reduce`. |
| `src/render.js` | Actualiza el DOM sin insertar datos de la API como HTML. |
| `src/main.js` | Escucha el formulario y controla carga y error. |
| `src/style.css` | Diseño de la página. |

## Uso de IA

Herramienta: ChatGPT (GPT-6). Se usó para generar la versión inicial del proyecto, revisarla y corregir la carga de módulos y CSS, además de redactar el README.

Prompts reales relevantes:

1. «Haz lo más simple posible que se ajuste a la rúbrica», junto al enunciado de la Misión 2.
2. «No funciona [...] revisa el tema 2 de las fuentes no hagas nada que no sea del tema 1 y 2 [...] arréglalo y déjalo lo más simple y sencillo posible».

Verificaciones realizadas al preparar esta versión: comprobaciones de sintaxis y pruebas automatizadas locales de los estados de carga, resultados, lista vacía y error usando una respuesta simulada de Open Library. **Las peticiones reales a la API y `npm run build` deben verificarse en un equipo con conexión a Internet.**

El código y la documentación de esta versión se generaron con ChatGPT. Antes de entregar, revisa cada archivo y añade aquí lo que hayas escrito o cambiado por tu cuenta y las pruebas que hayas hecho personalmente.

## Autopsia

1. **Crear tarjetas con `createElement` y `textContent` en vez de `innerHTML`:** requiere algunas líneas más, pero los títulos procedentes de la API se tratan como texto y no como código HTML.
2. **Buscar al enviar el formulario y no al escribir cada letra:** evita hacer demasiadas peticiones y no necesita temporizadores; a cambio, hay que pulsar Buscar o Intro.

## Pruebas manuales recomendadas

1. Buscar `Dune`: deben aparecer libros.
2. Buscar `zzzxxyy987654321`: debe aparecer «No se encontraron libros» (según los datos reales disponibles).
3. Abrir F12 → Network, poner Offline y buscar: debe aparecer el mensaje de error.
4. Restaurar la conexión y buscar de nuevo: debe recuperarse.

Repositorio público: realiza al menos 5 commits de verdad con Git y sube la carpeta del proyecto sin `node_modules/` ni `dist/`.
