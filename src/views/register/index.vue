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
          <p>用户注册<span>USER REGISTER</span></p>
        </div>
        <div class="login_form_main">
          <el-form
            ref="FormRef"
            :rules="rules"
            :model="form"
            size="large"
            label-position="top">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item
                  prop="username"
                  label="用户名">
                  <el-input
                    v-model="form.username"
                    placeholder="请输入用户名">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
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
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item
                  prop="mobile"
                  label="手机号">
                  <el-input
                    v-model="form.mobile"
                    placeholder="请输入手机号">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  prop="realName"
                  label="真实姓名">
                  <el-input
                    v-model="form.realName"
                    placeholder="请输入真实姓名">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
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
              prop="identityCode"
              label="身份证号">
              <el-input
                v-model="form.identityCode"
                placeholder="请输入身份证号">
              </el-input>
            </el-form-item>

            <el-form-item
              prop="photo"
              label="个人头像">
              <el-upload
                ref="uploadRef"
                v-model:file-list="form.photo"
                :action="uploadUrl"
                list-type="picture-card"
                :limit="1"
                :on-exceed="onExceed">
                <el-icon><Plus></Plus></el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button
                color="#2C73EB"
                style="width: 100%; height: 64px; font-size: 16px"
                :loading="btnLoading"
                @click="handelLogin">
                注册
              </el-button>
            </el-form-item>
            <el-form-item>
              <div class="tw-w-full tw-flex tw-justify-between">
                <el-button
                  class="tw-p-1"
                  type="primary"
                  text
                  @click="router.push('/getBack')">
                  忘记密码
                </el-button>
                <el-button
                  class="tw-p-1"
                  type="primary"
                  text
                  @click="router.push('/login')">
                  登录
                </el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { ElMessage } from 'element-plus'
  import { register } from '@/apis'
  import { uploadUrl } from '@/apis/index'
  const router = useRouter()
  // 表单数据
  const form = reactive({
    username: '',
    password: '',
    mobile: '',
    smsCode: '',
    identityCode: '',
    realName: '',
    photo: []
  })

  // // 表单校验
  const rules = {
    username: [{ required: true, message: '请输入用户名', trigger: ['change', 'blur'] }],
    password: [{ required: true, message: '请输入密码', trigger: ['change', 'blur'] }],
    mobile: [{ required: true, message: '请输入手机号', trigger: ['change', 'blur'] }],
    smsCode: [{ required: true, message: '请输入验证码', trigger: ['change', 'blur'] }],
    identityCode: [
      { required: true, message: '请输入身份证号', trigger: ['change', 'blur'] },
      {
        pattern:
          /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
        message: '请输入正确格式的身份证号',
        trigger: 'change'
      }
    ],
    realName: [{ required: true, message: '请输入真实姓名', trigger: ['change', 'blur'] }],
    photo: [{ required: true, message: '请选择个人头像', trigger: ['change', 'blur'] }]
  }

  onMounted(() => {})

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

  const uploadRef = ref(null)

  const onExceed = () => {
    ElMessage.error('只能上传一张照片')
  }
  // /**
  //  * 登录
  //  * username: admin
  //  * password: zdcj@123456
  //  */
  const handelLogin = () => {
    FormRef.value.validate((valid) => {
      if (!valid) {
        return
      }
      btnLoading.value = true
      register({
        username: form.username, //用户名
        password: form.password, //密码
        mobile: form.mobile, //手机号
        smsCode: form.smsCode, //验证码
        identityCode: form.identityCode, //身份证号
        realName: form.realName, //真实姓名
        avatarId: form.photo[0].response.id
      })
        .then((res) => {
          if (res.data.code === 0) {
            ElMessage.success('注册成功')
            router.push('/login')
          } else {
            ElMessage.error(res.data.msg)
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          btnLoading.value = false
        })
    })
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
        margin: 70px auto;
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
