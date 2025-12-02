// Selecao de elementos
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetBtn = document.getElementById('reset');

// Sons
const player1Sound = new Audio("sounds/som_player_1.mp3");
const player2Sound = new Audio("sounds/som_player_2.mp3");
const winSound = new Audio("sounds/wining_sound.mp3");
const drawSound = new Audio("sounds/draw_sound.mp3");

// Variaveis do jogo
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

// Condicoes de vitoria
const winningConditions = [
    [0,1,2],[3,4,5],[6,7,8], // linhas
    [0,3,6],[1,4,7],[2,5,8], // colunas
    [0,4,8],[2,4,6]          // diagonais
];

// Verifica vitoria ou empate
function checkWin() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            message.textContent = `Jogador ${currentPlayer} venceu!`;
            winSound.play(); // toca som de vitoria
            return;
        }
    }

    if (!board.includes("")) {
        gameActive = false;
        message.textContent = "Empate!";
        drawSound.play(); // toca som de empate
    }
}

// Clique na celula
function handleCellClick(e) {
    const index = e.target.dataset.index;
    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add('marked');

    // Toca som dependendo do jogador
    if(currentPlayer === "X") {
        player1Sound.play();
    } else {
        player2Sound.play();
    }

    checkWin();

    // Alterna jogador
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Reiniciar jogo
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('marked'); // remove animacao e brilho
    });
    currentPlayer = "X";
    gameActive = true;
    message.textContent = "";
}

// Eventos
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
