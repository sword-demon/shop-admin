import { ref } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'
import { router } from '~/router'

export function useTabList() {
    const route = useRoute()
    const cookie = useCookies()

    const activeTab = ref(route.path)
    const tabList = ref([
        {
            title: '后台首页',
            path: '/',
        },
    ])

    const changeTab = t => {
        activeTab.value = t
        if (t == 0) {
            t = '/'
        }
        router.push(t)
    }

    function addTab(tab) {
        let notTab = tabList.value.findIndex(t => t.path == tab.path) == -1
        if (notTab) {
            tabList.value.push(tab)
        }
        cookie.set('tabList', tabList.value)
    }

    // 初始化标签导航列表
    function initTabList() {
        let tabs = cookie.get('tabList')
        if (tabs) {
            tabList.value = tabs
        }
    }

    initTabList()

    onBeforeRouteUpdate((to, from) => {
        // 设置tab激活
        activeTab.value = to.path
        // console.log(to, from);
        addTab({
            title: to.meta.title,
            path: to.path,
        })
    })

    const removeTab = t => {
        // console.log(t);
        // 1. 判断关闭的是否是当前激活的
        let tabs = tabList.value
        let a = activeTab.value
        if (a == t) {
            tabs.forEach((tab, index) => {
                if (tab.path == t) {
                    const nextTab = tabs[index + 1] || tabs[index - 1] // 如果没有下一个就去拿上一个
                    if (nextTab) {
                        // 设置下一个激活的值
                        a = nextTab.path
                    }
                }
            })
        }
        activeTab.value = a
        // 只有不等于当前关闭的留下来
        tabList.value = tabList.value.filter(tab => tab.path != t)
        // 更新存储的cookie
        cookie.set('tabList', tabList.value)
    }

    const handleClose = c => {
        console.log(c)
        if (c == 'clearAll') {
            // 清除所有，切换回首页
            activeTab.value = '/'
            // 过滤只想剩下首页
            tabList.value = [
                {
                    title: '后台首页',
                    paht: '/',
                },
            ]
        } else if (c == 'clearOther') {
            // 过滤只剩下首页和当前激活
            tabList.value = tabList.value.filter(tab => tab.path == '/' || tab.path == activeTab.value)
        }
        cookie.set('tabList', tabList.value)
    }

    return {
        activeTab,
        tabList,
        changeTab,
        removeTab,
        handleClose,
    }
}
