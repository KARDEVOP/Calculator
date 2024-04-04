document.addEventListener('DOMContentLoaded', (event) => 
{
	//variables
	let values = []; // Added to track the values
	let operators = []; // Added to track the operators
	let isOperate = true; // Added to track if the current input is an operator
	let hasDecimal = false; // Added to track if the current number already has a decimal point

	//operations
	function add(a, b) {return a + b;}
	function subtract(a, b) {return a - b;}
	function multiply(a, b) {return a * b;}
	function divide(a, b) {return a / b;}

	//define listeners
	const numberButtons = document.querySelectorAll(".number");
	const operatorButtons = document.querySelectorAll(".operator");
	const clearButton = document.querySelector(".clear");
	const calculateButton = document.querySelector(".calculate");
	const dotButton = document.querySelector(".dot");
	const textbox = document.querySelector(".textbox");

	numberButtons.forEach(button => {
	  button.addEventListener("click", () => {
	    textbox.style.border = "2px solid black";
	    if (isOperate) {
	      values.push(button.textContent);
	      display(button.textContent); // Display current value
	      isOperate = false; //Reset operate flag
	      hasDecimal = false; // Reset decimal flag when starting a new number
	    } else {
	      values[values.length - 1] += button.textContent;
	      display(button.textContent); // Display  value
	    }
	  });
	});

	operatorButtons.forEach(button => {
	  button.addEventListener("click", () => {
	    if (!isOperate) {
	      textbox.style.border = "2px solid black";
	      operators.push(button.textContent); // Assign the text content of the clicked button to operator
	      display(button.textContent); // Display the operator
	      isOperate = true;
	      hasDecimal = false; // Reset decimal flag when an operator is added
	    } else {
	      textbox.style.border = "2px solid red";
	    }
	  });
	});

	dotButton.addEventListener("click", () => {
	  if (!hasDecimal) {
	    if (isOperate || values.length === 0) {
	      values.push("0."); // Start a new number with "0."
	      isOperate = false;
	    } else {
	      if (!values[values.length - 1].includes(".")) {
	        values[values.length - 1] += ".";
	      }
	    }
	    display("."); // Display the decimal point
	    hasDecimal = true; // Set the flag to true after adding a decimal point
	  }
	});

	calculateButton.addEventListener("click", () => {
	  if (values.length > 1 && operators.length > 0) {
	    let result = calculateResult(values, operators);
	    textbox.value = "";
	    let formattedResult = parseFloat(result).toFixed(3).replace(/\.?0*$/, ''); // Round to 3 significant digits if decimals > 0 and remove unnecessary zeros
	    display(formattedResult); // Display the formatted result
	    // Reset values for next calculation, but keep the result as the first value if user wants to continue calculating
	    values = [result.toString()];
	    operators = [];
	    hasDecimal = (result.toString().indexOf('.') !== -1); // Check if the result is a decimal number
	  } else {
	    textbox.style.border = "2px solid red";
	  }
	});

	clearButton.addEventListener("click", () => {
	  values = [];
	  operators = [];
	  textbox.value = "";
    isOperate = true; // Corrected to properly reset the isOperate flag
	  hasDecimal = false; // Reset the decimal flag
	  display("");
	});

	function calculateResult(values, operators) {
	  let result = 0;
    result = parseFloat(values[0]);
	  for (let i = 1; i < values.length; i++) {
	    let nextValue = parseFloat(values[i]);
	    switch (operators[i-1]) {
	      case "+":
	        result = add(result, nextValue);
	        break;
	      case "-":
	        result = subtract(result, nextValue);
	        break;
	      case "*":
	        result = multiply(result, nextValue);
	        break;
	      case "/":
	        if(nextValue === 0) {
	          result = 'Cannot divide by zero';
	        } else {
	          result = divide(result, nextValue);
	        }
	        break;
	      default:
	        result = 'Invalid operator';
	    }
	  }
	  console.log(result);
	  return result;
	}

	function display(value) {
	  textbox.value += value.toString();
	}
});
