import axios from 'axios'
import { ElNotification } from 'element-plus'
import { useCookies } from '@vueuse/integrations/useCookies'

// 创建自定义实例
const service = axios.create({
    // 使用 server.proxy 之后，使用vite配置的代理地址
    baseURL: '/api',
})

// 添加请求拦截器
service.interceptors.request.use(
    function (config) {
        // wang header 里自动添加 header
        const cookie = useCookies()
        const token = cookie.get('admin-token')
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
        // 对响应错误做点什么
        ElNotification({
            message: error.response.data.msg || '请求失败',
            type: 'error',
            duration: 3000, // 3秒钟
        })
        return Promise.reject(error)
    }
)

export default service
