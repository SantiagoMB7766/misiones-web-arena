// ELEMENTOS DEL DOM

const objetivoElemento = document.querySelector("#objetivo");
const puntosElemento = document.querySelector("#puntos");
const vidasElemento = document.querySelector("#vidas");
const rachaElemento = document.querySelector("#racha");
const nivelElemento = document.querySelector("#nivel");

const botonIniciar = document.querySelector("#iniciar");
const tablero = document.querySelector("#tablero");
const mensaje = document.querySelector("#mensaje");

const nombreInput = document.querySelector("#nombre");
const saludo = document.querySelector("#saludo");


// NIVELES

const niveles = [
    {
        nombre: "Fácil",
        casillas: 4
    },
    {
        nombre: "Normal",
        casillas: 6
    },
    {
        nombre: "Difícil",
        casillas: 9
    }
];


// ESTADO DEL JUEGO

let objetivo = 0;
let puntos = 0;
let vidas = 3;
let racha = 0;
let nivelActual = 0;
let juegoActivo = false;


// FUNCIONES

function iniciarJuego() {
    puntos = 0;
    vidas = 3;
    racha = 0;
    nivelActual = 0;
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

    tablero.classList.remove(
        "nivel-1",
        "nivel-2",
        "nivel-3"
    );

    tablero.classList.add(`nivel-${nivelActual + 1}`);

    const totalCasillas = niveles[nivelActual].casillas;

    for (let numero = 1; numero <= totalCasillas; numero++) {
        const casilla = document.createElement("button");

        casilla.type = "button";
        casilla.textContent = numero;
        casilla.dataset.numero = numero;
        casilla.setAttribute("aria-label", `Elegir número ${numero}`);
        casilla.classList.add("casilla");

        tablero.appendChild(casilla);
    }
}


function generarObjetivo() {
    const totalCasillas = niveles[nivelActual].casillas;

    objetivo = Math.floor(Math.random() * totalCasillas) + 1;
}


function actualizarNivel() {
    let nuevoNivel = 0;

    if (puntos >= 6) {
        nuevoNivel = 2;
    } else if (puntos >= 3) {
        nuevoNivel = 1;
    }

    if (nuevoNivel !== nivelActual) {
        nivelActual = nuevoNivel;
        crearTablero();

        return true;
    }

    return false;
}


function comprobarRespuesta(numeroPulsado) {
    if (!juegoActivo) {
        return;
    }

    mensaje.classList.remove("correcto", "error");

    if (numeroPulsado === objetivo) {
        puntos++;
        racha++;

        const haSubidoDeNivel = actualizarNivel();

        if (haSubidoDeNivel) {
            mensaje.textContent =
                `¡Subes al nivel ${niveles[nivelActual].nombre}!`;
        } else {
            mensaje.textContent =
                `¡Correcto! Llevas una racha de ${racha}.`;
        }

        mensaje.classList.add("correcto");

        generarObjetivo();
    } else {
        vidas--;
        racha = 0;

        mensaje.textContent =
            `Incorrecto. Te quedan ${vidas} vidas.`;

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
    rachaElemento.textContent = racha;
    nivelElemento.textContent = niveles[nivelActual].nombre;
}


function terminarJuego() {
    juegoActivo = false;

    objetivoElemento.textContent = "-";

    mensaje.classList.remove("correcto", "error");

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

    const numeroPulsado = Number(casilla.dataset.numero);

    comprobarRespuesta(numeroPulsado);
});


nombreInput.addEventListener("input", (event) => {
    const nombre = event.target.value.trim();

    if (nombre === "") {
        saludo.textContent = "";
    } else {
        saludo.textContent = `Jugador: ${nombre}`;
    }
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