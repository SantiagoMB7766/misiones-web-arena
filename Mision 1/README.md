# M1 · Encuentra el objetivo

Proyecto realizado para la Misión 1 de Programación Web I: El Cliente.

## Descripción

**Encuentra el objetivo** es un juego sencillo desarrollado únicamente con HTML, CSS y JavaScript.

El juego muestra un número objetivo entre 1 y 9. El jugador debe encontrar y pulsar ese número dentro de un tablero de nueve casillas.

Cada acierto suma un punto y genera un nuevo objetivo. Cada error resta una vida. La partida termina cuando el jugador pierde sus tres vidas.

El proyecto está pensado para practicar los contenidos de la Unidad 1: manipulación del DOM, eventos y fundamentos de JavaScript.

## Tecnologías utilizadas

- HTML
- CSS
- JavaScript

No se han utilizado frameworks ni librerías externas.

## Cómo ejecutar el proyecto

1. Clonar o descargar el repositorio.
2. Abrir la carpeta del proyecto en Visual Studio Code.
3. Abrir `index.html` en un navegador.

No es necesario instalar dependencias.

## Cómo jugar

1. Escribe tu nombre.
2. Pulsa **Empezar partida**.
3. Observa el número que aparece como objetivo.
4. Pulsa en el mismo número dentro del tablero.
5. Cada acierto suma un punto.
6. Cada fallo resta una vida.
7. La partida termina al perder las tres vidas.

### Tecla secreta

Al pulsar la tecla `D` se activa o desactiva el modo oscuro.

## Funcionalidades

- Tablero generado mediante JavaScript.
- Generación aleatoria del número objetivo.
- Sistema de puntuación.
- Sistema de tres vidas.
- Reinicio de partida.
- Mensajes de acierto y error.
- Nombre del jugador actualizado mediante el evento `input`.
- Eventos de ratón mediante `click`.
- Evento de teclado mediante `keydown`.
- Delegación de eventos en el tablero.
- Modo oscuro mediante una tecla secreta.

## Estructura del proyecto

```text
m1-encuentra-objetivo/
├── index.html
├── styles.css
├── app.js
├── README.md
└── .gitignore