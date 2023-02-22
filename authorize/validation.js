const EMAIL_REGEXP = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const WITHOUT_SPACES_REGEXP = /^\S+$/
const ALL_LETTERS_WITH_HYPHEN = /^[A-Za-z- ]+$/
const CONTRACT_NUMBER = /^\d{4}-\d{2}\/\d{2}$/
const ONLY_LETTERS_AND_NUMBERS = /^[A-Za-z0-9]+$/

function isValid( formData ) {

    if (!isNameValid(formData.get('surname')) && formData.get('surname') == '') {
        $('#surname').toggleClass('is-invalid', true)
    } else {
        $('#surname').removeClass('is-invalid')
    }
    
    if (!isNameValid(formData.get('name')) && formData.get('name') == '') {
        $('#name').toggleClass('is-invalid', true)
    } else {
        $('#name').removeClass('is-invalid')
    }

    if (!isNameValid(formData.get('patronymic')) && formData.get('patronymic') == '') {
        $('#patronymic').toggleClass('is-invalid', true)
    } else {
        $('#patronymic').removeClass('is-invalid')
    }

    if (!isContractNumberValid(formData.get('contractNumber')) && formData.get('contractNumber') == '') {
        $('#contract_number').toggleClass('is-invalid', true);
    } else {
        $('#contract_number').removeClass('is-invalid');
    }

    if (!isEmailValid(formData.get('email')) && formData.get('email') == '') {
        $('#email').toggleClass('is-invalid', true)
    } else {
        $('#email').removeClass('is-invalid');
    }

    let max_password_len = 32
    let min_password_len = 8
    if (!isNotContainsSpecialSumbols(formData.get('password')) &&
    formData.get('password').length < min_password_len &&
    formData.get('password').length > max_password_len) {
        $('#password').toggleClass('is-invalid', true)
    } else {
        $('#password').removeClass('is-invalid')
    }

    if (formData.get('password') !== formData.get('password_check')) {
        $('#password_check').toggleClass('is-invalid', true)
    } else {
        $('#password_check').removeClass('is-invalid')
    }


    return true;
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

function isWithoutSpaces(value) {
    return WITHOUT_SPACES_REGEXP.test(value)
}

export default isValid
