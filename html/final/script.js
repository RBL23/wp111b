let currentPlayer = 'X';

let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
  [0, 4, 8], [2, 4, 6]               // Diagonals
];

// Display a message for the current player
const displayPlayer = () => {
  const playerDisplay = document.querySelector('.player');
  playerDisplay.textContent = `Current Player: ${currentPlayer}`;
};

const displayResult = (message) => {
  const resultDisplay = document.querySelector('.result');
  resultDisplay.textContent = message;
};

const handleCellClick = (event) => {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

  if (gameState[clickedCellIndex] !== '' || !gameActive) {
    return;
  }

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  checkWin();

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

  displayPlayer();
};

const checkWin = () => {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (
      gameState[a] === gameState[b] &&
      gameState[b] === gameState[c] &&
      gameState[a] !== ''
    ) {
      gameActive = false;
      displayResult(`Player ${currentPlayer} wins!`);
      return;
    }
  }

  if (!gameState.includes('')) {
    // The game is a draw
    gameActive = false;
    displayResult("It's a draw!");
  }
};

const resetGame = () => {
  currentPlayer = 'X';
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];

  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => cell.textContent = '');

  displayResult('');

  displayPlayer();
};

const cells = document.querySelectorAll('.cell');
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

const resetButton = document.querySelector('.reset');
resetButton.addEventListener('click', resetGame);

displayPlayer();
