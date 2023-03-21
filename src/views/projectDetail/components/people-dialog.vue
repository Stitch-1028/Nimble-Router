<template>
  <el-dialog
    v-model="$show"
    width="550px"
    @close="onClose"
    @open="onOpen">
    <template #header>
      <p class="tw-font-[600] tw-text-[18px]">添加成员</p>
    </template>
    <el-form
      ref="formRef"
      class="tw-ml-[20px] tw-pr-[40px]"
      :model="formData"
      :rules="rules"
      require-asterisk-position="right"
      label-width="150px"
      label-position="left">
      <el-form-item
        prop="userId"
        label="项目成员:">
        <el-select v-model="formData.userId">
          <el-option
            v-for="item in peopleList"
            :key="item.id"
            :label="item.realName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        prop="position"
        label="项目职位:">
        <el-select v-model="formData.position">
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.roleName"
            :disabled="item.roleName === '项目经理'"
            :value="item.roleName">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <!-- 底部按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$show = false">取消</el-button>
        <el-button
          type="primary"
          :loading="btnLoading"
          @click="onConfirm">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
  import { ElMessage } from 'element-plus'
  import { computed, ref, toRefs, reactive, onMounted } from 'vue'
  import * as apis from '@/apis/index'
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    projectId: {
      type: String,
      default: ''
    }
  })
  const $show = computed({
    get() {
      return modelValue.value
    },
    set(val) {
      emit('update:modelValue', val)
    }
  })
  const emit = defineEmits(['update:modelValue', 'onReload'])
  const { modelValue, projectId } = toRefs(props)

  const btnLoading = ref(false)
  const formRef = ref(null)
  const formData = ref({
    // 描述记录
    userId: '',
    projectId: '',
    position: ''
  })
  // 必填项
  const rules = reactive({
    userId: [{ required: true, message: '请选择成员', trigger: 'change' }],
    position: [{ required: true, message: '请选择项目职位', trigger: 'change' }]
  })
  onMounted(() => {
    getPeopleList()
    getRoleList()
  })
  const onOpen = () => {
    formData.value.projectId = projectId.value
  }
  const onClose = () => {
    formRef.value.resetFields()
  }
  const onConfirm = () => {
    formRef.value.validate((valid, fields) => {
      if (valid) {
        btnLoading.value = true
        apis
          .createUser({ ...formData.value })
          .then((res) => {
            if (res.data.code === 0) {
              ElMessage.success('添加成功')
              emit('onReload')
              $show.value = false
            }
          })
          .catch((err) => console.log(err))
          .finally(() => {
            btnLoading.value = false
          })
      } else {
        console.log('error submit!', fields)
      }
    })
  }
  const peopleList = ref([])
  const roleList = ref([])
  // 获取成员列表
  const getPeopleList = () => {
    apis.getPeopleFindAll({ position: 2 }).then((res) => {
      if (res.data.code === 0) {
        peopleList.value = res.data.data
      } else {
        ElMessage.error(res.data.msg)
      }
    })
  }
  // 获取职位列表
  const getRoleList = () => {
    apis.getAllRole().then((res) => {
      if (res.data.code === 0) {
        roleList.value = res.data.data
      } else {
        ElMessage.error(res.data.msg)
      }
    })
  }
</script>

<style lang="scss" scoped></style>
