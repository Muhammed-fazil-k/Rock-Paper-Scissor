//values used for this game
const elements = ["ROCK", "PAPER", "SCISSOR"];

//computerChoice will pickup random integer between 0-2 based on
//that index , a value will be chosen from array
function computerChoice() {
  let rand = Math.random() * elements.length;
  rand = Math.floor(rand);
  return elements[rand];
}

//victoryCall prints the winner of each round
function victoryCall(winner) {
  if (winner === -1) {
    return "Game is Tie";
  }
  let winStr = winner === 1 ? "You" : "Computer";
  return winStr + " won the game";
}

//finalFictoryCall prints the winner of Final game
function finalVictoryCall(winner) {
  if (winner === 1) {
    return "Congrats you defeated the machine";
  } else {
    return "Humanity is lost in this battle";
  }
}

/*
playRound takes input as computerChoice and humanChoice and then decide who is the winner
-1 represent game ended in a tie
0  represent computer won the game
1  represent human won it
*/

function playRound(com, hum) {
  let winner;
  if (com === hum) {
    return -1;
  } else {
    switch (hum) {
      case "ROCK":
        winner = com === "SCISSOR" ? 1 : 0;
        break;
      case "PAPER":
        winner = com === "SCISSOR" ? 0 : 1;
        break;
      case "SCISSOR":
        winner = com === "ROCK" ? 0 : 1;
        break;
      default:
        console.log("Something is wrong");
    }
  }

  return winner;
}

function chooseWinner(humWin,comWin){
  if(humWin==comWin){
    return "Its a Draw"
  }
  else{
    let finalWinner=(humWin>comWin)?1:0
    return finalVictoryCall(finalWinner)
  }
}

/*
playGame will play a fixed round and decide who is final winner
In each round you will choose one value and computer also choose one.
Then winner will be decided using earlier methods
*/

function playGame(userChoice, currentCount, obj) {
  //userinput and randomly choosen computer value
  let compSelection = computerChoice();
  let humSelection = userChoice.toUpperCase();

  //Displaying machine selected value inside the box
  const computerChoiceNode = document.querySelector("div.comp-choice");
  const computerChoiceBlock = computerChoiceNode.firstChild;
  const compSelectionValue =
    compSelection.charAt(0) + compSelection.slice(1).toLowerCase();
  computerChoiceBlock.textContent = compSelectionValue;

  //Displaying paragraph that shows what user clicked
  const userChoicePara = document.querySelector(".player-game-section>p");
  const humanSelectionValue =
    humSelection.charAt(0) + humSelection.slice(1).toLowerCase();
  userChoicePara.textContent = `You chosed ${humanSelectionValue}`;

  //Displaying paragraph that shows what Computer choosed
  const computerChoicePara = document.querySelector(".computer-game-section>p");
  computerChoicePara.textContent = `computer chosed ${compSelectionValue}`;

  let winner = playRound(compSelection, humSelection);

  const winnerPara = document.querySelector(".winner-section>p");
  winnerPara.textContent = victoryCall(winner);

  if (winner != -1) {
    if (winner == 1) {
      humWin++;
    } else {
      comWin++;
    }
  }

  const countSpan = document.querySelector(".score-section>p>span");
  countSpan.textContent = `${count}/${totalCount}`;

  const userScoreValue = document.querySelector(".user-score>.score-value");
  userScoreValue.textContent = humWin;
  const computerScoreValue = document.querySelector(".comp-score>.score-value");
  computerScoreValue.textContent = comWin;

  if (count >= totalCount) {

    const finalResultPara=document.querySelector('.final-result>p>span')
    finalResultPara.textContent=chooseWinner(humWin,comWin)


    const stopChoices = document.querySelectorAll("div.choice");
    stopChoices.forEach((stopChoice) => {
      stopChoice.removeEventListener("click", gameBegins);
    });

  }
}

function gameBegins(e) {
  count++;
  const userChoice = this.classList[1].slice(7);
  playGame(userChoice, count, this);
}

//This is the starting point
let count = 0;
let humWin = 0,
  comWin = 0;
let totalCount = 5;
const choices = document.querySelectorAll("div.choice");
choices.forEach((choice) => {
  choice.addEventListener("click", gameBegins);
});

const resetButton=document.querySelector('button.reload')
resetButton.addEventListener('click',()=>{
  window.location.reload()
})
