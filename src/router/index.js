import { createRouter, createWebHashHistory } from 'vue-router'
import Admin from '~/layouts/admin.vue'
import Index from '~/pages/index.vue'
import Login from '~/pages/login.vue'
import NotFound from '~/pages/404.vue'
import GoodList from '~/pages/goods/list.vue'
import CategoryList from '~/pages/category/list.vue'

// 默认路由 所有用户共享
const routes = [
    {
        path: '/',
        component: Admin,
        name: 'admin',
    },
    {
        path: '/login',
        component: Login,
        meta: {
            title: '登录页',
        },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
    },
]

// 动态路由，用于匹配菜单动态添加路由
const asyncRoutes = [
    {
        path: '/',
        component: Index,
        name: '/',
        meta: {
            title: '后台首页',
        },
    },
    {
        path: '/goods/list',
        name: '/goods/list',
        component: GoodList,
        meta: {
            title: '商品管理',
        },
    },
    {
        path: '/category/list',
        name: '/category/list',
        component: CategoryList,
        meta: {
            title: '分类列表',
        },
    },
]

// const routes = [
//     {
//         path: '/',
//         component: Admin,
//         // 子路由
//         children: [
//             {
//                 path: '/',
//                 component: Index,
//                 meta: {
//                     title: '后台首页',
//                 },
//             },
//             {
//                 path: '/goods/list',
//                 component: GoodList,
//                 meta: {
//                     title: '商品管理',
//                 },
//             },
//             {
//                 path: '/category/list',
//                 component: CategoryList,
//                 meta: {
//                     title: '分类列表',
//                 },
//             },
//         ],
//     },
//     {
//         path: '/login',
//         component: Login,
//         meta: {
//             title: '登录页',
//         },
//     },
//     {
//         path: '/:pathMatch(.*)*',
//         name: 'NotFound',
//         component: NotFound,
//     },
// ]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

// 动态添加路由的方法
// 接收后端的一个菜单
export function addRoutes(menus) {
    // 是否有新的路由
    let hasNewRoutes = false
    const findAndAddRoutesByMenus = arr => {
        arr.forEach(e => {
            // e 菜单的每个对象
            // e.frontpath 菜单路径
            let item = asyncRoutes.find(o => o.path == e.frontpath)
            // 判断是否相同 且检查路由是否存在 传入的是一个name值 先设置和path一样
            if (item && !router.hasRoute(item.path)) {
                router.addRoute('admin', item)
                hasNewRoutes = true
            }
            // 是否存在子菜单
            if (e.child && e.child.length > 0) {
                // 递归调用
                findAndAddRoutesByMenus(e.child)
            }
        })
    }
    // 外部执行一下
    findAndAddRoutesByMenus(menus)

    // 查看现有路由
    console.log(router.getRoutes())

    return hasNewRoutes
}
