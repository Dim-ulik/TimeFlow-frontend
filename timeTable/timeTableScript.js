import logOut from "../navbar/logOut.js";

$(document).ready(function () {
    loadGroups();
    changeDate();
    loadTimeslots();

    $("#btn-show-timetable").click(function (e) {
        e.preventDefault();
        createTimetable($("#week-date").val(), $("#groups-list").val());
    });

    $("#btn-edit-timetable").click(function (e) {
        goToEditPage();
    });

    $("#inf-form").change(function () {
        validation();
    });

    $('#next-week').click(function (e) {
        e.preventDefault();
        createTimetable(incrementWeek($("#week-date").val()), $("#groups-list").val());
    });

    $('#last-week').click(function (e) {
        e.preventDefault();
        createTimetable(decrementWeek($("#week-date").val()), $("#groups-list").val());
    });

    if (localStorage.getItem('ROLE') === 'ROLE_ADMIN') {
        $('.nav-admin').removeClass('d-none');
    }

    $('#schedule').addClass('active')
});

const decrementWeek = (date) => {
    let tempDate = new Date(date);
    let dateNew = new Date(date);
    return getRightDateFormat(new Date(tempDate.setDate(dateNew.getDate() - 7)));
}

const incrementWeek = (date) => {
    let tempDate = new Date(date);
    let dateNew = new Date(date);
    return getRightDateFormat(new Date(tempDate.setDate(dateNew.getDate() + 7)));
}

const goToEditPage = () => {
    let date = $("#week-date").val();
    let group = $("#groups-list").val();
    localStorage.setItem('date', date);
    localStorage.setItem('group', group);
}

const createTimetable = (date, group) => {
    let week = getWeek(date);

    localStorage.setItem('group', group);
    localStorage.setItem('week', date);

    clearTimetable();
    changeDate();
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

    let buttons = [$("#next-week"), $("#last-week"), $("#btn-show-timetable"), $("#btn-edit-timetable")];

    if (inputGroup.val() === '0' || (inputDate.val() < '2010-01-01' || inputDate.val() > '3000-01-01')) {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].attr('disabled', true);
        }
    }
    else {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].attr('disabled', false);
        }
    }
}

const addPair = (pair, day) => {
    let dayId = chooseDay(day);
    $(dayId).append(pair);
}

const createFreeDay = (day) => {
    let cell = $("#free-day-template").clone();
    cell.removeClass("d-none");
    cell.removeAttr('id');
    cell.addClass('pair-cell');
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
        if (!checkEmptyDay(matrix[i])) {
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

const chooseLocalGroup = () => {
    let localGroup = localStorage.getItem('group');
    selectOption('groups-list', localGroup);
    validation();
}

const loadGroups = () => {
    let url = hostname + "/api/v1/groups";
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
        chooseLocalGroup();
        createTimetable($("#week-date").val(), $("#groups-list").val());
    });
}

const clearTimetable = () => {
    $(".pair-cell").remove();
}

$('.log-out-btn').click(function (e) { 
    e.preventDefault();
    logOut();
  });
  
$('#users_list').click(function (e) { 
    e.preventDefault();
    localStorage.setItem('location', 'users_list')
    location.href = '../adminPanel/adminPanel.html'
});

$('#app_employee, #app_schedule-maker, #app_student').click(function (e) { 
    e.preventDefault();
    console.log($(this).attr('id'))
    localStorage.setItem('location', $(this).attr('id'))
    location.href = '../adminPanel/adminPanel.html'
});