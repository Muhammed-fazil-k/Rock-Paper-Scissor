//values used for this game
const elements = ["Rock", "Paper", "Scissor"];
elements.forEach((ele, ind) => {
  elements[ind] = ele.toUpperCase();
});

//computerChoice will pickup random integer between 0-2 based on
//that index , a value will be chosen from array
function computerChoice() {
  let rand = Math.random() * elements.length;
  rand = Math.floor(rand);
  return elements[rand];
}

/*humChoice will ask for user input through prompt and will convert
input into uppercase for uniformity and check whether user
entered values that are present in array or not.
If not it will again loop through this process
*/
function humChoice() {
  let humC = prompt("Enter your choice");
  humC = humC.toUpperCase();
  if (!elements.includes(humC)) {
    console.log("Enter correctlyu ");
    return humChoice();
  } else {
    return humC;
  }
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

/*
playGame will play a fixed round and decide who is final winner
In each round you will choose one value and computer also choose one.
Then winner will be decided using earlier methods
*/

function playGame() {
  let totalCount = 3;
  let humWin = 0,
    comWin = 0;

  for (let i = 0; i < totalCount; i++) {
    let compSelection = computerChoice();
    let humSelection = humChoice();
    let choiceStr = `You chosed ${humSelection} 
    computer chosed ${compSelection}`;
    console.log(choiceStr);
    let winner = playRound(compSelection, humSelection);
    console.log(victoryCall(winner));
    if (winner != -1) {
      if (winner == 1) {
        humWin++;
      } else {
        comWin++;
      }
    }

    let scoreTemplate = `Your Score ${humWin}/${totalCount}
Computer Score ${comWin}/${totalCount}`;
    console.log(scoreTemplate + ` \tcurrent count ${i + 1}`);
    console.log("-------------------------------------");
  }

  if (humWin === comWin) {
    console.log("Final Game ended in TIE");
  } else if (humWin > comWin) {
    console.log(finalVictoryCall(1));
  } else {
    console.log(finalVictoryCall(0));
  }
}


//This is the starting point
playGame();
