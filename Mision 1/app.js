// ELEMENTOS DEL DOM

const objetivoElemento = document.querySelector("#objetivo");
const puntosElemento = document.querySelector("#puntos");
const vidasElemento = document.querySelector("#vidas");

const botonIniciar = document.querySelector("#iniciar");
const tablero = document.querySelector("#tablero");
const mensaje = document.querySelector("#mensaje");

const nombreInput = document.querySelector("#nombre");
const saludo = document.querySelector("#saludo");

// ESTADO DEL JUEGO

let objetivo = 0;
let puntos = 0;
let vidas = 3;
let juegoActivo = false;


// FUNCIONES

function iniciarJuego() {
    puntos = 0;
    vidas = 3;
    juegoActivo = true;

    mensaje.classList.remove("correcto", "error");
    
    crearTablero();
    generarObjetivo();
    actualizarPantalla();

    mensaje.textContent = "Busca el número correcto.";
    botonIniciar.textContent = "Reiniciar partida";
}


function crearTablero() {
    tablero.textContent = "";

    for (let numero = 1; numero <= 9; numero++) {
        const casilla = document.createElement("button");

        casilla.textContent = numero;
        casilla.classList.add("casilla");

        tablero.appendChild(casilla);
    }
}


function generarObjetivo() {
    objetivo = Math.floor(Math.random() * 9) + 1;
}


function comprobarRespuesta(numeroPulsado) {
    if (!juegoActivo) {
        return;
    }

    mensaje.classList.remove("correcto", "error");

    if (numeroPulsado === objetivo) {
        puntos++;

        mensaje.textContent = `¡Correcto! Llevas ${puntos} puntos.`;
        mensaje.classList.add("correcto");

        generarObjetivo();
    } else {
        vidas--;

        mensaje.textContent = `Incorrecto. Te quedan ${vidas} vidas.`;
        mensaje.classList.add("error");
    }

    actualizarPantalla();

    if (vidas === 0) {
        terminarJuego();
    }
}


function actualizarPantalla() {
    objetivoElemento.textContent = objetivo;
    puntosElemento.textContent = puntos;
    vidasElemento.textContent = vidas;
}


function terminarJuego() {
    juegoActivo = false;

    objetivoElemento.textContent = "-";

    mensaje.textContent =
        `Fin de la partida. Has conseguido ${puntos} puntos.`;

    botonIniciar.textContent = "Jugar otra vez";
}


// EVENTOS


botonIniciar.addEventListener("click", iniciarJuego);



tablero.addEventListener("click", (event) => {
    const casilla = event.target.closest(".casilla");

    if (!casilla) {
        return;
    }

    const numeroPulsado = Number(casilla.textContent);

    comprobarRespuesta(numeroPulsado);
});


// BONUS: tecla secreta

document.addEventListener("keydown", (event) => {
    
    if (event.target === nombreInput) {
        return;
    }

    if (event.key.toLowerCase() === "d") {
        document.body.classList.toggle("modo-oscuro");
    }
});

nombreInput.addEventListener("input", (event) => {
    const nombre = event.target.value.trim();

    if (nombre === "") {
        saludo.textContent = "";
    } else {
        saludo.textContent = `Jugador: ${nombre}`;
    }
});