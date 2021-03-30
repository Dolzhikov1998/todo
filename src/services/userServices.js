import axios from 'axios'


// const API_URL = 'https://todo-api-learning.herokuapp.com/'
// const API_URL = 'http://localhost:3000/api/'
// const URL = 'https://calm-earth-60546.herokuapp.com/api/'

const {REACT_APP_URL} = process.env
console.log("ASDASDAD"+REACT_APP_URL)
const instance = axios.create(
    {
        baseURL: REACT_APP_URL,
        headers: {
            'Content-Type': 'application/json',
        }
    }
)


// const request  = async (method, api, data) => {
//     try{
//         return await instance({
//             method,
//             url:api,
//             data
//         })
//     }
//     catch(e){
//         console.log(e)
//     }
// }


export const addTask = async (record) => {
    const response = await instance.post(`cards`, record)
    return response
}

export const getTask = async () => {
    const response = await instance.get('cards')
    return response  
}

export const deleteTask = async (idTask) =>{
    const response = await instance.delete(`cards/${idTask}`)
    return response
}

export const checkTask = async(idTask, record) => {
    const response = await instance.patch(`cards/${idTask}`, record)
    return response 
}

instance.interceptors.response.use(
    response => {
        if(response.status !== 200 && response.status !== 204){
            return alert(`Error: ${response.status}`)
        }
        return response
    },
    err => {
        return err}
)