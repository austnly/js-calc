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

// AC Button Event Listener
const acBtn = document.querySelector("#ac");

acBtn.addEventListener("click", () => {
	resetDisplay();
});

const resetDisplay = () => {
	let display = document.querySelector(".calc__display").childNodes[1];
	display.innerText = "0";
};

// Number button Event listeners
const numberBtns = document.querySelectorAll(".calc__input__btn--nums");

numberBtns.forEach((numBtn) => {
	numBtn.addEventListener("click", () => {
		const inputNum = numBtn.textContent.trim();
		// console.log(inputNum);
		updateDisplay(inputNum);
	});
});

const updateDisplay = (num) => {
	console.log(num);
	let display = document.querySelector(".calc__display").childNodes[1];
	if (display.textContent === "0") {
		display.textContent = num;
	} else if (display.textContent.length > 9) {
		// replace with fn?
		display.textContent = "TOO BIG";
	} else if (display.textContent === "TOO BIG") {
		resetDisplay();
	} else {
		display.textContent += num;
	}
};

// Need a case for if outputted number is too big - maybe use a function to replace condition check?
