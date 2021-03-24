import axios from 'axios'


const API_URL = 'https://todo-api-learning.herokuapp.com/'

const instance = axios.create(
    {
        baseURL: API_URL,
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


export const addTask = async (id, record) => {
        const response = await instance.post(`v1/task/${id}`, record)
        return response
}

export const getTask = async (id) => {
        const response = await instance.get(`v1/tasks/${id}`)
        return response  
}

export const deleteTask = async (id, idTask) =>{
        const response = await instance.delete(`v1/task/${id}/${idTask}`)
        return response
}

export const checkTask = async(id, idTask, record) => {
        const response = await instance.patch(`v1/task/${id}/${idTask}`, record)
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
        // alert(err)
        return err}
)