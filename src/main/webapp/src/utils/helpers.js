export const APP_JWT = 'app_jwt'
export const APP_USER = 'app_user' //user username
export const CURRENT_USER = 'currentUser'
export const CURRENT_USER_ROLE = 'currentUserRole'
export const EDITOR_ROLE = 'EDITOR'
export const ADMIN_ROLE = 'ADMIN'
export const SUPPORT_ROLE = 'SUPPORT'

export const getJwt = () => {
    return localStorage.getItem(APP_JWT)
}

export const getFullJwt = () => {
    return 'Bearer_'+localStorage.getItem(APP_JWT)
}

export const getUsername = () => {
    return localStorage.getItem(APP_USER)
}

export const getUser = () => {
    return JSON.parse(localStorage.getItem(CURRENT_USER))
}

export const getUserRole = () => {
    return localStorage.getItem(CURRENT_USER_ROLE);
}

export const getJwtHeader = () => {
    return {Authorization: getFullJwt()}
}

export const clearUserDataFromLocalStorage = () => {
    localStorage.removeItem(APP_JWT);
    localStorage.removeItem(APP_USER);
    localStorage.removeItem(CURRENT_USER);
    localStorage.removeItem(CURRENT_USER_ROLE);
}
