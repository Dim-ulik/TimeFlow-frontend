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

const createTimetableToRedact = (currentPairs) => {
    for (let i = 0; i < currentPairs.length; i++) {
        for(let j = 0; j < currentPairs[i].length; j++) {
            let currentPair = currentPairs[i][j];
            if (currentPair.pairType !== 0) {
                let pairDay = currentPair.pairDay;
                let pairNumber = currentPair.pairNumber;
                let pairCell = createPair(currentPair.pairType, pairNumber, pairDay, currentPair.pairName, currentPair.pairRoom, currentPair.teacherName,"#pair-template-with-edit");
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

createTimetableToRedact(createTimetableMatrix(timeTable972101));
