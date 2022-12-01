<template>
    <el-aside width="220px;" class="image-aside" v-loading="loading">
        <div class="top">
            <AsideList
                :active="activeId == item.id"
                v-for="(item, index) in list"
                :key="index"
                >{{ item.name }}</AsideList
            >
        </div>
        <div class="bottom">分页区域</div>
    </el-aside>
</template>

<script setup>
import { ref } from "vue";
import AsideList from "./AsideList.vue";
import { getImageClassList } from "~/api/image_class.js";

// 加载动画
const loading = ref(false);

// 列表数据
const list = ref([]);

// 是否激活
const activeId = ref(0);

// 获取数据
function getData() {
    loading.value = true;
    getImageClassList(1)
        .then((res) => {
            // console.log(res);
            list.value = res.list;
            // 默认选中第一个
            let item = list.value[0];
            if (item) {
                activeId.value = item.id;
            }
        })
        .finally(() => {
            loading.value = false;
        });
}

getData();
</script>

<style scoped>
.image-aside {
    border-right: 1px solid #eeeeee;
    position: relative;
}
.image-aside .top {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 50px;
    overflow-y: auto;
}
.image-aside .bottom {
    position: absolute;
    bottom: 0;
    height: 50px;
    left: 0;
    right: 0;
    @apply flex items-center justify-center;
}
</style>
