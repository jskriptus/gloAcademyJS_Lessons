'use strict';

window.addEventListener('DOMContentLoaded', () => {
    // Таймер
    const countTimer = deadline => {
        const timerHour = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            const dateStop = new Date(deadline).getTime(), // колличество миллисекунд от 01.01.1970 до дедлайна
                dateNow = new Date().getTime(), // колличество миллисекунд от 01.01.1970 до нынешней даты
                timeRemaining = (dateStop - dateNow) / 1000, // колличество секунд между нынешней даты и дедлайном
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor((timeRemaining / 60 / 60) % 24);

            return {
                hours,
                minutes,
                seconds
            };
        }

        const timerId = setInterval(updateClock, 1000);

        function formating(value) {
            if (value >= 0 && value < 10) {
                return '0' + value;
            } else if (value < 0) {
                clearInterval(timerId);
                return '00';
            } else {
                return value;
            }
        }

        function updateClock() {
            const timer = getTimeRemaining();

            timerHour.textContent = formating(timer.hours);
            timerMinutes.textContent = formating(timer.minutes);
            timerSeconds.textContent = formating(timer.seconds);

        }


    };

    countTimer('02 jule 2021');
});
