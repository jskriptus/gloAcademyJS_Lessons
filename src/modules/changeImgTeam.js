const changeImgTeam = () => {
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

export default changeImgTeam;