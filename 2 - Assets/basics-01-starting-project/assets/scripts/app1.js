
// initialize constant
const defaultResult = 0;
// declare variable
let currentResult = defaultResult;
// declare empty array
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

// define function that would add two numbers
function add() {
    const enteredNumber = getUserNumberInput(); 
    const initialResult = currentResult;  
    //console.log('Input', enteredNumber, currentResult)  //console.log to debug and better understand code flow
    currentResult += enteredNumber; 
    createAndWriteOutput('+', initialResult, enteredNumber);
    writeToLog('ADD', initialResult, enteredNumber, currentResult);
}
// add functions for all buttons
function subtract() {
    const enteredNumber = getUserNumberInput();   
    const initialResult = currentResult;  
    currentResult -= enteredNumber;
    createAndWriteOutput('-', initialResult, enteredNumber);
    writeToLog('SUBTRACT', initialResult, enteredNumber, currentResult);
}
function multiply() {
    const enteredNumber = getUserNumberInput();   
    const initialResult = currentResult;  
    currentResult *= enteredNumber;
    createAndWriteOutput('*', initialResult, enteredNumber);
    writeToLog('MULTIPLY', initialResult, enteredNumber, currentResult);
}
function divide() {
    const enteredNumber = getUserNumberInput();   
    const initialResult = currentResult;  
    currentResult /= enteredNumber;
    createAndWriteOutput('/', initialResult, enteredNumber);
    writeToLog('DIVIDE', initialResult, enteredNumber, currentResult);
}
// 'addBtn' (found in vendor.js) is a pointer to the actual add button on the html page
addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
multiplyBtn.addEventListener('click', multiply);
divideBtn.addEventListener('click', divide);







