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

    countTimer('02 july 2020');

    // Меню
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItem = menu.querySelectorAll('ul > li');

        const showOrClosedMenu = () => {
            menu.classList.toggle('active-menu');
            // if (!menu.style.transform || menu.style.transform === 'translate(-100%)') {
            //     menu.style.transform = 'translate(0)';
            // } else {
            //     menu.style.transform = 'translate(-100%)';
            // }
        };

        btnMenu.addEventListener('click', showOrClosedMenu);
        closeBtn.addEventListener('click', showOrClosedMenu);

        menuItem.forEach(item => item.addEventListener('click', showOrClosedMenu));
    };

    toggleMenu();

    // popup
    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupContent = popup.querySelector('.popup-content'),
            // formBtn = popup.querySelector('.form-btn'),
            popupClose = popup.querySelector('.popup-close');

        const showOrHiddenPopup = () => {

            if (!popup.style.display || popup.style.display === 'none') {
                let translate = -150;

                const animate = setInterval(() => {
                    popup.style.display = 'block';
                    popupContent.style.transform = `translate(${translate += 2}%)`;
                    console.log(screen.width);
                    if (translate === 0 || screen.width === 768) {
                        clearInterval(animate);
                    }
                }, 2);
            } else {
                popup.style.display = 'none';
            }
        };

        popupBtn.forEach(item => {
            item.addEventListener('click', showOrHiddenPopup);
        });

        popupClose.addEventListener('click', showOrHiddenPopup);
    };

    togglePopup();
});
