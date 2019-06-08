/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

const player1Panel = document.getElementById('player-1-panel');
const player2Panel = document.getElementById('player-2-panel');
const playerPanel = [player1Panel, player2Panel];

const player1Name = document.querySelector('#player-1-panel > .player-name');
const player2Name = document.querySelector('#player-2-panel > .player-name');
const playerName = [player1Name, player2Name];

const player1Score = document.querySelector('#player-1-panel > .player-score');
const player2Score = document.querySelector('#player-2-panel > .player-score');
const playerScore = [player1Score, player2Score];

const player1CurrentScore = document.querySelector('#player-1-panel .player-current-score');
const player2CurrentScore = document.querySelector('#player-2-panel .player-current-score');
const playerCurrentScore = [player1CurrentScore, player2CurrentScore];

const dice1 = document.getElementById('dice-1');
const dice2 = document.getElementById('dice-2');

const btnRoll = document.getElementById('btn-roll');
const btnHold = document.getElementById('btn-hold');
const btnNew = document.getElementById('btn-new');

const finalScoreInput = document.getElementById('final-score');

let scores, roundScore, activePlayer, gamePlaying , finalScore;

reset();

btnRoll.addEventListener('click', function () {
    if (!gamePlaying) return;
  
    let dice1Point = Math.floor(Math.random() * 6) + 1;
    let dice2Point = Math.floor(Math.random() * 6) + 1;

    if (dice1Point === 1 && dice2Point === 1) return getZeroChangePlayer();

    dice1.style.visibility = 'visible';
    dice2.style.visibility = 'visible';
    dice1.src = `./static/image/dice-${dice1Point}.png`;
    dice2.src = `./static/image/dice-${dice2Point}.png`;
    
    roundScore = roundScore + dice1Point + dice2Point;
    playerCurrentScore[activePlayer].textContent = roundScore;
});

btnHold.addEventListener('click', function () {
    holdScores();
});

btnNew.addEventListener('click', function () {
    reset();
});

function reset() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    dice1.style.visibility = 'hidden';
    dice2.style.visibility = 'hidden';
    player1Name.textContent = 'Player 1';
    player2Name.textContent = 'Player 2';
    player1Score.textContent = 0;
    player2Score.textContent = 0;
    player1CurrentScore.textContent = 0;
    player2CurrentScore.textContent = 0;
    player1Panel.classList.remove('winner');
    player2Panel.classList.remove('winner');

    player1Panel.classList.remove('active');
    player2Panel.classList.remove('active');
    player1Panel.classList.add('active');
};



function getZeroChangePlayer() {
    roundScore = 0;
    playerCurrentScore[activePlayer].textContent = roundScore;
    changePlayer();
};

function changePlayer() {
    playerPanel[activePlayer].classList.toggle('active');
    activePlayer = activePlayer === 0 ? 1 : 0;
    playerPanel[activePlayer].classList.toggle('active');
    dice1.style.visibility = 'hidden';
    dice2.style.visibility = 'hidden';
}

function holdScores() {
    scores[activePlayer] += roundScore;
    playerScore[activePlayer].textContent = scores[activePlayer];
    roundScore = 0;
    playerCurrentScore[activePlayer].textContent = roundScore;
    finalScore = finalScoreInput.value ? finalScoreInput.value : 100;
    if (scores[activePlayer] >= finalScore) return winnerPlayer();
    changePlayer();
};

function winnerPlayer() {
    gamePlaying = false;
    playerPanel[activePlayer].classList.add('winner');
    playerPanel[activePlayer].classList.remove('active');
    playerName[activePlayer].textContent = 'WINNER!';
    dice1.style.visibility = 'hidden';
    dice2.style.visibility = 'hidden';
}
