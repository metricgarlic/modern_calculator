/** @format */

let history = [];

function handleButtonClick(event) {
	const target = event.target;
	if (target.matches('input[type="button"]')) {
		const value = target.dataset.value;
		switch (value) {
			case "C":
				clearDisplay();
				break;
			case "del":
				deleteLastCharacter();
				break;
			case "=":
				calculate();
				break;
			case "%":
				calculatePercentage();
				break;
			default:
				appendToDisplay(value);
		}
	}
}

function appendToDisplay(value) {
	let display = document.getElementById("display");
	if (display.value === "Error" || display.value === "undefined") {
		clearDisplay();
	}
	let lastChar = display.value[display.value.length - 1];

	if (value === "." && display.value.includes(".")) return;
	// Prevent adding multiple decimal point

	if (isNaN(value) && isNaN(lastChar)) {
		display.value = display.value.slice(0, -1) + value;
	} else {
		display.value += value;
	}
}

function calculate() {
	let display = document.getElementById("display");
	let result;
	try {
		const calculationFunction = new Function("return " + display.value);
		result = calculationFunction();
		history.push(display.value + " = " + result);
		display.value = result;
	} catch (error) {
		display.value = "Error";
	}
	updateHistory();
}

function clearDisplay() {
	let display = document.getElementById("display");
	display.value = "";
}

function deleteLastCharacter() {
	let display = document.getElementById("display");
	display.value = display.value.slice(0, -1);
}

function calculatePercentage() {
	let display = document.getElementById("display");
	try {
		let expression = display.value;
		let operators = ["+", "-", "*", "/"];
		for (let i = 0; i < operators.length; i++) {
			let operatorIndex = expression.lastIndexOf(operators[i]);
			if (operatorIndex !== -1) {
				let number = parseFloat(expression.substring(operatorIndex + 1));
				let percentage =
					parseFloat(expression.substring(0, operatorIndex)) * (number / 100);
				display.value = (
					parseFloat(expression.substring(0, operatorIndex)) + percentage
				).toString();
				return;
			}
		}
		// If no operator is found, calculate percentage of the whole number
		let number = parseFloat(expression);
		let percentage = number / 100;
		display.value = percentage.toString();
	} catch (error) {
		display.value = "Error";
	}
}

function updateHistory() {
	let historyElement = document.getElementById("history");
	historyElement.innerHTML = "<h2>History:</h2><br>";
	for (let i = 0; i < history.length; i++) {
		historyElement.innerHTML +=
			history[i] +
			'<hr style="width:40%; margin:10px 0; color: var(--history-color);">';
	}
}

function toggleHistory() {
	var historyDiv = document.querySelector(".history");
	if (historyDiv.style.display === "block") {
		historyDiv.style.display = "none";
	} else {
		historyDiv.style.display = "block";
	}
}

// Listen for keypress events
document.addEventListener("keydown", function (event) {
	const key = event.key;
	if (key >= "0" && key <= "9") {
		appendToDisplay(key);
	} else if (key === "+" || key === "-" || key === "*" || key === "/") {
		appendToDisplay(key);
	} else if (key === ".") {
		appendToDisplay(".");
	} else if (key === "Enter") {
		calculate();
	} else if (key === "Delete" || key === "Backspace") {
		deleteLastCharacter();
	} else if (key === "%") {
		calculatePercentage();
	}
});

function changeTheme(theme) {
	const root = document.documentElement;
	switch (theme) {
		case "white":
			root.style.setProperty("--background-color", "#f0f0f0");
			root.style.setProperty("--calculator-background", "#fff");
			root.style.setProperty("--button-background", "#f0f0f0");
			root.style.setProperty("--button-hover-background", "#e0e0e0");
			root.style.setProperty("--operator-color", "#fd7e14");
			root.style.setProperty("--equals-background", "#fd7e14");
			root.style.setProperty("--equals-hover-background", "#ffae42");
			root.style.setProperty("--equals-text-color", "#fff");
			root.style.setProperty("--history-color", "#aaa");
			root.style.setProperty("--text-color", "#000000");
			break;

		case "red":
			root.style.setProperty("--background-color", "#f0f0f0");
			root.style.setProperty("--calculator-background", "#4E2A2A");
			root.style.setProperty("--button-background", "#6E3939");
			root.style.setProperty("--button-hover-background", "#CC7373");
			root.style.setProperty("--operator-color", "#FF6565");
			root.style.setProperty("--equals-background", "#FF6565");
			root.style.setProperty("--equals-hover-background", "#FF3D3D");
			root.style.setProperty("--equals-text-color", "#ffffff");
			root.style.setProperty("--history-color", "#FF6565");
			root.style.setProperty("--text-color", "#FFFFFF");
			break;

		case "yellow":
			root.style.setProperty("--background-color", "#f0f0f0");
			root.style.setProperty("--calculator-background", "#4E4A2A");
			root.style.setProperty("--button-background", "#6E6B39");
			root.style.setProperty("--button-hover-background", "#CCCC73");
			root.style.setProperty("--operator-color", "#FFFF65");
			root.style.setProperty("--equals-background", "#F7C832");
			root.style.setProperty("--equals-hover-background", "#FFFF3D");
			root.style.setProperty("--equals-text-color", "#ffffff");
			root.style.setProperty("--history-color", "#F7C832");
			root.style.setProperty("--text-color", "#FFFFFF");
			break;

		case "blue":
			root.style.setProperty("--background-color", "#f0f0f0");
			root.style.setProperty("--calculator-background", "#2A374E");
			root.style.setProperty("--button-background", "#39526E");
			root.style.setProperty("--button-hover-background", "#73A6CC");
			root.style.setProperty("--operator-color", "#65A9FF");
			root.style.setProperty("--equals-background", "#65A9FF");
			root.style.setProperty("--equals-hover-background", "#3D8CFF");
			root.style.setProperty("--equals-text-color", "#ffffff");
			root.style.setProperty("--history-color", "#65A9FF");
			root.style.setProperty("--text-color", "#FFFFFF");
			break;

		case "green":
			root.style.setProperty("--background-color", "#f0f0f0");
			root.style.setProperty("--calculator-background", "#34483E");
			root.style.setProperty("--button-background", "#3E5B4A");
			root.style.setProperty("--button-hover-background", "#86A697");
			root.style.setProperty("--operator-color", "#6ABBA9");
			root.style.setProperty("--equals-background", "#6ABBA9");
			root.style.setProperty("--equals-hover-background", "# ");
			root.style.setProperty("--equals-text-color", "#ffffff");
			root.style.setProperty("--history-color", "#6ABBA9");
			root.style.setProperty("--text-color", "#FFFFFF");
			break;
		default:
			break;
	}
}
