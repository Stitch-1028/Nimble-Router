<template>
  <el-menu
    router
    :default-active="route.path"
    :ellipsis="false"
    class="menu">
    <el-menu-item index="/user/echarts">
      <el-icon>
        <img
          src="@/assets/image/layout-logo/icon_list.png"
          alt="" />
      </el-icon>
      数据统计
    </el-menu-item>
    <!-- <el-sub-menu index="1">
      <template #title>
        <el-icon>
          <img
            src="@/assets/image/layout-logo/icon_equipment.png"
            alt="" />
        </el-icon>
        <span>系统管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/admin/system/roleList">角色管理 </el-menu-item>
        <el-menu-item index="/admin/system/userInfoManage">用户管理 </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu> -->
    <el-sub-menu index="2">
      <template #title>
        <el-icon>
          <img
            src="@/assets/image/layout-logo/icon_project.png"
            alt="" />
        </el-icon>
        <span>项目模块</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/user/projectModule/projectManage">项目管理</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="5">
      <template #title>
        <el-icon>
          <img
            src="@/assets/image/layout-logo/icon_list.png"
            alt="" />
        </el-icon>
        <span>资金模块</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/user/moneyModule/moneyManage">资金管理</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <!-- <el-sub-menu index="6">
      <template #title>
        <el-icon>
          <img
            src="@/assets/image/layout-logo/icon_list.png"
            alt="" />
        </el-icon>
        <span>审批模块</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/admin/approvalModule/projectProcess">项目审批</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <el-menu-item index="/admin/approvalModule/moneyProcess">资金审批</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu> -->
  </el-menu>
</template>

<script setup>
  import { useRoute } from 'vue-router'
  const route = useRoute()
</script>

<style lang="scss" scoped>
  .menu {
    width: 200px;
    min-width: 200px;
    height: 100%;
    transition: all 1s;
    -webkit-transition: width 0.5s;
    -moz-transition: width 0.5s;
    -webkit-transition: width 0.5s;
    -o-transition: width 0.5s;
  }
</style>
