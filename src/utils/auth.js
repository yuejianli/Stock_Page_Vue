const TokenKey = 'Authorization'
const loginUserKey = 'loginUser'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.remove(TokenKey)
}
export function getLoginUser() {
  return JSON.parse(localStorage.getItem(loginUserKey))
}
export function setLoginUser(currentUser) {
  return localStorage.setItem(loginUserKey, JSON.stringify(currentUser))
}
export function removeUser() {
  return localStorage.remove(loginUserKey)
}

