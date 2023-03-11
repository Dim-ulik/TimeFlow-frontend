$(document).ready(function() {
    let week = getWeek(localStorage.getItem('week'));

    loadTimeslots();
    changeHeader(week[0],week[5]);
    changeDays(week);

    let group = localStorage.getItem('group');
    if (week.length > 0 && group.length > 0) loadTimetable(group, week[0], week[week.length - 1], createTimetableToEdit);

    $("#go-back-btn").click(function () {
        window.location.href = './timeTable.html';
    });

    $("#clear-timetable").click(function () {
        let groupId = localStorage.getItem('group');
        let startDate = week[0];
        let endDate = week[5];
        let url = hostname + "/api/v1/lessons/group/" + groupId + "?startDate=" + startDate + "&endDate=" + endDate;
        let token = localStorage.getItem('accessToken');
        fetch(url, {
            method: 'DELETE',
            headers:
                new Headers ({ "Authorization" : "Bearer " + token, 'Content-Type': 'application/json'}),
        }).then((response) => {
            clearAllTimeslots();
            loadTimetable(group, week[0], week[week.length - 1], createTimetableToEdit);
            $(".btn-close").trigger("click");
        });
    });

    const getInputData = () => {
        let groupId = localStorage.getItem('group');
        let subjectId = $("#select-pair-name").val();
        let teacherId = $("#select-teacher").val();
        let classroomId = $("#select-pair-room").val();
        let timeslotId = $("#select-pair-time").val();
        let date = localStorage.getItem('cell-date');
        let lessonType = $("#select-pair-type").val();

        return {
            studentGroupId: groupId,
            subjectId: subjectId,
            teacherId: teacherId,
            classroomId: classroomId,
            timeslotId: timeslotId,
            date: date,
            lessonType: lessonType
        };
    }

    $("#create-pair-btn").click(function () {
        let repeatCount = 1;
        let inputData = getInputData();
        let url = hostname + "/api/v1/lessons";
        if ($("#repeat-check").is(":checked")) {
            repeatCount = Number($("#select-repeat").val());
            inputData = {
                ...inputData,
                numberOfWeeks: repeatCount
            }
            url = hostname + "/api/v1/lessons/for-a-few-weeks";
        }
        let token = localStorage.getItem('accessToken');
        fetch(url, {
            method: 'POST',
            headers:
                new Headers ({ "Authorization" : "Bearer " + token, 'Content-Type': 'application/json'}),
            body: JSON.stringify(inputData)
        }).then((response) => {
            if (response.ok) {
                clearAllTimeslots();
                loadTimetable(group, week[0], week[week.length - 1], createTimetableToEdit);
                $(".btn-close").trigger("click");
            }
            else {
                alert("Невозможно добавить пару - произошло наложение");
            }
        });
    });

    $("#delete-pair-btn").click(function () {
        deletePair();
    });

    $("#edit-pair-btn").click(function () {
        let pairId = localStorage.getItem('pair-id');
        let url = hostname + "/api/v1/lessons/" + pairId;
        let token = localStorage.getItem('accessToken');
        fetch(url, {
            method: 'PUT',
            headers:
                new Headers ({ "Authorization" : "Bearer " + token, 'Content-Type': 'application/json'}),
            body: JSON.stringify(getInputData())
        }).then((response) => {
            clearAllTimeslots();
            loadTimetable(group, week[0], week[week.length - 1], createTimetableToEdit);
            $(".btn-close").trigger("click");
        });
    });
})

const deletePair = (cellId) => {
    let pairId = localStorage.getItem('pair-id');
    if (cellId !== undefined) {
        pairId = cellId;
    }

    let week = getWeek(localStorage.getItem('week'));
    let group = localStorage.getItem('group');

    let url = hostname + "/api/v1/lessons/" + pairId;
    let token = localStorage.getItem('accessToken');
    fetch(url, {
        method: 'DELETE',
        headers:
            new Headers ({ "Authorization" : "Bearer " + token, 'Content-Type': 'application/json'}),
    }).then((response) => {
        clearAllTimeslots();
        loadTimetable(group, week[0], week[week.length - 1], createTimetableToEdit);
        $(".btn-close").trigger("click");
    });
}

const clearAllTimeslots = () => {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < pairsOnDayAmount; j++) {
            let id = "#" + createId(i+1, j+1);
            $(id).empty();
        }
    }
}

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
        localStorage.setItem('pair-id', $(this).find('.pair-cell').attr('id'));
        let cell = $(cellId);
        let pairTypeId = cell.find('.pair-cell').attr('type-id');
        let pairTimeId = cell.attr('timeslot-id');
        let pairTime = cell.find('.pair-time').text();
        localStorage.setItem('timeslot-id', pairTimeId);
        $('#select-pair-time').val(pairTimeId).trigger('change');
        if (pairTypeId === undefined) {
            $(".delete-button").addClass('d-none');
            $("#edit-pair-btn").addClass('d-none');
            $("#create-pair-btn").removeClass('d-none');
            setText($("#editModalLabel"), "Создать пару");
            $("#repeat").removeClass("d-none");
        }
        else {
            $("#repeat").addClass("d-none");
            $(".delete-button").removeClass('d-none');
            $("#edit-pair-btn").removeClass('d-none');
            $("#create-pair-btn").addClass('d-none');
            setText($("#editModalLabel"), "Изменить информацию о паре");
            var pairNameId = cell.find('.pair-name').attr('pair-name-id');
            var pairName = cell.find('.pair-name').text();
            var pairRoomId = cell.find('.pair-room').attr('pair-room-id');
            var pairRoom = cell.find('.pair-room').text();
            var pairTeacherId = cell.find('.teacher-name').attr('pair-teacher-id');
            var teacherName = cell.find('.teacher-name').text();
            $("#select-pair-type").val(pairTypeId).trigger('change');
        }
        let date = cell.parent().attr('day-date');
        localStorage.setItem('cell-date', date);
        loadFreeTimeslots(localStorage.getItem('group'), date, pairTimeId, pairTime);
        loadFreeTeachers(pairTimeId, date, pairTeacherId, teacherName);
        loadSubjects(pairNameId, pairName);
        loadFreeRooms(pairTimeId, date, pairRoomId, pairRoom);
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

const loadFreeTimeslots = (groupId, date, alreadyChosen, pairTime) => {
    let url = hostname + "/api/v1/available-timeslots/" + groupId + "?date=" + date;
    fetch(url).then((response) => {
        if (response.ok) {
            return response.json();
        }
        else {
            return 0;
        }
    }).then((response) => {
        let field = $("#select-pair-time");
        field.empty();
        for (let i = 0; i < response.length; i++) {
            let time = response[i].beginTime + " - " + response[i].endTime;
            let newOption = new Option(time, response[i].id);
            field.append(newOption);
        }
        if (alreadyChosen !== undefined) {
            let newOption = new Option(pairTime, alreadyChosen);
            field.append(newOption);
            field.val(alreadyChosen).trigger('change');
        }
    });
}

const createTeacherShortName = (surname, name, patronymic) => {
    return surname + " " + name[0] + ". " + patronymic[0] + ".";
}

const rewriteTeacherName = (name) => {
    let arrayStrings = name.split(' ');
    return createTeacherShortName(arrayStrings[0], arrayStrings[1], arrayStrings[2]);
}

const loadFreeTeachers = (timeslotId, date, alreadyChosen, teacherName) => {
    let url = hostname + "/api/v1/available-teachers/" + timeslotId + "?date=" + date;
    fetch(url).then((response) => {
        if (response.ok) {
            return response.json();
        }
        else {
            return 0;
        }
    }).then((response) => {
        let field = $("#select-teacher");
        field.empty();
        for (let i = 0; i < response.length; i++) {
            let name = createTeacherShortName(response[i].surname, response[i].name, response[i].patronymic);
            let newOption = new Option(name, response[i].id);
            field.append(newOption);
        }
        if (alreadyChosen !== undefined) {
            let newOption = new Option(rewriteTeacherName(teacherName), alreadyChosen);
            field.append(newOption);
            field.val(alreadyChosen).trigger('change');
        }
    });
}

const loadSubjects = (alreadyChosen, pairName) => {
    let url = hostname + "/api/v1/subjects";
    fetch(url).then((response) => {
        if (response.ok) {
            return response.json();
        }
        else {
            return 0;
        }
    }).then((response) => {
        let field = $("#select-pair-name");
        field.empty();
        for (let i = 0; i < response.length; i++) {
            let newOption = new Option(response[i].name, response[i].id);
            field.append(newOption);
        }
        if (alreadyChosen !== undefined) {
            let newOption = new Option(pairName, alreadyChosen);
            field.append(newOption);
            field.val(alreadyChosen).trigger('change');
        }
    });
}

const loadFreeRooms = (timeslotId, date, alreadyChosen, pairRoom) => {
    let url = hostname + "/api/v1/available-classrooms/" + timeslotId + "?date=" + date;
    fetch(url).then((response) => {
        if (response.ok) {
            return response.json();
        }
        else {
            return 0;
        }
    }).then((response) => {
        let field = $("#select-pair-room");
        field.empty();
        for (let i = 0; i < response.length; i++) {
            let newOption = new Option(response[i].number, response[i].id);
            field.append(newOption);
        }
        if (alreadyChosen !== undefined) {
            let newOption = new Option(pairRoom, alreadyChosen);
            field.append(newOption);
            field.val(alreadyChosen).trigger('change');
        }
    });
}

