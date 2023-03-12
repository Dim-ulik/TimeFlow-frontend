import needToRefreshToken from "../authorize/needToRefreshToken.js";

const ALL_LETTERS_WITH_HYPHEN = /^[А-Яа-я- ]+$/;
const ONLY_NUMBERS = /^\d+$/;

$(document).ready(function () {
    $(".invalid-add-entity").toggleClass("d-none", true);
    $('select[name="enity"]').change(function (e) {
        e.preventDefault();
        $(".invalid-add-entity").toggleClass("d-none", true);
        var el = $(this).val();
        if (el == 1) {
            view(
                $("#teacher_form"),
                $("#classroom_form"),
                $("#subject_form"),
                $("#group_form")
            );
        }
        if (el == 2) {
            view(
                $("#classroom_form"),
                $("#teacher_form"),
                $("#subject_form"),
                $("#group_form")
            );
        }
        if (el == 3) {
            view(
                $("#subject_form"),
                $("#teacher_form"),
                $("#classroom_form"),
                $("#group_form")
            );
        }
        if (el == 4) {
            view(
                $("#group_form"),
                $("#teacher_form"),
                $("#classroom_form"),
                $("#subject_form")
            );
        }
    });
});

function view(visible, invisible1, invisible2, invisible3) {
    visible.removeClass("d-none");
    invisible1.addClass("d-none");
    invisible2.addClass("d-none");
    invisible3.addClass("d-none");
}

$(".upperFirst").change(function (e) {
    e.preventDefault();
    this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
});

$("input").change(function (e) {
    e.preventDefault();
    this.value = this.value.trim();
});

function isValid(formData) {
    let isValidData = true;

    if (formData.has("surname")) {
        if (
            !isNameValid(formData.get("surname")) ||
            formData.get("surname") == ""
        ) {
            $("#surname").toggleClass("is-invalid", true);
            isValidData = false;
        } else {
            $("#surname").removeClass("is-invalid");
        }
    }

    if (formData.has("name")) {
        if (!isNameValid(formData.get("name")) || formData.get("name") == "") {
            $("#name").toggleClass("is-invalid", true);
            isValidData = false;
        } else {
            $("#name").removeClass("is-invalid");
        }
    }

    if (formData.has("patronymic")) {
        if (
            !isNameValid(formData.get("patronymic")) ||
            formData.get("patronymic") == ""
        ) {
            $("#patronymic").toggleClass("is-invalid", true);
            isValidData = false;
        } else {
            $("#patronymic").removeClass("is-invalid");
        }
    }

    if (formData.has("subject")) {
        if (
            !isNameValid(formData.get("subject")) ||
            formData.get("subject") == ""
        ) {
            $("#subject").toggleClass("is-invalid", true);
            isValidData = false;
        } else {
            $("#subject").removeClass("is-invalid");
        }
    }

    if (formData.has("classroom")) {
        if (
            !isFieldValid(formData.get("classroom")) ||
            formData.get("classroom") == ""
        ) {
            $("#classroom").toggleClass("is-invalid", true);
            isValidData = false;
        } else {
            $("#classroom").removeClass("is-invalid");
        }
    }

    let groupLength = 6;
    if (formData.has("group")) {
        if (
            !isFieldValid(formData.get("group")) ||
            formData.get("group").length != groupLength ||
            formData.get("group") == ""
        ) {
            $("#group").toggleClass("is-invalid", true);
            isValidData = false;
        } else {
            $("#group").removeClass("is-invalid");
        }
    }

    return isValidData;
}

function isNameValid(value) {
    return ALL_LETTERS_WITH_HYPHEN.test(value);
}

function isFieldValid(value) {
    return ONLY_NUMBERS.test(value);
}

$(".add-entity-form").submit(function (e) {
    e.preventDefault();
    $(".invalid-add-entity").toggleClass("d-none", true);
    let formData = new FormData(this);
    $(`#${$(this).attr("id")} .form-control`).removeClass("is-invalid");
    handleFormSubmit($(this).attr("id"), formData);
});

function handleFormSubmit(component, formData) {
    component = `${component.split("_", 1)}s`;
    if (isValid(formData)) {
        for (let key of formData.keys()) {
            if (key == "subject") {
                formData.append("name", formData.get("subject"));
                formData.delete("subject");
            }
            if (key == "classroom") {
                formData.append("number", formData.get("classroom"));
                formData.delete("classroom");
            }
            if (key == "group") {
                formData.append("number", formData.get("group"));
                formData.delete("group");
            }
        }
        sendData(component, JSON.stringify(Object.fromEntries(formData)));
    }
}

function sendData(component, data) {
    fetch(`http://94.103.87.164:8081/api/v1/${component}`, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: data,
    })
        .then((response) => {
            needToRefreshToken(response);
            if (response.status == 400) {
                return response.json().then((json) => {
                    $(".invalid-add-entity").toggleClass("d-none", false);
                    $(".invalid-add-entity").text(json.messages.join());
                });
            } else if (response.ok) {
                location.reload();
            }
            return response.json();
        })
}
