let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let result = null;
let screenValue = '0';
const buttons = document.querySelectorAll('button');

function updateScreen() {
    const screen = document.querySelector('#screen');
    screen.textContent = screenValue;
    if(screenValue.length > 9) {
        s.textContent = screenValue.substring(0, 9);
    }
}

updateScreen();

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.classList.contains('digit-btn')) {
            inputOperand(button.value);
            updateScreen();
        };
        if (button.classList.contains('operator')) {
            inputOperator(button.value);
        };
        if (button.classList.contains('equal-btn')) {
            inputEqual();
            updateScreen();
        }
        if (button.classList.contains('clear-btn')) {
            clearScreen();
            updateScreen();
        };
        if (button.classList.contains('backspace-btn')) {
            inputBackspace();
            updateScreen();
        };
        if (button.classList.contains('flip-sign-btn')) {
            inputFlipSign();
            updateScreen();
        };
        if (button.classList.contains('percent-btn')) {
            inputPercent();
            updateScreen();
        };
        if (button.classList.contains('float-btn')) {
            inputDecimal(button.value);
            updateScreen();
        };
    });
});

function inputOperand (operand) {
    if (firstOperator === null) {
        if (screenValue === '0' || screenValue === 0) {
            screenValue = operand;
        } else if (screenValue === firstOperand) {
            screenValue = operand;
        } else {
            screenValue += operand;
        }
    } else {
        if (screenValue === firstOperand) {
            screenValue = operand;
        } else {
            screenValue += operand;
        }
    }
};

function inputOperator(operator) {
    if (firstOperator != null && secondOperator === null) {
        secondOperator = operator;
        secondOperand = screenValue;
        result = operate(+firstOperand, +secondOperand, firstOperator);
        screenValue = result.toString();
        firstOperand = screenValue;
        result = null;
    } else if (firstOperator !== null && secondOperator != null) {
        secondOperand = screenValue;
        result = operate(+firstOperand, +secondOperand, secondOperator);
        secondOperator = operator;
        screenValue = result.toString();
        firstOperand = screenValue;
        result = null;
    } else {
        firstOperator = operator;
        firstOperand = screenValue;
    }

    updateScreen();
};

function inputEqual() {
    if(firstOperator === null) {
        screenValue = screenValue;
    } else if(secondOperator != null) {
        secondOperand = screenValue;
        result = operate(+firstOperand, +secondOperand, secondOperator);
        if(result === 'ERROR') {
            screenValue = 'ERROR';
        } else {
            screenValue = result.toString();
            firstOperand = screenValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    } else {
        secondOperand = screenValue;
        result = operate(+firstOperand, +secondOperand, firstOperator);
        if(result === 'ERROR') {
            screenValue = 'ERROR';
        } else {
            screenValue = result.toString();
            firstOperand = screenValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    }
};

function operate(a, b, operator) {
    if (operator === '+') {
        return a + b;
    }
    if (operator === '-') {
        return a - b;
    }
    if (operator === '*') {
        return a * b;
    }
    if (operator === '/') {
        if (b === 0) {
            return 'ERROR';
        } else {
            return a / b;
        }
    }
};

function clearScreen() {
    screenValue = '0';
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
}

function inputBackspace() {
    if (screenValue.length === 1 || screenValue === 'ERROR') {
        screenValue = '0';
    } else {
        screenValue = screenValue.slice(0, -1);
    }
}

function inputFlipSign() {
    screenValue = (parseFloat(screenValue) * -1).toString();
}

function inputPercent() {
    screenValue = (parseFloat(screenValue) / 100).toString();
}

function inputDecimal(dot) {
    if(screenValue === firstOperand || screenValue === secondOperand) {
        screenValue += dot;
    } else if(!screenValue.includes(dot)) {
        screenValue += dot;
    } 
}