import isValid from './validation.js'
import URL from '../url.js'

$('.register-form').submit(function (e) { 
    e.preventDefault()
    let formData = new FormData(register_form)
    $('.register-form .form-control').removeClass('is-invalid')
    $('#register .invalid-feedback').removeClass('is-invalid')
    handleFormSubmit(formData)
});

function handleFormSubmit(formData) {
    if (isValid(formData)) {
        //sendData(formData)
    }
}

function sendData(data) {
    fetch(`${URL}/api/account/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept':'application/json'  
    },
      body: JSON.stringify(data),
    })
    .then ((response) => {
        if (response.ok) {
            return response.json();
        } else {
            errorRegister()
        }
    })
    .then ((json) => {
        localStorage.setItem('token', `${json['token']}`);
        //location.href = ''
    })
  }

function errorRegister() {
    $('#register .invalid-feedback').addClass('is-invalid')
}