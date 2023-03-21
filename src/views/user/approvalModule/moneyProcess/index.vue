<template>
  <div
    ref="mainRef"
    class="tw-w-full tw-h-full tw-p-[20px]">
    <el-title
      ref="headerRef"
      title="资金审批">
    </el-title>
    <el-table
      style="width: 100%; margin-top: 8px"
      :height="mainHeight - headerHeight - 100"
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
        prop="capitalId"
        show-overflow-tooltip
        label="资金Id">
      </el-table-column>
      <el-table-column
        prop="fee"
        label="费用">
      </el-table-column>
      <el-table-column
        prop="applyUser"
        label="申请用户">
      </el-table-column>
      <el-table-column
        prop="applyUse"
        label="用途">
      </el-table-column>
      <el-table-column
        prop="projectName"
        label="项目名称">
      </el-table-column>
      <el-table-column
        prop="approveTime"
        label="审批时间">
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            v-if="row.status === 0"
            type="success"
            link
            @click="resolve(row)">
            通过
          </el-button>
          <el-button
            v-if="row.status === 0"
            link
            type="danger"
            @click="reject(row)">
            驳回
          </el-button>
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
  <money-dialog
    v-model="isShow"
    :dialog-data="dialogData"
    @on-reload="onSearch">
  </money-dialog>
</template>

<script setup>
  import elTitle from '@/components/title/index.vue'
  import moneyDialog from './components/money-dialog.vue'
  import * as apis from '@/apis/index'
  import { onMounted, ref } from 'vue'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import { useElementSize } from '@vueuse/core'
  import { usePagination } from '@/utils/hooks'
  const { pagination, indexMethod } = usePagination()
  const tableData = ref([])
  const isShow = ref(false)
  const mainRef = ref(null)
  const headerRef = ref(null)
  const { height: mainHeight } = useElementSize(mainRef)
  const { height: headerHeight } = useElementSize(headerRef)
  const dialogData = ref({})
  // 页面大小发生变化
  const onSizeChange = () => {
    pagination.pageNumber = 1
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
      .getCapitalDetailList({ ...pagination })
      .then((res) => {
        if (res.data.code === 0) {
          const { records, total } = res.data.data
          tableData.value = records
          pagination.total = total
        }
      })
      .catch((err) => console.log(err))
  }

  const resolve = (row) => {
    dialogData.value = { ...row, isPass: true }
    isShow.value = true
  }

  const reject = (row) => {
    dialogData.value = { ...row, isPass: false }
    isShow.value = true
  }
</script>

<style lang="scss" scoped>
  .footer {
    display: flex;
    width: 100%;
    margin-top: 16px;
  }
</style>
