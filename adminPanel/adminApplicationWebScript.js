import loadApllications from "./loadApplications.js";

const pageSize = 10

$(".applications-type-of-users").click(function (e) {
  e.preventDefault();
  console.log($(this).attr('value'))
  let typeOfUser = $(this).attr("value");

  let pageNumber = 0;
  let sortDirection = 'ASC'
  let isClosed = ''

  loadApllications(typeOfUser, pageNumber, pageSize, sortDirection, isClosed)

});
