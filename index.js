// Variable to call the display text element
const display = document.querySelector(".calc__display").childNodes[1];

// Variables to store math calcs
let storedVal = 0;
let currentOp = "&equals;";
let startNextInput = false;

// Change display function to interact with DOM
const changeDisplay = (value, element) => {
	display.textContent = value;
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
	if (startNextInput === true) {
		if (num === ".") {
			changeDisplay("0.");
		} else {
			changeDisplay(num);
		}
		startNextInput = false;
	} else if (display.textContent === "0") {
		if (num === ".") {
			changeDisplay("0.");
		} else {
			changeDisplay(num);
		}
	} else if (num === ".") {
		// Prevent two decimal points
		if (!display.textContent.includes(".")) {
			changeDisplay(display.textContent + num);
		}
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

const pctBtn = document.getElementById("pct");
const pmBtn = document.getElementById("pm");

pctBtn.addEventListener("click", () => {
	changeDisplay(display.textContent / 100);
});

pmBtn.addEventListener("click", () => {
	changeDisplay(display.textContent * -1);
});
