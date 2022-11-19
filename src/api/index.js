import axios from '~/axios'

export function getStatistics1() {
    return axios.get('/admin/statistics1')
}

// getStatistics3 首页面板统计接口
export function getStatistics3(type) {
    return axios.get('/admin/statistics3?type=' + type)
}
