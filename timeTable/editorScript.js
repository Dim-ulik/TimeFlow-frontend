const createFreeTable = () => {
    for (let day = 1; day <= 6; day++) {
        for (let pairNumber = 1; pairNumber <= pairsOnDayAmount; pairNumber++) {
            let addPairCell = $("#add-pair-template").clone();
            let cellId = day + "." + pairNumber;
            addPairCell.attr("id", cellId);
            addPairCell.removeClass("d-none");
            $(chooseDay(day)).append(addPairCell);
        }
    }
}

createFreeTable();

const createTimetableToRedact = () => {

}