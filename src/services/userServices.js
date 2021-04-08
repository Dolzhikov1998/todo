import axios from 'axios'

const url = process.env.REACT_APP_API

const instanceUser = axios.create(
    {
        baseURL: url,
        headers: {
            'Content-Type': 'application/json'
        }
    }
)

export const sendFormInfoUser = async (record) => {
    const response = await instanceUser.post(`user/` + record.typeRequest, record)
    return response
}


instanceUser.interceptors.response.use(
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