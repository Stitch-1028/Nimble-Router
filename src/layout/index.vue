<template>
  <div>
    Layout
    <router-view></router-view>
    <el-button
      type="primary"
      @click="addRouter"
      >添加路由</el-button
    >
    <el-button
      type="primary"
      @click="pushRouter"
      >跳转路由</el-button
    >
    <el-input></el-input>
  </div>
</template>

<script setup lang="ts">
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { onMounted } from 'vue'
  import { useRoute, useRouter, RouteRecordRaw } from 'vue-router'
  const route = useRoute()
  const router = useRouter()
  onMounted(() => {
    console.log(router.getRoutes())
  })
  const newRouter = {
    path: '/newAdmin',
    component: () => import('@/views/newAdmin/index.vue'),
    redirect: '/newAdmin/header',
    children: [
      {
        path: 'header',
        component: () => import('@/views/newAdmin/components/header/index.vue')
      }
    ]
  }

  const addRouter = () => {
    console.log(router.getRoutes())
    router.addRoute(newRouter)
    console.log(router.getRoutes())
  }
  const pushRouter = () => {
    router.push('/newAdmin/header')
  }
</script>

<style scoped></style>
