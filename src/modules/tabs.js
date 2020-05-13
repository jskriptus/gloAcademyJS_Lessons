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

export default tabs;