import loadApllications from "../loadApplications.js"
import loadUsersList from "../loadUsersList.js"

function updateApplications(pageNumber) {
    $('.pagination-container').children().removeClass('active')
    $(`#paginationItem${pageNumber+1}`).addClass('active')
    // history.pushState(null, null, `${location.href.substr(0,  location.href.lastIndexOf('/'))}/${pageNumber}`)
    // localStorage.setItem('pageNumber', pageNumber)
    if ($(".header").text() === "Список пользователей") {
        //loadUsersList(typeOfUser, pageNumber, pageSize)
    } else {
        //loadApllications(typeOfUser, pageNumber, pageSize, sortDirection = 'ASC', isClosed = '')
    }    
}

export default updateApplications