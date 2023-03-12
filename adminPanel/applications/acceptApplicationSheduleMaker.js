import needToRefreshToken from "../../authorize/needToRefreshToken.js"

function acceptApplicationScheduleMaker(id) {
    fetch(`http://94.103.87.164:8081/api/v1/schedule-maker-requests/${id}/accept`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        }
    })
        .then((response) => {
            needToRefreshToken(response)
            if (response.ok) {
                location.reload()
                return response.json()
            }
        })

}
export default acceptApplicationScheduleMaker