const add = function (a, b) {
  console.log(a);
  console.log(b);
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};
const multiply = function (a, b) {
  return a * b;
};
const multiplyArray = function (array) {
  let result = 1;
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    result *= array[index];
  }
  return result;
};

const divide = function (a, b) {
  return a / b;
};
const sum = function (array) {
  if (array.length === 0) {
    return 0;
  } else {
    let result = 0;
    for (let index = 0; index < array.length; index++) {
      let element = array[index];
      result += element;
    }
    return result;
  }
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
const operate = function (firstNumber, operator, secondNumber) {
  switch (operator) {
    case "add":
      console.log("function add");
      return add(firstNumber, secondNumber);
    case "subtract":
      return subtract(firstNumber, secondNumber);
    case "multiply":
      return multiply(firstNumber, secondNumber);
    case "divide":
      return divide(firstNumber, secondNumber);
      break;
  }
};

let displayValue = [];
let inputArray = [];
let currentInputForCalculation = "";
let currentInputForDisplay = "";
const display = document.getElementById("display");
display.textContent = "DISPLAY";
const numberButtons = document.querySelectorAll(".numberButton");
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentInputForCalculation += button.id;
    currentInputForDisplay = button.id;
    displayValue.push(currentInputForDisplay);
    display.textContent = displayValue.join("");
  });
});
let currentOperator = "";
let result = 0;
const operatorButtons = document.querySelectorAll(".operatorButton");
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentOperator = button.textContent;
    displayValue.push(currentOperator);
    if (currentInputForCalculation !== "wrong") {
      inputArray.push(+currentInputForCalculation);
    }
    inputArray.push(button.id);
    console.log(inputArray);
    currentInputForCalculation = "";
    display.textContent = displayValue.join("");
    // TODO After pressing operator button we should remember currentInput, clear it and start writing new input
  });
});
const evaluateButton = document.querySelector("#evaluate");
evaluateButton.addEventListener("click", () => {
  inputArray.push(+currentInputForCalculation);
  currentInputForCalculation = "wrong";

  console.log(`before operate: ${inputArray}`);
  result = operate(inputArray.shift(), inputArray.shift(), inputArray.shift());
  inputArray[0] = result;
  console.log(`after operate: ${inputArray}`);
  displayValue = [result];
  display.textContent = result;
  console.log(displayValue);
});
