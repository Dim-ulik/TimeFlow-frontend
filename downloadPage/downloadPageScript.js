$(document).ready(function () {
    if (localStorage.getItem('accessToken') === null) {
        window.location.href = '../authorize/index.html';
    }
});