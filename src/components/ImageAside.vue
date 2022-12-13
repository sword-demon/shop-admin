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
        <div class="bottom">
            <el-pagination
                background
                :total="total"
                :current-page="currentPage"
                :page-size="limit"
                layout="prev, next"
                @current-change="getData"
            ></el-pagination>
        </div>
    </el-aside>

    <!-- 表单抽屉组件 -->
    <FormDrawer ref="formDrawerRef" @submit="handleSubmit" title="新增">
        <el-form :model="form" ref="formRef" :rules="rules">
            <el-form-item label="分类名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="分类排序" prop="order">
                <el-input-number
                    :min="0"
                    :max="1000"
                    v-model="form.order"
                ></el-input-number>
            </el-form-item>
        </el-form>
    </FormDrawer>
</template>

<script setup>
import { reactive, ref } from "vue";
import FormDrawer from "./FormDrawer.vue";
import AsideList from "./AsideList.vue";
import { getImageClassList, createImageClass } from "~/api/image_class.js";
import { toast } from "~/composables/util.js";

// 加载动画
const loading = ref(false);

// 列表数据
const list = ref([]);

// 是否激活
const activeId = ref(0);

// 分页参数
const currentPage = ref(1);
const total = ref(0); // 总数
const limit = ref(10); // 每页显示多少条

// 获取数据
function getData(p = null) {
    if (typeof p == "number") {
        currentPage.value = p;
    }
    // console.log(p);
    loading.value = true;
    getImageClassList(currentPage.value)
        .then((res) => {
            total.value = res.totalCount; // 设置总数
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

// 抽屉表单
const formDrawerRef = ref(null);
// 打开表单抽屉
const handleCreate = () => formDrawerRef.value.open();

const form = reactive({
    name: "",
    order: 50,
});

const rules = {
    name: [
        {
            required: true,
            message: "图库分类名称不能为空",
            trigger: "blur",
        },
    ],
};

const formRef = ref(null);

const handleSubmit = () => {
    formRef.value.validate((valid) => {
        if (!valid) {
            return;
        } else {
            formDrawerRef.value.showLoading();
            console.log(form);
            createImageClass(form)
                .then((res) => {
                    toast("新增成功");
                    getData(1);
                    formDrawerRef.value.close();
                })
                .finally(() => {
                    formDrawerRef.value.hideLoading();
                });
        }
    });
};

defineExpose({
    handleCreate,
});
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
