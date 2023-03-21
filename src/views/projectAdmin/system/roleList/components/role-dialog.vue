<template>
  <el-dialog
    v-model="$show"
    width="550px"
    @close="onClose"
    @open="onOpen">
    <template #header>
      <p class="tw-font-[600] tw-text-[18px]">{{ $isEdit ? '编辑' : '新增' }}</p>
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
        prop="roleName"
        label="角色职位">
        <el-input v-model="formData.roleName"> </el-input>
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
  import { computed, ref, toRefs, reactive } from 'vue'
  import { ElMessage } from 'element-plus'
  import * as apis from '@/apis/index'
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    dialogData: {
      type: Object,
      default: () => null
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
  const formRef = ref(null)
  const formData = ref({
    // 角色职位
    roleName: ''
  })
  const rules = reactive({
    roleName: [{ required: true, message: '请输入角色职位', trigger: 'change' }]
  })
  // 按钮加载图标
  const btnLoading = ref(false)

  // 是否为编辑模式
  const $isEdit = computed(() => {
    return dialogData.value ? true : false
  })

  const onOpen = () => {
    if ($isEdit.value) {
      formData.value = { ...dialogData.value }
    }
  }
  const onClose = () => {
    formRef.value.resetFields()
    if (formRef.value.id) {
      delete formRef.value.id
    }
  }
  // 新增
  const addRole = () => {
    apis
      .addRole({ ...formData.value })
      .then((res) => {
        if (res.data.code === 0) {
          ElMessage.success('新增成功')
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
  const editRole = () => {
    apis
      .editRole({ ...formData.value })
      .then((res) => {
        if (res.data.code === 0) {
          ElMessage.success('修改成功')
          $show.value = false
          emit('onReload')
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
        btnLoading.value = true
        if ($isEdit.value) {
          editRole()
        } else {
          addRole()
        }
      } else {
        console.log('error submit!', fields)
      }
    })
  }
</script>

<style lang="scss" scoped></style>
