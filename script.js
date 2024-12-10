// declare variable of cards from memory-card class
const cards = document.querySelectorAll('.memory-card');

// declare global variables
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let guessCounter = 0;


function flipCard() {
  //stop function if lockBoard true
  if (lockBoard) return;
  //stop function if card clicked is the same as first card
  if (this === firstCard) return;

  //adds 'flip' to the card class list on clicking card
  //memory-card.flip added to CSS to rotate (flip) card
  this.classList.add('flip');

  //first time card is clicked
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
  matchCounter ();
  updateGuessCounter ();
}

//function checks if the two cards selected have the same attribute
function checkForMatch() {
  //dataset is used to access the data attribute that was added to each image in HTML file
  //uses ternary operator
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  //if match call disableCards function, if not call unflipCards function
  isMatch ? disableCards() : unflipCards();
}

//prevents cards being flipped if they have already been matched
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  //if no match, board is locked to prevent user flipping more cards before unmatched cards are turned back over
  lockBoard = true;

// sets timer to show unmatched cards before they are turned back over
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

//resets board after each turn
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

//function is wrapped in parentheses to call it immediately
(function shuffle() {
  cards.forEach(card => {
    //each card gets assigned a random number
    //this number is then used to shuffle the cards
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
})();

// Reset game function
function resetGame() {
  // Unflip cards
  cards.forEach(card => {
    card.classList.remove('flip');
  });
  // Shuffle cards
  shuffleBoard();
  // Reset board
  resetBoard();
  // Reset guess counter
  guessCounter = 0;
  document.getElementById('guessCounter').textContent = guessCounter;

  //reattach event listener
  cards.forEach(card => card.addEventListener('click', flipCard));
}

function shuffleBoard() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
}

//count matches
function matchCounter() {
  let matches = document.querySelectorAll('.memory-card.flip').length;
}

//update guess counter
function updateGuessCounter() {
  guessCounter++;
  document.getElementById('guessCounter').textContent = guessCounter;
}

document.getElementById('resetButton').addEventListener('click', resetGame);

//event listener
cards.forEach(card => card.addEventListener('click', flipCard));