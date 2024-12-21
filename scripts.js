const add = (a, b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => a / b;

const operate = (firstOperand, secondOperand, operator) => {
    switch (operator) {
        case "add": return add(firstOperand, secondOperand);
        case "subtract": return subtract(firstOperand,secondOperand);
        case "multiply": return multiply(firstOperand,secondOperand)
        case "divide": return divide(firstOperand,secondOperand);
    }
}

const displayTextContainer = document.querySelector("#display-text");

const populateDisplay = (e) => {
    const value = e.target.value;
    displayTextContainer.textContent += value;
}
const operandButtons = document.querySelectorAll(".operand");
for (const button of operandButtons) {
    button.addEventListener("click", populateDisplay);
}

const clearDisplayButton = document.querySelector('#clear');
const clearDisplay = () => displayTextContainer.textContent = '';
const waitForNextOperand = (e) => {
    clearDisplay();
    for (const button of operandButtons) {
        button.removeEventListener('click', waitForNextOperand);
    }
    for (const button of operatorButtons) {
        button.classList.remove('pressed');
    }

    populateDisplay(e);
}

clearDisplayButton.addEventListener("click", clearDisplay);


let equation = '';
const operatorButtons = document.querySelectorAll(".operator");
const operation = (e) => {
    //highlight the operator button that was just clicked
    e.target.classList.add("pressed");
    //store the first operand in the equation variable
    equation = `${displayTextContainer.textContent} ${e.target.value}`;
    // add an event listener to operands that will clear the screen
    for (const button of operandButtons) {
        button.addEventListener('click', waitForNextOperand);
    }
}

for (const button of operatorButtons) {
    button.addEventListener('click', operation);
}