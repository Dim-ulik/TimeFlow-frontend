import needToRefreshToken from "../authorize/needToRefreshToken.js";
import logOut from "../navbar/logOut.js";

$(document).ready(function() {
    let week = getWeek(localStorage.getItem('week'));

    loadTimeslots();
    changeHeader(week[0],week[5]);
    changeDays(week);

    let group = localStorage.getItem('group');
    loadTimetable(group, week[0], week[week.length - 1], createTimetableToEdit);

    $("#clear-timetable").click(function() {
        console.log(1);
    });

    $("#edit-pair-btn").click(function () {
        let groupId = localStorage.getItem('group');
        let subjectId = $("#select-pair-name").val();
        let teacherId = $("#select-teacher").val();
        let classroomId = $("#select-pair-room").val();
        let timeslotId = localStorage.getItem('timeslot-id');
        let date = localStorage.getItem('cell-date');
        let lessonType = $("#select-pair-type").val();

        let inputData = JSON.stringify({
            studentGroupId: groupId,
            subjectId: subjectId,
            teacherId: teacherId,
            classroomId: classroomId,
            timeslotId: timeslotId,
            date: date,
            lessonType: lessonType
        });
        let url = hostname + "/api/v1/lessons";
        let token = localStorage.getItem('accessToken');
        fetch(url, {
            method: 'POST',
            headers:
                new Headers ({ "Authorization" : "Bearer " + token, 'Content-Type': 'application/json'}),
            body: inputData
        }).then((response) => {
            needToRefreshToken(response)
            if (response.ok) {
                return 1;
            } else {
                console.log(response);
            }
        });
    });

    if (localStorage.getItem('ROLE') === 'ROLE_ADMIN') {
        $('.nav-admin').removeClass('d-none');
    }

    $('#schedule').addClass('active')

})

$("#repeat-check").click(function() {
    if ($(this).is(":checked")) {
        $(".repeat-block").removeClass('d-none');
    }
    else {
        $(".repeat-block").addClass('d-none');
    }
})

const changeHeader = (firstDay, lastDay) => {
    let string = `${firstDay} - ${lastDay}`;
    setText($('#group-dates'), string);
    setText($('#group-number'), localStorage.getItem('group-number'))
}

const createId = (day, pairNumber) => {
    return `${day}-${pairNumber}`;
}

const appendPair = (cell, day, pairNumber) => {
    let idQuery = "#" + createId(day, pairNumber);
    $(idQuery).append(cell);
}

const createTimeslots = () => {
    for (let day = 1;  day <= 6; day++) {
        for(let pairNumber = 1; pairNumber <= pairsOnDayAmount; pairNumber++) {
            let timeslot = $("#timeslot-template").clone();
            timeslot.attr("id", createId(day, pairNumber));
            timeslot.attr("timeslot-id", getTimeslotId(pairNumber));
            timeslot.removeClass('d-none');
            $(chooseDay(day)).append(timeslot);
        }
    }
}

const createFreeCell = (pairNumber) => {
    let addPairCell = $("#add-pair-template").clone();
    addPairCell.removeAttr('id');
    setText(addPairCell.find(".pair-time"), getPairTime(pairNumber));
    addPairCell.removeClass("d-none");

    return addPairCell;
}

const createFreeTable = () => {
    for (let day = 1; day <= 6; day++) {
        for (let pairNumber = 1; pairNumber <= pairsOnDayAmount; pairNumber++) {
            appendPair(createFreeCell(pairNumber), day, pairNumber);
        }
    }
}

const createTimetableToEdit = (currentPairs) => {
    createTimeslots();
    for (let i = 0; i < currentPairs.length; i++) {
        for(let j = 0; j < currentPairs[i].length; j++) {
            let currentPair = currentPairs[i][j];
            if (!jQuery.isEmptyObject(currentPair)) {
                let pairDay = currentPair.pairDay;
                let pairNumber = currentPair.pairNumber;
                let pairCell = createPair(currentPair.pairType, pairNumber, pairDay, currentPair.pairName, currentPair.pairRoom, currentPair.teacherName,"#pair-template-with-edit", currentPair.id);
                pairCell.attr('type-id', currentPair.pairType);
                appendPair(pairCell, pairDay, pairNumber);
            }
        }
    }
    for (let i = 1; i <= 6; i++) {
        for (let j = 1; j < pairsOnDayAmount; j++) {
            let currentId = "#" + createId(i, j);
            if ($(currentId).children().length === 0) {
                $(currentId).append(createFreeCell(j));
            }
        }
    }

    $(".timeslot").click(function() {
        let cellId = "#" + $(this).attr('id');
        let cell = $(cellId);
        let pairTypeId = cell.find('.pair-cell').attr('type-id');
        let pairTimeId = cell.attr('timeslot-id');
        localStorage.setItem('timeslot-id', pairTimeId);
        $('#select-pair-time').val(pairTimeId).trigger('change');
        if (pairTypeId === undefined) {
            $(".delete-button").addClass('d-none');
            setText($("#editModalLabel"), "Создать пару");
            setText($("#edit-pair-btn"), "Создать");
        }
        else {
            $(".delete-button").removeClass('d-none');
            setText($("#editModalLabel"), "Изменить информацию о паре");
            setText($("#edit-pair-btn"), "Изменить");
            let pairNameId = cell.find('.pair-name').attr('pair-name-id');
            let pairRoomId = cell.find('.pair-room').attr('pair-room-id');
            let pairTeacherId = cell.find('.teacher-name').attr('pair-teacher-id');
            $('#select-pair-type').val(pairTypeId).trigger('change');
            $('#select-pair-name').val(pairNameId).trigger('change');
            $('#select-pair-room').val(pairRoomId).trigger('change');
            $('#select-teacher').val(pairTeacherId).trigger('change');
        }
        let date = cell.parent().attr('day-date');
        localStorage.setItem('cell-date', date);
        loadFreeTimeslots(localStorage.getItem('group'), date);
        loadFreeTeachers(pairTimeId, date);
        loadSubjects();
        loadFreeRooms(pairTimeId, date);
    });
}

$("#select-pair-room").select2({
    dropdownParent: '#editModal'
});

$("#select-teacher").select2({
    dropdownParent: '#editModal'
});

$("#select-pair-type").select2({
    dropdownParent: '#editModal'
});

$("#select-pair-name").select2({
    dropdownParent: '#editModal'
});

$("#select-pair-time").select2({
    dropdownParent: '#editModal'
});

const loadFreeTimeslots = (groupId, date) => {
    let url = hostname + "/api/v1/available-timeslots/" + groupId + "?date=" + date;
    fetch(url).then((response) => {
        if (response.ok) {
            return response.json();
        }
        else {
            return 0;
        }
    }).then((response) => {
        for (let i = 0; i < response.length; i++) {
            let time = response[i].beginTime + " - " + response[i].endTime;
            let newOption = new Option(time, response[i].id);
            $("#select-pair-time").append(newOption);
        }
    });
}

const createTeacherShortName = (surname, name, patronymic) => {
    return surname + " " + name[0] + ". " + patronymic[0] + ".";
}

const loadFreeTeachers = (timeslotId, date) => {
    let url = hostname + "/api/v1/available-teachers/" + timeslotId + "?date=" + date;
    fetch(url).then((response) => {
        if (response.ok) {
            return response.json();
        }
        else {
            return 0;
        }
    }).then((response) => {
        for (let i = 0; i < response.length; i++) {
            let name = createTeacherShortName(response[i].surname, response[i].name, response[i].patronymic);
            let newOption = new Option(name, response[i].id);
            $("#select-teacher").append(newOption);
        }
    });
}

const loadSubjects = () => {
    let url = hostname + "/api/v1/subjects";
    fetch(url).then((response) => {
        if (response.ok) {
            return response.json();
        }
        else {
            return 0;
        }
    }).then((response) => {
        for (let i = 0; i < response.length; i++) {
            let newOption = new Option(response[i].name, response[i].id);
            $("#select-pair-name").append(newOption);
        }
    });
}

const loadFreeRooms = (timeslotId, date) => {
    let url = hostname + "/api/v1/available-classrooms/" + timeslotId + "?date=" + date;
    fetch(url).then((response) => {
        if (response.ok) {
            return response.json();
        }
        else {
            return 0;
        }
    }).then((response) => {
        for (let i = 0; i < response.length; i++) {
            let newOption = new Option(response[i].number, response[i].id);
            $("#select-pair-room").append(newOption);
        }
    });
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
    localStorage.setItem('location', $(this).attr('id'))
    location.href = '../adminPanel/adminPanel.html'
});