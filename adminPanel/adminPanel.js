import loadApllications from "./applications/loadApplications.js"
import changeNavbar from "./navbar/changeNavbar.js";

$('.apply-btn').click(function (e) { 
    e.preventDefault();
    console.log("aaa")
    let formData = new FormData(filters)
    let typeOfUser = 'employee'
    let pageNumber = 0
    let pageSize = 10
    loadApllications(typeOfUser, pageNumber, pageSize, formData.get('sortDirection'), formData.get('isClosed'))
})

$(document).ready(function () {
    changeNavbar('users_list')
    console.log($('.navbar-name').text())
    $('#filtration').load('./filtrationUsersList.html')
    $('#pagination').load('./pagination/pagination.html');
    
});

$('#apply_filters').click(function (e) { 
    e.preventDefault();
    console.log('aaaaa')
});

