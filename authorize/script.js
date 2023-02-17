
$('.switch input').change(function (e) { 
    e.preventDefault();
    $('.register-form').addClass('d-none');
 	if($(this).prop('checked')){
        $('.can-registration').addClass('d-none')
        $('.login-form').removeClass('d-none')
        
    } else {
        $('.can-registration').removeClass('d-none')
    }
});

$('#btn-registration').click(function (e) { 
    e.preventDefault();
    $('.login-form').addClass('d-none');
    $('.can-registration').addClass('d-none');
    $('.register-form').removeClass('d-none');
});