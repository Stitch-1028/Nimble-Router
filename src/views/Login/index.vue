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
          <p>用户登录<span>USER LOGIN</span></p>
        </div>
        <div class="login_form_main">
          <el-form
            ref="FormRef"
            :model="form"
            :rules="rules"
            size="large"
            label-position="top">
            <el-form-item
              prop="username"
              label="用户名称">
              <el-input
                v-model="form.username"
                style="height: 64px"
                placeholder="请输入用户名称">
              </el-input>
            </el-form-item>
            <el-form-item
              prop="password"
              label="密码">
              <el-input
                v-model="form.password"
                type="password"
                :show-password="true"
                style="height: 64px"
                placeholder="请输入登录密码">
              </el-input>
            </el-form-item>
            <el-form-item>
              <div class="tw-flex tw-justify-between tw-w-full">
                <el-checkbox
                  v-model="form.check"
                  label="记住密码">
                </el-checkbox>
                <el-button
                  class="tw-p-0"
                  text
                  type="primary"
                  @click="router.push('/register')">
                  用户注册
                </el-button>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button
                color="#2C73EB"
                style="width: 100%; height: 64px; font-size: 16px"
                :loading="btnLoading"
                @click="handelLogin(FormRef)">
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="tw-flex tw-justify-end">
          <span
            class="tw-text-[16px] tw-text-[#2C73EB] tw-cursor-pointer"
            @click="router.push('/getBack')">
            忘记密码
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { ElMessage, FormInstance } from 'element-plus'
  import { login } from '@/apis'
  import { useUserStore } from '@/stores/user'

  const router = useRouter()
  const store = useUserStore()
  // 表单数据
  const form = reactive({
    username: '',
    password: '',
    check: false
  })

  // // 表单校验
  const rules = {
    username: [{ required: true, message: '请输入用户名', trigger: ['change', 'blur'] }],
    password: [
      { required: true, message: '请输入密码', trigger: ['change', 'blur'] }
      // {
      //   pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,./]).{10,}$/,
      //   message: '密码必须10位以上并包含字母数字字符',
      //   trigger: ['change', 'blur']
      // }
    ]
  }

  onMounted(() => {
    console.log(router.options.routes)
    // if (localStorage.getItem('remember_me') === 'true') {
    //   form.username = localStorage.getItem('username')
    //   form.check = true
    //   const base64 = localStorage.getItem('password')
    //   // form.password = CryptoJS.enc.Base64.parse(base64).toString(CryptoJS.enc.Utf8)
    //   form.password = base64
    // }
  })

  const FormRef = ref<FormInstance>()
  const btnLoading = ref(false)
  // /**
  //  * 登录
  //  * username: admin
  //  * password: 123456
  //  */
  const handelLogin = (FormRef: FormInstance | undefined) => {
    if (!FormRef) return
    // router.push('/newAdmin/header')
    // FormRef.validate((valid) => {
    //   if (!valid) return

    //   // 本地缓存
    //   if (form.check) {
    //     localStorage.setItem('remember_me', 'true')
    //     localStorage.setItem('username', form.username)
    //     localStorage.setItem('password', form.password)
    //   } else {
    //     localStorage.removeItem('remember_me')
    //     localStorage.removeItem('username')
    //     localStorage.removeItem('password')
    //   }

    //   btnLoading.value = true
    //   login({
    //     username: form.username,
    //     password: form.password
    //   })
    //     .then((res) => {
    //       if (res.data.code === 0) {
    //         const { token, userInfo } = res.data.data
    //         localStorage.setItem('token', token)
    //         store.setUserInfo(userInfo)
    //         router.push('/')
    //       } else {
    //         ElMessage.error({ message: res.data.msg })
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //       ElMessage.error(err.response.data.message)
    //     })
    //     .finally(() => {
    //       btnLoading.value = false
    //     })
    // })
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
