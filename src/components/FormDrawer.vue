<template>
    <el-drawer
        v-model="showDrawer"
        :title="title"
        :size="size"
        :close-on-click-modal="false"
        :destroy-on-close="destroyOnClose"
    >
        <div class="formDrawer">
            <div class="body">
                <slot></slot>
            </div>
            <div class="actions">
                <el-button :loading="loading" type="primary" @click="submit">{{
                    confrimText
                }}</el-button>
                <el-button type="default" @click="close">取消</el-button>
            </div>
        </div>
    </el-drawer>
</template>

<script setup>
import { ref } from "vue";
const showDrawer = ref(false);

// 打开抽屉
const open = () => (showDrawer.value = true);
// 关闭抽屉
const close = () => (showDrawer.value = false);

const loading = ref(false);

const showLoading = () => (loading.value = true);
const hideLoading = () => (loading.value = false);

const emit = defineEmits(["submit"]);
// 提交 执行通知父组件
const submit = () => emit("submit");

const props = defineProps({
    title: String,
    size: {
        type: String,
        default: "45%",
    },
    destroyOnClose: {
        type: Boolean,
        default: false,
    },
    confrimText: {
        type: String,
        default: "提交",
    },
});

// 向父组件暴露以下方法
defineExpose({
    open,
    close,
    showLoading,
    hideLoading,
});
</script>

<style scoped>
.formDrawer {
    width: 100%;
    height: 100%;
    position: relative;
    @apply flex flex-col;
}

.formDrawer .body {
    flex: 1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto;
}

.formDrawer .actions {
    height: 50px;
    @apply mt-auto flex items-center;
}
</style>
