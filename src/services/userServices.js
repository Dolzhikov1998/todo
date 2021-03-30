import axios from 'axios'

const url = process.env.REACT_APP_API

const instance = axios.create(
    {
        baseURL: url,
        headers: {
            'Content-Type': 'application/json',
        }
    }
)

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