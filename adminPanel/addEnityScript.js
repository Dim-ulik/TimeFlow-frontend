const ALL_LETTERS_WITH_HYPHEN = /^[А-Яа-я- ]+$/
const ONLY_NUMBERS = /^\d+$/

$(document).ready(function () {
    $('select[name="enity"]').change(function (e) {
        e.preventDefault()
        var el = $(this).val();
        if (el == 1) {
            view($('#teacher_form'), $('#classroom_form'), $('#subject_form'), $('#group_form'));
        }if (el == 2) {
            view($('#classroom_form'), $('#teacher_form'), $('#subject_form'), $('#group_form'));
        }if (el == 3) {
            view($('#subject_form'), $('#teacher_form'), $('#classroom_form'), $('#group_form'));
        }if (el == 4) {
            view($('#group_form'), $('#teacher_form'), $('#classroom_form'), $('#subject_form') );
        }
    });
});

function view(visible, invisible1, invisible2, invisible3) {
    visible.removeClass('d-none');
    invisible1.addClass('d-none');
    invisible2.addClass('d-none');
    invisible3.addClass('d-none');
}

$('.upperFirst').change(function (e) { 
    e.preventDefault()
    this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1)
});

$('input').change(function (e) { 
    e.preventDefault();
    this.value = this.value.trim()
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

    if (!isNameValid(formData.get('subject')) || formData.get('subject') == '') {
        $('#subject').toggleClass('is-invalid', true)
        isValidData = false
    } else {
        $('#subject').removeClass('is-invalid')
    }

    if (!isFieldValid(formData.get('classroom')) || formData.get('classroom') == '') {
        $('#classroom').toggleClass('is-invalid', true)
        isValidData = false
    } else {
        $('#classroom').removeClass('is-invalid')
    }

    if (!isFieldValid(formData.get('group')) || formData.get('group') == '') {
        $('#group').toggleClass('is-invalid', true)
        isValidData = false
    } else {
        $('#group').removeClass('is-invalid')
    }

    return isValidData
}

function isNameValid(value) {
    return ALL_LETTERS_WITH_HYPHEN.test(value)
}

function isFieldValid(value) {
    return ONLY_NUMBERS.test(value)
}

$('.teacher-form').submit(function (e) { 
    e.preventDefault()
    let formData = new FormData(teacher_form)
    $('.teacher-form .form-control').removeClass('is-invalid')
    handleFormSubmit(formData)
});

$('.subject-form').submit(function (e) { 
    e.preventDefault()
    let formData = new FormData(subject_form)
    $('.subject-form .form-control').removeClass('is-invalid')
    handleFormSubmit(formData)
});

$('.classroom-form').submit(function (e) { 
    e.preventDefault()
    let formData = new FormData(classroom_form)
    $('.classroom-form .form-control').removeClass('is-invalid')
    handleFormSubmit(formData)
});

$('.group-form').submit(function (e) { 
    e.preventDefault()
    let formData = new FormData(group_form)
    $('.group-form .form-control').removeClass('is-invalid')
    handleFormSubmit(formData)
});

function handleFormSubmit(formData) {
    if (isValid(formData)) {
        console.log(JSON.stringify(Object.fromEntries(formData)))
        //sendData(JSON.stringify(Object.fromEntries(formData)))
    }
}