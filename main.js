const currentDisplay = document.querySelector('.current-display');
const numbers = document.querySelectorAll('[data-number]');

let currentNum = '';
let previousNum = '';
let haveDot = false;

numbers.forEach((number) => {
    number.addEventListener('click', (e) => {
        if (currentNum.length > 9) {
            return;
        }

        if (e.target.innerText === ',' && !haveDot) {
            haveDot = true
            if (currentNum.length === 0) {
                currentNum = 0;
            }
        } else if (e.target.innerText === ',' && haveDot) {
            return
        }

        currentNum += e.target.textContent;
        currentDisplay.textContent = currentNum;
    })

})

const clearAll = document.querySelector('[data-all-clear]').addEventListener('click', () => {
    currentNum = '0';
    currentDisplay.textContent = currentNum
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
        currentNum = currentNum.slice(0, -1);
    }

    currentDisplay.textContent = currentNum
    haveDot = false

    // if we choose number the zero will replace by the number you input
    if (currentNum == 0 && numbers) {
        currentNum = '';
    }
})