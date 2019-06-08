/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


let scores, roundScore, activePlayer, gamePlaying , finalScore;

// scores = [0, 0];
// roundScore = 0;
// activePlayer = 0;

reset();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        let dice = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;
        let diceDOM = document.getElementById('dice-1');
        let diceDOM2 = document.getElementById('dice-2');
        diceDOM.style.display = 'block';
        diceDOM2.style.display = 'block';
        diceDOM.src = `./static/image/dice-${dice}.png`;
        diceDOM2.src = `./static/image/dice-${dice2}.png`;

        if ( (dice !== 1) || dice2 !== 1 ) {
            roundScore = roundScore+ dice + dice2;
            document.getElementById(`current-${activePlayer}`).textContent = roundScore;
        } else {
            getZeroChangePlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    holdScores();
});

document.querySelector('.btn-new').addEventListener('click', function () {
    reset();
});




function reset() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.getElementById(`name-0`).textContent = 'Player 1';
    document.getElementById(`name-1`).textContent = 'Player 2';
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector(`.player-0-panel`).classList.remove('winner');
    document.querySelector(`.player-1-panel`).classList.remove('winner');

    document.querySelector(`.player-0-panel`).classList.remove('active');
    document.querySelector(`.player-1-panel`).classList.remove('active');
    document.querySelector(`.player-0-panel`).classList.add('active');

};



function getZeroChangePlayer() {
    roundScore = 0;
    document.getElementById(`current-${activePlayer}`).textContent = roundScore;
    changePlayer();
};

function changePlayer() {
    document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

function holdScores() {
    scores[activePlayer] += roundScore;
    document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];
    roundScore = 0;
    document.getElementById(`current-${activePlayer}`).textContent = roundScore;
    finalScore = document.querySelector('.final-score').value?document.querySelector('.final-score').value:100;
    if (scores[activePlayer] >= finalScore) {
        winnerPlayer();
    } else {
        changePlayer();
    }
};

function winnerPlayer() {
    gamePlaying = false;
    document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
    document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
    // document.getElementById(`score-${activePlayer}`).textContent = 'WINNER!';
    document.getElementById(`name-${activePlayer}`).textContent = 'WINNER!';
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}
