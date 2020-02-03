const USER_KEY = 'dq_user_key'
export function setUser(info) {
    localStorage.setItem(USER_KEY, JSON.stringify(info))
}
export function getUser() {
    return JSON.parse(localStorage.getItem(USER_KEY))
}
export function removeUser() {
    localStorage.removeItem(USER_KEY)
}