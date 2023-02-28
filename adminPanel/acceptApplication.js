import deleteApplication from "./deleteApplication";

function acceptApplication(id) {
    fetch(`http://94.103.87.164:8081/api/v1/request/employee/schedule-maker/${id}/accept`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        }
    })
    .then ((response) => {
        console.log(response)
        if (response.ok) {
            deleteApplication(id)
            return response.json()
        } else {
            
        }
    })
    .then ((json) => {
        console.log(json)
    })
}
export default acceptApplication