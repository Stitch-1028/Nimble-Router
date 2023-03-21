<template>
  <el-dialog
    v-model="$show"
    width="550px"
    @close="onClose"
    @open="onOpen">
    <template #header>
      <p class="tw-font-[600] tw-text-[18px]">{{ dialogData.isPass ? '通过' : '驳回' }}</p>
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
        prop="approver"
        label="审批人:">
        <el-input
          v-model="formData.approver"
          placeholder="请输入批注">
        </el-input>
      </el-form-item>
      <el-form-item
        prop="content"
        label="批注内容:">
        <el-input
          v-model="formData.content"
          type="textarea"
          :rows="4"
          placeholder="请输入批注">
        </el-input>
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
  import { computed, ref, toRefs, reactive } from 'vue'
  import * as apis from '@/apis/index'

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    dialogData: {
      type: Object,
      default: null
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
  const formData = ref({
    content: '',
    approver: ''
  })
  // 必填项
  const rules = reactive({
    content: [{ required: true, message: '请填写批注内容', trigger: 'change' }],
    approver: [{ required: true, message: '请填写审批人', trigger: 'change' }]
  })
  const onClose = () => {
    formRef.value.resetFields()
  }
  // 提交
  const onConfirm = () => {
    formRef.value.validate((valid, fields) => {
      if (valid) {
        btnLoading.value = true
        apis
          .adminProjectApply({
            ...formData.value,
            approveResult: dialogData.value.isPass ? 1 : -1,
            projectId: dialogData.value.id
          })
          .then((res) => {
            if (res.data.code === 0) {
              ElMessage.success(`${dialogData.value.isPass ? '成功通过' : '成功驳回'}`)
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
