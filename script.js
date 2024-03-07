"use strict";

//select elements
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

//staring conditions
score0El.textContent = 0;
// score1El.innerHTML = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

let currentScore = 0;
let activePlayer = 0;
const scores = [0, 0];
let playing = true;

const switchPlayer = function () {
  // reset the score of preview player to 0
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //switch to the next player
  activePlayer = activePlayer === 0 ? 1 : 0;
  //reset the current player's score
  currentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//rollong the dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1. generating a radon dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. display the dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`; //choose the random image

    //3. check for rolled 1
    if (dice !== 1) {
      //add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1. add current score to active player's score
    scores[activePlayer] += currentScore;
    console.log(scores[activePlayer]);
    // scores[1]= scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check if player's score is > = 100
    //finish the game
    if (scores[activePlayer] >= 100) {
      diceEl.classList.add("hidden");
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});
