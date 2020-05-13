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

            postData(body)
                .then((response) => {
                    if (response.status !== 200) {
                        throw new Error("status newtwork not 200");
                    }

                    statusMessage.textContent = succesMessage;

                    setTimeout(() => {
                        statusMessage.textContent = '';
                    }, 5000);
                })
                .catch((error) => {
                    statusMessage.textContent = errorMessage;
                    setTimeout(() => {
                        statusMessage.textContent = '';
                    }, 5000);
                    console.error(error);
                });
        });
    });

    const postData = (body) => {
        return fetch("./server.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(body),
        });
    };

};

export default sendForm;