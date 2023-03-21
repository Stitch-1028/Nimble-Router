import { reactive, computed } from 'vue'
import { Router } from 'vue-router'

/**
 * 分页对象及indexMethod
 * @returns
 */
export const usePagination = () => {
  // 分页对象
  const pagination = reactive({
    pageSize: 10,
    pageNumber: 1,
    total: 0
  })
  // 序号函数
  const indexMethod = (index: number) => {
    return (pagination.pageNumber - 1) * pagination.pageSize + index + 1
  }

  const paginationReset = (pageSize = 10) => {
    pagination.pageNumber = 1
    pagination.pageSize = pageSize
    pagination.total = 0
  }

  return {
    pagination,
    indexMethod,
    paginationReset
  }
}

/**
 * 模拟表格数据
 * @param {*} obj
 * @param {*} count
 * @returns
 */
export const useMockTableData = (obj = {}, count = 10, pagination: paginationType) => {
  const tableData = reactive<Array<unknown>>([])

  for (let index = 0; index < count; index++) {
    tableData.push({
      id: index,
      ...obj,
      status: Math.floor(Math.random() * 3),
      tag: Math.floor(Math.random() * 3).toString()
    })
  }
  // 覆盖总条数
  pagination.total = count
  return tableData
}

/**
 * 后退
 */
export const onBack = (router: Router) => {
  window.history.length > 1 ? router.go(-1) : router.replace('/')
}
// 项目状态
export const projectStatus = computed(() => {
  return (val: number) => {
    return (
      {
        0: {
          type: '',
          status: '立项'
        },
        1: {
          type: 'success',
          status: '送审'
        },
        2: {
          type: 'success',
          status: '审批完成'
        },
        3: {
          type: 'success',
          status: '项目进行'
        },
        4: {
          type: 'warning',
          status: '项目验收'
        },
        5: {
          type: 'success',
          status: '项目完结'
        }
      }[val] || { type: 'danger', status: '项目异常' }
    )
  }
})
// 审批状态
export const approveStatus = computed(() => {
  return (val: number) => {
    return (
      {
        0: {
          type: '',
          status: '审批中'
        },
        1: {
          type: 'success',
          status: '审批成功'
        },
        [-1]: {
          type: '',
          status: '审批失败'
        }
      }[val] || { type: 'danger', status: '审批异常' }
    )
  }
})
