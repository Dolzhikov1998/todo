import axios from 'axios'

const url = process.env.REACT_APP_API

const instance = axios.create(
    {
        baseURL: url,
        headers: {
            'Content-Type': 'application/json',
            'token': document.cookie
        }
    }
)

export const addTask = async (record) => {
    const response = await instance.post(`card`, record)
    return response
}

export const getTask = async (params) => {
    const response = await instance.get(`card?${params}`)
    return response
}

export const deleteTask = async (idTask) => {
    const response = await instance.delete(`card/${idTask}`)
    return response
}

export const checkTask = async (idTask, record) => {
    const response = await instance.patch(`card/${idTask}`, record)
    return response
}

instance.interceptors.response.use(
    response => {
        if (response.status !== 200 && response.status !== 204) {
            return alert(`Error: ${response.status}`)
        }
        return response
    },
    err => {
        return err
    }
)