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

export default toggleMenu;