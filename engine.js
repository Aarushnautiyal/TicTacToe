const cellList = document.querySelectorAll('[data-cell]')
const win = document.querySelector("[winning-message]");
const theBox = document.querySelector(".theBox");
const message = document.getElementById('message');
const message1 = document.getElementById("message1");
const CLASS_X = 'x';
const CLASS_O = 'circle';
const WINNING_COMBINATION = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let circleTurn = false;

const submit = document.querySelector('#submit')

submit.addEventListener("click", (e) => {
  e.preventDefault();
  const player1 = document.querySelector("#x").value;
  const player2 = document.querySelector("#o").value;
  if (player1.length > 0 && player2.length > 0) {
    message1.classList.remove("show");
  } else {
    alert("type both player names");
  }

  startGame();

  function startGame() {
    cellList.forEach((cell) => {
      cell.classList.remove(CLASS_O);
      cell.classList.remove(CLASS_X);
      cell.removeEventListener("click", handler);
      cell.addEventListener("click", handler, { once: true });
    });
    addingHover();
    message.classList.remove("show");
  }

  // handling the xo placer
  function handler(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CLASS_O : CLASS_X;
    placeMark(cell, currentClass);
    if (checkWIn(currentClass)) {
      endGame(false);
    } else if (isDraw()) {
      endGame(true);
    } else {
      swap(); //turning circle false to true
      addingHover();
    }
    // console.log(checkWIn(currentClass))
    // swap() //turning circle false to true
    // addingHover()
  }

  function endGame(draw) {
    if (draw) {
      win.innerText = "draw";
    } else {
      win.innerText = `${circleTurn ? player2 : player1} Wins!`;
    }
    message.classList.add("show");
  }

  function isDraw() {
    return [...cellList].every((combination) => {
      return (
        combination.classList.contains(CLASS_X) ||
        combination.classList.contains(CLASS_O)
      );
    });
  }

  function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
  }

  function swap() {
    circleTurn = !circleTurn;
  }

  function addingHover() {
    theBox.classList.remove(CLASS_X);
    theBox.classList.remove(CLASS_O);
    if (circleTurn) {
      theBox.classList.add(CLASS_O);
    } else {
      theBox.classList.add(CLASS_X);
    }
  }

  function checkWIn(currentClass) {
    return WINNING_COMBINATION.some((combination) => {
      return combination.every((index) => {
        return cellList[index].classList.contains(currentClass);
      });
    });
  }
});