<template>
    <el-container>
        <!-- 头部 -->
        <el-header>
            <f-header />
        </el-header>
        <el-container>
            <el-aside :width="$store.state.asideWidth">
                <f-menu />
            </el-aside>
            <el-main>
                <f-tag-list />
                <router-view v-slot="{ Component }">
                    <transition name="fade">
                        <!-- 缓存10个 -->
                        <keep-alive :max="10">
                            <component :is="Component"></component>
                        </keep-alive>
                    </transition>
                </router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import FHeader from "./components/FHeader.vue";
import FMenu from "./components/FMenu.vue";
import FTagList from "./components/FTagList.vue";
</script>

<style scoped>
.el-aside {
    transition: all 0.2s;
}

/* 进入之前 */
.fade-enter-from {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
}
/* 进入之后 */
.fade-enter-to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
}
/* 离开之前 */
.fade-leave-from {
    opacity: 1;
}
/* 离开之后 */
.fade-leave-to {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
}
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s;
}
/* 进入动画延迟 */
.fade-enter-active {
    transition-delay: 0.3s;
}
</style>
