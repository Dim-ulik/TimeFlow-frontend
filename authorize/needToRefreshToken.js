import refreshToken from "./refreshToken.js"

function needToRefreshToken(response) {
    if (response.status == 450) {
        refreshToken()
    } else if (response.status == 451) {
        localStorage.removeItem('accessToken') 
        localStorage.removeItem('refreshToken') 
        location.href = './index.html'
    }
}

export default needToRefreshToken