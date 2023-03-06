$(".log-out-btn").click(function (e) {
    console.log('logout')
  fetch(`http://94.103.87.164:8081/api/v1/sign-out`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: {
        "refreshToken": localStorage.getItem('refreshToken')
    }
  }).then(() => {
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("accessToken")

    location.reload();
  })
});
