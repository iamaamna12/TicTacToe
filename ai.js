function minimax(board, depth, isMaximizing, aiSymbol, humanSymbol) {
    let scores = {
        [aiSymbol]: 1,   // AI wins
        [humanSymbol]: -1, // Human wins
        "draw": 0
    };

    let winner = checkWin(board, aiSymbol, humanSymbol);
    if (winner) return scores[winner];

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === " ") {
                board[i] = aiSymbol;
                let score = minimax(board, depth + 1, false, aiSymbol, humanSymbol);
                board[i] = " ";
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === " ") {
                board[i] = humanSymbol;
                let score = minimax(board, depth + 1, true, aiSymbol, humanSymbol);
                board[i] = " ";
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function getMinimaxMove(gameBoard, aiSymbol, humanSymbol) {
    let bestMove;
    let bestScore = -Infinity;

    for (let i = 0; i < 9; i++) {
        if (gameBoard[i] === " ") {
            gameBoard[i] = aiSymbol;
            let score = minimax(gameBoard, 0, false, aiSymbol, humanSymbol);
            gameBoard[i] = " ";
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    return bestMove;
}

function checkWin(board, aiSymbol, humanSymbol) {
    const conditions = [
        [0,1,2], [3,4,5], [6,7,8], 
        [0,3,6], [1,4,7], [2,5,8], 
        [0,4,8], [2,4,6]
    ];

    for (let condition of conditions) {
        let [a, b, c] = condition;
        if (board[a] !== " " && board[a] === board[b] && board[b] === board[c]) {
            return board[a];
        }
    }

    if (board.every(cell => cell !== " ")) return "draw";
    return null;
}

module.exports = { getMinimaxMove, checkWin };
