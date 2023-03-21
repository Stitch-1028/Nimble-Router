<template>
  <el-dialog
    v-model="$show"
    width="550px"
    @close="onClose"
    @open="onOpen">
    <template #header>
      <p class="tw-font-[600] tw-text-[18px]">人物信息</p>
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
        prop="roleId"
        label="角色职位:">
        <el-select v-model="formData.roleId">
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.roleName"
            :value="item.id">
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
    dialogData: {
      type: Object,
      default: () => {}
    }
  })
  const emit = defineEmits(['update:modelValue', 'onReload'])
  const { modelValue, dialogData } = toRefs(props)
  const $show = computed({
    get() {
      return modelValue.value
    },
    set(val) {
      emit('update:modelValue', val)
    }
  })
  const btnLoading = ref(false)
  const formRef = ref(null)
  const roleList = ref([])
  const formData = ref({
    roleId: '',
    id: ''
  })
  onMounted(() => {
    getRoleList()
  })
  // 必填项
  const rules = reactive({
    proName: [{ required: true, message: '请填写项目名称', trigger: 'change' }]
  })
  const onOpen = () => {
    formData.value = dialogData.value
  }
  const onClose = () => {
    formRef.value.resetFields()
  }
  // 获取职位
  const getRoleList = () => {
    apis.getRoleList().then((res) => {
      if (res.data.code === 0) {
        const { records } = res.data.data
        roleList.value = records
      } else {
        ElMessage.error(res.data.msg)
      }
    })
  }
  // 提交
  const onConfirm = () => {
    formRef.value.validate((valid, fields) => {
      if (valid) {
        btnLoading.value = true
        apis
          .updateRole({
            userId: formData.value.id,
            roleId: formData.value.roleId
          })
          .then((res) => {
            if (res.data.code === 0) {
              ElMessage.success('修改成功')
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
</script>

<style lang="scss" scoped>
  :deep(.el-upload-list) {
    height: 35px;
    overflow: hidden;
  }
</style>
