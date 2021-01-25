let cells = document.querySelectorAll(".row > div");

//global variable for player so we can switch characters as needed
let player = "X";
let gameWon = false;
let tieGame = false;
let turnCount = 0;
let winText = document.getElementById("win-text");
let button = `<button id='restart-btn' onClick={window.location.reload()}>Play again?</button>`;

let winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//adds functionality to every individual cell
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", cellClicked);
}

//this is the function called when any cell is clicked
function cellClicked(e) {
  let cell = e.target;

  //don't do anything if the square that is clicked is not empty
  if (cell.textContent !== "") return;

  //setting clicked cell equal to the player variable
  cell.textContent = player;

  //check if a winCombo was filled
  winCheck();

  if (gameWon !== true && turnCount === 8) {
    tieGame = true;
    gameDraw();
  }

  //switches between X and O
  togglePlayer();
}

function togglePlayer() {
  if (player === "X") {
    player = "O";
  } else {
    player = "X";
  }

  turnCount++;
}

function winCheck() {
  for (let i = 0; i < winCombos.length; i++) {
    let oneCombo = winCombos[i];

    //winCount has to be defined in the outside loop so that it resets to 0 for each winCombo array
    let winCount = 0;

    for (let j = 0; j < oneCombo.length; j++) {
      if (cells[oneCombo[j]].textContent === player) {
        winCount++;
      }

      if (winCount === 3) {
        gameWon = true;
        winText.innerHTML = `${player} wins! <br> ${button}`;
        cells.forEach(function(cell){
          cell.removeEventListener("click", cellClicked);
        });
      }
    }
  }
}

function gameDraw() {
  winText.innerHTML = `It's a tie! <br> ${button}`;
  cells.forEach(function(cell){
    cell.removeEventListener("click", cellClicked);
  });
}
