<template>
  <el-dialog
    v-model="$show"
    width="550px"
    @close="onClose"
    @open="onOpen">
    <template #header>
      <p class="tw-font-[600] tw-text-[18px]">项目申报</p>
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
        prop="projectName"
        label="项目名称:">
        <el-input
          v-model="formData.projectName"
          placeholder="请输入项目名称">
        </el-input>
      </el-form-item>
      <el-form-item
        prop="budgetCost"
        label="预计金额(元):">
        <el-input
          v-model="formData.budgetCost"
          placeholder="请输入预计金额">
        </el-input>
      </el-form-item>
      <el-form-item
        prop="budgetTime"
        label="预计时间(月):">
        <!-- <el-date-picker
          v-model="formData.budgetTime"
          style="width: 100%"
          type="month"
          format="YYYY-MM"
          value-format="YYYY-MM"
          placeholder="请选择日期">
        </el-date-picker> -->
        <el-input
          v-model.number="formData.budgetTime"
          placeholder="请输入预计时间">
        </el-input>
      </el-form-item>
      <el-form-item
        prop="mangerId"
        label="负责人:">
        <el-select
          v-model="formData.mangerId"
          style="width: 100%">
          <el-option
            v-for="item in mangerList"
            :key="item.id"
            :label="item.realName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        prop="content"
        label="项目内容:">
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
  import { ElMessage, genFileId } from 'element-plus'
  import { computed, ref, toRefs, reactive, onMounted } from 'vue'
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
  const isEdit = computed(() => {
    return dialogData.value ? true : false
  })
  const $show = computed({
    get() {
      return modelValue.value
    },
    set(val) {
      emit('update:modelValue', val)
    }
  })
  onMounted(() => {
    getUserList()
  })
  const btnLoading = ref(false)
  const formRef = ref(null)
  const mangerList = ref([])
  const handleExceed = () => {
    ElMessage.error('超出文件上传限制！')
  }
  const handleSuccess = (file, files, fileList) => {
    formData.value.fileId = file.id
    if (fileList.length > 1) {
      fileList.splice(0, 1)
    }
  }
  const formData = ref({
    // 项目名称
    projectName: '',
    // 预计金额(元)
    budgetCost: '',
    // 预计时间(月)
    budgetTime: '',
    // 负责人
    mangerId: '',
    // 描述内容
    content: '',
    fileList: [],
    // 附件
    fileId: ''
  })
  const getUserList = () => {
    apis.getPeopleFindAll({ position: 1 }).then((res) => {
      if (res.data.code === 0) {
        mangerList.value = res.data.data
      } else {
        ElMessage.error(res.data.msg)
      }
    })
  }
  // 必填项
  const rules = reactive({
    projectName: [{ required: true, message: '请填写项目名称', trigger: 'change' }],
    budgetCost: [{ required: true, message: '请填写预计金额', trigger: 'change' }],
    budgetTime: [
      { required: true, message: '请填写预计时间', trigger: 'change' },
      { type: 'number', message: '请输入正整数' }
    ],
    mangerId: [{ required: true, message: '请选择项目负责人', trigger: 'change' }],
    content: [{ required: true, message: '请填写描述内容', trigger: 'change' }]
  })
  const onOpen = () => {
    if (isEdit.value) {
      formData.value = {
        ...dialogData.value,
        fileList: [
          {
            name: '文件已上传',
            status: 'success',
            uid: genFileId(),
            response: {
              id: dialogData.value.fileId,
              url: dialogData.value.fileUrl
            }
          }
        ]
      }
    }
  }
  const onClose = () => {
    formRef.value.resetFields()
    formData.value.fileList = []
  }
  // 提交
  const onConfirm = () => {
    formRef.value.validate((valid, fields) => {
      if (valid) {
        btnLoading.value = true
        if (isEdit.value) {
          updateProject()
        } else {
          addProject()
        }
      } else {
        console.log('error submit!', fields)
      }
    })
  }
  // 立项
  const addProject = () => {
    apis
      .ProjectApply({
        ...formData.value,
        fileList: undefined
      })
      .then((res) => {
        if (res.data.code === 0) {
          ElMessage.success('申报成功')
          $show.value = false
          emit('onReload')
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        btnLoading.value = false
      })
  }
  // 修改
  const updateProject = () => {
    apis
      .updateProjectApply({ ...formData.value })
      .then((res) => {
        if (res.data.code === 0) {
          ElMessage.success('编辑成功')
          $show.value = false
          formData.value = {
            // 项目名称
            projectName: '',
            // 预计金额(元)
            budgetCost: '',
            // 预计时间(月)
            budgetTime: '',
            // 负责人
            mangerId: '',
            // 描述内容
            content: '',
            fileList: [],
            // 附件
            fileId: ''
          }
          emit('onReload')
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        btnLoading.value = false
      })
  }
</script>

<style lang="scss" scoped>
  :deep(.el-upload-list) {
    height: 35px;
    overflow: hidden;
  }
  :deep(.el-input__wrapper) {
    width: 100%;
  }
</style>
