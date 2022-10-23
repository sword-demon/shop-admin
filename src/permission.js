// 处理权限相关的内容

import { router, addRoutes } from './router'
import { getToken } from '~/composables/auth'
import { toast, showFullLoading, hideFullLoading } from '~/composables/util'
import store from './store'

// 防止重复加载 getinfo
let hasGetInfo = false

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
    // 显示loading
    showFullLoading()

    // console.log('全局前置守卫')
    const token = getToken()
    // 没有登录强制跳转回登录页
    if (!token && to.path != '/login') {
        toast('请先登录', 'error')
        return next({ path: '/login' })
    }
    // 防止重复登录判断
    if (token && to.path == '/login') {
        toast('请务重复登录', 'error')
        // 从哪里来就从哪里去
        return next({ path: from.path ? from.path : '/' })
    }
    let hasNewRoutes = false
    // 如果用户登录了就自动获取用户信息，并存储在vuex中
    if (token && !hasGetInfo) {
        // 异步 resolve(res) 的res 进行解构出菜单
        let { menus } = await store.dispatch('getAdminUserInfo')
        hasGetInfo = true
        // 动态添加路由
        hasNewRoutes = addRoutes(menus)
    }
    // 设置页面标题
    // console.log(to.meta.title) // 拿到标题
    let title = (to.meta.title ? to.meta.title : '') + '-无解的管理后台'
    document.title = title
    // 如果有新的路由走指定的 否则直接 next()
    hasNewRoutes ? next(to.fullPath) : next() // 放行
})

// 全局后置守卫
router.afterEach((to, from) => hideFullLoading())
