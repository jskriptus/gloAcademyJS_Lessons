'use strict';

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

let money,
    start = () => {
        do {
            money = prompt('Ваш месячный доход?', '100000');
        }
        while (!isNumber(money));
    };

start();

let appData = {
    budget: money, // Месячный доход
    budgetMonth: 0, // Месячный бюджет
    budgetDay: 0, // Дневной бюджет
    income: {}, // Дополнительный заработок
    addIncome: [],
    expenses: {}, // Обьект с данными обязательных рассходов за месяц (Статьи и во сколько обходится)
    addExpenses: [], // Возможные статьи рассходов в месяц
    deposit: false, // Наличие депозита в банке
    percentDeposit: 0, // Годовой процент депозита в банке
    moneyDeposit: 0, // Сумма депозита в банке
    mission: 50000, // Цель накопления
    period: 3, // Период за который будет достигнута цель

    expensesMonth: 0, // Сумма обязательных рассходов в месяц
    asking: () => {

        if (confirm('Есть ли у Вас дополнительный источник заработка?')) {
            let itemIncome;
            let cashIncome;

            do {
                itemIncome = prompt('Какой у вас есть дополнительный заработок?', 'Таксую');
                cashIncome = prompt('Сколько в месяц зарабатываете на этом?', '10000');
            }
            while (isNumber(itemIncome) || itemIncome === 0 || !isNumber(cashIncome) || cashIncome === 0)

            appData.income[itemIncome] = cashIncome;
        }

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Садик, Школа, Университет');

        /*
            Вывести строкой в консоль каждое слово с большой буквы, слова разделены запятой и пробелом!
        */

        appData.addExpenses = addExpenses.toLowerCase().trim().split(", ");
        let expenses = [];
        appData.addExpenses.forEach((item) => {
            expenses.push(item[0].toUpperCase() + item.slice(1));
        })
        console.log(expenses.join(', '));




        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        for (let i = 0; i < 2; i++) {
            let itemExpenses;
            let cashExpenses;

            do {
                itemExpenses = prompt('Введите обязательную статью расходов в этом месяце', '');
                cashExpenses = +prompt('Во сколько обходится?', '');
            }
            while (isNumber(itemExpenses) || itemExpenses === 0 || !isNumber(cashExpenses) || cashExpenses === 0);

            appData.expenses[itemExpenses] = cashExpenses;
        }
    },
    getExpensesMonth: () => { // Метод записвает результат суммы всех обязательных расходов за месяц в обьект
        let result = 0;

        for (let key in appData.expenses) {
            result += +appData.expenses[key];
        }

        appData.expensesMonth = result;

    },
    getBudget: () => { // Метод записывает в обьект Накопления за месяц (Месячный доход минус месячные обязательные расходы) и Бюджет на день (Месячный доход делится на 30 дней)
        appData.budgetMonth = money - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: () => { // Подсчитываем за какой период будет достигнута цель, зная результат месячного накопления и записывает результат в обьект
        return Math.ceil(appData.mission / appData.budgetMonth);
    },
    getStatusIncome: () => { // Метод Определяет уровень дохода пользователя 
        if (appData.budgetDay >= 1200) {
            return 'У вас высокий уровень дохода';
        } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
            return 'У вас средний уровень дохода';
        } else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
            return 'К сожалению у вас уровень дохода ниже среднего';
        } else {
            return 'Что то пошло не так';
        }
    },
    getInfoDeposit: () => {
        if (appData.deposit) {
            do {
                appData.percentDeposit = prompt('Какой годовой процент вашего депозита?', '10');
                appData.moneyDeposit = prompt('Какая сумма депозита?', '10000');
            }
            while (!isNumber(appData.percentDeposit) || appData.percentDeposit === 0 || !isNumber(appData.moneyDeposit) || appData.moneyDeposit === 0);
        }
    },
    calcSavedMoney: () => {
        return appData.budgetMonth * appData.period;
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();


console.log('Сумма обязательных рассходов за месяц: ' + appData.expensesMonth);

if (appData.period > 0) { // За какой период будет достигнута цель (в месяцах)
    console.log(`Цель будет достигнута за: ${appData.getTargetMonth()} месяца`);
} else {
    console.log('Цель не будет достигнута');
}

console.log(appData.getStatusIncome()); // Уровень дохода

for (let key in appData) {
    console.log(`Наша программа включает в себя данные: ${key} - ${appData[key]}`);
}






























// 'use strict';

// function isNumber(n) {
//     if (typeof n !== 'string') {
//         return false;
//     }
//     return !isNaN(parseFloat(n)) && isFinite(n);
// }

// let money, // Храним месячный доход
//     start = () => { // Спрашиваем пользователя о его месячном доходе
//         do {
//             money = prompt('Ваш месячный доход?', '10000');
//         }
//         while (!isNumber(money));
//     };

//     start();

// let appData = {
//     budget: money,
//     income: {},
//     addIncome: [],
//     expenses: {},
//     addExpenses: [],
//     deposit: false,
//     mission: 50000,
//     period: (goal, accumulated) => { // Подсчитывает за какой период будет достигнута цель, зная результат месячного накопления accumulatedMonth
//         return Math.ceil(goal / accumulated);
//     },
//     budgetDay: 0,
//     budgetMonth: (income, expenses) => { // Функция возвращает Накопления за месяц (Доходы минус расходы)

//         return income - expenses;
//     },
//     expensesMonth: () => { // Функция возвращает сумму всех обязательных расходов за месяц
//         let result = 0;

//         for (let key in appData.expenses){
//             result += +appData.expenses[key];
//         }   

//         return result;
//     },
//     getStatusIncome: () => {
//         if (appData.budgetDay >= 1200) { // Определяем уровень дохода пользователя 
//             return 'У вас высокий уровень дохода';
//         } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
//             return 'У вас средний уровень дохода';
//         } else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
//             return 'К сожалению у вас уровень дохода ниже среднего';
//         } else {
//             return 'Что то пошло не так';
//         }
//     },
//     asking: () => {
//         let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', '');
//         appData.addExpenses = addExpenses.toLowerCase().split(",");
//         appData.deposit = confirm('Есть ли у вас депозит в банке?');
//         for (let i = 0;i < 2;i++) {
//             let a = prompt('Введите обязательную статью расходов в этом месяце', ''),
//                 b = prompt('Во сколько обойдется?', '');

//             if (!isNumber(a) && isNumber(b)) {
//                 appData.expenses[a] = b;
//             } else {
//                 i--;
//             }
//         }
//     }
// };

// appData.asking();



// let expensesAmount = appData.expensesMonth(); // Храним сумму всех обязательных расходов за месяц

// const accumulatedMonth = appData.budgetMonth(money, expensesAmount); // Храним результат исполнения функции, которая считает накопления за месяц 

// const f = appData.period(appData.mission, accumulatedMonth); // Храним результат за какой период будет достигнута цель

// appData.budgetDay = Math.floor(accumulatedMonth / 30); // Записываем результат Бюджета на день

// console.log('Сумма обязательных рассходов за месяц: ' + expensesAmount);

// if (targetMonth > 0) {
//     console.log('Цель будет достигнута за: ' + targetMonth + ' месяца');

// } else {
//     console.log('Цель не будет достигнута');
// }

// console.log('Бюджет на день: ' + appData.budgetDay);

// console.log(appData.getStatusIncome());