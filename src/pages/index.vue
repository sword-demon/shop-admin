<template>
    <div>后台首页</div>
    {{ $store.state.user.username }}
    <el-button type="primary" @click="handleLogout">退出登录</el-button>
</template>

<script setup>
import { showModel, toast } from "~/composables/util";
import { logout } from "~/api/manager";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();
function handleLogout() {
    showModel("是否要退出登录?").then((res) => {
        console.log("退出登录");
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
