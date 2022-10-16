<template>
    <div>后台首页</div>
    <el-button @click="set" type="primary">设置</el-button>
    <el-button @click="get" type="success">读取</el-button>
    <el-button @click="remove" type="danger">删除</el-button>
</template>

<script setup>
import { useCookies } from "@vueuse/integrations/useCookies";

const cookie = useCookies();

function set() {
    cookie.set("admin-token", "123456");
}

function get() {
    cookie.get("admin-token");
}

function remove() {
    cookie.remove("admin-token");
}
</script>
