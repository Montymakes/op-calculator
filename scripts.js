// DOM Variables
const displayTextContainer = document.querySelector("#display-text");
const operandButtons = document.querySelectorAll(".operand");
const operatorButtons = document.querySelectorAll(".operator");
const clearDisplayButton = document.querySelector('#clear');
const equalButton = document.querySelector("#equal");

//Holds value
let equation = '';


const populateDisplay = (e) => {
    const value = e.target.value;
    displayTextContainer.textContent += value;
}
for (const button of operandButtons) {
    button.addEventListener("click", populateDisplay);
}

const clearDisplay = () => displayTextContainer.textContent = '';
clearDisplayButton.addEventListener("click", clearDisplay);

const add = (a, b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => a / b;

const operate = (firstOperand, operator, secondOperand) => {
    switch (operator) {
        case "add": return add(firstOperand, secondOperand);
        case "subtract": return subtract(firstOperand,secondOperand);
        case "multiply": return multiply(firstOperand,secondOperand)
        case "divide": return divide(firstOperand,secondOperand);
    }
}
const removeEquals = () => {
    equalButton.removeEventListener("click", equals);
}

const equals = (e) => {
    const secondOperand = displayTextContainer.textContent;
    const [firstOperand, operator] = equation.split(" ");
    let result = operate(Number(firstOperand), operator, Number(secondOperand));
    if (result % 1 !== 0) result = Math.round(result * 100000) / 100000; //rounds floats to 5 decimal places.
    displayTextContainer.textContent = result;

    removeEquals();
}

const removeWaitForNextOperand = () => {
    for (const button of operandButtons) {
        button.removeEventListener('click', waitForNextOperand);
    }
}

const waitForNextOperand = (e) => {
    clearDisplay();
    removeWaitForNextOperand();
   
    for (const button of operatorButtons) {
        button.classList.remove('pressed');
    }

    populateDisplay(e);

    equalButton.addEventListener("click", equals);
}

const operation = (e) => {
    e.target.classList.add("pressed");
    equation = `${displayTextContainer.textContent} ${e.target.name}`;
    for (const button of operandButtons) {
        button.addEventListener('click', waitForNextOperand);
    }
}

for (const button of operatorButtons) {
    button.addEventListener('click', operation);
}

