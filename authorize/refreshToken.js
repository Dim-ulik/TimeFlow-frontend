function refreshToken() {
    let body = {
        "refreshToken": localStorage.getItem('refreshToken')
    } 
    console.log(body)
    console.log(localStorage.getItem('refreshToken'))
    fetch('http://94.103.87.164:8081/api/v1/refresh-tokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
      },
        body: body
    })
    .then(response => response.json())

    // .then((response) => {
    //     console.log(response)
    //     return response.end()
        
    //     // if (response.ok) {
    //     //     return response.json()
    //     //     .then((json) => {
    //     //         localStorage.setItem('accessToken', json.accessToken)
    //     //         localStorage.setItem('refreshToken', json.refreshToken)
    //     //     })
    //     // }
    // })
    // .then((json) => {
    //     console.log(json)
    // })
    
}


export default refreshToken