class DomElement {
    /* Сделать класс DomElement, который
    содержит свойства
    - selector, 
    - height, 
    - width, 
    - bg, 
    - fontSize
    */
    constructor(selector, height, width, bg, fontSize) {
        this.selector = selector;
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
    }

    createElement() { // содержит метод, который создает элемент на странице в зависимости от условия:  
        let body = document.querySelector('body');
        let div = document.createElement('div');
        let p = document.createElement('p');
        let selector = this.selector;

        if (selector[0] === '.') { // если строка selector начинается с точки, создаем div с классом
            div.setAttribute('class', selector.slice(1));
            body.insertAdjacentElement('afterbegin', div);

            /*
            с помощью cssText задавать стили: 
            - высотой - height,
            - шириной - width, 
            - background - bg
            - размер текста fontSize 
            */

            div.style.cssText = `height: ${this.height};
                                width: ${this.width};
                                background: ${this.bg};
                                font-size: ${this.fontSize};
                                position: absolute`;
            div.textContent = "blablabla"; // внутрь созданного блока записывать любой текст. Метод записи может быть любым.
        } else if (selector[0] === '#') { // если строка selector  начинается с решетки # то создаем параграф с id
            p.setAttribute('id', selector.slice(1));
            body.insertAdjacentElement('afterbegin', p);
            p.style.cssText = `height: ${this.height};
                                width: ${this.width};
                                background: ${this.bg};
                                font-size: ${this.fontSize};
                                position: absolute`;
            p.textContent = "blobloblo";
        }
    }
}

const domElement = new DomElement('#blabla', '200px', '200px', 'red', '25px'); // Создать новый объект на основе класса DomElement

domElement.createElement(); // Вызвать его метод чтобы получить элемент на странице