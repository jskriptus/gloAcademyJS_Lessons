'use strict';

let startBtn = document.getElementById('start'), // Кнопка "Рассчитать" через id
    incomeAdd = document.getElementsByTagName('button')[0], // Кнопка “+” (плюс) через Tag 
    expensesAdd = document.getElementsByTagName('button')[1], // Кнопка “+” (плюс) через Tag
    depositCheckBox = document.querySelector('#deposit-check'), // Чекбокс 
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'), // Поле для ввода возможных доходов
    budgetMonthValue = document.querySelectorAll('input[class$="value"]')[0], // Поле доход за месяц
    budgetDayValue = document.querySelectorAll('input[class$="value"]')[1], // Поле Дневной бюджет
    expensesMonthValue = document.querySelectorAll('input[class$="value"]')[2], // Поле Расходы за месяц
    additionalIncomeValue = document.querySelectorAll('input[class$="value"]')[3], // Поле Возможные доходы
    additionalExpensesValue = document.querySelectorAll('input[class$="value"]')[4], // Поле Возможные рассходы
    incomePeriodValue = document.querySelectorAll('input[class$="value"]')[5], // Поле Накопления за период
    targetMonthValue = document.querySelectorAll('input[class$="value"]')[6], // Поле Срок достижения цели в месяцах
    salaryAmount = document.querySelector('.salary-amount'), // Поле Месячный доход
    incomeItems = document.querySelectorAll('.income-items'), // Поля Дополнительных доходов
    expensesItems = document.querySelectorAll('.expenses-items'), // Поля Обязательных расходов
    additionalExpensesItem = document.querySelector('.additional_expenses-item'), // Поле Возможные расходы
    targetAmount = document.querySelector('.target-amount'), // Поле Цель
    periodSelect = document.querySelector('.period-select'); // Range


function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

let money;

let appData = {
    budget: 0, // Месячный доход
    budgetMonth: 0, // Месячный бюджет
    budgetDay: 0, // Дневной бюджет
    income: {}, // Дополнительный доход
    incomeMonth: 0,
    addIncome: [], // Храним возможные доходы
    expenses: {}, // Обьект с данными обязательных рассходов за месяц (Статьи и во сколько обходится)
    addExpenses: [], // Возможные статьи рассходов в месяц
    deposit: false, // Наличие депозита в банке
    percentDeposit: 0, // Годовой процент депозита в банке
    moneyDeposit: 0, // Сумма депозита в банке
    period: 3, // Период за который будет достигнута цель
    expensesMonth: 0, // Сумма обязательных рассходов в месяц
    start: () => {
        appData.budget = +salaryAmount.value; // Передаем введенные данные из инпута месячного бюджета в объект

        appData.getIncome(); // Метод записываем Дополнительые доходы в объект
        appData.getExpenses(); // Метод записывает Обязательные рассходы в объект 
        appData.getExpensesMonth(); // Метод записвает результат суммы всех обязательных расходов за месяц в обьект
        appData.getAddExpenses(); // Метод разбивает на массив введенные в инпут Возможные расходы и добавляет результат в объект
        appData.getAddIncome(); // Метод записывает в массив Возможные доходы
        appData.getBudget(); // Метод записывает в обьект Накопления за месяц (Месячный доход минус месячные обязательные расходы) и Бюджет на день (Месячный доход делится на 30 дней)

        appData.showResult(); // Методо выводит из объектов на страницу
    },
    showResult: () => {
        budgetMonthValue.value = appData.budgetMonth; // Показываем на странице месячный бюджет
        budgetDayValue.value = appData.budgetDay; // Показываем на странице дневной бюджет
        expensesMonthValue.value = appData.expensesMonth; // Показываем на странице сумму обязательных рассходов за месяц
        additionalExpensesValue.value = appData.addExpenses.join(', '); // Показываем на странице возможные статьи рассходов
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();

        periodSelect.addEventListener('input', () => {
            incomePeriodValue.value = appData.calcSavedMoney(); // Накомпления за период
        });
    },
    addIncomeBlock: () => {
        let cloneIncomeItems = incomeItems[0].cloneNode(true);

        cloneIncomeItems.children[0].value = '';
        cloneIncomeItems.children[1].value = '';

        incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomeAdd);
        incomeItems = document.querySelectorAll('.income-items');

        if (incomeItems.length === 3) { // Ограничиваем вывод инпутов Обязательные рассходы до 3
            incomeAdd.style.display = 'none';
        }
    },
    getIncome: () => {
        incomeItems.forEach((item) => {
            let itemIncome = item.querySelector('.income-title').value,
                cashIncome = item.querySelector('.income-amount').value;

            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
                appData.incomeMonth += +appData.income[itemIncome];
            }
        });
    },
    addExpensesBlock: () => {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);

        cloneExpensesItem.children[0].value = '';
        cloneExpensesItem.children[1].value = '';

        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) { // Ограничиваем вывод инпутов Обязательные рассходы до 3
            expensesAdd.style.display = 'none';
        }
    },
    getExpenses: () => {
        expensesItems.forEach((item) => {
            let itemExpenses = item.querySelector('.expenses-title').value,
                cashExpenses = item.querySelector('.expenses-amount').value;

            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getAddExpenses: () => {
        let addExpenses = additionalExpensesItem.value.toLowerCase().trim().split(", ");
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item[0].toUpperCase() + item.slice(1));
            }
        });
    },
    getAddIncome: () => {
        additionalIncomeItem.forEach((item) => {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    getExpensesMonth: () => {
        let result = 0;

        for (let key in appData.expenses) {
            result += +appData.expenses[key];
        }

        appData.expensesMonth = result;
    },
    getBudget: () => {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: () => { // Подсчитываем за какой период будет достигнута цель, зная результат месячного накопления и записывает результат в обьект
        return Math.ceil(targetAmount.value / appData.budgetMonth);
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
            while (!isNumber(appData.percentDeposit) || appData.percentDeposit === null || appData.percentDeposit.trim() === '' || !isNumber(appData.moneyDeposit) || appData.moneyDeposit.trim() === '' || appData.moneyDeposit === null);
        }
    },
    calcSavedMoney: () => {
        return appData.budgetMonth * periodSelect.value;
    },
    moveRange: () => {
        let periodAmount = document.querySelector('.period-amount');
        periodAmount.textContent = periodSelect.value;
    },
    checkingCompletion: () => {
        if (salaryAmount.value === '') {
            return;
        } else {
            appData.start();
        }
    },

};

start.addEventListener('click', appData.checkingCompletion);
incomeAdd.addEventListener('click', appData.addIncomeBlock);
expensesAdd.addEventListener('click', appData.addExpensesBlock);
periodSelect.addEventListener('input', appData.moveRange);

let placeholdersName = document.querySelectorAll('[placeholder*="Наименование"]'),
    placeholdersAmount = document.querySelectorAll('[placeholder*="Сумма"]');

placeholdersName.forEach((item) => {
    let hint = document.createElement('span');
    item.addEventListener('input', (event) => {
        let regExp = /^[\sа-яА-ЯёЁ]+$/gi; // только русские буквы пробелы и знаки препинания
        let inputValue = event.target.value;
        let parent = event.target.parentElement;

        if (!regExp.test(inputValue)) {
            parent.append(hint);
            hint.style.color = '#F08080';
            hint.style.fontSize = '14px';
            hint.innerHTML = '<br>В поле "Наименование" - только русские буквы, пробелы и знаки препинания!';

            startBtn.disabled = true;
            item.style.backgroundColor = '#F08080';
        } else {
            hint.style.color = '';
            hint.textContent = '';

            startBtn.disabled = false;
            item.style.backgroundColor = '';
        }
    });
});

placeholdersAmount.forEach((item) => {
    let hint = document.createElement('span');
    
    item.addEventListener('input', (event) => {
        let regExp = /^[0-9]+$/gi; // только цифры
        let inputValue = event.target.value;
        let parent = event.target.parentElement;

        if (!regExp.test(inputValue)) {
            parent.append(hint);
            hint.style.color = '#F08080';
            hint.style.fontSize = '14px';
            hint.innerHTML = '<br>В поле "Сумма" - только цифры!';

            startBtn.disabled = true;
            event.target.style.backgroundColor = '#F08080';
        } else {
            hint.style.color = '';
            hint.textContent = '';

            startBtn.disabled = false;
            event.target.style.backgroundColor = '';
        }
    });
});