let pairsOnDayAmount = 0;
let timesList = [];
let hostname = 'http://94.103.87.164:8081';

function loadTimeslots(func, arg) {
    console.log(hostname);
    let url = hostname + "/api/v1/timeslot";
    fetch(url).then((response) => {
        if (response.ok) {
            return response.json();
        }
        else {
            return 0;
        }
    }).then((response) => {
        pairsOnDayAmount = response.length;

        for (let i = 0; i < pairsOnDayAmount; i++) {
            timesList[i] = {time: response[i].beginTime + " - " + response[i].endTime, timeslotId: response.id};
        }
        func(arg);
    });
}

const getPairTime = (pairNumber) => {
    return timesList[pairNumber-1].time;
}

const getTimeslotId = (pairNumber) => {
    return timesList[pairNumber-1].timeslotId;
}

function setText(elem, text) {
    if (text.length !== null) {
        elem.text(text);
    }
    else {
        elem.text('Информация не найдена :(');
    }
}

const getRightDateFormat = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    return `${year}-${month}-${day}`;
}

const getWeek = (date) => {
    let day = date.getDay();
    let week = [];
    let startDate;
    let copy = new Date(date);

    if (day === 0) {
        startDate =  new Date(copy.setDate(date.getDate() - 6));
    }
    else {
        startDate = new Date(copy.setDate(date.getDate() - (day-1)));
    }

    for (let i = 0; i < 6; i++) {
        copy = new Date(date);
        week[i] = getRightDateFormat(new Date(copy.setDate(startDate.getDate() + i)));
        console.log(copy);
    }
    return week;
}

const getMonth = (number) => {
    switch (number) {
        case "1":
            return "января"
        case "2":
            return "февраля"
        case "3":
            return "марта"
        case "4":
            return "апреля"
        case "5":
            return "мая"
        case "6":
            return "июня"
        case "7":
            return "июля"
        case "8":
            return "августа"
        case "9":
            return "сентября"
        case "10":
            return "октября"
        case "11":
            return "ноября"
        case "12":
            return "декабря"
    }
}

const getDayName = (dateString) => {
    let monthNumber = "";
    if (dateString[5] === "0") {
        monthNumber = dateString[6];
    }
    else {
        monthNumber = `${dateString[5]}${dateString[6]}`;
    }
    return `${dateString[8]}${dateString[9]} ${getMonth(monthNumber)}`;
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

const getPairTypeInf = (pairType) => {
    let pairTypeInf = {
        pairClass: "",
        typeString: ""
    }

    switch (pairType) {
        case "LECTURE":
            pairTypeInf.pairClass = "lecture-pair";
            pairTypeInf.typeString = "Лекция";
            break;
        case "SEMINAR":
            pairTypeInf.pairClass = "seminar-pair";
            pairTypeInf.typeString = "Семинар";
            break;
        case "PRACTICAL-LESSON":
            pairTypeInf.pairClass = "practice-pair";
            pairTypeInf.typeString = "Практика";
            break;
        case "LABORATORY-LESSON":
            pairTypeInf.pairClass = "laboratory-pair";
            pairTypeInf.typeString = "Лабораторная";
            break;
        case "EXAM":
            pairTypeInf.pairClass = "exam-pair";
            pairTypeInf.typeString = "Экзамен";
            break;
    }

    return pairTypeInf;
}

const createTimetableMatrix = (responseArray) => {
    //тут будет логика преобразования массива пар из запроса в удобный мне формат
    let timetableMatrix = responseArray;
    return timetableMatrix;
}

const createPair = (pairType, pairNumber, pairDay, pairName, pairRoom, teacherName, templateCellId) => {
    let pair;
    let pairTypeInf = getPairTypeInf(pairType);
    let pairTypeString = pairTypeInf.typeString;
    let pairTypeClass = pairTypeInf.pairClass;

    if (pairType !== 0) {
        pair = $(templateCellId).clone();
        pair.addClass(pairTypeClass);
    }
    else {
        pair = $("#no-pair-template").clone();
    }

    setText(pair.find(".pair-time"), getPairTime(pairNumber));
    pair.removeAttr('id');

    if (pairType !== 0) {
        setText(pair.find(".pair-type"), pairTypeString);
        setText(pair.find(".pair-name"), pairName.name);
        pair.find(".pair-name").attr('pair-name-id', pairName.id);
        setText(pair.find(".pair-room"), pairRoom.number);
        pair.find(".pair-room").attr('pair-room-id', pairRoom.id)
        setText(pair.find(".teacher-name"), teacherName.name);
        pair.find(".teacher-name").attr('pair-teacher-id', teacherName.id)
    }

    pair.removeClass("d-none");
    return pair;
}

let timeTable972101 = [
    [
        {pairNumber: 1, pairDay: 1, pairType: "LECTURE", pairName: {name: "Основы машинного обучения", id: 5}, pairRoom: {number: "Ауд. 328 (2)", id: 2}, teacherName: {name: "Красавин Дмитрий Сергеевич", id: 4}},
        {},
        {pairNumber: 3, pairDay: 1, pairType: "PRACTICAL-LESSON", pairName: {name: "Основы машинного обучения", id: 5}, pairRoom: {number:"Ауд. 214 (2)", id: 3}, teacherName: {name: "Красавин Дмитрий Сергеевич", id: 4}},
        {},
        {},
        {},
        {}
    ],
    [],
    [
        {pairNumber: 1, pairDay: 3, pairType: "EXAM", pairName: {name: "Тестирование программного обеспечения", id: 17}, pairRoom: {number: "Ауд. 216 (2)", id: 4}, teacherName: {name: "Волков Максим Николаевич", id: 45}},
        {pairNumber: 2, pairDay: 3, pairType: "PRACTICAL-LESSON", pairName: {name: "ООП", id: 90}, pairRoom: {number: "Ауд. 101 (2)", id: 67}, teacherName: {name: "Змеев Денис Олегович", id: 8}},
        {},
        {pairNumber: 4, pairDay: 3, pairType: "LABORATORY-LESSON", pairName: {name: "ООП", id: 90}, pairRoom: {number: "Ауд. 202 (2)", id: 45}, teacherName: {name: "Змеев Денис Олегович", id: 8}},
        {},
        {},
        {}
    ],
    [],
    [
        {pairNumber: 1, pairDay: 5, pairType: "LABORATORY-LESSON", pairName: {name: "Математика для компьютерных наук ч.3", id: 12}, pairRoom: {number: "Ауд. 216 (2)", id: 4}, teacherName: {name: "Даммер Диана Дамировна", id: 18}},
        {},
        {},
        {},
        {},
        {},
        {}
    ],
    []
]

