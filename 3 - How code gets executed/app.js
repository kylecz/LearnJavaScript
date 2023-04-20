


// functions are stored in Heap within the browser
function getName() {
  return prompt('Your name: ', '');
}
function great() {
  const userName = getName();
  console.log('Hello ' + userName);
}

// great() is called and stored in Stack, followed by getName() which is called and then stored in Stack
great();