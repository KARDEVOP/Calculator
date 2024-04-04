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
	const backSpaceButton = document.querySelector(".backSpace"); // Added backSpace button
	const textbox = document.querySelector(".textbox");

	numberButtons.forEach(button => {
	  button.addEventListener("click", () => {
	    handleNumberInput(button.textContent);
	  });
	});

	operatorButtons.forEach(button => {
	  button.addEventListener("click", () => {
	    handleOperatorInput(button.textContent);
	  });
	});

	dotButton.addEventListener("click", () => {
	  handleDotInput();
	});

	calculateButton.addEventListener("click", () => {
	  handleCalculate();
	});

	clearButton.addEventListener("click", () => {
	  handleClear();
	});

	// Implement backSpace functionality
	backSpaceButton.addEventListener("click", () => {
	  handleBackspace();
	});

	// Keyboard support
	document.addEventListener('keydown', (e) => {
	  if (e.key >= 0 && e.key <= 9) { // Number keys
	    handleNumberInput(e.key);
	  } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') { // Operator keys
	    handleOperatorInput(e.key);
	  } else if (e.key === '.') { // Dot key
	    handleDotInput();
	  } else if (e.key === 'Enter' || e.key === '=') { // Enter or equals key
	    handleCalculate();
	  } else if (e.key === 'Backspace') { // Backspace key
	    handleBackspace();
	  } else if (e.key.toUpperCase() === 'C') { // Clear key
	    handleClear();
	  }
	});

	function handleNumberInput(number) {
	  textbox.style.border = "2px solid black";
	  if (isOperate) {
	    values.push(number);
	    display(number); // Display current value
	    isOperate = false; //Reset operate flag
	    hasDecimal = false; // Reset decimal flag when starting a new number
	  } else {
	    values[values.length - 1] += number;
	    display(number); // Display value
	  }
	}

	function handleOperatorInput(operator) {
	  if (!isOperate) {
	    textbox.style.border = "2px solid black";
	    operators.push(operator); // Assign the operator
	    display(operator); // Display the operator
	    isOperate = true;
	    hasDecimal = false; // Reset decimal flag when an operator is added
	  } else {
	    textbox.style.border = "2px solid red";
	  }
	}

	function handleDotInput() {
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
	}

	function handleCalculate() {
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
	}

	function handleClear() {
	  values = [];
	  operators = [];
	  textbox.value = "";
	  isOperate = true; // Corrected to properly reset the isOperate flag
	  hasDecimal = false; // Reset the decimal flag
	  display("");
	}

	function handleBackspace() {
	  if (!isOperate && values.length > 0) {
	    let currentNumber = values[values.length - 1];
	    if (currentNumber.length > 1) {
	      values[values.length - 1] = currentNumber.slice(0, -1); // Remove the last digit
	    } else {
	      values.pop(); // Remove the last number if it's a single digit
	      isOperate = true; // If we remove a number, the next input could be an operator
	    }
	    textbox.value = textbox.value.slice(0, -1); // Update the display
	  } else if (operators.length > 0) {
	    operators.pop(); // Remove the last operator
	    isOperate = false; // Allow entering a new number after removing an operator
	    textbox.value = textbox.value.slice(0, -1); // Update the display
	  }
	}

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
