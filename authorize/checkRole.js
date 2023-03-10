
function checkRole() {
    fetch('http://94.103.87.164:8081/api/v1/account/role', {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
    })
        .then((response) => {
            if (response.ok) {
                return response.json()
                    .then((json) => {
                        return json
                    })
            }
        })
        .then((role) => {
            localStorage.setItem('ROLE', role)
            if (role == 'ROLE_EMPLOYEE') {
                location.href = '../adminPanel/adminPanel.html'
            } else if (role == 'ROLE_SHEDULE_MAKER') {
                location.href = '../timeTable/timeTable.html'
            }
        })
}


export default checkRole