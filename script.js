// Variables de inicio
let generatedNumber = generateNumber(); // El número generado por la función
let tries = 10; // Los intentos al iniciar
let game = true; // Indica que el juego está ejecutándose

const inputField = document.getElementById('inputField');
const checkButton = document.getElementById('checkButton');
const advisor = document.getElementById('advisor');
const triesField = document.getElementById('triesField');

inputField.addEventListener('input', () => {
    inputField.value = inputField.value.replace(/[^0-9]/g, '');
});

checkButton.addEventListener('click', compareNumbers);

function generateNumber() {
    return Math.floor(Math.random() * 101);
}

function compareNumbers() {
    if (inputField.value === "" || parseInt(inputField.value) > 100) {
        advisor.textContent = "Introduce un número desde 0 hasta 100.";
        return;
    }

    let userInput = parseInt(inputField.value);

    if (userInput < generatedNumber) {
        advisor.textContent = "El número introducido es menor.";
        tries--;
        checkTries();
    } else if (userInput > generatedNumber) {
        advisor.textContent = "El número introducido es mayor.";
        tries--;
        checkTries();
    } else if (userInput === generatedNumber) {
        advisor.textContent = `¡Ganaste! El número es ${generatedNumber}. Pulsa Espacio para jugar de nuevo.`;
        triesField.textContent = `Utilizaste ${10 - tries} oportunidades.`;
        gameOver();
    }
}

function checkTries() {
    triesField.textContent = `Tienes ${tries} oportunidades.`;

    if (tries === 1) {
        triesField.textContent = "Tienes 1 oportunidad.";
    } else if (tries === 0) {
        advisor.textContent = `¡Perdiste! El número era ${generatedNumber}. Pulsa Espacio para jugar de nuevo.`;
        gameOver();
    }
}

function gameOver() {
    game = false;
    checkButton.removeEventListener('click', compareNumbers);
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !game) {
        restart();
    }
});

function restart() {
    tries = 10;
    generatedNumber = generateNumber();
    checkTries();
    advisor.textContent = "";
    inputField.value = "";
    checkButton.addEventListener('click', compareNumbers);
    game = true;
}
