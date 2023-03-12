import deletePair from "./editorScript.js";

const pairElements = document.querySelector(`body`);
let startId = 0;
let ok = 0;
let cellId;

pairElements.addEventListener(`dragstart`, (evt) => {
    evt.target.classList.add(`selected`);
    startId = evt.target.parentNode.id;
    cellId = evt.target.id;
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
    if (ok) deletePair(cellId);
    $('.delete-view').addClass('d-none');
});
