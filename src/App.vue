<template>
  <el-config-provider :locale="zhCn">
    <Header></Header>
    <div>我是傻逼</div>
    <el-button>123</el-button>
  </el-config-provider>
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
</script>

<style scoped></style>
