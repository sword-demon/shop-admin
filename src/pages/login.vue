<template>
    <el-row class="login-container">
        <!-- 垂直和水平方向的居中 垂直展示 -->
        <!-- 只有在大于 1200px 才会 左16 右8 -->
        <!-- ≥992px 显示各一半的布局 -->
        <el-col :lg="16" :md="12" class="left">
            <div>
                <!-- 文字加粗 文字变大 文字颜色 底部间距 -->
                <div>欢迎光临</div>
                <div>此站点是《vue3 + vite》实现的后台</div>
            </div>
        </el-col>
        <el-col :lg="8" :md="12" class="right">
            <!-- 设置字体加粗 字体大小 字体灰色加深 -->
            <h2 class="title">欢迎登录</h2>
            <!-- 设置左右间距2 -->
            <div>
                <!-- 设置高度固定值 1px -->
                <span class="line"></span>
                <span>账号密码登录</span>
                <span class="line"></span>
            </div>
            <el-form
                ref="formRef"
                :rules="rules"
                :model="form"
                class="w-[250px]"
            >
                <el-form-item prop="username">
                    <el-input
                        v-model="form.username"
                        placeholder="请输入用户名"
                    >
                        <!-- 使用插槽 -->
                        <template #prefix>
                            <el-icon><User /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        show-password
                        v-model="form.password"
                        placeholder="请输入密码"
                    >
                        <template #prefix>
                            <el-icon><Lock /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        round
                        color="#626aef"
                        class="w-[250px]"
                        type="primary"
                        @click="onSubmit"
                        >登 录</el-button
                    >
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script setup>
import { ref, reactive } from "vue";
import { ElNotification } from "element-plus";
import { useRouter } from "vue-router";
import { login } from "~/api/manager";
import { useCookies } from "@vueuse/integrations/useCookies";

const router = useRouter();

// do not use same name with ref
const form = reactive({
    username: "",
    password: "",
});

// 定义登录验证规则
// 必须和上面表单属性一样
const rules = {
    // 规则可以支持多条
    // 每一条单独的都是一个对象
    username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
    password: [
        { required: true, message: "用户密码不能为空", trigger: "blur" },
    ],
};

// 让formRef变成响应式
const formRef = ref(null);

const onSubmit = () => {
    formRef.value.validate((valid) => {
        if (!valid) {
            return false;
        }
        // console.log("验证通过");
        // 返回的是一个 promise
        login(form.username, form.password)
            .then((res) => {
                console.log(res.data.data);
                ElNotification({
                    message: "登录成功",
                    type: "success",
                    duration: 3000, // 3秒钟
                });
                // 提示成功
                // 存储token和用户相关信息
                const cookie = useCookies();
                cookie.set("admin-token", res.data.data.token);
                // 跳转到后台首页
                router.push("/");
            })
            .catch((err) => {
                // console.log(err.response.data);
                ElNotification({
                    message: err.response.data.msg || "请求失败",
                    type: "error",
                    duration: 3000, // 3秒钟
                });
            });
    });
};
</script>

<style scoped>
.login-container {
    @apply min-h-screen;
}
.login-container .left {
    @apply bg-indigo-500 flex items-center justify-center;
}

.login-container .right {
    @apply bg-light-50 flex items-center justify-center flex-col;
}
.left > div > div:first-child {
    @apply font-bold text-5xl text-light-50 mb-4;
}
.left > div > div:last-child {
    @apply text-gray-200 text-sm;
}
.right .title {
    @apply font-bold text-3xl text-gray-800;
}
.right > div {
    @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}
.right .line {
    @apply h-[1px] w-16 bg-gray-200;
}
</style>
