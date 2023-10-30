let timer = document.querySelector('.timer');
let holes = document.querySelectorAll('.hole');
let moles = document.querySelectorAll('.mole')
let scoreDisplay = document.querySelector('.score');
score = 0;
isGameRunning = false;
let lastIndex;
let countDown_timer;
let popUp_timer;


function startGame() {
    resetGame();
    isGameRunning = true;
    countDown();
    gameLoop() 
    
}

function resetGame() {
    clearInterval(countDown_timer);
    clearTimeout(popUp_timer);
    isGameRunning = false;
    timer.textContent = 10; // Reset timer to initial value
    score = 0; // Reset score to zero
    scoreDisplay.textContent = score; // Update displayed score
}

function gameLoop() {
    if(timer.textContent == 0) {
        endGame();
        return
    }
    popUp();
    setTimeout(gameLoop, 1500);

}

function countDown() {
    countDown_timer = setInterval(() => {
        if (timer.textContent == 0) {
            clearInterval(countDown_timer)
            endGame()
            return;
        }
        timer.textContent-- }, 1000);
}

function endGame() {
    clearInterval(countDown_timer);
    clearTimeout(popUp_timer);
    
    return
}

function popUp() {
    let holeIndex = randomPopUp();
    holes[holeIndex].classList.add("up");
    moles[holeIndex].addEventListener('click', whackMole)

    popUp_timer = setTimeout(() => {
        holes[holeIndex].classList.remove("up");
        moles[holeIndex].removeEventListener('click', whackMole)
    }, 1000 + Math.random() * 2000);
}

function whackMole() {
    if(!isGameRunning)
    return
    score++;
    this.parentNode.classList.remove("up");
    updateScore()
}

function updateScore() {
    document.querySelector(".score").textContent = score
}

function randomPopUp() {
    let index = Math.floor(Math.random() * holes.length);
    if (lastIndex == index) {
        return randomPopUp();
    }
    lastIndex = index;
    return index;
}