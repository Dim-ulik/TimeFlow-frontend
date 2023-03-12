function acceptApplicationEmployee(id, postIds, teacherId) {
    let postIdsQuery = ''
    for (let post of postIds) {
        postIdsQuery += `&postIds=${post}`
    }
    console.log(postIdsQuery + ' ' + teacherId)
    // fetch(`http://94.103.87.164:8081/api/v1/employee-requests/${id}/accept`, {
    //     method: 'POST',
    //     headers: {
    //         'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
    //     }
    // })
    // .then ((response) => {
    //     if (response.ok) {
    //         location.reload()
    //         return response.json()
    //     }
    // })

}
export default acceptApplicationEmployee