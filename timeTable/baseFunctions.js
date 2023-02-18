function setText(elem, text) {
    if (text.length !== null) {
        elem.text(text);
    }
    else {
        elem.text('Информация не найдена :(');
    }
}