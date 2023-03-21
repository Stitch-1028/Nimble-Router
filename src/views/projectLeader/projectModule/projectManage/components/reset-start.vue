<template>
  <el-dialog
    v-model="$show"
    width="550px"
    @close="onClose"
    @open="onOpen">
    <template #header>
      <p class="tw-font-[600] tw-text-[18px]"> 重新申请 </p>
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
        prop="content"
        label="申请说明:">
        <el-input
          v-model="formData.content"
          type="textarea"
          rows="4"
          placeholder="请输入项目内容">
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
  const $show = computed({
    get() {
      return modelValue.value
    },
    set(val) {
      emit('update:modelValue', val)
    }
  })
  const emit = defineEmits(['update:modelValue', 'onReload'])
  const { modelValue, dialogData } = toRefs(props)

  const btnLoading = ref(false)
  const formRef = ref(null)
  const formData = ref({
    // 描述记录
    content: ''
  })
  // 必填项
  const rules = reactive({
    content: [{ required: true, message: '请填写申请说明', trigger: 'change' }]
  })
  const onOpen = () => {
    formData.value.projectId = dialogData.value.id
  }
  const onClose = () => {
    formRef.value.resetFields()
    formData.value.projectId = null
  }
  const onConfirm = () => {
    console.log({ ...formData.value, projectId: dialogData.value.id })
    formRef.value.validate((valid, fields) => {
      if (valid) {
        btnLoading.value = true
        apis
          .reRoadSubmit({ ...formData.value })
          .then((res) => {
            if (res.data.code === 0) {
              ElMessage.success(`提交成功`)
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

<style lang="scss" scoped></style>
