"use strict";

// chon cac element can xu ly
const current0EL = document.getElementById("current-0");
const current1EL = document.getElementById("current-1");
const score0EL = document.getElementById("score-0");
const score1EL = document.getElementById("score-1");
const player0EL = document.querySelector(".player-0");
const player1EL = document.querySelector(".player-1");
const diceEL = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold");
const btnNew = document.querySelector(".btn-new");

// khai bao cac bien luu tru
let currentScore, activePlayer, scores, playing;

// viet ham khoi tao game de xu ly cac bien trung lap nhau
const init = function () {
  // khoi tao cac bien luu tru
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true; // kiem tra trang thai game

  // gan gia tri ban dau khi khoi dong game
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  diceEL.classList.add("hidden");
  player0EL.classList.remove("player-winner");
  player1EL.classList.remove("player-winner");
  player0EL.classList.add("player-active");
  player1EL.classList.remove("player-active");
};

// chay ham khoi tao game
init();

// viet ham de xu ly cac code trung lap
const displaycurrent = function (active) {
  return document.getElementById(`current-${active}`);
};

const swichPlayer = function () {
  displaycurrent(activePlayer).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0EL.classList.toggle("player-active");
  player1EL.classList.toggle("player-active");
};

// xu ly su kien roll dice
btnRoll.addEventListener("click", function () {
  if (playing) {
    // tao so random tu 1 - 6 cho dice
    let dice = Math.trunc(Math.random() * 6) + 1;

    // hien thi hinh anh dice theo bien dice nhan duoc
    diceEL.classList.remove("hidden");
    diceEL.src = `dice-${dice}.png`;

    // kiem tra dieu kien dice co khac 1
    if (dice !== 1) {
      // gan gia tri cua dice cho current score
      currentScore += dice;
      // hien thi currentscore theo bien active player
      displaycurrent(activePlayer).textContent = currentScore;
    } else {
      // chuyen doi nguoi choi
      swichPlayer();
    }
  }
});

// xu ly su kien hold
btnHold.addEventListener("click", function () {
  if (playing) {
    // gan currentscore cho total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer];
    // kiem tra xem co nguoi thang chua
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add("player-winner");
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove("player-active");
      diceEL.classList.add("hidden");
    } else {
      // chuyen nguoi choi
      swichPlayer();
    }
  }
});

// xu ly su kien new game
btnNew.addEventListener("click", init);
