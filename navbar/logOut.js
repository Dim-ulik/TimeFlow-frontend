function logOut() {
  fetch(`http://94.103.87.164:8081/api/v1/sign-out`, {
    method: "POST",
    body: {
      "refreshToken": localStorage.getItem('refreshToken')
    }
  }).then(() => {
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("accessToken")
    localStorage.removeItem('ROLE')

    location.href = "../authorize/index.html"
  })
}

export default logOut
