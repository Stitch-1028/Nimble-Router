<template>
  <div class="main_page">
    <div class="header">
      <DArrowLeft
        style="width: 30px; height: 30px; cursor: pointer"
        title="资金详情"
        @click="back">
      </DArrowLeft>
      <Title title="资金详情"></Title>
    </div>
    <div class="detail">
      <h2>资金详情</h2>
      <el-button
        type="primary"
        @click="onAdd">
        资金申报
      </el-button>
    </div>
    <main class="main">
      <el-descriptions
        class="margin-top"
        :column="3"
        size="large"
        border>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon><User></User></el-icon>
              项目名称
            </div>
          </template>
          {{ capitalDetail?.capitalResp?.projectName || '' }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon><PieChart></PieChart></el-icon>
              项目Id
            </div>
          </template>
          {{ capitalDetail?.capitalResp?.projectId || '' }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon><PieChart></PieChart></el-icon>
              项目预算
            </div>
          </template>
          {{ capitalDetail?.capitalResp?.budgetCost || '' }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon><PieChart></PieChart></el-icon>
              实际花费
            </div>
          </template>
          {{ capitalDetail?.capitalResp?.actualCost || '' }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon><Iphone></Iphone></el-icon>
              审批状态
            </div>
          </template>
          {{ capitalDetail?.capitalResp?.approveResult || '' }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon><User></User></el-icon>审批人
            </div>
          </template>
          {{ capitalDetail?.capitalResp?.approver || '' }}
        </el-descriptions-item>
      </el-descriptions>
    </main>
    <h2>申请明细</h2>
    <footer class="footer">
      <el-table
        :data="capitalDetail?.detailPage?.records || []"
        border
        header-cell-class-name="my-el-table-header-cell-name">
        <el-table-column
          prop="id"
          label="资金Id">
        </el-table-column>
        <el-table-column
          prop="fee"
          label="资金费用">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="申请时间">
        </el-table-column>
        <el-table-column label="申请结果">
          <template #default="{ row }">
            <el-tag
              :type="
                row.approveResult === 1 ? 'success' : row.approveResult === 0 ? 'warning' : 'danger'
              ">
              {{
                row.approveResult === 1
                  ? '审批成功'
                  : row.approveResult === 0
                  ? '审批中'
                  : '审批失败'
              }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="approveDescription"
          label="申请说明">
        </el-table-column>
        <el-table-column
          prop="applyUse"
          label="申请用途">
        </el-table-column>
        <!-- <el-table-column
          prop="status"
          label="资金状态">
        </el-table-column> -->
        <el-table-column
          prop="approveTime"
          label="批准时间">
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button
              v-if="row.approveResult === 2"
              link
              type="danger"
              @click="reStart(row)">
              重新申请
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </footer>
  </div>
  <money-dialog
    v-model="show"
    :money-id="capitalDetail?.capitalResp?.id || ''"
    :dialog-data="dialogData"
    @on-reload="getCapitalDetail">
  </money-dialog>
</template>

<script setup>
  import Title from '@/components/title/index.vue'
  import MoneyDialog from './components/money-dialog.vue'
  import { ElMessage } from 'element-plus'
  import * as apis from '@/apis/index'
  import { useRoute } from 'vue-router'
  import { useRouter } from 'vue-router'
  import { onMounted, ref } from 'vue'
  const route = useRoute()
  const router = useRouter()
  const show = ref(false)
  const dialogData = ref({})
  // 返回项目列表页
  const back = () => {
    router.back()
  }
  onMounted(() => {
    getCapitalDetail()
  })
  const capitalDetail = ref({})
  // 获取项目详情
  const getCapitalDetail = () => {
    apis
      .getCapitalDetail(route.query.moneyId)
      .then((res) => {
        if (res.data.code === 0) {
          capitalDetail.value = res.data.data
        } else {
          ElMessage.error(res.data.msg)
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {})
  }
  const onAdd = () => {
    dialogData.value = null
    show.value = true
  }
  const reStart = (row) => {
    dialogData.value = { ...row }
    show.value = true
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
  :deep(.el-descriptions__cell) {
    width: 12.5%;
  }
</style>
