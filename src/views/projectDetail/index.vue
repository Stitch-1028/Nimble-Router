<template>
  <div class="main_page">
    <div class="header">
      <DArrowLeft
        style="width: 30px; height: 30px; cursor: pointer"
        @click="back">
      </DArrowLeft>
      <Title title="项目详情"></Title>
    </div>
    <div class="detail">
      <h2>项目详情</h2>
      <div>
        <el-button
          v-if="userInfo.getUserRole !== '普通员工'"
          type="primary"
          @click="show = true">
          添加成员
        </el-button>
      </div>
    </div>
    <main class="main">
      <el-descriptions
        class="margin-top"
        :column="4"
        size="large"
        border>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon><User></User></el-icon>
              项目名称
            </div>
          </template>
          {{ projectDetail?.urbanProject?.projectName || '' }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon><PieChart></PieChart></el-icon>
              预计时间
            </div>
          </template>
          {{ projectDetail?.urbanProject?.budgetTime || '' }} 个月
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon><PieChart></PieChart></el-icon>
              实际时间
            </div>
          </template>
          {{ projectDetail?.urbanProject?.actualTime || '' }} 个月
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon><PieChart></PieChart></el-icon>
              开工时间
            </div>
          </template>
          {{ projectDetail?.urbanProject?.startTime || '未开工' }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon><Iphone></Iphone></el-icon>
              项目状态
            </div>
          </template>
          <el-tag
            size="large"
            :type="projectStatus(projectDetail?.urbanProject?.status).type">
            {{ projectStatus(projectDetail?.urbanProject?.status).status || '' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon><User></User></el-icon>审批人
            </div>
          </template>
          {{ projectDetail?.urbanProject?.approver || '' }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon><User></User></el-icon>
              负责人
            </div>
          </template>
          {{ projectDetail?.urbanProject?.manger || '' }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon><User></User></el-icon>
              审批时间
            </div>
          </template>
          {{ projectDetail?.urbanProject?.approveTime || '' }}
        </el-descriptions-item>
      </el-descriptions>
    </main>
    <div>
      <h2>项目成员</h2>
      <main class="main">
        <el-descriptions
          class="margin-top"
          :column="3"
          size="large"
          border>
          <el-descriptions-item
            v-for="item in projectDetail?.users"
            :key="item.id">
            <template #label>
              <div class="cell-item">
                <el-icon><User></User></el-icon>
                {{ item.position }}
              </div>
            </template>
            <div style="width: 100%; display: flex; justify-content: space-between">
              <span>{{ item.realName }}</span>
              <el-button
                v-if="userInfo.getUserRole !== '普通员工'"
                type="danger"
                @click="remove(item)">
                删除
              </el-button>
            </div>
          </el-descriptions-item>
        </el-descriptions>
      </main>
    </div>
    <h2>审批流程</h2>
    <footer class="footer">
      <el-table
        :data="projectDetail.records"
        border
        header-cell-class-name="my-el-table-header-cell-name">
        <el-table-column
          prop="projectId"
          label="项目id">
        </el-table-column>
        <el-table-column
          prop="statusDescription"
          label="记录名称">
        </el-table-column>
        <el-table-column
          prop="status"
          label="项目状态">
          <template #default="{ row }">
            <el-tag :type="projectStatus(row.status).status.type">
              {{ projectStatus(row.status).status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="content"
          label="备注">
        </el-table-column>
      </el-table>
    </footer>
  </div>
  <people-dialog
    v-model="show"
    :project-id="projectDetail?.urbanProject?.id || ''"
    @on-reload="getProjectDetail">
  </people-dialog>
</template>

<script setup>
  import Title from '@/components/title/index.vue'
  import PeopleDialog from './components/people-dialog.vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { projectStatus } from '@/utils/hooks'
  import * as apis from '@/apis/index'
  import { useRoute } from 'vue-router'
  import { useRouter } from 'vue-router'
  import { onMounted, ref } from 'vue'
  import { useUserStore } from '@/stores/user'
  const route = useRoute()
  const router = useRouter()
  const show = ref(false)
  const userList = ref([])
  const userInfo = useUserStore()
  // 返回项目列表页
  const back = () => {
    router.back()
  }
  onMounted(() => {
    getProjectDetail()
  })
  const projectDetail = ref({})
  // 获取项目详情
  const getProjectDetail = () => {
    apis
      .getProjectDetail(route.query.projectId)
      .then((res) => {
        if (res.data.code === 0) {
          projectDetail.value = res.data.data
          userList.value = res.data.data.users
        } else {
          ElMessage.error(res.data.msg)
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {})
  }
  const remove = (data) => {
    ElMessageBox({
      title: '删除!',
      message: '是否删除该员工?',
      showCancelButton: true,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      beforeClose: (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true
          instance.confirmButtonText = 'Loading...'
          apis
            .removePeople({ projectId: data.projectId, userId: data.userId })
            .then((res) => {
              if (res.data.code === 0) {
                ElMessage.success('删除成功')
                getProjectDetail()
                done()
              }
            })
            .catch((err) => console.log(err))
            .finally(() => {
              instance.confirmButtonLoading = false
            })
        }
      }
    })
  }
</script>

<style lang="scss" scoped>
  .main_page {
    width: 100%;
    height: 100%;
    padding: 20px;
    .header {
      width: 150px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .detail {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
    }
    .main {
      margin-top: 20px;
    }
    .footer {
      margin-top: 20px;
    }
  }
  h2 {
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
  }
</style>
