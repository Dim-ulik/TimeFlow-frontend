$(document).ready(function () {
    loadGroups();
    changeDate();
    validation();
    loadTimeslots();
    $("#btn-show-timetable").click(function (e) {
        e.preventDefault();
        createTimetable();
    });

    $("#inf-form").change(function () {
        validation();
    });
});

const createTimetable = () => {
    let date = $("#week-date").val();
    let group = $("#groups-list").val();
    let week = getWeek(date);
    localStorage.setItem('date', date);
    localStorage.setItem('group', group);
    clearTimetable();
    loadTimetable(group, week[0], week[week.length - 1], showTimetable);
}

const changeDate = () => {
    let weekInput = $("#week-date");
    let localWeek = localStorage.getItem('week');
    let date = getRightDateFormat(new Date());
    if (localWeek === null) {
        weekInput.attr('value', date);
        localStorage.setItem('week', date);
    }
    else {
        weekInput.attr('value', localWeek);
    }
    let week = getWeek(weekInput.val());
    changeDays(week);
}

const validation = () => {
    let inputDate = $("#week-date");
    let inputGroup = $("#groups-list");
    if (inputGroup.val() === '0' || (inputDate.val() < '2010-01-01' || inputDate.val() > '3000-01-01')) {
        $("#btn-show-timetable").attr('disabled', true);
        $("#btn-edit-timetable").attr('disabled', true);
    }
    else {
        $("#btn-show-timetable").attr('disabled', false);
        $("#btn-edit-timetable").attr('disabled', false);
    }
}

const addPair = (pair, day) => {
    let dayId = chooseDay(day);
    $(dayId).append(pair);
}

const createFreeDay = (day) => {
    let cell = $("#free-day-template").clone();
    cell.removeClass("d-none");
    addPair(cell, day);
}

const checkLastEmptyPair = (matrix, i, j) => {
    let emptyCount = 0;
    for(let x = j+1; x < matrix[i].length; x++) {
        if (jQuery.isEmptyObject(matrix[i][x])) emptyCount++;
    }
    return (emptyCount + j) === (matrix[i].length - 1);
}

const checkEmptyDay = (day) => {
    for (let i = 0; i < day.length; i++) {
        if (!jQuery.isEmptyObject(day[i])) {
            return false;
        }
    }
    return true;
}

const showTimetable = (matrix) => {
    for (let i = 0; i < 6; i++) {
        if (checkEmptyDay(matrix[i])) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (jQuery.isEmptyObject(matrix[i][j])) {
                    if (checkLastEmptyPair(matrix, i, j)) continue;
                    let currentPair = createPair(0, j+1, i+1);
                    addPair(currentPair, i+1);
                }
                else {
                    let currentPair = createPair(matrix[i][j].pairType, matrix[i][j].pairNumber, matrix[i][j].pairDay, matrix[i][j].pairName, matrix[i][j].pairRoom, matrix[i][j].teacherName, "#pair-template");
                    addPair(currentPair, matrix[i][j].pairDay);
                }
            }
        }
        else {
            createFreeDay(i+1);
        }
    }
}

const loadGroups = () => {
    let url = hostname + "/api/v1/group";
    fetch(url).then((response) => {
        if (response.ok) {
            return response.json();
        }
        else {
            return 0;
        }
    }).then((json) => {
        for(let i = 0; i < json.length; i++) {
            let newOption = new Option(json[i].number, json[i].id);
            $("#groups-list").append(newOption);
        }
    });
}

const clearTimetable = () => {
    $(".pair-cell").not("#pair-template").remove();
}

