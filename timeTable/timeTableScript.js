const pairsOnDayAmount = 7;

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

const addPair = (pair, day) => {
    let dayId = chooseDay(day);
    $(dayId).append(pair);
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
            pairTypeInf.pairClass = "practice-pair";
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

const createPair = (pairType, pairPlace, pairTime, pairName, pairRoom, teacherName) => {
    let pair;
    let pairTypeString = getPairTypeInf(pairType).typeString;
    let pairTypeClass = getPairTypeInf(pairType).pairClass;

    if (pairType !== 0) {
        pair = $("#pair-template").clone();
        pair.addClass(pairTypeClass);
    }
    else {
        pair = $("#no-pair-template").clone();
    }

    setText(pair.find(".pair-time"), pairTime);
    let pairId = pairPlace.day.toString() + "." + pairPlace.number.toString();
    pair.attr("pair-id", pairId);

    if (pairType !== 0) {
        setText(pair.find(".pair-type"), pairTypeString);
        setText(pair.find(".pair-name"), pairName);
        setText(pair.find(".pair-room"), pairRoom);
        setText(pair.find(".teacher-name"), teacherName);
    }

    pair.removeClass("d-none");
    addPair(pair, pairPlace.day);
}


const createFreeDay = (day) => {
    let cell = $("#free-day-template").clone();
    cell.removeClass("d-none");
    addPair(cell, day);
}

const createTimetable = (array) => {
    for (let i = 0; i < 6; i++) {
        if (array[i].length !== 0) {
            for (let j = 0; j < array[i].length; j++) {
                let pairPlace = {
                    day: i+1, number: j+1
                }
                if (array[i][j].pairType === 0) {
                    createPair(0, pairPlace, array[i][j].pairTime);
                }
                else {
                    createPair(array[i][j].pairType, pairPlace, array[i][j].pairTime, array[i][j].pairName, array[i][j].pairRoom, array[i][j].teacherName);
                }
            }
        }
        else {
            createFreeDay(i+1);
        }
    }
}

let timeTable972101 = [
    [
        {pairType: "LECTURE", pairTime: "8:45 - 10:20", pairName: "Основы машинного обучения", pairRoom: "Ауд. 328 (2)", teacherName: "Красавин Дмитрий Сергеевич"},
        {pairType: 0, pairTime: "8:45 - 10:20"},
        {pairType: "PRACTICAL-LESSON", pairTime: "10:35 - 12:10", pairName: "Основы машинного обучения", pairRoom: "Ауд. 214 (2)", teacherName: "Красавин Дмитрий Сергеевич"}
    ],
    [],
    [
        {pairType: "EXAM", pairTime: "8:45 - 10:20", pairName: "Тестирование программного обеспечения", pairRoom: "Ауд. 216 (2)", teacherName: "Волков Максим Николаевич"},
        {pairType: "PRACTICAL-LESSON", pairTime: "12:25 - 14:00", pairName: "ООП", pairRoom: "Ауд. 101 (2)", teacherName: "Змеев Денис Олегович"},
        {pairType: 0, pairTime: "14:45 - 16:20"},
        {pairType: "LABORATORY-LESSON", pairTime: "16:35 - 18:10", pairName: "ООП", pairRoom: "Ауд. 202 (2)", teacherName: "Змеев Денис Олегович"},
    ],
    [],
    [
        {pairType: "LABORATORY-LESSON", pairTime: "8:45 - 10:20", pairName: "Математика для компьютерных наук ч.3", pairRoom: "Ауд. 216 (2)", teacherName: "Даммер Диана Дамировна"},
    ],
    []
]

let timeTable972102 = [
    [],
    [
        {pairType: "LECTURE", pairTime: "8:45 - 10:20", pairName: "Основы машинного обучения", pairRoom: "Ауд. 328 (2)", teacherName: "Красавин Дмитрий Сергеевич"},
        {pairType: 0, pairTime: "8:45 - 10:20"},
        {pairType: "PRACTICAL-LESSON", pairTime: "10:35 - 12:10", pairName: "Основы машинного обучения", pairRoom: "Ауд. 214 (2)", teacherName: "Красавин Дмитрий Сергеевич"}
    ],
    [],
    [
        {pairType: "LABORATORY-LESSON", pairTime: "8:45 - 10:20", pairName: "Математика для компьютерных наук ч.3", pairRoom: "Ауд. 216 (2)", teacherName: "Даммер Диана Дамировна"},
    ],
    [],
    [
        {pairType: "EXAM", pairTime: "8:45 - 10:20", pairName: "Тестирование программного обеспечения", pairRoom: "Ауд. 216 (2)", teacherName: "Волков Максим Николаевич"},
        {pairType: "PRACTICAL-LESSON", pairTime: "12:25 - 14:00", pairName: "ООП", pairRoom: "Ауд. 101 (2)", teacherName: "Змеев Денис Олегович"},
        {pairType: 0, pairTime: "14:45 - 16:20"},
        {pairType: "LABORATORY-LESSON", pairTime: "16:35 - 18:10", pairName: "ООП", pairRoom: "Ауд. 202 (2)", teacherName: "Змеев Денис Олегович"},
    ]
]

createTimetable(timeTable972102);