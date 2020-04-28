'use strict';

/*

    Добрый день (утро, вечер, ночь в зависимости от времени суток)
    Сегодня: Понедельник
    Текущее время:12:05:15 PM
    До нового года осталось 175 дней

*/

const howMuchUntilTheNewYear = () => {
    const newYear = new Date("2021, 01, 01").getTime(),
        nowDate = new Date().getTime(),
        timeRemaining = (newYear - nowDate) / 1000;
    return Math.floor(timeRemaining / 60 / 60 / 24);
};

const showMessage = () => {
    const getWeekDay = new Date().toLocaleString('ru', {
        weekday: 'long',
    });

    const currentDate = new Date(),
        currentWeekdayInWords = getWeekDay[0].toUpperCase() + getWeekDay.slice(1), // Храним текущий день недели словами
        time = currentDate.getHours(),
        optTime = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        },
        currentTime = currentDate.toLocaleTimeString('en', optTime);

    console.log(time);

    const getTimeOfDay = () => {
        if (time >= 6 && time < 11) {
            return 'Доброе Утро';
        } else if (time >= 11 && time <= 18) {
            return 'Добрый день';
        } else if (time > 18 && time <= 23) {
            return 'Добрый вечер';
        } else if (time > 0 && time < 6) {
            return 'Доброй ночи';
        }
    };

    const body = document.querySelector('body');

    body.innerHTML = `<p>${getTimeOfDay()} </br>
Сегодня: ${currentWeekdayInWords} </br>
Текущее время: ${currentTime} </br>
До нового года осталось ${howMuchUntilTheNewYear()} дней
</p>`;

};

showMessage();
