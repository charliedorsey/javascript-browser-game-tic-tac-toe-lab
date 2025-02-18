/*---------------------------- Constants ----------------------------*/
// Define Winning Combos
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

/*---------------------------- Variables (state) ----------------------------*/

// Define required variables
let board;
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/

// Store cached element references globally
let squareEls; 
let messageEl;
let resetBtn;
let boardEl;

/*----------------------------- Event Listeners -----------------------------*/

// Store cached element references after the DOM has loaded
document.addEventListener("DOMContentLoaded", () => {
    squareEls = document.querySelectorAll('.square'); 
    messageEl = document.querySelector('#message');
    resetBtn = document.querySelector('#reset');
    boardEl = document.querySelector('#board');

    // Start the game on page load
init();

 // Attach event listeners
 resetBtn.addEventListener('click', init);
 boardEl.addEventListener('click', handleClick);
})

console.log(squareEls, messageEl, resetBtn); // Debugging check

/*-------------------------------- Functions --------------------------------*/


// Initialize game state
function init() {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 'X';
    winner = null;
    tie = false;
    render();  
  console.log("Game initialized"); // Debugging check
}


// Render function
function render() {
    updateBoard();
    updateMessage();
  }
  
  // updateBoard function
  function updateBoard() {
    board.forEach((cell, index) => {
      squareEls[index].textContent = cell;
    });
  }
  
  // updateMessage function
  function updateMessage() {
    if (winner) {
      messageEl.textContent = `Congratulations! ${winner} wins!`;
    } else if (tie) {
      messageEl.textContent = "It's a tie!";
    } else {
      messageEl.textContent = `Player ${turn}'s turn`;
    }
  }

  // Handle player clicks
function handleClick(event) {
  const clickedEl = event.target; 

  // Confirm click is on a valid square
  if (!clickedEl.classList.contains('square')) return;

  // Get index from the clicked square's ID
  const squareIndex = parseInt(clickedEl.id);

  // Prevent clicking on taken squares or if game is over
  if (board[squareIndex] !== '' || winner) return;

  // Place piece and check game state
  placePiece(squareIndex);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();

  // Render updated state
  render();
}

// Place the player's piece
function placePiece(index) {
  board[index] = turn;
}

// Check for a winner
function checkForWinner() {
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        winner = turn; // Store the actual winning player
        return;
      }
    }
  }
  
// Check for a tie
function checkForTie() {
  if (winner) return;
  tie = board.every(cell => cell !== ''); // If no empty spaces, it's a tie
}

// Switch player turns
function switchPlayerTurn() {
  if (winner) return;
  turn = turn === 'X' ? 'O' : 'X';
}