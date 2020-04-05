'use strict';

function isNumber(n) {
    if (typeof n !== 'string') {
        return false;
    }
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
    budget: money, // Месячный бюджет
    income: {},
    addIncome: [],
    expenses: {}, // Обьект с данными обязательных рассходов за месяц (Статьи и во сколько обходится)
    addExpenses: [], // Возможные статьи рассходов в месяц
    deposit: false, // Наличие депозита в банке
    mission: 50000, // Цель накопления
    period: 0, // Период за который будет достигнута цель
    budgetDay: 0, // Бюджет на день
    budgetMonth: 0, // Бюджет на месяц
    expensesMonth: 0, // Сумма обязательных рассходы в месяц
    asking: () => {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', '');
        appData.addExpenses = addExpenses.toLowerCase().split(",");
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        for (let i = 0; i < 2; i++) {
            let mandatoryExpenditureItem = prompt('Введите обязательную статью расходов в этом месяце', ''),
                answer = prompt('Во сколько обходится?', '');

            if (!isNumber(mandatoryExpenditureItem) && isNumber(answer) ) {
                appData.expenses[mandatoryExpenditureItem] = answer;
            } else {
                i--;
            }
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
        appData.period = Math.ceil(appData.mission / appData.budgetMonth);
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
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();

console.log('Сумма обязательных рассходов за месяц: ' + appData.budgetMonth);

if (appData.period > 0) { // За какой период будет достигнута цель (в месяцах)
    console.log('Цель будет достигнута за: ' + appData.period + ' месяца');
} else {
    console.log('Цель не будет достигнута');
}

console.log(appData.getStatusIncome()); // Уровень дохода

for(let key in appData) {
    console.log(`Наша программа включает в себя данные: ${key} - ${appData[key]}` );
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