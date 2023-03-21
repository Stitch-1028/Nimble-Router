<template>
  <div
    ref="mainRef"
    class="tw-w-full tw-h-full tw-p-[20px]">
    <div ref="headerRef">
      <el-title title="资金管理"></el-title>
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
        prop="budgetCost"
        label="项目预算(元)">
      </el-table-column>
      <el-table-column
        prop="actualCost"
        label="实际花费">
      </el-table-column>
      <el-table-column
        prop="approveResult"
        label="审批状态">
        <template #default="{ row }">
          <el-tag :type="approveStatus(row.approveResult).status.type">
            {{ approveStatus(row.approveResult).status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        label="资金Id">
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            link
            type="primary"
            @click="application(row)">
            详情
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
        @current-change="onSearch">
      </el-pagination>
    </div>
  </div>
</template>

<script setup>
  import elTitle from '@/components/title/index.vue'
  import { usePagination, approveStatus } from '@/utils/hooks'
  import * as apis from '@/apis/index'
  import { onMounted, ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import { useElementSize } from '@vueuse/core'
  import router from '@/router'
  const { pagination, indexMethod } = usePagination()
  const tableData = ref([])

  const mainRef = ref(null)
  const headerRef = ref(null)
  const { height: mainHeight } = useElementSize(mainRef)
  const { height: headerHeight } = useElementSize(headerRef)

  onMounted(() => {
    onSearch()
  })
  // 页面大小发生变化
  const onSizeChange = () => {
    pagination.pageNumber = 1
    onSearch()
  }

  const onSearch = () => {
    apis
      .getCapitalList({ ...pagination })
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
  const application = (row) => {
    router.push({
      path: '/moneyDetail',
      query: {
        moneyId: row.id
      }
    })
  }
</script>

<style lang="scss" scoped>
  .footer {
    display: flex;
    width: 100%;
    margin-top: 16px;
  }
</style>
