
$('.switch input').change(function (e) { 
    e.preventDefault();
 	if($(this).prop('checked')){
        $('.can-registration').addClass('d-none')
    }
    else {
        $('.can-registration').removeClass('d-none')
    }
});