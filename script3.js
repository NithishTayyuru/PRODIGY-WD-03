const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const resultElement = document.getElementById('result');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let isGameActive = true;
const isAIEnabled = true; // Set this to true to enable AI

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

restartButton.addEventListener('click', restartGame);

function handleClick(e) {
    const cell = e.target;
    if (!isGameActive) return;

    makeMove(cell, currentPlayer);
    if (checkWin(currentPlayer)) {
        resultElement.textContent = `${currentPlayer} wins!`;
        isGameActive = false;
    } else if (isDraw()) {
        resultElement.textContent = 'Draw!';
        isGameActive = false;
    } else {
        switchPlayer();
        if (isAIEnabled && currentPlayer === 'O') {
            makeAIMove();
        }
    }
}

function makeMove(cell, player) {
    cell.textContent = player;
    cell.removeEventListener('click', handleClick);
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function makeAIMove() {
    const availableCells = [...cells].filter(cell => cell.textContent === '');
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const cell = availableCells[randomIndex];
    setTimeout(() => {
        makeMove(cell, currentPlayer);
        if (checkWin(currentPlayer)) {
            resultElement.textContent = `${currentPlayer} wins!`;
            isGameActive = false;
        } else if (isDraw()) {
            resultElement.textContent = 'Draw!';
            isGameActive = false;
        } else {
            switchPlayer();
        }
    }, 500); // Small delay to simulate AI thinking
}

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === player;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => cell.textContent !== '');
}

function restartGame() {
    currentPlayer = 'X';
    isGameActive = true;
    resultElement.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
}
