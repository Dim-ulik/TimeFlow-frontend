function logOut() {
  console.log('logout')
  fetch(`http://94.103.87.164:8081/api/v1/sign-out`, {
    method: "POST",
    // headers: {
    //   Authorization: "Bearer " + localStorage.getItem("refreshToken")
    // },
    body: {
        "refreshToken": localStorage.getItem('refreshToken')
    }
  }).then(() => {
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("accessToken")

    location.reload();
  })
}

export default logOut
