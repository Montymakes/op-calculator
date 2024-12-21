// DOM Variables
const displayTextContainer = document.querySelector("#display-text");
const operandButtons = document.querySelectorAll(".operand");
const operatorButtons = document.querySelectorAll(".operator");
const clearDisplayButton = document.querySelector('#clear');
const equalButton = document.querySelector("#equal");



//Display Control Functions
const populateDisplay = (e) => {
    const value = e.target.value;
    displayTextContainer.textContent += value;
}
for (const button of operandButtons) {
    button.addEventListener("click", populateDisplay);
}

const clearDisplay = () => displayTextContainer.textContent = '';
clearDisplayButton.addEventListener("click", clearDisplay);

//Functions and Variables for Calculator Operations
let equation = ''; 
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

const equals = () => {
    const secondOperand = displayTextContainer.textContent;
    const [firstOperand, operator] = equation.split(" ");
    const result = operate(Number(firstOperand), operator, Number(secondOperand));
    displayTextContainer.textContent = result;

    removeEquals();
}

const waitForNextOperand = (e) => {
    clearDisplay();
    for (const button of operandButtons) {
        button.removeEventListener('click', waitForNextOperand);
    }

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

