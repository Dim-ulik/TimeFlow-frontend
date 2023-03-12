import needToRefreshToken from "../../authorize/needToRefreshToken.js"

function acceptApplicationEmployee(id, postIds, teacherId) {
    fetch('http://94.103.87.164:8081/api/v1/employee-posts', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        }
    })
    .then((response) => {
        needToRefreshToken(response)
        if (response.ok) {
            return response.json()
            .then((json) => {
                let postIdsQuery = ''

                for (let post of postIds) {
                    for (let postId of json) {
                        if (post == postId.postName) {
                            postIdsQuery += `postIds=${postId.id}&`
                        }
                    }
                }

                return postIdsQuery
                
            })
            .then((postIdsResult) => {
                fetch(`http://94.103.87.164:8081/api/v1/employee-requests/${id}/accept?${postIdsResult}${teacherId}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                    }
                })
                .then ((response) => {
                    if (response.ok) {
                        location.reload()
                        return response.json()
                    }
                })
            
            })
        }
    })
    
}
export default acceptApplicationEmployee