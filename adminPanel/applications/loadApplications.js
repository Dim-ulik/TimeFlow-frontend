import acceptApplication from "./acceptApplication.js"
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
        console.log(json)
        $('#applications-container').empty()

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
    
                $(`${this} .accept-button`).click(acceptApplication(application.id))
                $(`${this} .reject-button`).click(rejectApplication(application.id))
    
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
    
                $(`${this} .accept-button`).click(acceptApplication(application.id))
                $(`${this} .reject-button`).click(rejectApplication(application.id))
    
                $('#applications-container').append(block)
            }
        }
    })
}

export default loadApllications