//variables
let value1=null;
let value2=null;
let operator=null;

//operations
function add(a, b) 
{
  return a + b;
}
function subtract(a, b) 
{
  return a - b;
}
function multiply(a, b) 
{
  return a * b;
}
function divide(a, b) 
{
  return a / b;
}

//define listeners
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".clear");
const calculateButton = document.querySelector(".calculate");

numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Your code here
  });
});

operatorButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Your code here
    operator=button.value;
    display(operator);
  });
});
clearButton.addEventListener("click", () => 
{
  // Your code here
  value1=null;
  value2=null;
  operator=null;
  display("0");
});
calculateButton.addEventListener("click", () => 
{
  // Your code here
});


function operate(operator, a, b) 
{
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return "Invalid operator";
  }
}

function display(value) 
{
  document.querySelector(".display").value += value;
}

function calculator()
{

}

calculator();

