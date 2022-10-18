import axios from 'axios'
import { getToken } from '~/composables/auth'
import { toast } from '~/composables/util.js'
import store from './store'

// 创建自定义实例
const service = axios.create({
    // 使用 server.proxy 之后，使用vite配置的代理地址
    baseURL: '/api',
})

// 添加请求拦截器
service.interceptors.request.use(
    function (config) {
        // wang header 里自动添加 header
        const token = getToken()
        // 判断一下
        if (token) {
            config.headers['token'] = token
        }
        return config
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)

// 添加响应拦截器
service.interceptors.response.use(
    function (response) {
        // 对响应数据做点什么
        return response.data.data
    },
    function (error) {
        const msg = error.response.data.msg || '请求失败'
        // todo 这里感觉使用文字来判断不可行，后期可以进行优化
        if (msg == '非法token，请先登录！') {
            store.dispatch('logout').finally(() => location.reload())
        }
        // 对响应错误做点什么
        toast(msg, 'error')
        return Promise.reject(error)
    }
)

export default service
