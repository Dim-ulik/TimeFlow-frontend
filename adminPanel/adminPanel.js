import loadApllications from "./applications/loadApplications.js";
import loadUsersList from "./loadUsersList.js";
const pageSize = 10;

$(document).ready(function () {
  let activePage = "users_list";
  changeNavbar(activePage);
  changeFiltration(activePage);
  changeContent(activePage);
  loadTeachers();
});

function loadTeachers() {
  fetch("http://94.103.87.164:8081/api/v1/teachers")
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      let template = $("#teacher-template");

      for (let teacher of json) {
        let block = template.clone();
        block.removeClass("d-none");
        block.attr("value", teacher.id);
        block.text(
          teacher.surname + " " + teacher.name + " " + teacher.patronymic
        );
        $(".teachers-list").append(block);
      }
    });
}

$(".navbar-active").click(function (e) {
  e.preventDefault();
  changeNavbar($(this).attr("id"));
  changeFiltration($(this).attr("value"));
  changeContent($(this).attr("id"));
});

function changeContent(activePage) {
  switch (activePage) {
    case "users_list":
      $(".header").text("Список пользователей");
      $(".header").attr("value", "users");
      loadUsersList('students', 0, 10)
      break;
    case "app_employee":
      $(".header").text("Заявки сотрудников");
      $(".header").attr("value", "employee");
      loadApllications($(".header").attr("value"), 0, pageSize);

      break;
    case "app_schedule-maker":
      $(".header").text("Заявки составителей");
      $(".header").attr("value", "schedule-maker");
      loadApllications($(".header").attr("value"), 0, pageSize);

      break;
    case "app_student":
      $(".header").text("Заявки студентов");
      $(".header").attr("value", "student");
      loadApllications($(".header").attr("value"), 0, pageSize);

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
  let typeOfUser = $(".header").attr("value");
  let pageNumber = 0;
  loadApllications(
    typeOfUser,
    pageNumber,
    pageSize,
    formData.get("sortDirection"),
    formData.get("isClosed")
  );
});

$(".apply-users-list-filters").click(function (e) {
  e.preventDefault();
  let formData = new FormData(users_filters);
  let pageNumber = 0;
  loadUsersList(
    formData.get('status'),
    pageNumber,
    pageSize,
  );
});


