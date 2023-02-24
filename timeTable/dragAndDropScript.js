const pairElements = document.querySelector(`#timetable-body`);
let startId = 0;
let ok = 0;
let endId = 0;

pairElements.addEventListener(`dragstart`, (evt) => {
    evt.target.classList.add(`selected`);
    startId = evt.target.parentNode.id;
})

pairElements.addEventListener(`dragover`, (evt) => {
    evt.preventDefault();
    const currentElement = evt.target;
    if (currentElement .classList.contains("timeslot")) {
        ok = 1;
        endId = currentElement .id;
    }
    else {
        if (currentElement .parentNode.classList.contains("timeslot")) {
            ok = 1;
            endId = currentElement .parentNode.id;
        }
        else {
            if (currentElement .parentNode.parentNode.classList.contains("timeslot")) {
                ok = 1;
                endId = currentElement .parentNode.parentNode.id;
            }
            else {
                if (currentElement .parentNode.parentNode.parentNode.classList.contains("timeslot")) {
                    ok = 1;
                    endId = currentElement .parentNode.parentNode.parentNode.id;
                }
                else {
                    ok = 0;
                }
            }
        }
    }
});

const mapPairs = (startId, endId) => {
    let parent1 = $(`#${startId}`);
    let parent2 = $(`#${endId}`);
    let elem1 = parent1.children().clone();
    let elem2 = parent2.children().clone();
    let elem1Time = elem1.find('.pair-time').text();
    let elem2Time = elem2.find('.pair-time').text();
    setText(elem1.find('.pair-time'), elem2Time);
    setText(elem2.find('.pair-time'), elem1Time);
    parent2.empty();
    parent2.append(elem1);
    parent1.empty();
    parent1.append(elem2);
    console.log(elem1);
}

pairElements.addEventListener(`dragend`, (evt) => {
    evt.target.classList.remove(`selected`);
    if (ok === 1) mapPairs(startId, endId);
});
