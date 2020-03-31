'use strict';

let money = +prompt('Ваш месячный доход?', '10000'), // Спрашиваем у пользователя месячный доход
    income = 'фриланс', // Дополнительный доход
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', ''), // Спрашиваем у пользователя возможные дополнительные рассходы
    deposit = confirm('Есть ли у вас депозит в банке?'), // Спрашиваем пользователя есть ли у него депозит в банке
    mission = 100500, // Какую сумму необходимо накопить (цель)
    period = 6, // За какой срок
    budgetDay; // Бюджет на день

const showTypeOf = (item) => {
    console.log(typeof (item));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let expensesOne = prompt('Введите обязательную статью расходов'), // Спрашиваем пользователя название первой обязательной статьи рассходов
    amountOne = +prompt('Во сколько это обходится?', '1000'), // Спрашиваем пользователя сумму во сколько обходится первая обязательная статья рассходов
    expensesTwo = prompt('Введите обязательную статью расходов'), // Спрашиваем пользователя название второй обязательной статьи рассходов
    amountTwo = +prompt('Во сколько это обходится?', '1500'); // Спрашиваем пользователя сумму во сколько обходится вторая обязательная статья рассходов

function getExpensesMonth(mandatoryOne, mandatoryTwo) { // Функция возвращает сумму всех обязательных расходов за месяц
    return mandatoryOne + mandatoryTwo;
}

console.log('Сумма обязательных рассходов за месяц: ' + getExpensesMonth(amountOne, amountTwo));

console.log(addExpenses.toLowerCase().split(", "));

function getAccumulatedMonth(income, expenses) { // Функция возвращает Накопления за месяц (Доходы минус расходы)
    return income - expenses;
}

const accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amountOne, amountTwo)); // присваиваем переменной результат исполнения функции которая считает накопления за месяц 

function getTargetMonth(goal, accumulated) { // Подсчитывает за какой период будет достигнута цель, зная результат месячного накопления accumulatedMonth
    return Math.ceil(goal / accumulated);
}

console.log('Цель будет достигнута за: ' + getTargetMonth(mission, accumulatedMonth) + ' месяца(ев)');

budgetDay = Math.floor(accumulatedMonth / 30);

console.log('Бюджет на день: ' +  budgetDay);

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

console.log(getStatusIncome());