export const createSession = (key: string, value: string) => {
    sessionStorage.setItem(key, value);
}

export const getSession = (key: string) => {
    const value = sessionStorage.getItem(key);
    return value;
}

export const checkSessionExists = (key: string) => {
    const data = sessionStorage.getItem(key);
    return Boolean(data && data !== null);
}

export const checkJWTUserData = () => {
    const userData = {
        'username': getSession('username'),
        'status': getSession('status'),
        'role': getSession('role'),
        'access': getSession('bearer'),
        'refresh': getSession('refresh'),
    }
    return userData;
}

export const loggedInUser: any = checkJWTUserData();
export const bearerToken = loggedInUser?.access;

export const checkJWTSession = (userData: any) => {
    const accessToken = userData?.bearer || checkSessionExists('bearer');
    const refreshToken = userData?.refresh || checkSessionExists('refresh');
    return Boolean(!!accessToken || !!refreshToken);
}

export const createJWTSession = (data: any = []) => {
    for (let item of data) {
        const keys = Object.keys(item);
        for ( let subItem of keys) {
            createSession(subItem, item?.[subItem]);
        }
    }
}

export const clearSession = (key: string) => {
    const value = sessionStorage.getItem(key);
    if (value) {
        sessionStorage.removeItem(key);
    }
}

export const clearAllSessions = () => {
    sessionStorage.clear();
}