<template>
  <el-dialog
    v-model="$show"
    width="550px"
    @close="onClose"
    @open="onOpen">
    <template #header>
      <p class="tw-font-[600] tw-text-[18px]">{{ isReStart ? '重新发起' : '资金申请' }}</p>
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
        prop="applyUser"
        label="申请人:">
        <el-input
          v-model="formData.applyUser"
          placeholder="请输入申请人">
        </el-input>
      </el-form-item>
      <el-form-item
        prop="fee"
        label="资金费用:">
        <el-input
          v-model="formData.fee"
          placeholder="请输入资金费用">
        </el-input>
      </el-form-item>
      <el-form-item
        prop="applyUse"
        label="资金用途:">
        <el-input
          v-model="formData.applyUse"
          placeholder="请输入任务信息描述"
          :rows="4"
          :maxlength="50"
          show-word-limit
          type="textarea">
        </el-input>
      </el-form-item>
      <el-form-item
        prop="fileList"
        label="发票:">
        <el-upload
          v-model:file-list="formData.fileList"
          :action="apis.uploadUrl"
          multiple
          :limit="2"
          :on-exceed="handleExceed"
          :on-success="handleSuccess">
          <el-button
            type="primary"
            style="width: 200px">
            点击上传
          </el-button>
        </el-upload>
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
      default: () => {}
    },
    moneyId: {
      type: String,
      default: () => ''
    }
  })
  const emit = defineEmits(['update:modelValue', 'onReload'])
  const { modelValue, moneyId, dialogData } = toRefs(props)
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
  const handleExceed = () => {
    ElMessage.error('超出文件上传限制！')
  }
  const handleSuccess = (file, files, fileList) => {
    formData.value.fileId = file.id
    if (fileList.length > 1) {
      fileList.splice(0, 1)
    }
  }
  const isReStart = computed(() => {
    return dialogData.value ? true : false
  })
  const formData = ref({
    // 资金Id
    capitalId: '',
    // 资金费用
    fee: '',
    // 资金用途
    applyUse: '',
    fileList: [],
    // 发票
    fileId: '',
    applyUser: ''
  })
  // 必填项
  const rules = reactive({
    fee: [{ required: true, message: '请填写资金费用', trigger: 'change' }],
    applyUse: [{ required: true, message: '请填写资金用途', trigger: 'change' }],
    fileList: [{ required: true, message: '请上传发票', trigger: 'change' }],
    applyUser: [{ required: true, message: '请填写申请人', trigger: 'change' }]
  })
  const onOpen = () => {
    formData.value.capitalId = moneyId.value
  }
  const onClose = () => {
    formRef.value.resetFields()
    formData.value.fileList = []
    formData.value.capitalId = ''
    formData.value.fileId = ''
  }
  const firstSubmit = () => {
    apis
      .userApply({ ...formData.value, fileList: undefined })
      .then((res) => {
        if (res.data.code === 0) {
          ElMessage.success('申请成功')
          emit('onReload')
          $show.value = false
        } else {
          ElMessage.error(res.error)
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        btnLoading.value = false
      })
  }
  const reStartSubmit = () => {
    apis
      .reStartSubmit({ ...formData.value, id: dialogData.value.id })
      .then((res) => {
        if (res.data.code === 0) {
          ElMessage.success('申请成功')
          emit('onReload')
          $show.value = false
        } else {
          ElMessage.error(res.error)
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        btnLoading.value = false
      })
  }
  // 提交
  const onConfirm = () => {
    formRef.value.validate((valid, fields) => {
      if (valid) {
        // btnLoading.value = true
        if (isReStart.value) {
          reStartSubmit()
        } else {
          firstSubmit()
        }
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
