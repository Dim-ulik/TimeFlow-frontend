import needToRefreshToken from "./needToRefreshToken.js";

function checkStatus() {
    fetch('http://94.103.87.164:8081/api/v1/account/employee', {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
    })
        .then((response) => {
            needToRefreshToken(response)
            if (response.ok) {
                return response.json()
                    .then((json) => {
                        switch (json.userInfo.accountStatus) {
                            case 'PENDING':
                                location.href = '../downloadPage/downloadPage.html'
                                break;
                            case 'REJECTED':
                                location.href = '../bannedPage/bannedPage.html'
                                break;
                            case 'ACTIVATED':

                                for (let post of json.posts) {
                                    if (post.postRole === 'ROLE_SCHEDULE_MAKER') {
                                        localStorage.setItem('ROLE', post.postRole)
                                    }
                                    if (post.postRole === 'ROLE_ADMIN') {
                                        localStorage.setItem('ROLE', post.postRole)
                                    }
                                }
                                if (localStorage.getItem('ROLE') === 'ROLE_ADMIN') {
                                    location.href = '../adminPanel/adminPanel.html'
                                } else if (localStorage.getItem('ROLE') === 'ROLE_SCHEDULE_MAKER') {
                                    location.href = '../timeTable/timeTable.html'
                                }

                                break;
                        }
                    })
            }
        })
}

export default checkStatus