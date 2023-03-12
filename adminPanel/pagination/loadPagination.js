import updateApplications from "./updateApplications.js"

function loadPagination(json) {
    $('.pagination-container').empty()
    let paginationItem = $('.page-item-number')

    for (let i = 0; i < json['totalPages']; i++) {

        let newPaginationItem = paginationItem.clone()
        newPaginationItem.removeClass('d-none')

        newPaginationItem.find('.page-link').text(i + 1)
        newPaginationItem.attr('id', `paginationItem${i + 1}`)

        newPaginationItem.click(function (e) {
            e.preventDefault();
            updateApplications(newPaginationItem.text() - 1, json['pageable']['pageSize'])
        });

        $('.pagination-container').append(newPaginationItem)
    }

    $(`#paginationItem${json['pageable']['pageNumber'] + 1}`).addClass('active')
}

export default loadPagination