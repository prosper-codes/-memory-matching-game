const gameBoard = document.querySelector('.game-board');
const scoreEl = document.querySelector('.score');
const highScoreEl = document.querySelector('.highscore');
const restartBtn = document.querySelector('.again');

let cards = [];
let firstCard = null;
let secondCard = null;
let score = 0;
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
    if (this.classList.contains('revealed') || firstCard && secondCard) return;

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
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        resetSelection();
        score += 10;
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
}

// Restart Game
restartBtn.addEventListener('click', () => {
    score = 0;
    scoreEl.textContent = score;
    cardValues.sort(() => Math.random() - 0.5);
    createBoard();
});

createBoard();
