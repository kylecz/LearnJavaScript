const startGameBtn = document.getElementById('start-game-btn');

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const DEFAULT_USER_CHOICE = ROCK;
const RESULT_DRAW = 'DRAW';
const RESULT_PLAYER_WINS = 'PLAYER_WINS';
const RESULT_COMPUTER_WINS = 'COMPUTER_WINS';

let gameIsRunning = false;

const getPlayerChoice = function() {
    const selection = prompt(`${ROCK}, ${PAPER}, or ${SCISSORS}?`, '').toUpperCase();  //toUpperCase() method (function) converts response to an uppercase
    if (
        selection !== ROCK && 
        selection !== PAPER && 
        selection !== SCISSORS
        ) {
            alert(`Invalid choise!  We chose ${DEFAULT_USER_CHOICE} for you!`);
            return;
    } 
    return selection;
};

const getComputerChoice = () => {
    const randomValue = Math.random();  //Math is a globally available object by JS
    if (randomValue < 0.34) {
        return ROCK;
    } else if (randomValue < 0.67) {
        return PAPER;
    } else {
        return SCISSORS;
    }
};

const getWinner = (cChoice, pChoice = DEFAULT_USER_CHOICE) => {  // if pChoice is undefined, then the default argument passes (DEFAULT_USER_CHOICE)
    if (cChoice === pChoice) {
        return RESULT_DRAW;
    } else if (
        cChoice === ROCK && pChoice === PAPER || 
        cChoice === PAPER && pChoice === SCISSORS ||
        cChoice === SCISSORS && pChoice === ROCK
        ) {
            return RESULT_PLAYER_WINS;     
    } else {
        return RESULT_COMPUTER_WINS;
    }
};


startGameBtn.addEventListener('click', function() {
    if(gameIsRunning) {  //so that the game doesnt start again
        return;
    }
    gameIsRunning = true;
    console.log('Game is starting..');
    const playerChoice = getPlayerChoice();
    const computerChoice = getComputerChoice(); 
    let winner;
    if (playerChoice) {
        winner = getWinner(computerChoice, playerChoice);
    } else {
        winner = getWinner(computerChoice);  //we dont include playerChoice because we know itll be undefined
        //winner = getWinner(computerChoice, playerChoice);  //this will work too actually. If playerChoice is undefined and passed to getWinner, the Default Argument replace it!
    }
        
    let message;
    if (winner === RESULT_DRAW) {
        message = `You picked ${playerChoice || DEFAULT_USER_CHOICE}, computer picked ${computerChoice}, therefore DRAW!`;
    } else if (winner === RESULT_PLAYER_WINS) {
        message = `You picked ${playerChoice || DEFAULT_USER_CHOICE}, computer picked ${computerChoice}, therefore WON!`;
    } else {
        message = `You picked ${playerChoice || DEFAULT_USER_CHOICE}, computer picked ${computerChoice}, therefore LOST!`;
    }
    alert(message);
    gameIsRunning = false;
});




// const sumUp = (resultHandler, ...numbers) => {
//     const validateNumber = (number) => {
//         return isNaN(number) ? 0 : number;
//     };

//     let sum = 0;
//     for (const num of numbers) {
//         sum += validateNumber(num);
//     }
//     resultHandler(sum);
// };

// const showResult = (result) => {
//     alert('The result after adding numbers is: ' + result);
// };

// sumUp(showResult, 43,"sdtf",2,-4,3,5,7);


