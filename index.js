/*
1. addEventListener for each button
2. Number Buttons
    - Replace content of display if display 0 or previous button was an operator
    - Concatenate to display if display is a number or a .
3. Operator Buttons
    - Store value currently on display
    - Evaluate any previous operations in memory involving current displayed value
    - Output any evaluations to display
4. x AC Button
    - Reset display to 0 and clear stored values
5. +/- Button
    - Negate current displayed value and output to display
6. % Button
    - Divide current displayed number by 100 before evaluating any operations
7. . Button
    - Concatenate to current displayed number or 0
*/

// Variable to call the display text element
const display = document.querySelector(".calc__display").childNodes[1];

// Variables to store math calcs
let storedVal = 0;
let currentOp = "&equals;";
let startNextInput = false;

// Change display function to interact with DOM
const changeDisplay = (value) => {
	display.innerText = value;
};

// AC Button Event Listener
const acBtn = document.querySelector("#ac");

acBtn.addEventListener("click", () => {
	resetDisplay();
});

const resetDisplay = () => {
	changeDisplay(0);
	storedVal = 0;
};

// Number button Event listeners
const numberBtns = document.querySelectorAll(".calc__input__btn--nums");

numberBtns.forEach((numBtn) => {
	numBtn.addEventListener("click", () => {
		const num = numBtn.textContent.trim();
		console.log(num);
		numClick(num);
	});
});

const numClick = (num) => {
	// console.log(num)
	if (display.textContent === "0" || startNextInput === true) {
		changeDisplay(num);
		startNextInput = false;
	} else if (display.textContent.length > 9) {
		// replace with fn?
		changeDisplay("TOO BIG");
	} else if (display.textContent === "TOO BIG") {
		resetDisplay();
	} else {
		changeDisplay(display.textContent + num);
	}
};

// Operator button event listeners
const opsBtn = document.querySelectorAll(".calc__input__btn--ops");

opsBtn.forEach((op) => {
	op.addEventListener("click", () => {
		// 1 + 2
		// Press plus, 1 is stored, display reset when 2 is clicked
		// numClick stores previous val
		// plus is new operator
		// Press equals, evaluate stored num, operator, displaynum, output to display

		//prev + 3
		// Press plus, prev is stored, display reset when 3 is clicked
		// Need to evaluate previous ops prior to changing operator var
		// - Store value currently on display

		// - Evaluate any previous operations in memory involving current displayed value

		// - Output any evaluations to display

		// console.log("Current val", currentVal, "Current op", currentOp);

		// evaluate the previous operation first
		equals();
		console.log("Prev operator: ", currentOp);
		// register the new operation
		currentOp = op.textContent.trim();
		console.log("New operator: ", currentOp);
	});
});

// evaluate returns a number based on the parameters passed
const evaluate = (stored, operator, current) => {
	let result;
	if (operator === "+") {
		result = Number(stored) + Number(current);
	} else if (operator === "−") {
		result = Number(stored) - Number(current);
	} else if (operator === "÷") {
		result = Number(stored) / Number(current);
	} // need to add case for long decimals - if length > 10
	else if (operator === "×") {
		result = Number(stored) * Number(current);
	} else {
		result = current;
	}

	if (String(result).length > 10) {
		result = Number(String(result).substring(0, 10)); // doesn't currently round last decimal place
	}
	// operator = "&equals;";
	return result;
};

const equals = () => {
	const currentVal = display.textContent;
	console.log(storedVal, currentOp, currentVal);
	const result = evaluate(storedVal, currentOp, currentVal);
	console.log("=", result);
	display.textContent = result;
	storedVal = result;
	console.log("storedVal is ", storedVal);
	startNextInput = true;
};

// Need a case for if outputted number is too big - maybe use a function to replace condition check?
