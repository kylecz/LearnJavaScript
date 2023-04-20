const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';

const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

function getMaxLifeValues() {
    const enteredValue = parseInt(prompt('Max life for you and monster', '100'));  // prompt returns string; parseInt converts string to number
        //parseInt is forgiving in the sense that it doesnt throw an error (if user enters string), it throws NaN, which we check below

    const parsedValue = enteredValue;
    if (isNaN(parsedValue) || parsedValue <= 0) {  // isNaN is a builtin function that checks if a user doesnt input number
        throw {message: 'Invalid user input, not a number!'};  // throw an error (in dev console) if user doesnt enter number
    }
    return parsedValue;
}
let chosenMaxLife;
try {
    chosenMaxLife = getMaxLifeValues();
}   catch(error) {  // throws a logged message back .. not a JS error (that would be typically shown in red in console)
    console.log(error);
    chosenMaxLife = 100;
    alert('You entered something wrong, default value is now 100');
}

let battleLog = [];
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
let lastLoggedEntry;

adjustHealthBars(chosenMaxLife);

function writeToLog(eventt, valuee, monsterHealth, playerHealth) {
    let logEntry;

    switch(eventt) {
        case LOG_EVENT_PLAYER_ATTACK:
            logEntry = {
                event: eventt,
                value: valuee,
                target: 'MONSTER',
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth
            };
            break;  // built-in; if this case has been handled, then no other case should be handled
        case LOG_EVENT_PLAYER_STRONG_ATTACK:
            logEntry = {
                event: eventt,
                value: valuee,
                target: 'MONSTER',
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth
            };
            break;
        case LOG_EVENT_MONSTER_ATTACK:
            logEntry = {
                event: eventt,
                value: valuee,
                target: 'PLAYER',
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth
            };
            break;
        case LOG_EVENT_PLAYER_HEAL:
            logEntry = {
                event: eventt,
                value: valuee,
                target: 'PLAYER',
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth
            };
            break;
        case LOG_EVENT_GAME_OVER:
            logEntry = {
                event: eventt,
                value: valuee,
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth
            };
            break;
        default:
           logEntry = {}; 
    }
   
    battleLog.push(logEntry);
}

function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    // monster then attacks us
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    writeToLog(LOG_EVENT_MONSTER_ATTACK, playerDamage, currentMonsterHealth, currentPlayerHealth);

    // use available bonus player life if killed
    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth; // reset player health to not subtract last attack (aka save player)
        setPlayerHealth(initialPlayerHealth);
        alert('you would be dead but the bonus life saved you!')
    }

    // result message!
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('you won!');
        writeToLog(LOG_EVENT_GAME_OVER, 'PLAYER WON!', currentMonsterHealth, currentPlayerHealth)
        reset();
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('you lost!');
        writeToLog(LOG_EVENT_GAME_OVER, 'MONSTER WON!', currentMonsterHealth, currentPlayerHealth)
        reset();
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert('draw');
        writeToLog(LOG_EVENT_GAME_OVER, 'DRAW!', currentMonsterHealth, currentPlayerHealth)
        reset();
    }
}

function attackMonster(mode) {
    const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
    const logEvent = mode === MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK;
    // if (mode === MODE_ATTACK) {
    //     maxDamage = ATTACK_VALUE
    //     logEvent = LOG_EVENT_PLAYER_ATTACK;
    // } else if (mode === MODE_STRONG_ATTACK) {
    //     maxDamage = STRONG_ATTACK_VALUE;
    //     logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
    // }
    // we attack monster
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
    // monster then attacks us, return message
    endRound();
}
function attackHandler() {
    attackMonster(MODE_ATTACK);
}
function strongAttackHandler() {
    attackMonster(MODE_STRONG_ATTACK);
}
function healPlayerHandler() {
    let healValue;
    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
        alert('You cant heal to more than your max initial health');
        healValue = chosenMaxLife - currentPlayerHealth;
    } else {
       healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    writeToLog(LOG_EVENT_PLAYER_HEAL, healValue, currentMonsterHealth, currentPlayerHealth);
    // monster then attacks us, return message
    endRound();
}

function printLogHandler() {
    //// in this example, each different type of for-loop output similar results

    // for (let i=0; i < battleLog.length; i++) {
    //     console.log(battleLog[i]);
    // }

    // for (const logEntry of battleLog) {
    //     console.log(logEntry);
    // }

    let i = 0;
    for (const logEntry of battleLog) {
            if (!lastLoggedEntry && lastLoggedEntry !== 0 || lastLoggedEntry < i) {  // if (entry is not falsy AND not equal to zero) OR (entry smaller than i)
                console.log(`Number: ${i}`);
                for (const key in logEntry) {
                    // console.log(key);
                    // console.log(logEntry[key]);
                    //// more readable:
                    console.log(`${key} >>> ${logEntry[key]}`);
                }
                lastLoggedEntry = i;
                break;
            }  
            i++;
            
        }
    
    // console.log(battleLog);
}


attackBtn.addEventListener('click', attackHandler)  // 'attackBtn' references button on html page. 'addEventListener' - upon every 'click', 'attackHandler' executes
strongAttackBtn.addEventListener('click', strongAttackHandler) 
healBtn.addEventListener('click', healPlayerHandler)
logBtn.addEventListener('click', printLogHandler)