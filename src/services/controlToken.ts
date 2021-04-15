import jwt_decode from "jwt-decode"

export interface MyToken {
    login: string,
    exp: number
}
export const controlToken = () => {
    try {
        if (localStorage.getItem('token') !== null) {
            const token = localStorage.getItem('token')
            if (token) {
                const decodeToken: MyToken = jwt_decode(token);

                localStorage.setItem('login', decodeToken.login)

                const realTime = new Date().getTime() / 1000

                if (realTime > decodeToken.exp) {
                    localStorage.removeItem('token')
                    console.log('redirect on login')
                    return false
                }
                return true
            }
        }
        localStorage.removeItem('token')
        return false
    } catch (e) {
        console.log(e)
    }

}