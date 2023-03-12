let pairsOnDayAmount = 0;
let timesList = [];
let hostname = 'http://94.103.87.164:8081';

function loadTimeslots() {
    let url = hostname + "/api/v1/timeslots";
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
            timesList[i] = {time: response[i].beginTime + " - " + response[i].endTime, timeslotId: response[i].id};
        }
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

const getWeek = (dataDate) => {
    let date = new Date(dataDate);
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
        let temp = new Date(startDate);
        week[i] = getRightDateFormat(new Date(temp.setDate(startDate.getDate() + i)));
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
    let dayNumber = "";
    if (dateString[5] === "0") {
        monthNumber = dateString[6];
    }
    else {
        monthNumber = `${dateString[5]}${dateString[6]}`;
    }
    if (dateString[8] === "0") {
        dayNumber = dateString[9];
    }
    else {
        dayNumber = dateString[8] + dateString[9];
    }
    return `${dayNumber} ${getMonth(monthNumber)}`;
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
        case "PRACTICAL_LESSON":
            pairTypeInf.pairClass = "practice-pair";
            pairTypeInf.typeString = "Практика";
            break;
        case "LABORATORY_LESSON":
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

const selectOption = (field, value) => {
    let string = '#' + field + ' option[value=' + value + ']';
    $(string).prop('selected', true);
}

const createPair = (pairType, pairNumber, pairDay, pairName, pairRoom, teacherName, templateCellId, pairId) => {
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
    pair.find(".pair-time").attr('pair-time-id', getTimeslotId(pairNumber));
    pair.attr('id', pairId);

    if (pairType !== 0) {
        setText(pair.find(".pair-type"), pairTypeString);
        setText(pair.find(".pair-name"), pairName.name);
        pair.find(".pair-name").attr('pair-name-id', pairName.id);
        setText(pair.find(".pair-room"), pairRoom.number);
        pair.find(".pair-room").attr('pair-room-id', pairRoom.id)
        setText(pair.find(".teacher-name"), teacherName.name);
        pair.find(".teacher-name").attr('pair-teacher-id', teacherName.id)
    }

    pair.addClass('pair-cell');
    pair.removeClass("d-none");
    return pair;
}

const loadTimetable = (groupId, startDate, endDate, func) => {
    let url = hostname + "/api/v1/lessons/group/" + groupId + "?startDate=" + startDate + "&endDate=" + endDate;
    fetch(url).then((response) => {
        if (response.ok) {
            return response.json();
        }
        else {
            return 0;
        }
    }).then((json) => {
        localStorage.setItem('group-number', json.studentGroup.number);
        let rightFormatTimetable = createTimetableMatrix(json);
        func(rightFormatTimetable);
    });
}


const changeDays = (week) => {
    for (let i = 0; i < 6; i++) {
        let dayName = getDayName(week[i]);
        let dayInf = $(chooseDay(i+1)).find('.day-date');
        setText(dayInf, dayName);
        $(chooseDay(i+1)).attr('day-date', week[i]);
    }
}

const createTimetableMatrix = (response) => {
    let pairsArray = response.lessons;
    let timetableMatrix = [];
    for(let i = 0; i < 6; i++) {
        timetableMatrix[i] = [];
    }
    for (let i = 0; i < 6; i++) {
        for (let j =  0; j < pairsOnDayAmount; j++) {
            timetableMatrix[i][j] = {};
        }
    }
    for (let i = 0; i < pairsArray.length; i++) {
        let pairId = pairsArray[i].id;
        let pairName = {
            name: pairsArray[i].subject.name,
            id: pairsArray[i].subject.id
        };
        let teacherName = {
            name: pairsArray[i].teacher.surname + ' ' + pairsArray[i].teacher.name + ' ' + pairsArray[i].teacher.patronymic,
            id: pairsArray[i].teacher.id
        }
        let pairRoom = {
            number: pairsArray[i].classroom.number,
            id: pairsArray[i].classroom.id
        }
        let date = new Date(pairsArray[i].date);
        let day = date.getDay();
        let lessonType = pairsArray[i].lessonType;
        let pairNumber = pairsArray[i].timeslot.sequenceNumber;
        timetableMatrix[day-1][pairNumber-1] = {
            pairNumber: pairNumber,
            pairDay: day,
            pairType: lessonType,
            pairName: pairName,
            pairRoom: pairRoom,
            teacherName: teacherName,
            id: pairId
        }
    }
    return timetableMatrix;
}

$(document).ready(function () {
    $("#admin-btn").click(function () {
        window.location.href = '../adminPanel/adminPanel.html';
    });
});

