function refreshToken() {
    console.log(localStorage.getItem('refreshToken'))
    fetch('http://94.103.87.164:8081/api/v1/refresh-tokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
      },
        body: {
            "refreshToken": localStorage.getItem('refreshToken')
        }
    })
    .then((response) => {
        //console.log(response.json())        
        if (response.ok) {
            return response.json()
            .then((json) => {
                localStorage.setItem('accessToken', json.accessToken)
                localStorage.setItem('refreshToken', json.refreshToken)
            })
        }
    })
    
}


export default refreshToken