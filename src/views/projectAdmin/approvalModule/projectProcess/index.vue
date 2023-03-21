<template>
  <div
    ref="mainRef"
    class="tw-w-full tw-h-full tw-p-[20px]">
    <div ref="headerRef">
      <el-title title="项目审批"></el-title>
      <div class="tw-w-full tw-mt-[10px]">
        <el-form :model="formData">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="项目名称">
                <el-input
                  v-model="formData.projectName"
                  style="width: 100%">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button
                type="primary"
                @click="onSearch">
                查询
              </el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <el-table
      style="width: 100%; margin-top: 8px"
      :height="mainHeight - headerHeight - 40"
      :data="tableData"
      row-class-name="my-el-table-stripe-row-name"
      header-cell-class-name="my-el-table-header-cell-name"
      stripe>
      <el-table-column
        label="序号"
        type="index"
        :index="indexMethod"
        width="100px">
      </el-table-column>
      <el-table-column
        prop="projectName"
        label="项目名称">
      </el-table-column>
      <el-table-column
        prop="manger"
        label="负责人">
      </el-table-column>
      <el-table-column
        prop="taskType"
        label="项目状态">
        <template #default="{ row }">
          <el-tag :type="projectStatus(row.status).status.type">
            {{ projectStatus(row.status).status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="taskInfo"
        label="审批状态">
        <template #default="{ row }">
          <el-tag :type="approveStatus(row.approveResult).status.type">
            {{ approveStatus(row.approveResult).status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="approveTime"
        label="审批时间">
      </el-table-column>
      <el-table-column
        prop="approver"
        label="审批人">
      </el-table-column>
      <el-table-column
        label="操作"
        width="250">
        <template #default="{ row }">
          <el-button
            v-if="row.status === 1"
            link
            type="primary"
            @click="sendResolve(row)">
            立项通过
          </el-button>
          <el-button
            v-if="row.status === 1"
            link
            type="danger"
            @click="sendReject(row)">
            立项驳回
          </el-button>
          <el-button
            v-if="row.status === 4"
            link
            type="danger"
            @click="sendAdmin(row, '5')">
            项目验收
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <el-pagination
        v-model:currentPage="pagination.pageNumber"
        v-model:page-size="pagination.pageSize"
        :total="pagination.total"
        :page-sizes="[10, 20, 40, 60]"
        large
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="onSizeChange"
        @current-change="onCurrentChange">
      </el-pagination>
    </div>
  </div>
  <Dialog
    v-model="isShow"
    :dialog-data="dialogData"
    @on-reload="onReload">
  </Dialog>
  <send-admin-apply
    v-model="isSend"
    :dialog-data="dialogData"
    :status="projectNextStatus"
    @on-reload="onReload">
  </send-admin-apply>
</template>

<script setup>
  import elTitle from '@/components/title/index.vue'
  import Dialog from './components/collection-dialog.vue'
  import SendAdminApply from './components/send-admin-apply.vue'
  import * as apis from '@/apis/index'
  import { ref, onMounted } from 'vue'
  import { ElMessage } from 'element-plus'
  import { useElementSize } from '@vueuse/core'
  import { usePagination, projectStatus, approveStatus } from '@/utils/hooks'
  const { pagination, indexMethod } = usePagination()
  const tableData = ref([])
  const formData = ref({
    projectName: ''
  })
  const dialogData = ref({})
  const mainRef = ref(null)
  const headerRef = ref(null)
  const { height: mainHeight } = useElementSize(mainRef)
  const { height: headerHeight } = useElementSize(headerRef)

  const isSend = ref(false)
  const projectNextStatus = ref('')

  // dialog开关
  const isShow = ref(false)
  onMounted(() => {
    onSearch()
  })
  // 页面大小发生变化
  const onSizeChange = () => {
    onSearch()
  }
  // 当前页发生变化
  const onCurrentChange = () => {
    onSearch()
  }

  const onSearch = () => {
    apis
      .getProjectList({ ...formData.value, ...pagination })
      .then((res) => {
        if (res.data.code === 0) {
          const { records } = res.data.data
          tableData.value = records
        } else {
          ElMessage.error(res.data.msg)
        }
      })
      .catch((err) => console.log(err))
  }
  const sendResolve = (row) => {
    dialogData.value = { ...row, isPass: true }
    isShow.value = true
  }
  const sendReject = (row) => {
    dialogData.value = { ...row, isPass: false }
    isShow.value = true
  }
  const onReload = () => {
    onSearch()
  }
  const sendAdmin = (row, nextStatus) => {
    projectNextStatus.value = nextStatus
    dialogData.value = { ...row }
    isSend.value = true
  }
</script>

<style lang="scss" scoped>
  .footer {
    display: flex;
    width: 100%;
    margin-top: 16px;
  }
</style>
