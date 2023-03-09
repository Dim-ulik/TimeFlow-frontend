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
        if (response.ok) {
            return response.json()
            .then ((json) => {
                console.log(json)
                localStorage.setItem('accessToken', `${json['accessToken']}`)
                localStorage.setItem('refreshToken', `${json['refreshToken']}`)
                location.href = '../timeTable/timeTable.html'
            })
        } else {
            if (response.status == 400) {
                errorRegister('Ошибка регистрации')
                return response.json()
                .then((json) => {
                    for (let error in json) {
                        console.log(error + ' ' + json[error].join())
                        $(`#${error}`).toggleClass('is-invalid', true)
                        $(`#${error} + .invalid-feedback`).text(json[error].join())
                    }
                })
            }
        }
    }) 
  }

function errorRegister(statusText) {
    $('.invalid-register').removeClass('d-none')
    $('.invalid-register').text(statusText)
}