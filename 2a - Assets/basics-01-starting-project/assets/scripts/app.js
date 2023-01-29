
// 2a
// goal - create calculator
// initialize (set value) of a constant (that cannot change)
const defaultResult = 0;
// declare variable
let currentResult = defaultResult;
// set and overwrite variable to the initial value plus 10; information on the right-side of = is evaluated first
//// currentResult = currentResult + 10;
//// currentDescription = `We start with ${defaultResult} and \n now we have:`;
    // *to see the line break (\n) on the webpage, go to Developer tools > add 'white-space: pre;' under 'element.style', under 'Styles'
// output the variable by calling a function we created in 'vendor.js', taking our inputs, and targets/overrides two pieces of our index.html code
//// outputResult(currentResult, currentDescription);

// 2b
// create a function, called 'add', that would add two numbers (two parameters that we would pass)
function add(num1, num2) {
    const result = num1 + num2;
    //// alert("The result is " + result);  // outputs some alert ('alert' is a built-in function)
    return result;  //returns some value (that can be stored in a variable for example)
}
// call our new 'add' function to have it executed and store it in a constant
currentResult = add(1, 3);
// output to calculator
currentDescription = `We start with ${defaultResult} and now we have:`;
outputResult(currentResult, currentDescription);
