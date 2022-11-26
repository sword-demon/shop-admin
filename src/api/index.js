import axios from '~/axios'

export function getStatistics1() {
    return axios.get('/admin/statistics1')
}

// 首页面板统计接口2
export function getStatistics2() {
    return axios.get('/admin/statistics2')
}

// getStatistics3 首页面板统计接口
export function getStatistics3(type) {
    return axios.get('/admin/statistics3?type=' + type)
}
