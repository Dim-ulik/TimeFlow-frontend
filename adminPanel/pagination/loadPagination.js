import updateApplications from "./updateApplications.js"

function LoadPagination(json) {
    $('#pagination').empty()
    let paginationItem = $('#pagination-item')

    for (let i = 0; i < json['pageInfo']['pageCount']; i++) {

        let newPaginationItem = paginationItem.clone()
        newPaginationItem.removeClass('d-none')

        newPaginationItem.find('.pagination-item-link').text(i + 1)
        newPaginationItem.attr('id', `paginationItem${i + 1}`)

        newPaginationItem.on('click', function () {
            updateApplications(newPaginationItem.text())
        })

        $('#pagination').append(newPaginationItem)
    }

    $(`#paginationItem${json['pageInfo']['currentPage']}`).addClass('active')

    $('.pagination-previous').on('click', function () {
        updateApplications(1)
    })

    $('.pagination-next').on('click', function () {
        updateApplications(json['pageInfo']['pageCount'])
    })
}