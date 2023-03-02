const adminEmail = 'admin'
const adminPassword = 'admin'

function isAdmin(email, password) {
    if (email === adminEmail && password === adminPassword) {
        return true
    }
    return false
}

export default isAdmin