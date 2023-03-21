<template>
  <div class="box">
    <v-chart
      class="tw-w-full tw-h-full"
      :option="option">
    </v-chart>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import { onMounted, ref } from 'vue'
  import * as apis from '@/apis/index'
  import { ElMessage } from 'element-plus'
  import getTimeOutOptions from './barChatOption'
  // const router = useRouter()
  const option = ref({})
  onMounted(() => {
    // getCounts()
    option.value = getTimeOutOptions()
  })
  // const onRouter = (str) => {
  //   router.push(str)
  // }
  const InfoData = ref({})
  // const getCounts = () => {
  //   apis
  //     .getCounts()
  //     .then((res) => {
  //       if (res.data.code === 0) {
  //         InfoData.value = res.data.data
  //       } else {
  //         ElMessage.error(res.data.msg)
  //       }
  //     })
  //     .catch((err) => console.log(err))
  // }
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
