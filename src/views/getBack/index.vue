<template>
  <div class="login tw-w-full tw-h-full">
    <div class="login_bg">
      <div class="login_bg_logo">
        <img
          style="width: 60px; height: 100%"
          src="@/assets/image/logo_login.png"
          alt="" />
        <div class="title tw-h-full">
          <p class="chinese">城建企业项目管理系统</p>
          <p class="english"> City Construction Management System </p>
        </div>
      </div>
      <div class="login_bg_image">
        <img
          src="@/assets/image/img_login.png"
          alt="" />
      </div>
    </div>
    <div class="box">
      <div class="login_form">
        <div class="login_form_title">
          <p>找回密码<span>GET BACK</span></p>
        </div>
        <div class="login_form_main">
          <el-form
            ref="FormRef"
            :model="form"
            :rules="rules"
            size="large"
            label-position="top">
            <el-form-item
              prop="mobile"
              label="手机号">
              <el-input
                v-model="form.mobile"
                placeholder="请输入手机号">
              </el-input>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item
                  label="验证码"
                  prop="smsCode">
                  <el-input
                    v-model="form.smsCode"
                    placeholder="请输入验证码">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-button
                  style="margin-top: 33px; width: 100%"
                  type="primary"
                  :disabled="isSend"
                  @click="sendCode">
                  {{ isSend ? `重新发送(${socend})` : '发送验证码' }}
                </el-button>
              </el-col>
            </el-row>
            <el-form-item
              prop="password"
              label="密码">
              <el-input
                v-model="form.password"
                type="password"
                :show-password="true"
                placeholder="请输入登录密码">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                style="width: 100%"
                :loading="btnLoading"
                @click="handelLogin">
                确认
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="tw-flex tw-justify-between">
          <span
            class="tw-text-[16px] tw-text-[#2C73EB] tw-cursor-pointer"
            @click="router.push('/register')">
            注册
          </span>
          <span
            class="tw-text-[16px] tw-text-[#2C73EB] tw-cursor-pointer"
            @click="router.push('/login')">
            登录
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { ElMessage } from 'element-plus'
  import { getBack } from '@/apis'
  import { useUserStore } from '@/stores/user'

  const router = useRouter()
  const store = useUserStore()
  // 表单数据
  const form = reactive({
    mobile: '',
    smsCode: '',
    password: ''
  })

  // // 表单校验
  const rules = {
    mobile: [{ required: true, message: '请输入手机号', trigger: ['change', 'blur'] }],
    smsCode: [{ required: true, message: '请输入验证码', trigger: ['change', 'blur'] }],
    password: [{ required: true, message: '请输入新密码', trigger: ['change', 'blur'] }]
  }

  const FormRef = ref(null)
  const btnLoading = ref(false)

  const isSend = ref(false)
  const socend = ref(60)
  const sendCode = () => {
    isSend.value = true
    const time = setInterval(() => {
      if (socend.value > 0) {
        socend.value = socend.value - 1
      } else {
        isSend.value = false
        socend.value = 60
        clearInterval(time)
      }
    }, 1000)
  }
  // /**
  //  * 登录
  //  * username: admin
  //  * password: 123456
  //  */
  const handelLogin = () => {
    FormRef.value.validate((valid) => {
      if (!valid) {
        return
      }

      btnLoading.value = true
      getBack({ ...form })
        .then((res) => {
          if (res.data.code === 0) {
            const { token, userInfo } = res.data.data
            localStorage.setItem('token', token)
            store.setUserInfo(userInfo)
            router.push('/')
          } else {
            ElMessage.error({ message: res.data.msg })
          }
        })
        .catch((err) => {
          console.log(err)
          ElMessage.error(err.response.data.message)
        })
        .finally(() => {
          btnLoading.value = false
        })
    })
    // store.setUserRole(1)
    // router.push('/')
  }
</script>

<style lang="scss" scoped>
  .login {
    display: flex;
    &_bg {
      width: 50%;
      height: 100%;
      background-color: #2c73eb;
      color: #fff;
      position: relative;
      user-select: none;
      &_logo {
        display: flex;
        position: absolute;
        height: 60px;
        left: 62px;
        top: 62px;
        .title {
          margin-left: 20px;
          width: 230px;
          .chinese {
            font-size: 20px;
            letter-spacing: 3px;
            font-weight: bold;
          }
          .english {
            font-size: 13px;
            margin-top: 10px;
          }
        }
      }
      &_image {
        width: 689px;
        height: 608px;
        margin: 198px auto;
      }
    }
    .box {
      width: 50%;
      height: 100%;
      .login_form {
        width: 427px;
        height: 520px;
        margin: 213px auto;
        &_title {
          width: 100%;
          height: 77px;
          font-size: 30px;
          color: #000000;
          font-weight: bold;
          border-bottom: 1px solid #f5f5f5;
          span {
            color: #dcdfe6;
            margin-left: 10px;
          }
        }
        &_main {
          margin-top: 23px;
          width: 100%;
        }
      }
    }
  }

  :deep(.el-form-item__label) {
    color: #696f79;
    font-size: 16px;
    font-weight: bold;
  }
</style>
