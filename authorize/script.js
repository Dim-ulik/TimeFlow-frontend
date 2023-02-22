
$('#btn-registration').click(function (e) { 
    e.preventDefault();
    $('.login-form').addClass('d-none');
    $('.register-form').removeClass('d-none');
});

$('#go_to_login').click(function (e) {
    e.preventDefault();
    $('.login-form').removeClass('d-none');
    $('.register-form').addClass('d-none');
})