# Misión 1 · El Despertar del DOM

## Encuentra el objetivo

Juego sencillo realizado con HTML, CSS y JavaScript puro para la primera misión de Programación Web I.

El jugador tiene que encontrar en un tablero el mismo número que aparece como objetivo.

Cada acierto suma un punto y cada fallo resta una vida. La partida termina cuando el jugador pierde sus tres vidas.

También se puede escribir el nombre del jugador y activar un modo oscuro pulsando la tecla `d`.

## Tecnologías

HTML, CSS y JavaScript.


## Uso de IA

He utilizado ChatGPT como ayuda durante el desarrollo, sobre todo para entender cómo organizar el JavaScript y cómo manejar los eventos del tablero.

Uno de los prompts utilizados junto al archivo app.js e index.html fue:

> "Tengo problemas para que esto funcione correctamente, donde estan mis fallos"

Después de ver los fallos corregí el código  y revisé cada función para entender qué hacía antes de continuar con el proyecto.

## Autopsia

Podría haber escrito los nueve botones directamente en el HTML, pero decidí crearlos desde JavaScript con `document.createElement()`.

Podría haber añadido un evento a cada botón por separado. En su lugar, utilicé un único `addEventListener` en el tablero y detecto qué casilla se ha pulsado. Esto evita repetir código y permite practicar la delegación de eventos.