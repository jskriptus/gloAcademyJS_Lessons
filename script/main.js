let books = document.querySelector('.books');
let book = document.querySelectorAll('.book');
let bookUl = document.querySelectorAll('.book > ul');
let adv = document.querySelector('.adv');



// Восстановливаем порядок книг
book[0].before(book[1]); // перемещаю первую книгу перед второй
book[0].after(book[4]); // перемещаю третью книгу после второй
books.append(book[2]); // перемещаю шестую книгу в конец всех книг

// Заменяем картинку заднего фона на другую из папки image
document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

// Исправляем заголовок в книге 3
book[4].childNodes[1].childNodes[1].textContent = 'Книга 3. this и Прототипы Объектов';

// Удаляем рекламу
adv.remove();

// Восстановливаем порядок глав во второй и пятой книге 
// Во второй
bookUl[0].children[9].after(bookUl[0].children[2]);
bookUl[0].children[7].after(bookUl[0].children[6]);
bookUl[0].children[2].after(bookUl[0].children[5]);
bookUl[0].children[4].before(bookUl[0].children[6]);
// В пятой
bookUl[5].children[1].after(bookUl[5].children[9]);
bookUl[5].children[5].after(bookUl[5].children[3]);
bookUl[5].children[9].before(bookUl[5].children[6]);

// В шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
const chapterSix = book[2].children[1].children[0].cloneNode(true);
chapterSix.textContent = 'Глава 8: За пределами ES6';
book[2].children[1].children[9].before(chapterSix);

