import isValid from './validation.js'

$('#btn-registration').click(function (e) { 
    e.preventDefault();
    $('.login-form').addClass('d-none');
    $('.register-form').removeClass('d-none');
});

$('#go_to_login').click(function (e) {
    e.preventDefault();
    $('.login-form').removeClass('d-none');
    $('.register-form').addClass('d-none');
})

$('input').change(function (e) { 
    e.preventDefault();
    this.value = this.value.trim()
    this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1)
});

$('.register-form').submit(function (e) { 
    e.preventDefault();
    let formData = new FormData(register_form);
    handleFormSubmit(formData);
});

function handleFormSubmit(formData) {
    if (isValid(formData)) {
        console.log("can fetch")
    }
}


// $(document).ready(function () {
//     const CONTRACT_NUMBER = /^[A-Za-z0-9]+$/
//     console.log(CONTRACT_NUMBER.test('skdjfk3j2kjnrk2^^^'))
// });