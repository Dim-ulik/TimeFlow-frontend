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
        sendData(JSON.stringify(Object.fromEntries(formData)))
    }
}

function sendData(data) {
    fetch(`http://94.103.87.164:8081/api/v1/employee/schedule-maker/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept':'application/json'  
    },
      body: data,
    })
    .then ((response) => {
        console.log(response)
        if (response.ok) {
            return response.json();
        } else {
            errorRegister()
        }
    })
    .then ((json) => {
        console.log(json)
    })
  }

function errorRegister() {
    $('#register .invalid-feedback').addClass('is-invalid')
}