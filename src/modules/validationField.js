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

export default validationField;
