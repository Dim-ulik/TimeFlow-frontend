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

const showTimetable = (matrix) => {
    for (let i = 0; i < 6; i++) {
        if (matrix[i].length !== 0) {
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

loadGroups();

showTimetable(createTimetableMatrix(timeTable972101));