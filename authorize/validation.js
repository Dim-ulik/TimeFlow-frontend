const EMAIL_REGEXP = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const WITHOUT_SPACES_REGEXP = /^\S+$/
const ALL_LETTERS_WITH_HYPHEN = /^[А-Яа-я- ]+$/
const CONTRACT_NUMBER = /^\d{4}-\d{2}\/\d{2}$/
const ONLY_LETTERS_AND_NUMBERS = /^[A-Za-z0-9]+$/


$('#surname, #name').change(function (e) { 
    e.preventDefault();
    if (!isNameValid($(this).val()) || $(this).val() == '') {
        $(this).toggleClass('is-invalid', true)
    } else {
        $(this).removeClass('is-invalid')
    }
});

$('#patronymic').change(function (e) { 
    e.preventDefault();
    if (!isNameValid($(this).val())) {
        $(this).toggleClass('is-invalid', true)
    } else {
        $(this).removeClass('is-invalid')
    }
});

$('#contractNumber').change(function (e) { 
    e.preventDefault();
    if (!isContractNumberValid($(this).val()) || $(this).val() == '') {
        $(this).toggleClass('is-invalid', true)
    } else {
        $(this).removeClass('is-invalid')
    }
});

$('#email').change(function (e) { 
    e.preventDefault();
    if (!isEmailValid($(this).val()) || $(this).val() == '') {
        $(this).toggleClass('is-invalid', true)
    } else {
        $(this).removeClass('is-invalid')
    }
});


$('#password').change(function (e) { 
    e.preventDefault();
    let max_password_len = 32
    let min_password_len = 8
    if (!isNotContainsSpecialSumbols($(this).val()) ||
    $(this).val().length < min_password_len ||
    $(this).val().length > max_password_len) {
        $(this).toggleClass('is-invalid', true)
    } else {
        $(this).removeClass('is-invalid')
    }
});

$('#password-check').change(function (e) { 
    e.preventDefault();
    if ($(this).val() !== $(this).val()) {
        $(this).toggleClass('is-invalid', true)
    } else {
        $(this).removeClass('is-invalid')
    }

});

function isValid( formData ) {
    let isValidData = true
    if (!isNameValid(formData.get('surname')) || formData.get('surname') == '') {
        $('#surname').toggleClass('is-invalid', true)
        isValidData = false
    } else {
        $('#surname').removeClass('is-invalid')
    }
    
    if (!isNameValid(formData.get('name')) || formData.get('name') == '') {
        $('#name').toggleClass('is-invalid', true)
        isValidData = false
    } else {
        $('#name').removeClass('is-invalid')
    }

    if (!isNameValid(formData.get('patronymic')) || formData.get('patronymic') == '') {
        $('#patronymic').toggleClass('is-invalid', true)
        isValidData = false
    } else {
        $('#patronymic').removeClass('is-invalid')
    }

    if (!isContractNumberValid(formData.get('contractNumber')) || formData.get('contractNumber') == '') {
        $('#contractNumber').toggleClass('is-invalid', true)
        isValidData = false
    } else {
        $('#contractNumber').removeClass('is-invalid')
    }

    if (!isEmailValid(formData.get('email')) || formData.get('email') == '') {
        $('#email').toggleClass('is-invalid', true)
        isValidData = false
    } else {
        $('#email').removeClass('is-invalid')
    }

    let max_password_len = 32
    let min_password_len = 8
    if (!isNotContainsSpecialSumbols(formData.get('password')) ||
    formData.get('password').length < min_password_len ||
    formData.get('password').length > max_password_len) {
        $('#password').toggleClass('is-invalid', true)
        isValidData = false
    } else {
        $('#password').removeClass('is-invalid')
    }

    if (formData.get('password') !== $('#password_check').val()) {
        $('#password_check').toggleClass('is-invalid', true)
        isValidData = false
    } else {
        $('#password_check').removeClass('is-invalid')
    }

    return isValidData
}

function isNotContainsSpecialSumbols(value) {
    return ONLY_LETTERS_AND_NUMBERS.test(value)
}

function isContractNumberValid(value) {
    return CONTRACT_NUMBER.test(value)
}

function isNameValid(value) {
    return ALL_LETTERS_WITH_HYPHEN.test(value)
}

function isEmailValid(value) {
    return EMAIL_REGEXP.test(value)
}

export default isValid
