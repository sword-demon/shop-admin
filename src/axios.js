import axios from 'axios'

// 创建自定义实例
const service = axios.create({
    // 使用 server.proxy 之后，使用vite配置的代理地址
    baseURL: '/api',
})

export default service
