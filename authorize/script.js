import "./login.js";
import "./register.js";

$("#btn-registration").click(function (e) {
    e.preventDefault();
    $(".login-form").addClass("d-none");
    $(".register-form").removeClass("d-none");
});

$("#go_to_login").click(function (e) {
    e.preventDefault();
    $(".login-form").removeClass("d-none");
    $(".register-form").addClass("d-none");
});

$(".upperFirst").change(function (e) {
    e.preventDefault();
    this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
});

$("input").change(function (e) {
    e.preventDefault();
    this.value = this.value.trim();
});
