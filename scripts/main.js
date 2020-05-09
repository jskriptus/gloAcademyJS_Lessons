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

    // слайдер

    const slider = () => {
        const slider = document.querySelector('.portfolio-content'),
            slides = document.querySelectorAll('.portfolio-item'),
            portfolioDots = document.querySelector('.portfolio-dots');

        let dots = document.querySelectorAll('.dot');

        // eslint-disable-next-line no-unused-vars
        const addDots = (() => {
            slides.forEach(() => {
                const dot = document.createElement('li');
                dot.classList.add('dot');
                portfolioDots.insertAdjacentElement('afterbegin', dot);
            });

            dots = document.querySelectorAll('.dot');
            dots[0].classList.add('dot-active');
        })();

        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slides, currentSlide, 'portfolio-item-active');
            prevSlide(dots, currentSlide, 'dot-active');
            currentSlide++;

            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }

            nextSlide(slides, currentSlide, 'portfolio-item-active');
            nextSlide(dots, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', event => {
            event.preventDefault();

            const target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slides, currentSlide, 'portfolio-item-active');
            prevSlide(dots, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dots.forEach((item, index) => {
                    if (item === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slides.length - 1;
            }

            nextSlide(slides, currentSlide, 'portfolio-item-active');
            nextSlide(dots, currentSlide, 'dot-active');

        });

        slider.addEventListener('mouseover', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(1500);

    };

    slider();

    // Калькулятор

    const calculator = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcCount = document.querySelector('.calc-count'),
            calcDay = document.querySelector('.calc-day'),
            totalValue = document.querySelector('#total');

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value;
            const squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }

            let i = 0;
            const intervalId = setInterval(() => {
                if (total >= i) {
                    totalValue.textContent = i;
                    i++;
                } else {
                    clearInterval(intervalId);
                }
            }, 1);

        };

        calcBlock.addEventListener('change', event => {
            const target = event.target;
            // if (target.matches('.calc-type') || target.matches('.calc-square') ||
            // target.matches('.calc-count') || target.matches('.calc-day')) {

            // }

            // if (target === calcType || target === calcSquare || target === calcCount || target === calcDay) {

            // }

            if (target.matches('select') || target.matches('input')) {
                countSum();
            }
        });

        // Валидатор инпутов
        calcBlock.addEventListener('input', event => {
            const target = event.target;

            if (target.matches('.calc-item') && !target.matches('.calc-type')) {
                const regexp = /\D/g;

                target.value = target.value.replace(regexp, '');
            }
        });
    };

    calculator(100);

    // Наша команда

    const theTeam = () => {
        const imgs = document.querySelectorAll('[data-img]');
        imgs.forEach(item => {
            item.addEventListener('mouseover', event => {
                const target = event.target;
                const src = target.getAttribute('src');

                target.setAttribute('src', target.dataset.img);

                item.addEventListener('mouseout', () => {
                    target.setAttribute('src', src);
                });
            });
        });

    };

    theTeam();

    // send-ajax-form

    const sendForm = () => {

        // Сообщения которые уведомляют пользователя
        const errorMessage = 'Что-то пошло не так...',
            loadMessage = 'Загрузка...',
            succesMessage = 'Спасибо! Мы скоро с вами свяжемся!';
        // Получаем форму
        const forms = document.querySelectorAll('form');
        // Создаем элемент который будем добавлять на страницу
        const statusMessage = document.createElement('div');
        // Присваиваем этому элементу размер текста
        statusMessage.style.cssText = 'font-size: 2rem;';

        // Вешаем обработчик события submit на формы
        forms.forEach(form => {
            form.addEventListener('submit', event => {
                // Убираем стандартное поведение браузера (перезагрузку страницы после нажатия кнопки "Отправить")
                event.preventDefault();
                // Добавляем ранее созданный элемент на страницу после формы
                form.insertAdjacentElement('afterend', statusMessage);
                // Добавляем сообщение на страницу уведомляющее пользователя о начале загрузки его данных
                if (event.target.id === 'form3') {
                    statusMessage.style.color = 'white';
                    statusMessage.textContent = loadMessage;
                } else {
                    statusMessage.textContent = loadMessage;
                }
                // Создаем обьект formdata который записывает все введенные данные из формы (из тех инпутов которые содержат атрибут name)
                const formData = new FormData(form);
                // Создаем переменную в которой хранится обьект
                const body = {};
                // Перебираем данные из обьекта formdata и записываем значения в вышесозданный обьект
                formData.forEach((item, key) => {
                    body[key] = item;
                });

                const outputData = () => {
                    if (event.target.id === 'form3') {
                        console.log('object');
                        statusMessage.style.color = 'white';
                        statusMessage.textContent = succesMessage;
                        // После отправки инпуты должны очищаться
                        form.reset();
                    } else {
                        statusMessage.textContent = succesMessage;
                        // После отправки инпуты должны очищаться
                        form.reset();
                    }
                }, error = (error) => {
                    if (event.target.id === 'form3') {
                        statusMessage.style.cssText = 'color: white;';
                        statusMessage.textContent = errorMessage;
                    } else {
                        statusMessage.textContent = errorMessage;
                    }
                };

                postData(body).then(outputData).catch(error);
            });
        });

        const postData = (body) => {
            return new Promise((resolve, reject) => {
                // Создаем обьект XMLHttpRequest и присваиваем его переменной request
                const request = new XMLHttpRequest();
                // Вешаем обработчик события readystatechange (это событие срабатывает как только меняется статус readystate) на request
                request.addEventListener('readystatechange', () => {
                    // Проверяем равняется ли статус 4 и если не ровняется мы выходим из этой функции
                    if (request.readyState !== 4) {
                        return;
                    }
                    // Проверяем статус. Если запрос отправился успешно, то меняем сообщение на странице.
                    if (request.status === 200) {
                        resolve();
                    } else { // иначе если пришел другой статус - выводим ошибку
                        reject(request.status);
                    }
                });
                // Настраиваем запрос. Метод POST к нашему файлу server.php
                request.open('POST', './server.php');
                // Настраиваем наш заголовок
                request.setRequestHeader('Content-Type', 'application/json');
                // Переводим обьект body в JSON строку и отправляем на сервер
                request.send(JSON.stringify(body));
            });
        };

    };

    sendForm();

    // Валидация форм

    const validationField = () => {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('input', event => {
                const target = event.target;

                if (target.matches('#form1-phone') || target.matches('#form2-phone') || target.matches('#form3-phone')) {
                    const regexp = /^\+?(\d){0,18}$/g;
                    if (!regexp.test(target.value)) {
                        target.value = '';
                    }
                }

                if (target.matches('#form1-name') || target.matches('#form2-name') || target.matches('#form3-name') || target.matches('#form2-message')) {
                    const regexp = /^([а-яё\s]+)$/iu;
                    if (!regexp.test(target.value)) {
                        target.value = '';
                    }
                }
            });
        });
    };

    validationField();



});