import isValid from './validation.js'
import URL from '../url.js'

$('.register-form').submit(function (e) { 
    e.preventDefault()
    let formData = new FormData(register_form)
    $('.register-form .form-control').removeClass('is-invalid')
    $('.invalid-register').addClass('d-none')
    handleFormSubmit(formData)
});

function handleFormSubmit(formData) {
    if (isValid(formData)) {
        console.log(JSON.stringify(Object.fromEntries(formData)))
        sendData(JSON.stringify(Object.fromEntries(formData)))
    }
}

function sendData(data) {
    fetch(`http://94.103.87.164:8081/api/v1/sign-up/employee/schedule-maker`, {
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
            errorRegister('Ошибка регистрации')
        }
    })
    .then ((json) => {
        localStorage.setItem('accessToken', `${json['accessToken']}`)
        location.href = '../timeTable/timeTable.html'
    })
  }

function errorRegister(statusText) {
    $('.invalid-register').removeClass('d-none')
    $('.invalid-register').text(statusText)
}