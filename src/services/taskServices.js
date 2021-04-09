import axios from 'axios'
import { controlToken } from '../services/controlToken'

const url = process.env.REACT_APP_API


const instance = axios.create(
    {
        baseURL: url,
        headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('token')
        }
    }
)

export const addTask = async (record) => {
    if (controlToken()) {
        const response = await instance.post(`card`, record)
        return response
    }
    console.log('redirect')
}

export const getTask = async (params) => {
    if (controlToken()) {
        const response = await instance.get(`card?${params}`)
        return response
    }
    console.log('redirect')
}

export const deleteTask = async (idTask) => {
    if (controlToken()) {
        const response = await instance.delete(`card/${idTask}`)
        return response
    }
    console.log('redirect')
}

export const checkTask = async (idTask, record) => {
    if (controlToken()) {
        const response = await instance.patch(`card/${idTask}`, record)
        return response
    }
    console.log('redirect')
}

instance.interceptors.response.use(
    response => {
        return response
    },
    err => {
        return err
    }
)