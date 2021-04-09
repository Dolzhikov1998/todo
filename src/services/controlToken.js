import jwt_decode from "jwt-decode"



export const controlToken = () => {
    try{
        if (localStorage.getItem('token') !== null) {
            const token = localStorage.getItem('token')
    
            const decodeToken = jwt_decode(token)
    
            // console.log(decodeToken.exp)
    
            const realTime = new Date().getTime() / 1000
    
            // console.log(realTime)
    
            if (realTime > decodeToken.exp) {
                localStorage.removeItem('token')
                console.log('redirect on login')
                return false
            }
            return true
        }
        console.log('redirect on login ')
        return false
    }catch(e){
        console.log(e)
    }
    
}