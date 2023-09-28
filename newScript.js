let firstOperand = "";
let secondOperand = "";
let shouldResetScreen = false;
let currentOperation = null;
const numberButtons = document.querySelectorAll(".numberButton");
const operatorButtons = document.querySelectorAll(".operatorButton");
const evaluateButton = document.querySelector("#evaluate");
const display = document.querySelector("#display");
const lastDisplay = document.querySelector("#lastDisplay");
const clearButton = document.querySelector("#clear");
const decimalButton = document.querySelector(".decimal");
const deleteButton = document.querySelector("#backspace");
window.addEventListener("keydown", handleKeyboardInput);
numberButtons.forEach((button) => {
  button.addEventListener("click", () => appendNumber(button.textContent));
});
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => setOperation(button.textContent));
});
evaluateButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clear);
decimalButton.addEventListener("click", appendPoint);
deleteButton.addEventListener("click", deleteNumber);
function appendNumber(number) {
  if (display.textContent === "0" || shouldResetScreen) {
    resetScreen();
  }
  display.textContent += number;
}
function resetScreen() {
  display.textContent = "";
  shouldResetScreen = false;
}
function clear() {
  display.textContent = "0";
  lastDisplay.textContent = "";
  firstOperand = "";
  secondOperand = "";
  currentOperation = null;
}
function appendPoint() {
  if (shouldResetScreen) resetScreen();
  if (display.textContent === "") display.textContent = "0";
  if (display.textContent.includes(".")) return;
  display.textContent += ".";
}
function deleteNumber() {
  display.textContent = display.textContent.toString().slice(0, -1);
}
function setOperation(operator) {
  if (currentOperation !== null) evaluate();
  firstOperand = display.textContent;
  currentOperation = operator;
  lastDisplay.textContent = `${firstOperand} ${currentOperation}`;
  shouldResetScreen = true;
}
function evaluate() {
  if (currentOperation === null || shouldResetScreen) return;
  if (currentOperation === "÷" && display.textContent === "0") {
    alert("Trying to divide by zero, huh?");
    return;
  }
  console.log(firstOperand);
  secondOperand = display.textContent;
  console.log(secondOperand);
  display.textContent = roundResult(
    operate(firstOperand, currentOperation, secondOperand)
  );
  lastDisplay.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
  currentOperation = null;
}
function roundResult(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}
function roundResultS(number) {
  return Math.round(number * 1000) / 1000;
}
//
function operate(firstNumber, operator, secondNumber) {
  firstNumber = +firstNumber;
  secondNumber = +secondNumber;
  switch (operator) {
    case "+":
      return add(firstNumber, secondNumber);
    case "-":
      return subtract(firstNumber, secondNumber);
    case "×":
      return multiply(firstNumber, secondNumber);
    case "÷":
      return divide(firstNumber, secondNumber);
  }
}
function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === ".") appendPoint();
  if (e.key === "=" || e.key === "Enter") evaluate();
  if (e.key === "Backspace") deleteNumber();
  if (e.key === "Escape") clear();
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
    setOperation(convertOperator(e.key));
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === "/") return "÷";
  if (keyboardOperator === "*") return "×";
  if (keyboardOperator === "-") return "−";
  if (keyboardOperator === "+") return "+";
}

const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};
const multiply = function (a, b) {
  return a * b;
};
const divide = function (a, b) {
  return a / b;
};
const power = function (a, b) {
  return a ** b;
};
const factorial = function (a) {
  if (a === 0) {
    return 1;
  } else {
    let result = 1;
    for (let index = 0; index < a; index++) {
      result *= index + 1;
    }
    return result;
  }
};
