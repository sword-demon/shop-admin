<template>
    <!-- 水平方向 -->
    <div class="f-header">
        <span class="logo">
            <el-icon class="mr-1"><Promotion /></el-icon>
            无解的游戏
        </span>
        <!-- 收缩图标 -->
        <el-icon class="icon-btn"><Fold /></el-icon>
        <!-- 刷新图标 -->
        <el-tooltip effect="dark" content="刷新" placement="bottom">
            <el-icon class="icon-btn" @click="handleRefresh"
                ><RefreshRight
            /></el-icon>
        </el-tooltip>
        <div class="ml-auto flex items-center">
            <!-- 全屏图标 -->
            <el-tooltip effect="dark" content="全屏" placement="bottom">
                <el-icon class="icon-btn" @click="toggle">
                    <FullScreen v-if="!isFullscreen" />
                    <Aim v-else />
                </el-icon>
            </el-tooltip>
            <el-dropdown class="dropdown" @command="handleCommand">
                <span class="flex items-center text-light-50">
                    <!-- 头像 -->
                    <el-avatar
                        class="mr-2"
                        :size="25"
                        :src="$store.state.user.avatar"
                    />
                    <!-- 昵称 -->
                    {{ $store.state.user.username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="rePassword"
                            >修改密码</el-dropdown-item
                        >
                        <el-dropdown-item command="logout"
                            >退出登录</el-dropdown-item
                        >
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
    <!-- <el-drawer
        v-model="showDrawer"
        title="修改密码"
        size="45%"
        :close-on-click-modal="false"
    >
        <el-form
            ref="formRef"
            :rules="rules"
            :model="form"
            label-width="80px"
            size="small"
        >
            <el-form-item prop="oldpassword" label="旧密码">
                <el-input
                    v-model="form.oldpassword"
                    placeholder="请输入旧密码"
                ></el-input>
            </el-form-item>
            <el-form-item prop="password" label="新密码">
                <el-input
                    type="password"
                    v-model="form.password"
                    placeholder="请输入密码"
                    show-password
                ></el-input>
            </el-form-item>
            <el-form-item prop="repassword" label="确认密码">
                <el-input
                    type="password"
                    v-model="form.repassword"
                    placeholder="请输入确认密码"
                    show-password
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" :loading="loading"
                    >提交</el-button
                >
            </el-form-item>
        </el-form>
    </el-drawer> -->

    <form-drawer
        ref="formDrawerRef"
        title="修改密码"
        destroyOnClose
        @submit="onSubmit"
    >
        <el-form
            ref="formRef"
            :rules="rules"
            :model="form"
            label-width="80px"
            size="small"
        >
            <el-form-item prop="oldpassword" label="旧密码">
                <el-input
                    v-model="form.oldpassword"
                    placeholder="请输入旧密码"
                ></el-input>
            </el-form-item>
            <el-form-item prop="password" label="新密码">
                <el-input
                    type="password"
                    v-model="form.password"
                    placeholder="请输入密码"
                    show-password
                ></el-input>
            </el-form-item>
            <el-form-item prop="repassword" label="确认密码">
                <el-input
                    type="password"
                    v-model="form.repassword"
                    placeholder="请输入确认密码"
                    show-password
                ></el-input>
            </el-form-item>
        </el-form>
    </form-drawer>
</template>

<script setup>
import { ref, reactive } from "vue";
import { logout, updatepassword } from "~/api/manager";
import { showModal, toast } from "~/composables/util";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useFullscreen } from "@vueuse/core";
import FormDrawer from "~/components/FormDrawer.vue";

// 是否全屏 全屏切换
const { isFullscreen, toggle } = useFullscreen();

const store = useStore();
const router = useRouter();

// do not use same name with ref
const form = reactive({
    oldpassword: "",
    password: "",
    repassword: "",
});

// 定义登录验证规则
// 必须和上面表单属性一样
const rules = {
    oldpassword: [
        {
            required: true,
            message: "旧密码不能为空",
            trigger: "blur",
        },
    ],
    password: [
        {
            required: true,
            message: "新密码不能为空",
            trigger: "blur",
        },
    ],
    repassword: [
        {
            required: true,
            message: "确认密码不能为空",
            trigger: "blur",
        },
    ],
};

const formDrawerRef = ref(null);
// 让formRef变成响应式
const formRef = ref(null);
const onSubmit = () => {
    formRef.value.validate((valid) => {
        if (!valid) {
            return false;
        }
        formDrawerRef.value.showLoading();
        updatepassword(form)
            .then((res) => {
                toast("修改密码成功，请重新登录");
                store.dispatch("logout");
                // 跳转回登录页
                router.push("/login");
            })
            .finally(() => {
                formDrawerRef.value.hideLoading();
            });
    });
};

// 刷新
const handleRefresh = () => location.reload();

const handleCommand = (c) => {
    switch (c) {
        case "logout":
            handleLogout();
            break;
        case "rePassword":
            // 修改密码
            // showDrawer.value = true;
            formDrawerRef.value.open();
            break;
        default:
            break;
    }
};

function handleLogout() {
    showModal("是否要退出登录?").then((res) => {
        // console.log("退出登录");
        logout().finally(() => {
            // 不管成功，都要到这
            store.dispatch("logout");
            // 跳转回登录
            router.push("/login");
            // 提示退出成功
            toast("退出成功");
        });
    });
}
</script>

<style scoped>
.f-header {
    @apply flex bg-indigo-700 text-light-50 fixed top-0 left-0 right-0 items-center;
    height: 64px;
}
.logo {
    width: 250px;
    @apply flex justify-center items-center text-xl font-thin;
}
.icon-btn {
    @apply flex justify-center items-center;
    width: 42px;
    height: 64px;
    cursor: pointer;
}
.icon-btn:hover {
    @apply bg-indigo-600;
}

.f-header .dropdown {
    height: 64px;
    cursor: pointer;
    @apply flex justify-center items-center mx-5;
}
</style>
