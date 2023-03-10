import loadPagination from "../pagination/loadPagination.js"
import acceptApplicationScheduleMaker from "./acceptApplicationSheduleMaker.js"
import acceptApplicationStudent from "./acceptApplicationStudent.js"
import acceptApplicationEmployee from "./acceptApplicatoinEmployee.js"
import rejectApplication from "./rejectApplication.js"

function loadApllications(typeOfUser, pageNumber, pageSize, sortDirection = 'ASC', isClosed = '') {
    fetch(`http://94.103.87.164:8081/api/v1/${typeOfUser}-requests?pageNumber=${pageNumber}&pageSize=${pageSize}&sortDirection=${sortDirection}&isClosed=${isClosed}`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        }
    })
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        $('#applications-container').empty()
        $('.users-container').empty()
        loadPagination(json)

        let template
        if (typeOfUser === 'student') {
            template = $('#card-template-student')

            for(let application of json.content){
                let block = template.clone()
                block.removeClass('d-none')
                block.attr('id', 'application-' + application.id)
                if (application.student.userInfo.sex == 'MALE') {
                    block.find('.application-photo').attr('src', './images/man.png')
                } else {
                    block.find('.application-photo').attr('src', './images/woman.png')
                }
                block.find('.application-name').text(application.student.userInfo.surname + ' ' + application.student.userInfo.name + ' ' + application.student.userInfo.patronymic)
                block.find('.application-student-number').text(application.student.studentNumber)
                block.find('.application-group-number').text(application.student.group.number)
                block.find('.application-email').text(application.student.userInfo.email)
    
                if (application.closed) {
                    block.find('.request-buttons').addClass('d-none')
                    block.find('.account-status').removeClass('d-none')
                    block.find('.account-status span').text(application.student.userInfo.accountStatus)
                }

                block.find('.accept-button').on('click', function() {
                    acceptApplicationStudent(application.id);
                })

                block.find('.reject-button').on('click', function() {
                    rejectApplication(typeOfUser, application.id)
                })
    
               
                $('#applications-container').append(block)
            }

        } else {
            template = $('#card-template-employee')

            for(let application of json.content){
                let block = template.clone()
                block.removeClass('d-none')
                block.attr('id', 'application-' + application.id)
                if (application.employee.userInfo.sex == 'MALE') {
                    block.find('.application-photo').attr('src', './images/man.png')
                } else {
                    block.find('.application-photo').attr('src', './images/woman.png')
                }
                block.find('.application-name').text(application.employee.userInfo.surname + ' ' + application.employee.userInfo.name + ' ' + application.employee.userInfo.patronymic)
                block.find('.application-contract-number').text(application.employee.contractNumber)
                block.find('.application-email').text(application.employee.userInfo.email)
    
                block.find('.selectBox').on('click', function() {
                    let checkboxes = block.find('.checkboxes');
                    checkboxes.toggleClass('d-block');
                })

                block.find('.teacher-checkbox').on('change', function() {
                    if (block.find(".teacher-checkbox").is(":checked")) {
                        block.find(".teachers").removeClass("d-none");
                      } else {
                        block.find(".teachers").addClass("d-none");
                      }
                })

                if (typeOfUser === 'schedule-maker') {
                    block.find('.selectBox').addClass('d-none')

                    block.find('.accept-button').on('click', function() {
                        acceptApplicationScheduleMaker(application.id)
                    })
    
                } else {
                    block.find('.accept-button').on('click', function() {
                        let roles = []
                        block.find('.checkboxes input:checked').each(function (i, value) {  
                            roles.push($(this).val())
                        });
                        let teacherId = block.find('.teachers-list').val();
                        
                        acceptApplicationEmployee(application.id, roles, teacherId)
                    })
                }
                
                block.find('.reject-button').on('click', function() {
                    rejectApplication(typeOfUser, application.id)
                })

                if (application.closed) {
                    block.find('.request-buttons').addClass('d-none')
                    block.find('.selectBox').addClass('d-none')
                    block.find('.account-status').removeClass('d-none')
                    block.find('.account-status span').text(application.employee.userInfo.accountStatus)
                }
                
                $('#applications-container').append(block)
            }
        }
    })
}

export default loadApllications