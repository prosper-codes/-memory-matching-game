const gameBoard = document.querySelector('.game-board');
const scoreEl = document.querySelector('.score');
const highScoreEl = document.querySelector('.highscore');
const restartBtn = document.querySelector('.again');

let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 100; // Start score at 100
let highScore = localStorage.getItem('highscore') || 0;
highScoreEl.textContent = highScore;

const symbols = ['🐱', '🐶', '🐰', '🦊', '🐵', '🐷', '🐸', '🐼'];
let cardValues = [...symbols, ...symbols]; // Pairs of each symbol

// Shuffle the cards
cardValues.sort(() => Math.random() - 0.5);

function createBoard() {
    gameBoard.innerHTML = '';
    cards = [];

    cardValues.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
        cards.push(card);
    });
}

function flipCard() {
    if (this.classList.contains('revealed') || lockBoard) return;

    this.textContent = this.dataset.symbol;
    this.classList.add('revealed');

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        checkMatch();
    }
}

function checkMatch() {
    lockBoard = true;

    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        resetSelection();
        score += 2; // Increase score for correct match
        scoreEl.textContent = score;

        if (document.querySelectorAll('.revealed').length === cards.length) {
            if (score > highScore) {
                highScore = score;
                localStorage.setItem('highscore', highScore);
                highScoreEl.textContent = highScore;
            }
            setTimeout(() => alert('🎉 You won!'), 500);
        }
    } else {
        score -= 2; // Decrease score for wrong match
        scoreEl.textContent = score;
        setTimeout(() => {
            firstCard.classList.remove('revealed');
            secondCard.classList.remove('revealed');
            firstCard.textContent = '';
            secondCard.textContent = '';
            resetSelection();
        }, 1000);
    }
}

function resetSelection() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

// Restart Game
restartBtn.addEventListener('click', () => {
    score = 100; // Reset score to 100
    scoreEl.textContent = score;
    cardValues.sort(() => Math.random() - 0.5);
    createBoard();
});

createBoard();
