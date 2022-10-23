<template>
    <div class="f-tag-list" :style="{ left: $store.state.asideWidth }">
        <el-tabs
            v-model="activeTab"
            type="card"
            class="flex-1"
            @tab-remove="removeTab"
            style="min-width: 100px"
        >
            <el-tab-pane
                v-for="item in taList"
                :key="item.path"
                :label="item.title"
                :name="item.path"
                :closable="item.path != '/'"
            >
            </el-tab-pane>
        </el-tabs>
        <span class="tag-btn">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-icon>
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>Action 1</el-dropdown-item>
                        <el-dropdown-item>Action 2</el-dropdown-item>
                        <el-dropdown-item>Action 3</el-dropdown-item>
                        <el-dropdown-item disabled>Action 4</el-dropdown-item>
                        <el-dropdown-item divided>Action 5</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </span>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const activeTab = ref(route.path);
const taList = ref([
    {
        title: "后台首页",
        path: "/",
    },
    {
        title: "商城管理",
        path: "/goods/list",
    },
]);

const removeTab = (targetName) => {};
</script>

<style scoped>
.f-tag-list {
    top: 65px;
    right: 0;
    height: 44px;
    @apply fixed bg-gray-100 flex items-center px-2;
    z-index: 100;
}
.tag-btn {
    @apply bg-white rounded ml-auto flex items-center justify-center px-2;
    height: 32px;
}
:deep(.el-tabs__header) {
    @apply mb-0;
}
:deep(.el-tabs__nav) {
    border: 0 !important;
}
:deep(.el-tabs__item) {
    border: 0 !important;
    @apply bg-white mx-1 rounded;
    height: 32px;
    line-height: 32px;
}
:deep(.el-tabs__nav-next),
:deep(.el-tabs__nav-prev) {
    line-height: 32px;
    height: 32px;
}
:deep(.is-disabled) {
    cursor: not-allowed;
    @apply text-gray-300;
}
</style>
