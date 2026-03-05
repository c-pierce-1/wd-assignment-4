document.addEventListener('DOMContentLoaded', () => {
    let wins = 0;
    let losses = 0;
    let ties = 0;
    let isPlaying = false;

    const choices = ['rock', 'paper', 'scissors'];
    const images = {
        rock: 'images/rock.png',
        paper: 'images/paper.png',
        scissors: 'images/scissors.png',
        question: 'images/question-mark.png'
    };

    const playerChoices = document.querySelectorAll('.choice');
    const computerImg = document.getElementById('computer-img');
    const computerText = document.getElementById('computer-text');
    const resultText = document.getElementById('result-text');
    const playAgainBtn = document.getElementById('play-again-btn');
    const resetBtn = document.getElementById('reset-btn');

    const winsEl = document.getElementById('wins');
    const lossesEl = document.getElementById('losses');
    const tiesEl = document.getElementById('ties');

    /** Reset choice highlights, choose a random throw for the computer */
    playerChoices.forEach(choice => {
        choice.addEventListener('click', () => {
            if (isPlaying) return;

            isPlaying = true;
            playAgainBtn.disabled = true;
            resultText.textContent = "COMPUTER THUNKING...";

            playerChoices.forEach(c => c.classList.remove('selected-player'));
            computerImg.parentElement.classList.remove('selected-computer');

            choice.classList.add('selected-player');
            const playerThrow = choice.dataset.choice;

            let shuffleIndex = 0;
            const shuffleInterval = setInterval(() => {
                const currentShuffle = choices[shuffleIndex % 3];
                computerImg.src = images[currentShuffle];
                computerText.textContent = currentShuffle.toUpperCase();
                shuffleIndex++;
            }, 500);

            setTimeout(() => {
                clearInterval(shuffleInterval);
                const randomIndex = Math.ceil(Math.random() * choices.length -1);
                const computerThrow = choices[randomIndex];
                computerImg.src = images[computerThrow];
                computerText.textContent = computerThrow.toUpperCase();
                computerImg.parentElement.classList.add('selected-computer');

                determineWinner(playerThrow, computerThrow);

            }, 3000);
        });
    });

    /** Determines winner by considering all win conditions, then assuming any other condition other
        than a tie is a loss */
    function determineWinner(player, computer) {
        if (player === computer) {
            resultText.textContent = "RESULTS: IT'S A TIE!";
            ties++;
            tiesEl.textContent = ties;
        } else if (
            (player === 'rock' && computer === 'scissors') ||
            (player === 'paper' && computer === 'rock') ||
            (player === 'scissors' && computer === 'paper')
        ) {
            resultText.textContent = "RESULTS: YOU WIN!";
            wins++;
            winsEl.textContent = wins;
        } else {
            resultText.textContent = "RESULTS: COMPUTER WINS!";
            losses++;
            lossesEl.textContent = losses;
        }

        isPlaying = false;
        playAgainBtn.disabled = false;
    }

    /** Reset all UI to fresh state, click this button automatically when pressing the restBtn */
    playAgainBtn.addEventListener('click', () => {
        playerChoices.forEach(c => c.classList.remove('selected-player'));
        computerImg.parentElement.classList.remove('selected-computer');

        computerImg.src = images.question;
        computerText.textContent = "WAITING...";
        resultText.textContent = "MAKE YOUR THROW!";
        playAgainBtn.disabled = true;
    });

    resetBtn.addEventListener('click', () => {
        wins = 0;
        losses = 0;
        ties = 0;
        winsEl.textContent = wins;
        lossesEl.textContent = losses;
        tiesEl.textContent = ties;

        if (!isPlaying) {
            playAgainBtn.click();
        }
    });
});