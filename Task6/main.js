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
        optTime = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        },
        currentTime = currentDate.toLocaleTimeString('en', optTime);

    const getTimeOfDay = () => {
        if (Number(currentTime.slice(0, 2)) >= 6 && Number(currentTime.slice(0, 2)) < 11 && currentTime.slice(-2) === 'AM') {
            return 'Доброе Утро';
        } else if (Number(currentTime.slice(0, 2)) >= 11 && Number(currentTime.slice(0, 2)) <= 12 && currentTime.slice(-2) === 'AM' || Number(currentTime.slice(0, 2)) >= 12 && currentTime.slice(-2) === 'PM' || Number(currentTime.slice(0, 2)) >= 0 && Number(currentTime.slice(0, 2)) <= 5 && currentTime.slice(-2) === 'PM') {
            return 'Добрый день';
        } else if (Number(currentTime.slice(0, 2)) >= 6 && Number(currentTime.slice(0, 2)) < 11 && currentTime.slice(-2) === 'PM') {
            return 'Добрый вечер';
        } else if (Number(currentTime.slice(0, 2)) >= 11 && Number(currentTime.slice(0, 2)) <= 12 && currentTime.slice(-2) === 'PM' || Number(currentTime.slice(0, 2)) >= 12 && currentTime.slice(-2) === 'AM' || Number(currentTime.slice(0, 2)) >= 0 && Number(currentTime.slice(0, 2)) <= 5 && currentTime.slice(-2) === 'AM') {
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
