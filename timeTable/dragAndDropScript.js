const pairElements = document.querySelector(`body`);
let startId = 0;
let ok = 0;

pairElements.addEventListener(`dragstart`, (evt) => {
    evt.target.classList.add(`selected`);
    startId = evt.target.parentNode.id;
})

pairElements.addEventListener(`dragover`, (evt) => {
    evt.preventDefault();
    let deleteView = $('.delete-view');
    deleteView.removeClass('d-none');
    const currentElement = evt.target;
    if (currentElement.classList.contains('delete-view') || currentElement.parentNode.classList.contains('delete-view')) {
        ok = 1;
    }
    else {
        ok = 0;
    }
});

pairElements.addEventListener(`dragend`, (evt) => {
    evt.target.classList.remove(`selected`);
    if (ok) $(`#${startId}`).empty();
    appendPair(createFreeCell(startId[2]), startId[0], startId[2]);
    $('.delete-view').addClass('d-none');
});
