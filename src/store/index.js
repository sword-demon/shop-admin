import { createStore } from 'vuex'
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
})

export default store
