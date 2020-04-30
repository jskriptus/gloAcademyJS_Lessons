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
        const body = document.querySelector('body'),
            btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            menuItem = menu.querySelectorAll('ul > li');

        const showOrClosedMenu = () => {
            const target = event.target;

            if (target.matches('.close-btn') || btnMenu.contains(target)) {
                menu.classList.toggle('active-menu');
            }

            menuItem.forEach(item => {
                if (item.contains(target)) {
                    menu.classList.toggle('active-menu');
                }
            });
        };

        body.addEventListener('click', showOrClosedMenu);

    };

    toggleMenu();

    // popup
    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupContent = popup.querySelector('.popup-content'),
            popupClose = popup.querySelector('.popup-close');

        const animatePopUp = () => {
            let translate = -150; // прячем блок из видимости
            const animate = setInterval(() => {
                popup.style.display = 'block';
                popupContent.style.transform = `translate(${translate += 2}%)`;

                if (translate === 0) {
                    clearInterval(animate);
                }
                if (screen.width <= 778) {
                    popupContent.style.transform = `translate(-15%)`;
                }
            }, 2);
        };

        const showOrHiddenPopup = () => {
            if (!popup.style.display || popup.style.display === 'none') {
                animatePopUp();
            } else {
                popup.style.display = 'none';
            }
        };

        popupBtn.forEach(item => {
            item.addEventListener('click', showOrHiddenPopup);
        });

        popupClose.addEventListener('click', showOrHiddenPopup);

        popup.addEventListener('click', event => {
            let target = event.target;
            target = target.closest('.popup-content');

            if (!target) {
                popup.style.display = 'none';
            }
        });
    };

    togglePopup();

    // табы

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = document.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = index => {
            tabContent.forEach((item, i) => {
                if (index === i) {
                    tabContent[i].classList.remove('d-none');
                    tab[i].classList.add('active');
                } else {
                    tabContent[i].classList.add('d-none');
                    tab[i].classList.remove('active');
                }
            });
        };

        tabHeader.addEventListener('click', event => {
            let target = event.target;
            target = target.closest('.service-header-tab');

            if (target) {
                tab.forEach((item, index) => {
                    if (item === target) {
                        toggleTabContent(index);
                    }
                });
            }
        });
    };

    tabs();


});



