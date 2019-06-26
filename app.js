let min = 1,
  max = 10,
  winningNum = randomNum(),
  guessesLeft = 3;

const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessIp = document.querySelector('#guess-input');
message = document.querySelector('.message');

minNum.textContent = min;
maxNum.textContent = max;

function randomNum() {
  return parseInt(Math.random() * (max - min + 1) + min);
}

game.addEventListener('mousedown', function(e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessIp.value);

  if (isNaN(guess) || guess < min || guess > max) {
    guessIp.value = '';
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  } else if (guess === winningNum) {
    gameOver(true, `You won!..${winningNum} is correct`, 'green');
  } else {
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      gameOver(
        false,
        `Game over, You lost :(. The correct number is ${winningNum}.`,
        'red'
      );
    } else {
      guessIp.style.borderColor = 'red';
      guessIp.value = '';
      setMessage(
        `${guess} is not correct. ${guessesLeft} guesses left.`,
        'red'
      );
    }
  }
});

//game over
function gameOver(won, msg, txtClr) {
  let color;
  won === true ? (color = 'green') : (color = 'red');

  guessIp.disabled = true;
  guessIp.style.borderColor = color;
  setMessage(msg, txtClr);

  //play again
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
