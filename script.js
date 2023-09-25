const add = function (a, b) {
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
let currentInput = "";
const display = document.getElementById("display");
display.textContent = "DISPLAY";
const numberButtons = document.querySelectorAll(".numberButton");
console.log(numberButtons);
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    console.log(button.id);
    currentInput += button.id;
    display.textContent = currentInput;
  });
});
