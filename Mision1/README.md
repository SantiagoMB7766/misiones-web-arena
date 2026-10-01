# Misión 1 · El Despertar del DOM

## Encuentra el objetivo

Juego realizado con HTML, CSS y JavaScript puro para la primera misión de Programación Web I.

El objetivo es pulsar en el tablero el mismo número que aparece indicado en pantalla.

Cada acierto suma un punto y aumenta la racha. Al fallar se pierde una vida y la racha vuelve a cero.

El juego tiene tres niveles:

- Fácil: 4 casillas.
- Normal: 6 casillas.
- Difícil: 9 casillas.

También permite escribir el nombre del jugador y tiene un modo oscuro que se activa con la tecla `D`.

## Tecnologías

- HTML
- CSS
- JavaScript

No se han utilizado frameworks ni librerías externas.

## Uso de IA

He utilizado ChatGPT como ayuda durante el desarrollo, principalmente para resolver dudas sobre la organización del JavaScript, los eventos y para revisar algunos fallos.

Uno de los prompts reales utilizados fue:

> "me ayudas a mejorar este juego sin hacerlo demasiado complicado?"

> "como puedo hacer que cambie la dificultad segun los puntos?"

> "quiero añadir una racha de aciertos pero que sea sencillo"

> "esto de dataset para que sirve exactamente? lo puedo usar aqui?"

> "como puedo hacer que los botones guarden el numero sin depender del texto que aparece?"

> "quiero que el tablero tenga menos casillas al principio y vaya aumentando"

> "como hago para cambiar el numero de columnas del tablero segun el nivel?"

> "me puedes revisar el app.js y decirme si hay algo que pueda simplificar?"

> "como puedo hacer que el modo oscuro no se active cuando estoy escribiendo el nombre?"

> "quiero que al subir de nivel salga un mensaje distinto"

> "como puedo organizar mejor las funciones para que cada una haga una sola cosa?"

> "como hago para que al fallar se reinicie la racha?"

> "quiero añadir aria-live al mensaje, donde lo pongo?"

> "como puedo mejorar un poco el css sin hacer el juego demasiado cargado?"

> "quiero que los niveles esten guardados en un array, como lo hago de forma sencilla?"

> "como puedo usar un array de objetos para guardar el nombre del nivel y sus casillas?"

> "revisa si la delegacion de eventos del tablero esta bien hecha"

> "como puedo evitar tener un evento distinto para cada boton?"

> "quiero que cuando reinicie la partida vuelvan los puntos, vidas, racha y nivel al principio"

> "que partes de este codigo deberia saber explicar si me preguntan como funciona?"

He probado los cambios en el navegador comprobando el inicio y reinicio de partida, los aciertos y fallos, las vidas, la racha, los niveles, el nombre del jugador y el modo oscuro.

He creado la estructura del proyecto en Visual Studio Code, he integrado los cambios y he revisado las funciones para entender qué hace cada parte antes de entregar el proyecto.

## Autopsia

### Crear el tablero desde JavaScript

Podría haber escrito todos los botones directamente en el HTML.

Decidí generarlos con `document.createElement()` porque así el número de casillas puede cambiar según el nivel y practico la manipulación del DOM.

### Un único evento para el tablero

La alternativa era añadir un `addEventListener` a cada casilla.

Preferí poner un único evento en el tablero y detectar la casilla pulsada con `event.target.closest(".casilla")`. De esta forma evito repetir el mismo evento en todos los botones.