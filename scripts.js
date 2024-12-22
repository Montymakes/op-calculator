// DOM Variables
const displayTextContainer = document.querySelector("#display-text");
const operandButtons = document.querySelectorAll(".operand");
const operatorButtons = document.querySelectorAll(".operator");
const clearDisplayButton = document.querySelector('#clear');
const equalButton = document.querySelector("#equal");
const decimalButton = document.querySelector("#decimal");
const deleteButton = document.querySelector("#delete");

let equation = '';

const toggleDecimalButton = (disabled) => {
    if (disabled) {
        decimalButton.disabled = false;
    }
    else decimalButton.disabled = true;
}

const toggleDeleteButton = (disabled) => {
    if (disabled) {
        deleteButton.disabled = false;
    }
    else deleteButton.disabled = true;
}

const deleteNumber = () => {
    const displayText = displayTextContainer.textContent.split('');
    const deleted = displayText.pop();
    console.log(deleted)
    if (deleted === ".") toggleDecimalButton(decimalButton.disabled);
    if (displayText.length < 1) toggleDeleteButton(deleteButton.disabled);
    console.log(displayText);
    displayTextContainer.textContent = displayText.join("");
}
deleteButton.addEventListener("click", deleteNumber);

const populateDisplay = (e) => {
    toggleDeleteButton(true);
    if (displayTextContainer.textContent === "IMPOSSIBLE!") clearDisplay();
    if (e.target.id === "decimal") toggleDecimalButton(decimalButton.disabled);
    const value = e.target.value;
    displayTextContainer.textContent += value;
}
for (const button of operandButtons) {
    button.addEventListener("click", populateDisplay);
}

const clearDisplay = () => displayTextContainer.textContent = '';

const removeWaitForNextOperand = () => {
    for (const button of operandButtons) {
        button.removeEventListener('click', waitForNextOperand);
    }
}

const removePressed = () => {
    for (const button of operatorButtons) {
        button.classList.remove('pressed');
    }
}

const clear = () => {
    clearDisplay();
    removeWaitForNextOperand();
    removePressed();
    toggleDecimalButton(true);
    toggleDeleteButton(false);
};

clearDisplayButton.addEventListener("click", clear);

const add = (a, b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => {
    if (b === 0) return "IMPOSSIBLE!";
    return a / b;
};

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
    if (Number(result) && result % 1 !== 0 ) result = Math.round(result * 100000) / 100000; //rounds floats to 5 decimal places.
    displayTextContainer.textContent = result;
    removeEquals();
    toggleDecimalButton(true);
};
   
const waitForNextOperand = (e) => {
    clear();
    populateDisplay(e);
    equalButton.addEventListener("click", equals);
};

const cancelOperation = (e) => {
    removePressed()
    removeWaitForNextOperand();
    if (displayTextContainer.textContent.includes('.')) toggleDecimalButton(decimalButton.disabled);
    removeCancelOperationEventListener(e);
    e.target.addEventListener('click', operation);
};

const removeOperationEventListener = (e) => {
    e.target.removeEventListener('click', operation);
}

const removeCancelOperationEventListener = (e) => {
    e.target.removeEventListener("click", cancelOperation);
}

const operation = (e) => {
    removePressed();
    if (decimalButton.disabled) toggleDecimalButton(decimalButton.disabled);
    e.target.classList.add("pressed");
    equation = `${displayTextContainer.textContent} ${e.target.name}`;
    for (const button of operandButtons) {
        button.addEventListener("click", waitForNextOperand);
    }

    removeOperationEventListener(e);
    e.target.addEventListener('click', cancelOperation);
};

for (const button of operatorButtons) {
    button.addEventListener('click', operation);
}

