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
function format(date) {
    if (date < 10) {
        return `0${date}`;
    }
    return date;
}
export function getLocalTime(str) {
    let date = new Date();
    switch (str) {
        case 'yyyy-MM-dd h:m:s':
            return `${date.getFullYear()}-${format(date.getMonth() + 1)}-${format(date.getDate())} ${format(date.getHours())}:${format(date.getMinutes())}:${format(date.getSeconds())}`;
        case 'h':
            return date.getHours();
        default:
            return date.getFullYear() + '-' + format(date.getMonth() + 1) + '-' + format(date.getDate());
    }
}