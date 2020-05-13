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

export default togglePopup;