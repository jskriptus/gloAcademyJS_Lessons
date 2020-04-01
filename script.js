'use strict';

let money, // Спрашиваем у пользователя месячный доход
    income = 'фриланс', // Дополнительный доход
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', ''), // Спрашиваем у пользователя возможные дополнительные рассходы
    deposit = confirm('Есть ли у вас депозит в банке?'), // Спрашиваем пользователя есть ли у него депозит в банке
    mission = 100500, // Какую сумму необходимо накопить (цель)
    period = 6, // За какой срок
    budgetDay, // Бюджет на день
    expenses = []; // Записываем в массив обязательные статьи рассходов


const isNumber = (n) => {
    return !isNaN(parseInt(n)) && isFinite(n);
};

const start = () => {
    do {
        money = +prompt('Ваш месячный доход?', '10000');
    }
    while (!isNumber(money));
};

start();


const showTypeOf = (item) => {
    console.log(typeof (item));
};

const getExpensesMonth = () => { // Функция возвращает сумму всех обязательных расходов за месяц
    let result = 0;

    for (let i = 0; i < 2; i++) {

        expenses[i] = prompt('Введите обязательную статью расходов');

        do {
            result += +prompt('Во сколько это обходится?', '1000');
        }
        while (!isNumber(result));
    }

    return result;
};

let expensesAmount = getExpensesMonth();

const getAccumulatedMonth = (income, expenses) => { // Функция возвращает Накопления за месяц (Доходы минус расходы)
    return income - expenses;
};

const accumulatedMonth = getAccumulatedMonth(money, expensesAmount); // присваиваем переменной результат исполнения функции которая считает накопления за месяц 

const getTargetMonth = (goal, accumulated) => { // Подсчитывает за какой период будет достигнута цель, зная результат месячного накопления accumulatedMonth
    return Math.ceil(goal / accumulated);
};

const targetMonth = getTargetMonth(mission, accumulatedMonth);

const getStatusIncome = () => {
    if (budgetDay >= 1200) { // Определяем уровень дохода пользователя 
        return 'У вас высокий уровень дохода';
    } else if (budgetDay >= 600 && budgetDay < 1200) {
        return 'У вас средний уровень дохода';
    } else if (budgetDay < 600 && budgetDay >= 0) {
        return 'К сожалению у вас уровень дохода ниже среднего';
    } else {
        return 'Что то пошло не так';
    }
};

budgetDay = Math.floor(accumulatedMonth / 30);

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log('Сумма обязательных рассходов за месяц: ' + expensesAmount);

console.log(addExpenses.toLowerCase().split(","));

if (targetMonth > 0) {
    console.log('Цель будет достигнута за: ' + targetMonth + ' месяца(ев)');

} else {
    console.log('Цель не будет достигнута');
}

console.log('Бюджет на день: ' + budgetDay);

console.log(getStatusIncome());