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

const request  = async (method, api, data) => {
    try{
        return await instance({
            method,
            url:api,
            data
        })
    }
    catch(e){
        console.log(e)
    }
}


export const addTask = async (id, record) => {
    try{
        const response = await axios.post(`https://todo-api-learning.herokuapp.com/v1/task/${id}`, record)
        return response
    }
    catch(e){
        console.log(e)
    }  
}

export const getTask = async (id) => {
    try{
        return await axios.get(`https://todo-api-learning.herokuapp.com/v1/tasks/${id}`)
    }
    catch(e){
        console.log(e)
    }
         
}

export const deleteTask = async (id, idTask ) =>{
    try{
        await axios.delete(`https://todo-api-learning.herokuapp.com/v1/task/${id}/${idTask}`)
    }
    catch(e){
        console.log(e)
    }
}

export const checkTask = async(id, idTask, record) => {
    try{
       const response = await axios.patch(`https://todo-api-learning.herokuapp.com/v1/task/${id}/${idTask}`, record)
       return response
    }
    catch(e){
        console.log(e)
    }
}