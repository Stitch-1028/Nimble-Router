<template>
  <div class="box">
    <div class="container">
      <div
        ref="cardOne"
        class="card">
        <img
          src="@/assets/image/cool/01.png"
          alt="" />
        <div class="content">
          <h2>01</h2>
          <h3>系统管理</h3>
          <p> 人员数量:{{ InfoData.userCount }} </p>
          <!-- <a @click="onRouter('/admin/system/roleList')">查看详情</a> -->
        </div>
      </div>
      <div
        ref="cardTwo"
        class="card">
        <img
          src="@/assets/image/cool/02.jpg"
          alt="" />
        <div class="content">
          <h2>02</h2>
          <h3>项目模块</h3>
          <p> 项目数量:{{ InfoData.projectCount }} </p>
          <a @click="onRouter('/user/projectModule/projectManage')">查看详情</a>
        </div>
      </div>
      <div
        ref="cardThree"
        class="card">
        <img
          src="@/assets/image/cool/03.jpg"
          alt="" />
        <div class="content">
          <h2>03</h2>
          <h3>资金模块</h3>
          <p>资金数量:{{ parseFloat(InfoData.projectCount).toFixed(2) }} (万元)</p>
          <a @click="onRouter('/user/moneyModule/moneyManage')">查看详情</a>
        </div>
      </div>
      <div
        ref="cardfour"
        class="card">
        <img
          src="@/assets/image/cool/04.jpg"
          alt="" />
        <div class="content">
          <h2>03</h2>
          <h3>审批模块</h3>
          <p> 项目预算: {{ parseFloat(InfoData.approvalCount).toFixed(2) }}(万元)</p>
          <!-- <a @click="onRouter('/admin/approvalModule/projectProcess')">查看详情</a> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import VanillaTilt from 'vanilla-tilt'
  import { useRouter } from 'vue-router'
  import { onMounted, ref } from 'vue'
  import * as apis from '@/apis/index'
  import { ElMessage } from 'element-plus'
  const cardOne = ref(null)
  const cardTwo = ref(null)
  const cardThree = ref(null)
  const cardfour = ref(null)
  const router = useRouter()
  onMounted(() => {
    VanillaTilt.init([cardOne.value, cardTwo.value, cardThree.value, cardfour.value], {
      max: 15, //最大倾斜度数
      speed: 400, //倾斜转换的速度
      glare: true, //是否开启眩光效果
      'max-glare': 1 //最大眩光的不透明度
    })
    getCounts()
  })
  const onRouter = (str) => {
    router.push(str)
  }
  const InfoData = ref({})
  const getCounts = () => {
    apis
      .getCounts()
      .then((res) => {
        if (res.data.code === 0) {
          InfoData.value = res.data.data
        } else {
          ElMessage.error(res.data.msg)
        }
      })
      .catch((err) => console.log(err))
  }
</script>

<style lang="scss" scoped>
  .box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .container {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      z-index: 1;
      .card {
        /* 相对定位 */
        position: relative;
        width: 280px;
        height: 400px;
        margin: 30px;
        /* 阴影 */
        box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
        border-radius: 15px;
        // background-color: rgba(255, 255, 255, 0.1);
        background-color: gray;
        /* 溢出隐藏 */
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 1px solid rgba(255, 255, 255, 0.5);
        border-left: 1px solid rgba(255, 255, 255, 0.5);
        /* 背景模糊 */
        backdrop-filter: blur(5px);
        .content {
          padding: 20px;
          text-align: center;
          /* 默认下移+隐藏 */
          transform: translateY(100px);
          opacity: 0;
          /* 动画过渡 */
          transition: 0.5s;
          h2 {
            position: absolute;
            top: -80px;
            right: 30px;
            font-size: 128px;
            color: rgba(255, 255, 255, 0.05);
            /* pointer-events: none; */
          }

          h3 {
            font-size: 28px;
            color: #fff;
          }

          p {
            font-size: 20px;
            color: #fff;
            font-weight: bold;
            margin: 10px 0 15px 0;
          }
          a {
            position: relative;
            cursor: pointer;
            display: inline-block;
            padding: 8px 20px;
            margin-top: 15px;
            background-color: #fff;
            color: #000;
            border-radius: 20px;
            text-decoration: none;
            font-weight: 500;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          }
        }
        img {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: -0;
          opacity: 1;
          transition: 0.5s;
        }
        &:hover {
          .content {
            /* 鼠标移入，上移+显示 */
            transform: translateY(0);
            opacity: 1;
          }
          img {
            /* 鼠标移入，上移+显示 */
            transform: translateY(-200);
            opacity: 0;
          }
        }
      }
    }
  }
</style>
