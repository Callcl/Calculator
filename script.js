let firstNumber = "";
let secondNumber = "";
let currentOperator = "";
let currentDisplay = "0";
let isDecimal = false;

document.addEventListener("keydown", handleKeyPress);

function appendNumber(number) {
  if (currentDisplay === "0") {
    currentDisplay = number.toString();
  } else {
    currentDisplay += number.toString();
  }
  updateDisplay();
}

function appendDecimal() {
  if (!isDecimal) {
    currentDisplay += ".";
    isDecimal = true;
    updateDisplay();
  }
}

function clearDisplay() {
  currentDisplay = "0";
  firstNumber = "";
  secondNumber = "";
  currentOperator = "";
  isDecimal = false;
  updateDisplay();
}

function setOperator(operator) {
  if (firstNumber === "") {
    firstNumber = currentDisplay;
    currentOperator = operator;
    currentDisplay = "0";
    isDecimal = false;
  } else if (secondNumber === "") {
    secondNumber = currentDisplay;
    const result = operate(firstNumber, secondNumber, currentOperator);
    firstNumber = result.toString();
    currentOperator = operator;
    currentDisplay = "0";
    isDecimal = false;
  }
}

function operate(num1, num2, operator) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      if (num2 === 0) {
        alert("Cannot divide by zero");
        clearDisplay();
        return "Error";
      }
      return num1 / num2;
    default:
      return num2;
  }
}

function calculateResult() {
  if (firstNumber !== "" && secondNumber !== "" && currentOperator !== "") {
    secondNumber = currentDisplay;
    const result = operate(firstNumber, secondNumber, currentOperator);
    currentDisplay = result.toString();
    firstNumber = currentDisplay;
    secondNumber = "";
    currentOperator = "";
    isDecimal = false;
    updateDisplay();
  }
}

function updateDisplay() {
  document.getElementById("display").textContent = currentDisplay;
}

function handleKeyPress(event) {
  const key = event.key;

  if (key >= "0" && key <= "9") {
    appendNumber(key);
  }

  if (key === "+" || key === "-" || key === "*" || key === "/") {
    setOperator(key);
  }

  if (key === "Enter") {
    calculateResult();
  }

  if (key === ".") {
    appendDecimal();
  }

  if (key === "Escape") {
    clearDisplay();
  }

  event.preventDefault();
}
