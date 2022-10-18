import axios from '~/axios'

export function login(username, password) {
    return axios.post('/admin/login', {
        username,
        password,
    })
}

// 获取用户相关信息
export function getInfo() {
    return axios.post('/admin/getinfo')
}

export function logout() {
    return axios.post('/admin/logout')
}

export function updatepassword(data) {
    return axios.post('/admin/updatepassword', data)
}
