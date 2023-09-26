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
let errorFlag = false;
let currentOperator = "";
let result = 0;
let priorityOpIndex = 0;
let calculateBuffer = [];
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
    result = displayValue.join("");

    display.textContent = displayValue.join("");
  });
});

const operatorButtons = document.querySelectorAll(".operatorButton");
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentOperator = button.textContent;
    displayValue.push(currentOperator);
    if (currentInputForCalculation !== "wrong") {
      inputArray.push(+currentInputForCalculation);
    }
    inputArray.push(button.id);
    currentInputForCalculation = "";
    display.textContent = displayValue.join("");
  });
});
//TODO Find out about currentInputForCalculation=wrong and why it causes NaN to appear after pressing = multiple times
const evaluateButton = document.querySelector("#evaluate");
evaluateButton.addEventListener("click", () => {
  inputArray.push(+currentInputForCalculation);
  currentInputForCalculation = "wrong";
  while (
    inputArray.indexOf("multiply") !== -1 ||
    inputArray.indexOf("divide") !== -1
  ) {
    if (inputArray.indexOf("multiply") !== -1) {
      priorityOpIndex = inputArray.indexOf("multiply");
    } else if (inputArray.indexOf("divide") !== -1) {
      priorityOpIndex = inputArray.indexOf("divide");
      if (inputArray[priorityOpIndex + 1] === 0) {
        errorFlag = true;
        inputArray[priorityOpIndex + 1] = 1;
      }
    }
    console.log(priorityOpIndex);
    calculateBuffer.push(
      inputArray[priorityOpIndex - 1],
      inputArray[priorityOpIndex],
      inputArray[priorityOpIndex + 1]
    );
    result = operate(
      calculateBuffer.shift(),
      calculateBuffer.shift(),
      calculateBuffer.shift()
    );
    inputArray.splice(priorityOpIndex - 1, 3, result);

    console.log(`buffer is: ${calculateBuffer}`);
  }
  while (
    inputArray.indexOf("add") !== -1 ||
    inputArray.indexOf("subtract") !== -1
  ) {
    if (inputArray.indexOf("add") !== -1) {
      priorityOpIndex = inputArray.indexOf("add");
    } else if (inputArray.indexOf("subtract") !== -1) {
      priorityOpIndex = inputArray.indexOf("subtract");
    }
    console.log(priorityOpIndex);
    calculateBuffer.push(
      inputArray[priorityOpIndex - 1],
      inputArray[priorityOpIndex],
      inputArray[priorityOpIndex + 1]
    );
    result = operate(
      calculateBuffer.shift(),
      calculateBuffer.shift(),
      calculateBuffer.shift()
    );
    inputArray.splice(priorityOpIndex - 1, 3, result);

    console.log(`buffer is: ${calculateBuffer}`);
  }
  console.log(inputArray);
  displayValue = [result];
  if (!errorFlag) {
    display.textContent = result;
  } else if (errorFlag) {
    display.textContent = "Trying to divide by 0, huh?";
    errorFlag = false;
  }
});
// TODO add Keybindings
const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => {
  errorFlag = false;
  currentOperator = "";
  result = 0;
  priorityOpIndex = 0;
  calculateBuffer = [];
  displayValue = [];
  inputArray = [];
  currentInputForCalculation = "";
  currentInputForDisplay = "";
  display.textContent = "DISPLAY";
});
//TODO Disable ability to write several zeros in a row
