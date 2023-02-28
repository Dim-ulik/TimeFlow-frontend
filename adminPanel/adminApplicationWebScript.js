function userCard () {
    let cardClone = $('#card-application').clone();
    cardClone.removeClass('d-none')
    $('#container').append(cardClone)
}

userCard()