import acceptApplication from "./acceptApplication"
import rejectApplication from "./rejectApplication"

function loadApllications() {

    fetch(`http://94.103.87.164:8081/api/v1/request/student`)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        $('#applications-container').empty()

        let template = $('#card-template')
    
        for(let application of json['content']){
            let block = template.clone()
            block.removeClass('d-none')
            block.attr('id', 'application-' + application.id)
            if (application.sex == 'MALE') {
                block.find('.photo').attr('src', './images/man.png')
            } else {
                block.find('.photo').attr('src', './images/woman.png')
            }
            block.find('.name').text(application.surname + ' ' + application.name + ' ' + application.patronymic)
            block.find('.student-number').text(application.studentNumber)
            block.find('.email').text(application.email)

            $(`${this} .accept-button`).click(acceptApplication(application.id))
            $(`${this} .reject-button`).click(rejectApplication(application.id))

            $('#applications-container').append(block)
        }
    })
}

export default loadApllications