const readline = require("readline");
const { getMinimaxMove, checkWin } = require("./ai");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, answer => resolve(answer)));
}

let gameBoard = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
let currentPlayer = '🍍';
let aiPlayer = '🍍';  // AI plays as 🍍
let humanPlayer = '🥝'; // Human plays as 🥝
let gameActive = true;
let singlePlayer = false;

async function startGame() {
    let mode = await askQuestion("Play vs (1) AI or (2) Human? ");
    singlePlayer = mode === "1";

    while (gameActive) {
        printBoard();
        let position;

        if (currentPlayer === humanPlayer || !singlePlayer) {
            let answer = await askQuestion(`Player ${currentPlayer}, enter your move (0-8): `);
            position = parseInt(answer, 10);
        } else {
            console.log("AI is thinking...");
            position = getMinimaxMove(gameBoard, aiPlayer, humanPlayer);
        }

        if (!isNaN(position) && position >= 0 && position <= 8 && gameBoard[position] === " ") {
            handleMove(position);
        } else {
            console.log("Invalid move. Try again.");
        }
    }

    rl.close();
}

function printBoard() {
    console.log(`
      ${gameBoard[0]} | ${gameBoard[1]} | ${gameBoard[2]}
     ---+---+---
      ${gameBoard[3]} | ${gameBoard[4]} | ${gameBoard[5]}
     ---+---+---
      ${gameBoard[6]} | ${gameBoard[7]} | ${gameBoard[8]}
    `);
}

function handleMove(position) {
    gameBoard[position] = currentPlayer;

    let winner = checkWin(gameBoard, aiPlayer, humanPlayer);
    if (winner) {
        printBoard();
        if (winner === "draw") {
            console.log("It's a draw!");
        } else {
            console.log(`Player ${winner} wins!`);
        }
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "🍍" ? "🥝" : "🍍";
}

startGame();
