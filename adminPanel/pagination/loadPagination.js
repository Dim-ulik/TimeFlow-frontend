//import updateApplications from "./updateApplications.js"

function loadPagination(json) {
    $('.pagination-container').empty()
    let paginationItem = $('.page-item-number')

    console.log(json['totalPages'])
    for (let i = 0; i < json['totalPages']; i++) {

        let newPaginationItem = paginationItem.clone()
        newPaginationItem.removeClass('d-none')

        newPaginationItem.find('.page-link').text(i + 1)
        newPaginationItem.attr('id', `paginationItem${i + 1}`)

        newPaginationItem.on('click', function () {
            updateApplications(newPaginationItem.text())
        })

        $('.pagination-container').append(newPaginationItem)
    }

    $(`#paginationItem${json['pageable']['pageNumber']+1}`).addClass('active')

    $('.pagination-previous').on('click', function () {
        updateApplications(0)
    })

    $('.pagination-next').on('click', function () {
        updateApplications(json['totalPages']-1)
    })
}

export default loadPagination