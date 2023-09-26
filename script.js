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
    currentInputForCalculation = "";
    display.textContent = displayValue.join("");
  });
});
const evaluateButton = document.querySelector("#evaluate");
evaluateButton.addEventListener("click", () => {
  inputArray.push(+currentInputForCalculation);
  currentInputForCalculation = "wrong";
  console.log(`Before while loop ${calculateBuffer}`);
  console.log(inputArray);
  while (
    inputArray.indexOf("multiply") !== -1 ||
    inputArray.indexOf("divide") !== -1
  ) {
    if (inputArray.indexOf("multiply") !== -1) {
      priorityOpIndex = inputArray.indexOf("multiply");
    } else if (inputArray.indexOf("divide") !== -1) {
      priorityOpIndex = inputArray.indexOf("divide");
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
    inputArray.splice(priorityOpIndex - 1, 3, result); //TODO find out why it isnt working as intented

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
  display.textContent = result;
});
// TODO add Keybindings
// const findPriorityOperator = function () {
//   inputArray.forEach((element) => {
//     if (element === "multiply" || element === "divide") {
//       let priorityOpIndex = array.indexOf(element);
//       priorityOp.push(
//         array[priorityOpIndex - 1],
//         array[priorityOpIndex],
//         array[priorityOpIndex + 1]
//       );
//     }
//   });
// };

// switch (element) {
//   case "multiply":
//   case "divide":
//     let priorityOpIndex = inputArray.indexOf(element);
//     calculateBuffer.push(
//       array[priorityOpIndex - 1],
//       array[priorityOpIndex],
//       array[priorityOpIndex + 1]
//     );
//     break;
//   case "add":
//   case "subtract":

//   default:
//     break;
