import URL from '../url.js'

$('.login-form').submit(function (e) {
    e.preventDefault()
    $('.login-form .form-control').removeClass('is-invalid')
    let formData = new FormData(login_form)
    if (isValid(formData)) {
        console.log('can send')
    }
    //sendData(formData)
})

function isValid(formData) {
    if (formData.get('email') == '' || formData.get('password') == '') {
        errorLogIn()
        return false
    }
    return true
}

function sendData(data) {
    fetch(`${URL}/api/account/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                errorLogIn()
            } else {
                return response.json()
            }
        })
        .then((json) => {
            localStorage.setItem('token', `${json['token']}`)
            console.log(localStorage.getItem('token'))
            //location.href = ''
        })
}

function errorLogIn() {
    $('.login-form .form-control').addClass('is-invalid')
}
