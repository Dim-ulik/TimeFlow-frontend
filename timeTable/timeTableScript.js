const addPair = (pair, day) => {
    let dayId = chooseDay(day);
    $(dayId).append(pair);
}

const createFreeDay = (day) => {
    let cell = $("#free-day-template").clone();
    cell.removeClass("d-none");
    addPair(cell, day);
}

const showTimetable = (matrix) => {
    for (let i = 0; i < 6; i++) {
        if (matrix[i].length !== 0) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j].pairType === 0) {
                    let currentPair = createPair(0, matrix[i][j].pairNumber, matrix[i][j].pairDay, matrix[i][j].pairTime);
                    addPair(currentPair, matrix[i][j].pairDay);
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

showTimetable(createTimetableMatrix(timeTable972101));