import loadApllications from "./applications/loadApplications.js";
const pageSize = 10;

$(document).ready(function () {
  let activePage = "users_list";
  changeNavbar(activePage);
  changeFiltration(activePage);
});

$(".navbar-active").click(function (e) {
  e.preventDefault()
  changeNavbar($(this).attr("id"))
  changeFiltration($(this).attr("value"))
  changeContent($(this).attr("id"))
});

function changeContent(activePage) {
    switch (activePage) {
        case "users_list":
            $('.header').text('Список пользователей');
            $('.header').attr('value', 'users');
          break;
        case "app_employee":
            $('.header').text('Заявки сотрудников');
            $('.header').attr('value', 'employee');
            loadApllications($('.header').attr('value'), 0, pageSize);

          break;
        case "app_schedule-maker":
            $('.header').text('Заявки составителей');
            $('.header').attr('value', 'schedule-maker');
            loadApllications($('.header').attr('value'), 0, pageSize);

          break;
        case "app_student":
            $('.header').text('Заявки студентов');
            $('.header').attr('value', 'student');
            loadApllications($('.header').attr('value'), 0, pageSize);

          break;
        default:
          break;
      }
}

function changeNavbar(activePage) {
  $(".navbar-active").removeClass("active");
  $(`#${activePage}`).addClass("active");
}

function changeFiltration(activePage) {
  $(`.filtration`).addClass("d-none");
  $(`.filtration-${activePage}`).removeClass("d-none");
}

$(".apply-applications-filters").click(function (e) {
  e.preventDefault();
  let formData = new FormData(app_filters);
  let typeOfUser = $('.header').attr('value');
  let pageNumber = 0;
  loadApllications(typeOfUser, pageNumber, pageSize, formData.get('sortDirection'), formData.get('isClosed'))
});

$(".apply-users-list-filters").click(function (e) {
    e.preventDefault();
    let formData = new FormData(app_filters);
    let typeOfUser = $('.header').attr('value');
    let pageNumber = 0;
    loadApllications(typeOfUser, pageNumber, pageSize, formData.get('sortDirection'), formData.get('isClosed'))
  });
