const EMAIL_REGEXP = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const WITHOUT_SPACES_REGEXP = /^\S+$/
const ALL_LETTERS_WITH_HYPHEN = /^[A-Za-z]+$/

function isValid( formData ) {

    


    return true;
}
function isCorrectName(value) {
    return ALL_LETTERS_WITH_HYPHEN.test(value)
}

function isEmailValid(value) {
    return EMAIL_REGEXP.test(value)
}

function isWithoutSpaces(value) {
    return WITHOUT_SPACES_REGEXP.test(value)
}

export default isValid