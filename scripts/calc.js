/**
 * A function which performs a math operation
 * @param {(string|number)} stored Accepts a number of type string or number as the left operand
 * @param {(string|number)} current Accepts a number of type string or number as the right operand
 * @param {(string|number)} operator (+, −, ÷, × or =) The operator applied to the pair of numbers
 * @returns {string} Result of math operation, or the right operand if the operator is =
 */
export const evaluate = (stored, current, operator) => {
	let result;

	switch(operator) {
		case "+":
			result = Number(stored) + Number(current);
			break;
		case "−":
			result = Number(stored) - Number(current);
			break;
		case "÷":
			result = Number(stored) / Number(current);
			break;
		case "×":
			result = Number(stored) * Number(current);
			break;
		default:
			result = current;
	}

	return shorten(result);
};

/**
 * A function that converts long numbers to exponential notation
 * @param {number} num Any number
 * @returns {string} The number or its exponential notation form if longer than 10 characters
 */
export const shorten = (num) => {
	if (String(num).length > 10) {
		return num.toExponential(4);
	}
	return String(num);
};
