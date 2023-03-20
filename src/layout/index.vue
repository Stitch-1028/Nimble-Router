<template>
  <div>
    Layout
    <router-view></router-view>
    <el-button
      type="primary"
      @click="addRouter"
      >添加路由</el-button
    >
    <el-input></el-input>
  </div>
</template>

<script setup lang="ts">
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { useRoute, useRouter } from 'vue-router'
  const route = useRoute()
  const router = useRouter()

  const addRouter = () => {
    ElMessage.success('sss')
    ElMessageBox({
      title: '陈慧云要买房子',
      message: '房子要写我的名字',
      showConfirmButton: true,
      showCancelButton: true
    })
    console.log(123)
    // router.addRoute([])
  }
</script>

<style scoped></style>
