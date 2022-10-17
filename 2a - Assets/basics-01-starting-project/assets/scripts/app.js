
// 2a
// initialize (set value) of a constant (that cannot change)
const defaultResult = 0;
// declare variable
let currentResult = defaultResult;
// set and overwrite variable to the initial value plus 10; information on the right-side of = is evaluated first
currentResult = currentResult + 10;
currentDescription = `We start with ${defaultResult} and \n now we have:`;
    // *to see the line break (\n) on the webpage, go to Developer tools > add 'white-space: pre;' under 'element.style', under 'Styles'
// output the variable by calling a function we created in 'vendor.js', taking our inputs, and targets/overrides two pieces of our index.html code
outputResult(currentResult, currentDescription);

