let pairsOnDayAmount = 0;
let timesList = [];
let hostname = 'http://94.103.87.164:8081';

const createTimesList = (response, timesList) => {
    pairsOnDayAmount = response.length;

    for (let i = 0; i < pairsOnDayAmount; i++) {
        timesList[i] = {time: response[i].beginTime + " - " + response[i].endTime, timeslotId: response.id};
    }
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
    let week = {
        startDate: "",
        endDate: ""
    }
    let copy = new Date(date);
    if (day === 0) {
        week.startDate =  getRightDateFormat(new Date(copy.setDate(date.getDate() - 6)));
        week.endDate = getRightDateFormat(new Date(copy.setDate(date.getDate() - 1)));
    }
    else {
        week.startDate =  getRightDateFormat(new Date(copy.setDate(date.getDate() - (day-1))));
        week.endDate = getRightDateFormat(new Date(copy.setDate(date.getDate() + (6-day))));
    }
    return week;
}

let dateX = new Date ("2023-02-28");
console.log(getWeek(dateX));

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

let response = [
    {sequenceNumber: 1, beginTime: "8:45", endTime: "10:20", id: "9091"},
    {sequenceNumber: 2, beginTime: "10:35", endTime: "12:10", id: "9092"},
    {sequenceNumber: 3, beginTime: "12:25", endTime: "14:00", id: "9093"},
    {sequenceNumber: 4, beginTime: "14:45", endTime: "16:20", id: "9094"},
    {sequenceNumber: 5, beginTime: "16:35", endTime: "18:10", id: "9095"},
    {sequenceNumber: 6, beginTime: "18:25", endTime: "20:00", id: "9096"},
    {sequenceNumber: 7, beginTime: "20:15", endTime: "21:50", id: "9097"},
]

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

createTimesList(response, timesList);