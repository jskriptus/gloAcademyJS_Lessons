'use strict';

const startBtn = document.getElementById('start'), // Кнопка "Рассчитать" через id
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
    additionalExpensesItem = document.querySelector('.additional_expenses-item'), // Поле Возможные расходы
    targetAmount = document.querySelector('.target-amount'), // Поле Цель
    periodSelect = document.querySelector('.period-select'), // Range
    periodAmount = document.querySelector('.period-amount'); // 

let incomeItems = document.querySelectorAll('.income-items'), // Поля Дополнительных доходов
    expensesItems = document.querySelectorAll('.expenses-items'); // Поля Обязательных расходов

const placeholdersName = document.querySelectorAll('[placeholder*="Наименование"]'),
    placeholdersAmount = document.querySelectorAll('[placeholder*="Сумма"]');

const textInput = document.querySelectorAll('.data input[type*="text"]'),
    cancel = document.querySelector('#cancel');

class AppData {
    constructor() {
        this.budget = 0; // Месячный доход
        this.budgetMonth = 0; // Месячный бюджет
        this.budgetDay = 0; // Дневной бюджет
        this.income = {}; // Дополнительный доход
        this.incomeMonth = 0; // Сумма дополнительных доходов
        this.addIncome = []; // Храним возможные доходы
        this.expenses = {}; // Обьект с данными обязательных рассходов за месяц (Статьи и во сколько обходится)
        this.addExpenses = []; // Возможные статьи рассходов в месяц
        this.deposit = false; // Наличие депозита в банке
        this.percentDeposit = 0; // Годовой процент депозита в банке
        this.moneyDeposit = 0; // Сумма депозита в банке
        this.period = 3; // Период за который будет достигнута цель
        this.expensesMonth = 0; // Сумма обязательных рассходов в месяц
    }

    isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    start() {
        this.budget = +salaryAmount.value; // Передаем введенные данные из инпута месячного бюджета в объект
        this.getExpIncome(); // Метод записываем Дополнительые доходы и Обязательные рассходы в объект
        this.getExpensesMonth(); // Метод записвает результат суммы всех обязательных расходов за месяц в обьект
        this.getAddExpenses(); // Метод разбивает на массив введенные в инпут Возможные расходы и добавляет результат в объект
        this.getAddIncome(); // Метод записывает в массив Возможные доходы
        this.getBudget(); // Метод записывает в обьект Накопления за месяц (Месячный доход минус месячные обязательные расходы) и Бюджет на день (Месячный доход делится на 30 дней)
        this.showResult(); // Методо выводит из объектов на страницу
    }

    showResult() {
        budgetMonthValue.value = this.budgetMonth; // Показываем на странице месячный бюджет
        budgetDayValue.value = this.budgetDay; // Показываем на странице дневной бюджет
        expensesMonthValue.value = this.expensesMonth; // Показываем на странице сумму обязательных рассходов за месяц
        additionalExpensesValue.value = this.addExpenses.join(', '); // Показываем на странице возможные статьи рассходов
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();

        periodSelect.addEventListener('input', () => {
            incomePeriodValue.value = this.calcSavedMoney(); // Накомпления за период
        });
    }

    getExpIncome() {
        const count = (item) => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value,
                itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if (itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle] = itemAmount;
            }
        }

        incomeItems.forEach(count);
        expensesItems.forEach(count);

        for (const key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }

    addIncomeBlock() {
        const cloneIncomeItems = incomeItems[0].cloneNode(true);

        cloneIncomeItems.children[0].value = '';
        cloneIncomeItems.children[1].value = '';

        incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomeAdd);
        incomeItems = document.querySelectorAll('.income-items');

        if (incomeItems.length === 3) { // Ограничиваем вывод инпутов Обязательные рассходы до 3
            incomeAdd.style.display = 'none';
        }
    }

    addExpensesBlock() {
        const cloneExpensesItem = expensesItems[0].cloneNode(true);

        cloneExpensesItem.children[0].value = '';
        cloneExpensesItem.children[1].value = '';

        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) { // Ограничиваем вывод инпутов Обязательные рассходы до 3
            expensesAdd.style.display = 'none';
        }
    }

    getAddExpenses() {
        const addExpenses = additionalExpensesItem.value.toLowerCase().trim().split(", ");
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item[0].toUpperCase() + item.slice(1));
            }
        });
    }

    getAddIncome() {
        additionalIncomeItem.forEach((item) => {
            const itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    }

    getExpensesMonth() {
        let result = 0;

        for (let key in this.expenses) {
            result += +this.expenses[key];
        }

        this.expensesMonth = result;
    }

    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    getTargetMonth() { // Подсчитываем за какой период будет достигнута цель, зная результат месячного накопления и записывает результат в обьект
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }

    getStatusIncome() { // Метод Определяет уровень дохода пользователя 
        if (this.budgetDay >= 1200) {
            return 'У вас высокий уровень дохода';
        } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
            return 'У вас средний уровень дохода';
        } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
            return 'К сожалению у вас уровень дохода ниже среднего';
        } else {
            return 'Что то пошло не так';
        }
    };

    getInfoDeposit() {
        if (this.deposit) {
            do {
                this.percentDeposit = prompt('Какой годовой процент вашего депозита?', '10');
                this.moneyDeposit = prompt('Какая сумма депозита?', '10000');
            }
            while (!appData.isNumber(this.percentDeposit) || this.percentDeposit === null || this.percentDeposit.trim() === '' || !appData.isNumber(this.moneyDeposit) || this.moneyDeposit.trim() === '' || this.moneyDeposit === null);
        }
    };

    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value;
    };

    moveRange() {
        this.period = periodSelect.value;
        periodAmount.textContent = this.period;
    }

    checkingCompletion() {
        if (salaryAmount.value === '') {
            return;
        } else {
            this.start();
        }

        start.style.display = 'none';
        cancel.style.display = 'block';

        textInput.forEach((item) => {
            item.disabled = true;
        });

        periodSelect.disabled = true;
        expensesAdd.disabled = true;
        incomeAdd.disabled = true;

        const incomeElements = document.querySelectorAll('.income-items');
        incomeElements.forEach((item) => {
            for (let elem of item.children) {
                elem.disabled = true;
            }
        });

        const expensesElements = document.querySelectorAll('.expenses-items');
        expensesElements.forEach((item) => {
            for (let elem of item.children) {
                elem.disabled = true;
            }
        });
    };

    reset() {
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.expensesMonth = 0;
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.period = 0;

        start.style.display = 'block';
        cancel.style.display = 'none';

        periodSelect.disabled = false;
        expensesAdd.disabled = false;
        incomeAdd.disabled = false;

        textInput.forEach((item) => {
            item.disabled = false;
            item.value = '';
        });

        const value = document.querySelectorAll('input[class$="value"]');

        value.forEach((item) => {
            item.value = '';
        });

        const incomeElements = document.querySelectorAll('.income-items');

        for (let i = 1; i < incomeElements.length; i++) {
            incomeElements[i].parentNode.removeChild(incomeElements[i]);
        }

        const expensesElements = document.querySelectorAll('.expenses-items');

        for (let i = 1; i < expensesElements.length; i++) {
            expensesElements[i].parentNode.removeChild(expensesElements[i]);
        }

        incomeAdd.style.display = 'block';
        expensesAdd.style.display = 'block';
        periodSelect.value = '1';
        periodAmount.textContent = '1';
    }

    myEvenetListeners() {
        start.addEventListener('click', this.checkingCompletion.bind(appData));
        incomeAdd.addEventListener('click', this.addIncomeBlock);
        expensesAdd.addEventListener('click', this.addExpensesBlock);
        periodSelect.addEventListener('input', this.moveRange);
        cancel.addEventListener('click', this.reset.bind(appData));

        placeholdersName.forEach((item) => {
            const hint = document.createElement('span');
            item.addEventListener('input', (event) => {
                const regExp = /^[\sа-яА-ЯёЁ]+$/gi; // только русские буквы пробелы и знаки препинания
                const inputValue = event.target.value;
                const parent = event.target.parentElement;

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
            const hint = document.createElement('span');

            item.addEventListener('input', (event) => {
                const regExp = /^[0-9]+$/gi; // только цифры
                const inputValue = event.target.value;
                const parent = event.target.parentElement;

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
    }
}

const appData = new AppData();
appData.myEvenetListeners()