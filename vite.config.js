import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

// 处理路径相关的 内置模块
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            // 给 src 指定别名 ~
            '~': path.resolve(__dirname, 'src'),
        },
    },
    server: {
        // 代理
        proxy: {
            // 使用 /api 来代替下面的域名
            '/api': {
                target: 'http://ceshi13.dishait.cn',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, ''),
            },
        },
    },
    plugins: [vue(), WindiCSS()],
})
