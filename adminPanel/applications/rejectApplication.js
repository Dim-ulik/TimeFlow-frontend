function rejectApplication(typeOfUser, id) {
    fetch(`http://94.103.87.164:8081/api/v1/${typeOfUser}-requests/${id}/reject`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        }
    })
    .then ((response) => {
        if (response.ok) {
            $('.account-status').removeClass('d-none')
            location.reload()
        }
    })
}
export default rejectApplication