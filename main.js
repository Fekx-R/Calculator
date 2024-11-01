const currentDisplay = document.querySelector('.current-display');
const previousDisplay = document.querySelector('.previous-display');
const numbers = document.querySelectorAll('[data-number]');
const operators = document.querySelectorAll('[data-operation]');
const equal = document.querySelector('[data-equals]');

let currentNum = '';
let previousNum = '';
let operation = '';
let result = '';

let haveDot = false;
// number
numbers.forEach((number) => {
    number.addEventListener('click', (e) => {
        if (currentNum.length > 9) return;

        // to check if ',' is already input, then we can't input ',' again
        if (e.target.innerText === ',' && !haveDot) {
            haveDot = true
            if (currentNum.length === 0) {
                currentNum = 0;
            }
        } else if (e.target.innerText === ',' && haveDot) return;

        currentNum += e.target.textContent;
        currentDisplay.textContent = currentNum;
    })

})

// operator
const mathOperation = () => {
    if (operation == 'x') {
        result = parseFloat(previousNum) * parseFloat(currentNum);
        currentNum = result;
        currentDisplay.textContent = currentNum;
    } else if (operation == '/') {
        result = parseFloat(previousNum) / parseFloat(currentNum);
        currentNum = result;
        currentDisplay.textContent = currentNum;
    } else if (operation == '-') {
        result = parseFloat(previousNum) - parseFloat(currentNum);
        currentNum = result;
        currentDisplay.textContent = currentNum;
    } else if (operation == '+') {
        result = parseFloat(previousNum) + parseFloat(currentNum);
        currentNum = result;
        currentDisplay.textContent = currentNum;
    } else if (operation == '%') {
        result = parseFloat(previousNum) % parseFloat(currentNum);
        currentNum = result;
        currentDisplay.textContent = currentNum;
    }

}

operators.forEach(operator => {
    operator.addEventListener('click', (e) => {
        // if (!currentNum) return;
        if (currentNum.length == 0) return;

        haveDot = false;
        
        mathOperation()
        
        operation = e.target.textContent;
        previousNum = `${parseFloat(currentNum)} ${operation} `;
        previousDisplay.textContent = previousNum;
        console.log(operation);
        


        currentNum = '0';
        currentDisplay.textContent = currentNum;
        if (numbers) {
            currentNum = ''; // if we choose number, the zero will replace by the number you input
        }
    })
})

// clear display
const clearAll = document.querySelector('[data-all-clear]').addEventListener('click', () => {
    result = '';
    operation = '';
    previousNum = '';
    currentNum = '0';
    previousDisplay.textContent = '' // parseFloat(previousNum);
    currentDisplay.textContent = currentNum // parseFloat(currentNum);
    if (numbers) {
        currentNum = '';
    }
    haveDot = false
})

const clearOneNum = document.querySelector('[data-delete]').addEventListener('click', () => {
    if (currentNum.length === 1) {
        currentNum = '0';
    } else if (currentNum == 0) {
        return // we can't delete 0(zero)
    } else {
        currentNum = currentNum.slice(0, -1); // delete every single number or operation in display
    }

    currentDisplay.textContent = currentNum
    haveDot = false;

    // if we choose number, the zero will replace by the number you input
    if (currentNum == 0 && numbers) {
        currentNum = '';
    }
})

// equal or result
equal.addEventListener('click', () => {
    mathOperation();
    operation = '';
    previousNum = '';
    previousDisplay.textContent = previousNum;
});