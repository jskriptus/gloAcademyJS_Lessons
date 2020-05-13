const validationField = () => {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('input', event => {
            const target = event.target;

            if (target.matches('#form1-name') || target.matches('#form2-name') || target.matches('#form3-name') || target.matches('#form2-message')) {

                target.value = target.value.replace(/[^А-Яа-я,!\?\(\)"';:-]/g, '');

            }
        });
    });
};

export default validationField;