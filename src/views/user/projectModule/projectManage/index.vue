<template>
  <div
    ref="mainRef"
    class="tw-w-full tw-h-full tw-p-[20px]">
    <div ref="headerRef">
      <el-title title="项目管理"></el-title>
      <div class="tw-w-full tw-mt-[10px]">
        <el-form :model="formData">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="项目状态">
                <el-select
                  v-model="formData.status"
                  style="width: 100%">
                  <el-option
                    label="立项"
                    value="0">
                  </el-option>
                  <el-option
                    label="送审"
                    value="1">
                  </el-option>
                  <el-option
                    label="审批完成"
                    value="2">
                  </el-option>
                  <el-option
                    label="项目进行"
                    value="3">
                  </el-option>
                  <el-option
                    label="项目验收"
                    value="4">
                  </el-option>
                  <el-option
                    label="项目完结"
                    value="5">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="审批状态">
                <el-select
                  v-model="formData.approveResult"
                  style="width: 100%">
                  <el-option
                    label="审批中"
                    value="0">
                  </el-option>
                  <el-option
                    label="审批成功"
                    value="1">
                  </el-option>
                  <el-option
                    label="审批失败"
                    value="-1">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button
                type="primary"
                @click="onSearch">
                查询
              </el-button>
              <el-button
                v-if="isLeader"
                type="primary"
                @click="onAdd">
                申报
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
            type="primary"
            link
            @click="projectInfo(row)">
            详情
          </el-button>
          <!-- <el-button
            v-if="row.status == 0 && row.approveResult !== -1"
            type="success"
            link
            @click="editProject(row)">
            编辑
          </el-button>
          <el-button
            v-if="row.status === 0 && row.approveResult !== -1"
            type="primary"
            link
            @click="sendAdmin(row, '1')">
            送审
          </el-button>
          <el-button
            v-if="row.status === 2"
            type="warning"
            link
            @click="sendAdmin(row, '2')">
            开工
          </el-button>
          <el-button
            v-if="row.status === 3"
            type="danger"
            link
            @click="sendAdmin(row, '3')">
            完工
          </el-button>
          <el-button
            v-if="row.approveResult === -1"
            type="danger"
            link
            @click="reStartSubmit(row)">
            重新审批
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <el-pagination
        v-model:currentPage="pagination.currentPage"
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
  <reset-start
    v-model="isReStart"
    :dialog-data="dialogData"
    @on-reload="onReload">
  </reset-start>
</template>

<script setup>
  import elTitle from '@/components/title/index.vue'
  import Dialog from './components/collection-dialog.vue'
  import SendAdminApply from './components/send-admin-apply.vue'
  import ResetStart from './components/reset-start.vue'
  import * as apis from '@/apis/index'
  import { computed, onMounted, ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import { useElementSize } from '@vueuse/core'
  import { usePagination, projectStatus, approveStatus } from '@/utils/hooks'
  import { useUserStore } from '@/stores/user'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const { pagination, indexMethod } = usePagination()
  const UserInfo = useUserStore()
  const tableData = ref([])
  const formData = ref({
    status: '',
    approveResult: ''
  })
  const isLeader = computed(() => {
    return (
      UserInfo.userInfo.role.roleName === '超级管理员' ||
      UserInfo.userInfo.role.roleName === '项目经理'
    )
  })
  const mainRef = ref(null)
  const headerRef = ref(null)
  const { height: mainHeight } = useElementSize(mainRef)
  const { height: headerHeight } = useElementSize(headerRef)

  // dialog开关
  const isShow = ref(false)
  const isSend = ref(false)
  const isReStart = ref(false)
  const dialogData = ref(null)
  const projectNextStatus = ref('')
  // 页面大小发生变化
  const onSizeChange = () => {
    onSearch()
  }
  // 当前页发生变化
  const onCurrentChange = () => {
    onSearch()
  }
  onMounted(() => {
    onSearch()
  })
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
  const onAdd = () => {
    dialogData.value = null
    isShow.value = true
  }
  // // 编辑
  // const editProject = (row) => {
  //   dialogData.value = { ...row }
  //   isShow.value = true
  // }
  const onReload = () => {
    dialogData.value = null
    onSearch()
  }
  // 详情
  const projectInfo = (row) => {
    router.push({
      path: '/projectDetail',
      query: {
        projectId: row.id
      }
    })
  }
  // const sendAdmin = (row, nextStatus) => {
  //   projectNextStatus.value = nextStatus
  //   dialogData.value = { ...row }
  //   isSend.value = true
  // }
  // const reStartSubmit = (row) => {
  //   dialogData.value = { ...row }
  //   isReStart.value = true
  // }
</script>

<style lang="scss" scoped>
  .footer {
    display: flex;
    width: 100%;
    margin-top: 16px;
  }
</style>
