import URL from '../url.js'

$('.login-form').submit(function (e) {
    e.preventDefault()
    $('.login-form .form-control').removeClass('is-invalid')
    let formData = new FormData(login_form)
    if (isValid(formData)) {
        console.log('can send')
    }
    sendData(JSON.stringify(Object.fromEntries(formData)))
})

function isValid(formData) {
    if (formData.get('email') == '' || formData.get('password') == '') {
        errorLogIn()
        return false
    }
    return true
}

function sendData(data) {
    fetch(`http://94.103.87.164:8081/api/v1/sign-in`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: data,
    })
        .then((response) => {
            if (!response.ok) {
                errorLogIn()
            } else {
                return response.json()
            }
        })
        .then((json) => {
            localStorage.setItem('accessToken', `${json['accessToken']}`)
            location.href = '../timeTable/timeTable.html'
        })
}

function errorLogIn() {
    $('.login-form .form-control').addClass('is-invalid')
}
