function setText(elem, text) {
    if (text.length !== null) {
        elem.text(text);
    }
    else {
        elem.text('Информация не найдена :(');
    }
}

const chooseDay = (day) => {
    switch (day) {
        case 1:
            return "#monday-col";
        case 2:
            return "#tuesday-col";
        case 3:
            return "#wednesday-col";
        case 4:
            return "#thursday-col";
        case 5:
            return "#friday-col";
        case 6:
            return "#saturday-col";
    }
}
