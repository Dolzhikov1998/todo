import axios from 'axios'
import { controlToken } from './controlToken'

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

export const addTask = async (record: any) => {
    if (controlToken()) {
        const response = await instance.post(`card`, record)
        return response
    }
    console.log('redirect')
}

export const getTask = async (params: any) => {
    if (controlToken()) {
        const response = await instance.get(`card?${params}`)
        return response
    }
    console.log('redirect')
}

export const deleteTask = async (idTask: string) => {
    if (controlToken()) {
        const response = await instance.delete(`card/${idTask}`)
        return response
    }
    console.log('redirect')
}

export const checkTask = async (idTask: string, record: any) => {
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