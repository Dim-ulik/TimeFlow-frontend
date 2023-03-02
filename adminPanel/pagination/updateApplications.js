import loadApllications from "../loadApplications"

function updateApplications(pageNumber) {
    $('#pagination').children().removeClass('active')
    $(`#paginationItem${pageNumber}`).addClass('active')
    history.pushState(null, null, `${location.href.substr(0,  location.href.lastIndexOf('/'))}/${pageNumber}`)
    localStorage.setItem('pageNumber', pageNumber)
    //loadApllications('///')
}

export default updateApplications