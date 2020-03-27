// Объявляем переменные
let money = 100500, 
    income = 'фриланс',
    addExpenses = 'интернет, такси, комуналка, связь',
    deposit = true,
    mission = 100500,
    period = 6,
    budgetDay = money / 30;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);
console.log(addExpenses.toLowerCase().split(", "));
console.log(budgetDay);
