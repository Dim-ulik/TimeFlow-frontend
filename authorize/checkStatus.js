import checkRole from "./checkRole.js";

function checkStatus() {
    fetch('http://94.103.87.164:8081/api/v1/account/employee', {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
    })
    .then((response) => {
        if (response.ok) {
            return response.json()
            .then((json) => {
                switch (json.userInfo.accountStatus) {
                    case 'PENDING':
                        location.href = '../downloadPage/downloadPage.html'
                        break;
                    case 'DENIED':
                        location.href = '../bannedPage/bannedPage.html'
                        break;
                    case 'ACTIVATE':
                        checkRole()
                        break;
                }
            })
        }
    })
}

export default checkStatus