// Seleção de elementos
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetBtn = document.getElementById('reset');

// Variáveis do jogo
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

// Condições de vitória
const winningConditions = [
    [0,1,2],[3,4,5],[6,7,8], // linhas
    [0,3,6],[1,4,7],[2,5,8], // colunas
    [0,4,8],[2,4,6]          // diagonais
];

// Função para verificar vitória ou empate
function checkWin() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            message.textContent = `Jogador ${currentPlayer} venceu!`;
            new Audio("sounds/wining_sound.mp3").play();
            return;
        }
    }

    if (!board.includes("")) {
        gameActive = false;
        message.textContent = "Empate!";
        new Audio("sounds/draw_sound.mp3").play();
    }
}

// Função para lidar com clique na célula
function handleCellClick(e) {
    const index = e.target.dataset.index;
    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add('marked');

    // Toca som dependendo do jogador
    if(currentPlayer === "X") {
        new Audio("sounds/som_player_1.mp3").play();
    } else {
        new Audio("sounds/som_player_2.mp3").play();
    }

    checkWin();

    // Alterna jogador
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Função para reiniciar o jogo
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('marked'); // remove animação e brilho
    });
    currentPlayer = "X";
    gameActive = true;
    message.textContent = "";
}

// Eventos
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
