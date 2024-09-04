const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const resetButton = document.querySelector('.reset');
let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// Define splash screen duration
const splashScreenDuration = 3000; // 3 seconds

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (clickedCellEvent) => {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    if (checkWinner()) {
        showCelebrationScreen();
        gameActive = false;
        return;
    }

    if (gameState.includes("")) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `It's ${currentPlayer}'s turn`;
    } else {
        announceResult("It's a Draw!");
        gameActive = false;
    }
};

const checkWinner = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }
    return roundWon;
};

const showSplashScreen = () => {
    const splashScreen = document.createElement('div');
    splashScreen.className = 'splash-screen';
    splashScreen.innerHTML = `
        <div class="splash-content">
            <h1>Tic Tac Toe</h1>
            <p>Get Ready for the Game!</p>
        </div>
    `;
    document.body.appendChild(splashScreen);

    // Remove splash screen after the duration
    setTimeout(() => {
        splashScreen.classList.add('fade-out');
        setTimeout(() => {
            splashScreen.remove();
            startGame();
        }, 1000); // Fade out duration
    }, splashScreenDuration);
};

const startGame = () => {
    document.querySelector('.container').style.display = 'block';
    statusText.textContent = `It's ${currentPlayer}'s turn`;
};

const showCelebrationScreen = () => {
    // Create and show the celebration screen
    const celebrationScreen = document.createElement('div');
    celebrationScreen.className = 'celebration-screen';
    celebrationScreen.innerHTML = `
        <img src="https://www.manchesterwholesale.co.uk/cdn/shop/products/Part_Poppers_item_code_3558_dbb184b7-afa1-417b-b0a7-3c855fea97f1.jpg?v=1654947186&width=823" height="150" alt="Celebration"></img>
        <h1>Congratulations!</h1>
    `;
    document.body.appendChild(celebrationScreen);

    // Remove the celebration screen after a short delay and show the result screen
    setTimeout(() => {
        celebrationScreen.remove();
        announceResult(`Player ${currentPlayer} Wins!`);
    }, 1500); // Show the celebration screen for 1.5 seconds
};

const announceResult = (message) => {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h1>${message}</h1>
            <button onclick="startNewGame()">New Game</button>
        </div>
    `;
    document.body.appendChild(modal);
};

const handleResetGame = () => {
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    statusText.textContent = `It's ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    const modal = document.querySelector('.modal');
    if (modal) modal.remove();
};

const startNewGame = () => {
    handleResetGame();
    statusText.textContent = `It's ${currentPlayer}'s turn`;
};

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', handleResetGame);

// Show splash screen on page load
document.addEventListener('DOMContentLoaded', showSplashScreen);
