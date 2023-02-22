const createFreeCell = (day, pairNumber) => {
    let addPairCell = $("#add-pair-template").clone();
    let cellId = day + "." + pairNumber;

    addPairCell.attr("id", cellId);
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

const createTimetableToRedact = (responseTimetable) => {
    let currentPairs = createTimetableMatrix(responseTimetable);
    for (let i = 0; i < currentPairs.length; i++) {
        if (currentPairs[i].length === 0) {
            for (let j = 0; j < pairsOnDayAmount; j++) {
                let currentCell = createFreeCell(i+1, j+1);
                addPair(currentCell, i+1)
            }
        }
        else {
            for (let j = 0; j < pairsOnDayAmount; j++) {
                if (currentPairs[i][j] === undefined || currentPairs[i][j].pairType === 0) {
                    let currentCell = createFreeCell(i+1, j+1);
                    addPair(currentCell, i+1)
                }
                else {
                    let currentPair = createPair(currentPairs[i][j].pairType, currentPairs[i][j].pairNumber, currentPairs[i][j].pairDay, currentPairs[i][j].pairName, currentPairs[i][j].pairRoom, currentPairs[i][j].teacherName,"#pair-template-with-edit");
                    addPair(currentPair, currentPairs[i][j].pairDay)
                }
            }
        }
    }
}

createTimetableToRedact(createTimetableMatrix(timeTable972101));
