<template>
    <el-container class="bg-white rounded" :style="{ height: h + 'px' }">
        <el-header class="image-header">Header</el-header>
        <el-container>
            <ImageAsideVue />
            <ImageMainVue />
        </el-container>
    </el-container>
</template>

<script setup>
import ImageAsideVue from "~/components/ImageAside.vue";
import ImageMainVue from "~/components/ImageMain.vue";
const windowHeight = window.innerHeight || document.body.clientHeight;
const h = windowHeight - 64 - 44 - 40;
</script>

<style scoped>
.image-header {
    border-bottom: 1px solid #eeeeee;
    @apply flex items-center;
}
</style>
