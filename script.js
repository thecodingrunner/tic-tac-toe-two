const message = document.querySelector("span")
const boxes = Array.from(document.querySelectorAll(".box"))
const container = document.querySelector(".container")
const twoplayer = document.querySelector(".twoplayer")
const computer = document.querySelector(".computer")

let playArray = new Array(9).fill(0);
let winConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]
let turns = 0;
let playerTurn = "x"
let won = false;

twoplayer.addEventListener('click', () => {
  endGame();
  twoplayerGame();
})

function twoplayerGame() {
  boxes.forEach(box => {
    box.addEventListener('click', (e) => {
      if (playArray[e.target.id] == 0) {
        fillBox(e.target.id, playerTurn)
        playArray[e.target.id] = playerTurn
      } else return
      winChecker(playerTurn);
      turns += 1
      if (turns == 9) drawChecker();
      playerTurn = playerTurn == "x" ? "o" : "x";
    })
  })
}

computer.addEventListener('click', () => {
  endGame();
  computerGame();
})

function computerGame() {
  if (playerTurn == 'x') {
    boxes.forEach(box => {
      box.addEventListener('click', (e) => {
        if (playArray[e.target.id] == 0) {
          fillBox(e.target.id, playerTurn)
          playArray[e.target.id] = playerTurn
        } else return
        winChecker(playerTurn);
        turns += 1
        if ((turns == 9) && (won == false)) drawChecker();
        if (won == false) {
        playerTurn = playerTurn == "x" ? "o" : "x";
        machineChoose(playerTurn)
        winChecker(playerTurn);
        if ((turns == 9) && (won == false)) drawChecker();
        playerTurn = playerTurn == "x" ? "o" : "x";
        }
      })
    })
  }
}

// boxes.addEventListener('click', () => {
//   console.log("test")
// })

function fillBox(id, turn) {
  boxes[id].classList.add("fill");
  boxes[id].textContent = turn;
}

function winChecker(turn) {
  for (let condition of winConditions) {
    let [a,b,c] = condition;
    if ((playArray[a] != 0) && (playArray[a] == playArray[b]) && (playArray[a] == playArray[c])) {
      message.textContent = `${turn} wins!`;
      won = true
      makeButton()
    }
  }
}

function makeButton() {
  let button = document.createElement("button")
  message.appendChild(button)
  button.textContent = "Play Again?"
  button.addEventListener('click', () => {
    endGame()
  })
}

function drawChecker() {
    message.textContent = `It's a draw!`;
    makeButton()
}

function endGame() {
  playArray = Array(9).fill(0);
  boxes.forEach(box => {
    box.classList.remove("fill")
    box.textContent = "";
  })
  message.textContent = "Let's Play!";
  // button.remove()
  won = false;
  turns = 0;
}


function machineChoose(turn) {
  let choice = Math.floor(Math.random() * 9);
  while (playArray[choice] != 0) {
    choice = Math.floor(Math.random() * 9)
  }
  if (playArray[choice] == 0) {
    fillBox(choice, turn)
    playArray[choice] = turn
    turns += 1
  } else return
}

