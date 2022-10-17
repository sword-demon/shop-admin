import { createStore } from 'vuex'
import { login, getInfo } from '~/api/manager'
import { setToken, removeToken } from '~/composables/auth'
// 创建一个新的 store 实例
const store = createStore({
    state() {
        return {
            user: {}, // 默认空对象 用户信息
        }
    },
    mutations: {
        // 记录用户信息
        SET_USERINFO(state, user) {
            state.user = user
        },
    },
    // 异步
    actions: {
        // 获取当前登录用户信息
        getAdminUserInfo({ commit }) {
            return new Promise((resolve, reject) => {
                getInfo()
                    .then(res => {
                        commit('SET_USERINFO', res)
                        resolve(res)
                    })
                    .catch(err => reject(err))
            })
        },
        // 登录 解构出来参数
        login({ commit }, { username, password }) {
            return new Promise((resolve, reject) => {
                login(username, password)
                    .then(res => {
                        // 存储token和用户相关信息
                        setToken(res.token)
                        resolve(res)
                    })
                    .catch(err => reject(err))
            })
        },
        // 退出登录
        logout({ commit }) {
            // 移除cookie的token
            removeToken()
            // 清除当前用户状态 vuex
            commit('SET_USERINFO', {}) // 设置为空对象
        },
    },
})

export default store
