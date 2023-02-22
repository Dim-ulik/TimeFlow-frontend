$(document).ready(function() {
    $(".timeslot").click(function() {
        let cellId = "#" + $(this).attr('id');
        let cell = $(cellId);
        let pairTypeId = cell.find('.pair-cell').attr('type-id');
        if (pairTypeId === undefined) {
            $(".delete-button").addClass('d-none');
            setText($("#editModalLabel"), "Создать пару");
        }
        else {
            $(".delete-button").removeClass('d-none');
            setText($("#editModalLabel"), "Изменить информацию о паре");
            let pairNameId = cell.find('.pair-name').attr('pair-name-id');
            let pairRoomId = cell.find('.pair-room').attr('pair-room-id');
            let pairTeacherId = cell.find('.teacher-name').attr('pair-teacher-id');
            $("#select-pair-type").find(`#${pairTypeId}`).attr("selected", true);
            $("#select-pair-name").find(`#${pairNameId}`).attr("selected", true);
            $("#select-pair-room").find(`#${pairRoomId}`).attr("selected", true);
            $("#select-teacher").find(`#${pairTeacherId}`).attr("selected", true);
        }
    });
})

$("#repeat-check").click(function() {
    if ($(this).is(":checked")) {
        $(".repeat-block").removeClass('d-none');
    }
    else {
        $(".repeat-block").addClass('d-none');
    }
})

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
            timeslot.removeClass('d-none');
            $(chooseDay(day)).append(timeslot);
        }
    }
}

createTimeslots();

const createFreeCell = (pairNumber, timeslotId) => {
    let addPairCell = $("#add-pair-template").clone();
    addPairCell.removeAttr('id');
    setText(addPairCell.find(".pair-time"), getPairTime(pairNumber));
    addPairCell.attr("timeslot-id", timeslotId);
    addPairCell.removeClass("d-none");

    return addPairCell;
}

const createFreeTable = () => {
    for (let day = 1; day <= 6; day++) {
        for (let pairNumber = 1; pairNumber <= pairsOnDayAmount; pairNumber++) {
            createFreeCell(day, pairNumber);
        }
    }
}

const clearTimetable = () => {
    for (let day = 1; day <= 6; day++) {
        for (let pairNumber = 1; pairNumber <= pairsOnDayAmount; pairNumber++) {
                $(chooseDay(day)).children().last().remove();
            }
        }
}

const createTimetableToEdit = (currentPairs) => {
    for (let i = 0; i < currentPairs.length; i++) {
        for(let j = 0; j < currentPairs[i].length; j++) {
            let currentPair = currentPairs[i][j];
            if (!jQuery.isEmptyObject(currentPair)) {
                let pairDay = currentPair.pairDay;
                let pairNumber = currentPair.pairNumber;
                let pairCell = createPair(currentPair.pairType, pairNumber, pairDay, currentPair.pairName, currentPair.pairRoom, currentPair.teacherName,"#pair-template-with-edit", currentPair.timeslotId);
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
}

createTimetableToEdit(createTimetableMatrix(timeTable972101));
