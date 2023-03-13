//// CODE FOR '4 - CONTROL STRUCTURES'

const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];


// define function to get user input
function getUserNumberInput() {
    return parseInt(userInput.value);  // 'userInput' (found in vendor.js) is a pointer to the actual user input, found on the html page   
}
// define function that simplifies the below functions, to output result 
function createAndWriteOutput(operator, resultBeforeCalc, calcNumber) {
    const calcDesscription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
    // output these results by calling a function we created in 'vendor.js' that takes our inputs, and rights them into some (index.)html code (in <section id="results">)
    outputResult(currentResult, calcDesscription);
}

// define function to write to log
function writeToLog(operationIdentifier, prevResult, operationNumber, newResult) {
    const logEntry = {
        operation: operationIdentifier,
        prevResult: prevResult,
        number: operationNumber,
        result: newResult
    };
    logEntries.push(logEntry);
    console.log(logEntries);
}

function calculateResult(calculationType) {
    const enteredNumber = getUserNumberInput(); 

    // include IF statement that if the calculationType is not one we support, then there's no use in continuing .. so 'return' so no further code executes
    if (
        calculationType !== 'ADD' && 
        calculationType !== 'SUBTRACT' && 
        calculationType !== 'MULTIPLY' && 
        calculationType !== 'DIVIDE' ||
        !enteredNumber  // if the value entered is not true (e.g. 0), then the if-statment yields true and 'return' is executed
        ) {
        return;
    }
    
    
    const initialResult = currentResult;  
    let mathOperator;
    if (calculationType === 'ADD') {
        currentResult += enteredNumber; 
        mathOperator = '+';
    } else if (calculationType === 'SUBTRACT') {
        currentResult -= enteredNumber;
        mathOperator = '-';
    } else if (calculationType === 'MULTIPLY') {
        currentResult *= enteredNumber;
        mathOperator = '*';
    } else if (calculationType === 'DIVIDE') {
        currentResult /= enteredNumber;
        mathOperator = '/';
    }

    
    createAndWriteOutput(mathOperator, initialResult, enteredNumber);
    writeToLog(calculationType, initialResult, enteredNumber, currentResult);
}



function add() {
    calculateResult('ADD');
}
function subtract() {
    calculateResult('SUBTRACT');
}
function multiply() {
    calculateResult('MULTIPLY');
}
function divide() {
    calculateResult('DIVIDE');
}

// 'addBtn' (found in vendor.js) is a pointer to the actual add button on the html page
addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
multiplyBtn.addEventListener('click', multiply);
divideBtn.addEventListener('click', divide);







