const validationField = () => {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('input', event => {
            const target = event.target;


            if (target.matches('#form1-phone') || target.matches('#form2-phone') || target.matches('#form3-phone')) {
                target.value = target.value.replace(/\D/g, '').substr(0, 13);
            }

            if (target.matches('#form1-name') || target.matches('#form2-name') || target.matches('#form3-name') || target.matches('#form2-message')) {
                target.value = target.value.replace(/[^а-яё]/gi, '');
            }
        });
    });
};

export default validationField;