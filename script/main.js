'use strict';

let startBtn = document.getElementById('start'), // Кнопка "Рассчитать" через id
    incomeAdd = document.getElementsByTagName('button')[0], // Кнопка “+” (плюс) через Tag 
    expensesAdd = document.getElementsByTagName('button')[1], // Кнопка “+” (плюс) через Tag
    depositCheckBox = document.querySelector('#deposit-check'), // Чекбокс 
    // additionalIncomeItem = document.querySelectorAll('.additional_income-item'), // Поля для ввода возможных доходов
    additionalIncomeItemOne = document.querySelectorAll('.additional_income-item')[0], // Поле для ввода возможных доходов
    additionalIncomeItemTwo = document.querySelectorAll('.additional_income-item')[1], // Поле для ввода возможных доходов
    budgetMonth = document.querySelectorAll('input[class$="value"]')[0], // Поле доход за месяц
    budgetDay = document.querySelectorAll('input[class$="value"]')[1], // Поле Дневной бюджет
    expensesMonth = document.querySelectorAll('input[class$="value"]')[2], // Поле Расходы за месяц
    additionalIncome = document.querySelectorAll('input[class$="value"]')[3], // Поле Возможные доходы
    additionalExpenses = document.querySelectorAll('input[class$="value"]')[4], // Поле Возможные рассходы
    incomePeriod = document.querySelectorAll('input[class$="value"]')[5], // Поле Накопления за период
    targetMonth = document.querySelectorAll('input[class$="value"]')[6], // Поле Срок достижения цели в месяцах
    salaryAmount = document.querySelector('.salary-amount'), // Поле Месячный доход
    incomeTitle = document.querySelector('.income-items > .income-title'), // Поле Дополнительный доход (Наименование)
    incomeAmount = document.querySelector('.income-items > .income-amount'), // Поле Дополнительный доход (Сумма)
    expensesTitle = document.querySelector('.expenses-items > .expenses-title'), // Поле Обязательные расходы (Наименование)
    expensesAmount = document.querySelector('.expenses-items > .expenses-amount'), // Поле Обязательные расходы (Сумма)
    additionalExpensesItem = document.querySelector('.additional_expenses-item'), // Поле Возможные расходы
    targetAmount = document.querySelector('.target-amount'), // Поле Цель
    periodSelect = document.querySelector('.period-select'); // Range

console.log(startBtn);
console.log(incomeAdd);
console.log(expensesAdd);
console.log(depositCheckBox);
console.log(additionalIncomeItemOne);
console.log(additionalIncomeItemTwo);
console.log(budgetMonth);
console.log(budgetDay);
console.log(expensesMonth);
console.log(additionalIncome);
console.log(additionalExpenses);
console.log(incomePeriod);
console.log(targetMonth);
console.log(salaryAmount);
console.log(incomeTitle);
console.log(incomeAmount);
console.log(expensesTitle);
console.log(expensesAmount);
console.log(additionalExpensesItem);
console.log(targetAmount);
console.log(periodSelect);

// function isNumber(n) {
//     return !isNaN(parseFloat(n)) && isFinite(n);
// }

// let money,
//     start = () => {
//         do {
//             money = prompt('Ваш месячный доход?', '100000');
//         }
//         while (!isNumber(money) || money.trim() === '' || money === null);
//     };

// start();

// let appData = {
//     budget: money, // Месячный доход
//     budgetMonth: 0, // Месячный бюджет
//     budgetDay: 0, // Дневной бюджет
//     income: {}, // Дополнительный заработок
//     addIncome: [],
//     expenses: {}, // Обьект с данными обязательных рассходов за месяц (Статьи и во сколько обходится)
//     addExpenses: [], // Возможные статьи рассходов в месяц
//     deposit: false, // Наличие депозита в банке
//     percentDeposit: 0, // Годовой процент депозита в банке
//     moneyDeposit: 0, // Сумма депозита в банке
//     mission: 50000, // Цель накопления
//     period: 3, // Период за который будет достигнута цель

//     expensesMonth: 0, // Сумма обязательных рассходов в месяц
//     asking: () => {

//         if (confirm('Есть ли у Вас дополнительный источник заработка?')) {
//             let itemIncome;
//             let cashIncome;

//             do {
//                 itemIncome = prompt('Какой у вас есть дополнительный заработок?', 'Таксую');
//             }
//             while (isNumber(itemIncome) || itemIncome === null || itemIncome.trim() === '');

//             do {
//                 cashIncome = prompt('Сколько в месяц зарабатываете на этом?', '10000');
//             }
//             while (!isNumber(cashIncome) || cashIncome.trim() === '' || cashIncome === null)

//             appData.income[itemIncome] = cashIncome;
//         }

//         let addExpenses;

//         do {
//             addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Садик, Школа, Университет');
//         }
//         while (isNumber(addExpenses) || addExpenses === null || addExpenses.trim() === '')

//         /*
//             Вывести строкой в консоль каждое слово с большой буквы, слова разделены запятой и пробелом!
//         */

//         appData.addExpenses = addExpenses.toLowerCase().trim().split(", ");
//         let expenses = [];
//         appData.addExpenses.forEach((item) => {
//             expenses.push(item[0].toUpperCase() + item.slice(1));
//         });
//         console.log(expenses.join(', '));




//         appData.deposit = confirm('Есть ли у вас депозит в банке?');

//         for (let i = 0; i < 2; i++) {
//             let itemExpenses;
//             let cashExpenses;

//             do {
//                 itemExpenses = prompt('Введите обязательную статью расходов в этом месяце', '')
//             }
//             while (isNumber(itemExpenses) || itemExpenses === null || itemExpenses.trim() === '');

//             do {
//                 cashExpenses = prompt('Во сколько обходится?', '');
//             }
//             while (!isNumber(cashExpenses) || cashExpenses.trim() === '' || cashExpenses === null)

//             appData.expenses[itemExpenses] = cashExpenses;
//         }
//     },
//     getExpensesMonth: () => { // Метод записвает результат суммы всех обязательных расходов за месяц в обьект
//         let result = 0;

//         for (let key in appData.expenses) {
//             result += +appData.expenses[key];
//         }

//         appData.expensesMonth = result;

//     },
//     getBudget: () => { // Метод записывает в обьект Накопления за месяц (Месячный доход минус месячные обязательные расходы) и Бюджет на день (Месячный доход делится на 30 дней)
//         appData.budgetMonth = appData.budget - appData.expensesMonth;
//         appData.budgetDay = Math.floor(appData.budgetMonth / 30);
//     },
//     getTargetMonth: () => { // Подсчитываем за какой период будет достигнута цель, зная результат месячного накопления и записывает результат в обьект
//         return Math.ceil(appData.mission / appData.budgetMonth);
//     },
//     getStatusIncome: () => { // Метод Определяет уровень дохода пользователя 
//         if (appData.budgetDay >= 1200) {
//             return 'У вас высокий уровень дохода';
//         } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
//             return 'У вас средний уровень дохода';
//         } else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
//             return 'К сожалению у вас уровень дохода ниже среднего';
//         } else {
//             return 'Что то пошло не так';
//         }
//     },
//     getInfoDeposit: () => {
//         if (appData.deposit) {
//             do {
//                 appData.percentDeposit = prompt('Какой годовой процент вашего депозита?', '10');
//                 appData.moneyDeposit = prompt('Какая сумма депозита?', '10000');
//             }
//             while (!isNumber(appData.percentDeposit) || appData.percentDeposit === null || appData.percentDeposit.trim() === '' || !isNumber(appData.moneyDeposit) || appData.moneyDeposit.trim() === '' || appData.moneyDeposit === null);
//         }
//     },
//     calcSavedMoney: () => {
//         return appData.budgetMonth * appData.period;
//     }
// };

// appData.asking();
// appData.getExpensesMonth();
// appData.getBudget();


// console.log('Сумма обязательных рассходов за месяц: ' + appData.expensesMonth);

// if (appData.period > 0) { // За какой период будет достигнута цель (в месяцах)
//     console.log(`Цель будет достигнута за: ${appData.getTargetMonth()} месяца`);
// } else {
//     console.log('Цель не будет достигнута');
// }

// console.log(appData.getStatusIncome()); // Уровень дохода

// for (let key in appData) {
//     console.log(`Наша программа включает в себя данные: ${key} - ${appData[key]}`);
// }