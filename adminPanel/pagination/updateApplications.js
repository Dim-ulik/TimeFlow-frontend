import loadApllications from "../applications/loadApplications.js"
import loadUsersList from "../loadUsersList.js"

function updateApplications(pageNumber, pageSize) {
    $('.pagination-container').children().removeClass('active')
    $(`#paginationItem${pageNumber+1}`).addClass('active')
    localStorage.setItem('pageNumber', pageNumber)
    if ($(".header").text() === "Список пользователей") {
        let formData = new FormData(users_filters);
        loadUsersList(formData.get('status'), pageNumber, pageSize)
    } else {
        let formData = new FormData(app_filters);
        let typeOfUser = $(".header").attr("value");
        loadApllications(typeOfUser, pageNumber, pageSize, formData.get("sortDirection"), formData.get("isClosed"))
    }    
}

export default updateApplications