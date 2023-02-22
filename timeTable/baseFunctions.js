let pairsOnDayAmount = 7;
let timesList = [];

const createTimesList = (response, timesList) => {
    pairsOnDayAmount = response.length;

    for (let i = 0; i < pairsOnDayAmount; i++) {
        timesList[i] = response[i].beginTime + " - " + response[i].endTime;
    }
}

const getPairTime = (pairNumber) => {
    return timesList[pairNumber-1];
}

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
        setText(pair.find(".pair-name"), pairName);
        setText(pair.find(".pair-room"), pairRoom);
        setText(pair.find(".teacher-name"), teacherName);
    }

    pair.removeClass("d-none");
    return pair;
}

let response = [
    {sequenceNumber: 1, beginTime: "8:45", endTime: "10:20"},
    {sequenceNumber: 2, beginTime: "10:35", endTime: "12:10"},
    {sequenceNumber: 3, beginTime: "12:25", endTime: "14:00"},
    {sequenceNumber: 4, beginTime: "14:45", endTime: "16:20"},
    {sequenceNumber: 5, beginTime: "16:35", endTime: "18:10"},
    {sequenceNumber: 6, beginTime: "18:25", endTime: "20:00"},
]

let timeTable972101 = [
    [
        {pairNumber: 1, pairDay: 1, pairType: "LECTURE", pairTime: "8:45 - 10:20", pairName: "Основы машинного обучения", pairRoom: "Ауд. 328 (2)", teacherName: "Красавин Дмитрий Сергеевич"},
        {pairNumber: 2, pairDay: 1, pairType: 0, pairTime: "8:45 - 10:20"},
        {pairNumber: 3, pairDay: 1, pairType: "PRACTICAL-LESSON", pairTime: "10:35 - 12:10", pairName: "Основы машинного обучения", pairRoom: "Ауд. 214 (2)", teacherName: "Красавин Дмитрий Сергеевич"}
    ],
    [],
    [
        {pairNumber: 1, pairDay: 3, pairType: "EXAM", pairTime: "8:45 - 10:20", pairName: "Тестирование программного обеспечения", pairRoom: "Ауд. 216 (2)", teacherName: "Волков Максим Николаевич"},
        {pairNumber: 2, pairDay: 3, pairType: "PRACTICAL-LESSON", pairTime: "12:25 - 14:00", pairName: "ООП", pairRoom: "Ауд. 101 (2)", teacherName: "Змеев Денис Олегович"},
        {pairNumber: 3, pairDay: 3, pairType: 0, pairTime: "14:45 - 16:20"},
        {pairNumber: 4, pairDay: 3, pairType: "LABORATORY-LESSON", pairTime: "16:35 - 18:10", pairName: "ООП", pairRoom: "Ауд. 202 (2)", teacherName: "Змеев Денис Олегович"},
    ],
    [],
    [
        {pairNumber: 1, pairDay: 5, pairType: "LABORATORY-LESSON", pairTime: "8:45 - 10:20", pairName: "Математика для компьютерных наук ч.3", pairRoom: "Ауд. 216 (2)", teacherName: "Даммер Диана Дамировна"},
    ],
    []
]

let timeTable972102 = [
    [],
    [
        {pairNumber: 1, pairDay: 2, pairType: "SEMINAR", pairTime: "8:45 - 10:20", pairName: "Основы машинного обучения", pairRoom: "Ауд. 328 (2)", teacherName: "Красавин Дмитрий Сергеевич"},
        {pairNumber: 2, pairDay: 2, pairType: 0, pairTime: "8:45 - 10:20"},
        {pairNumber: 3, pairDay: 2, pairType: "PRACTICAL-LESSON", pairTime: "10:35 - 12:10", pairName: "Основы машинного обучения", pairRoom: "Ауд. 214 (2)", teacherName: "Красавин Дмитрий Сергеевич"}
    ],
    [],
    [
        {pairNumber: 1, pairDay: 4, pairType: "LABORATORY-LESSON", pairTime: "8:45 - 10:20", pairName: "Математика для компьютерных наук ч.3", pairRoom: "Ауд. 216 (2)", teacherName: "Даммер Диана Дамировна"},
    ],
    [],
    [
        {pairNumber: 1, pairDay: 6, pairType: "EXAM", pairTime: "8:45 - 10:20", pairName: "Тестирование программного обеспечения", pairRoom: "Ауд. 216 (2)", teacherName: "Волков Максим Николаевич"},
        {pairNumber: 2, pairDay: 6, pairType: "PRACTICAL-LESSON", pairTime: "12:25 - 14:00", pairName: "ООП", pairRoom: "Ауд. 101 (2)", teacherName: "Змеев Денис Олегович"},
        {pairNumber: 3, pairDay: 6, pairType: 0, pairTime: "14:45 - 16:20"},
        {pairNumber: 4, pairDay: 6, pairType: "LABORATORY-LESSON", pairTime: "16:35 - 18:10", pairName: "ООП", pairRoom: "Ауд. 202 (2)", teacherName: "Змеев Денис Олегович"},
    ]
]

createTimesList(response, timesList);
