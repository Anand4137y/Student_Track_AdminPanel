export const getTokenFromLocalStorage = () => {
    let token = null;
    if(typeof window !== 'undefined') {
        token = localStorage.getItem('token') || null;
    }
    return token;
}