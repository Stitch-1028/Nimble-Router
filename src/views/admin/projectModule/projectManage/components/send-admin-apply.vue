<template>
  <el-dialog
    v-model="$show"
    width="550px"
    @close="onClose"
    @open="onOpen">
    <template #header>
      <p class="tw-font-[600] tw-text-[18px]">
        {{ status === '1' ? '送审' : status === '2' ? '开工' : '完结' }}
      </p>
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
        label="记录内容:">
        <el-input
          v-model="formData.content"
          type="textarea"
          rows="4"
          placeholder="请输入项目内容">
        </el-input>
      </el-form-item>
      <el-form-item
        prop="fileList"
        label="附件:">
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
      default: null
    },
    status: {
      type: String,
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
  const { modelValue, dialogData, status } = toRefs(props)

  const handleExceed = () => {
    ElMessage.error('超出文件上传限制！')
  }
  const handleSuccess = (file, files, fileList) => {
    formData.value.fileId = file.id
    console.log('fileList', fileList)
    if (fileList.length > 1) {
      fileList.splice(0, 1)
    }
  }

  const btnLoading = ref(false)
  const formRef = ref(null)
  const formData = ref({
    // 描述记录
    content: '',
    fileList: [],
    // 附件
    fileId: ''
  })
  // 必填项
  const rules = reactive({
    content: [{ required: true, message: '请填写描述记录', trigger: 'change' }]
  })
  const onOpen = () => {
    formData.value.projectId = dialogData.value.id
    formData.value.status = status.value
  }
  const onClose = () => {
    formRef.value.resetFields()
  }
  const onConfirm = () => {
    formRef.value.validate((valid, fields) => {
      if (valid) {
        btnLoading.value = true
        apis
          .changeStatus({ ...formData.value })
          .then((res) => {
            if (res.data.code === 0) {
              ElMessage.success(`${status.value === '1' ? '送审' : '开工'}成功`)
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
