import { changeElementText } from "./dom-utils.js";
import { evaluate, shorten } from "./calc.js";

// Variables to store calculation values
let storedVal = 0;
let currentOp = "=";
let startNextInput = false;

// Variables for target elements
const display = document.querySelector(".calc__display").childNodes[1];
const acBtn = document.querySelector("#ac");
const numberBtns = document.querySelectorAll(".calc__input__btn--nums"); // NodeList
const opsBtn = document.querySelectorAll(".calc__input__btn--ops"); // NodeList
const pctBtn = document.getElementById("pct");
const pmBtn = document.getElementById("pm");

// Resets text content of element to 0
const resetDisplay = () => {
	changeElementText(0, display);
	storedVal = 0;
};

// Changes display according to number passed
const numClick = (num) => {
	if (startNextInput === true || display.textContent === "ERROR") {
		// If a new number should be started
		if (num === ".") {
			// Change to 0. if . is clicked
			changeElementText("0.", display);
		} else {
			// Else change to the new number
			changeElementText(num, display);
		}
		startNextInput = false; // Reset startNextInput to false
	} else if (display.textContent === "0") {
		// If current display is zero
		if (num === ".") {
			// Change to 0. if . is clicked
			changeElementText("0.", display);
		} else {
			// Else change to new number
			changeElementText(num, display);
		}
	} else if (num === ".") {
		// If . is clicked and display is not 0 and not starting new number
		// Concatenate . to displayed only if there is no . already
		if (!display.textContent.includes(".")) {
			changeElementText(display.textContent + num, display);
		} // Else ignore
	} else if (display.textContent.length > 9) {
		// If displayed number is 10+ characters
		changeElementText("3RR0R", display);
	} else {
		// All other cases - concatenate new number to displayed
		changeElementText(display.textContent + num, display);
	}
};

// Updates display when an operation is evaluated
const equals = () => {
	// Store currently displayed value
	const currentVal = display.textContent;
	// console.log(storedVal, currentOp, currentVal);

	// Evaluate the math operation using storedVal, currentVal, and current operator
	const result = evaluate(storedVal, currentVal, currentOp);
	// console.log("=", result);

	// Change the display to the new value
	changeElementText(result, display);

	// Store the new value and allow the next input
	storedVal = result;
	startNextInput = true;
	// console.log("storedVal is ", storedVal);
};

// Event Listeners
// AC Button - resets display and clears memory
acBtn.addEventListener("click", () => {
	resetDisplay();
});

// Number Buttons - takes value of button clicked and changes display
numberBtns.forEach((numBtn) => {
	numBtn.addEventListener("click", () => {
		const num = numBtn.textContent.trim();
		// console.log(num);
		numClick(num);
	});
});

// Operator Buttons -
// always evaluates previous calculation before storing operator clicked
// and allowing next number to be input.
opsBtn.forEach((operator) => {
	operator.addEventListener("click", () => {
		// Evaluate the previous operation first
		equals();
		// console.log("Prev operator: ", currentOp);
		// Register the new operation
		currentOp = operator.textContent.trim();
		// console.log("New operator: ", currentOp);
	});
});

// Special Buttons
// % Divides displayed number by 100
pctBtn.addEventListener("click", () => {
	changeElementText(shorten(display.textContent / 100), display);
});

// +/- negates displayed number
pmBtn.addEventListener("click", () => {
	changeElementText(shorten(display.textContent * -1), display);
});
