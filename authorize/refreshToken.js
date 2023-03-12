function refreshToken() {
    fetch("http://94.103.87.164:8081/api/v1/refresh-tokens", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
        body: JSON.stringify({"refreshToken": localStorage.getItem('refreshToken')})
    })
    .then((response) => {
        console.log(response)
        if (response.ok) {
            return response.json()
        } else {
            location.href = '../authorize/index.html'
        }
    })
    .then((json) => {
        localStorage.setItem('accessToken', json.accessToken)
        localStorage.setItem('refreshToken', json.refreshToken)
        location.reload()
    });
}

export default refreshToken;
