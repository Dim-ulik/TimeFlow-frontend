function changeNavbar(activePage) {
    $('#navbar-admin-panel').load('./navbar/navbar.html')
    $(`#${activePage}`).addClass('active')
}

export default changeNavbar