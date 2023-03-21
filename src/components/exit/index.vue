<template>
  <div
    v-show="$show"
    class="transition-box"
    @mousemove="move"
    @mouseleave="leave">
    <div class="info">
      <div class="item">
        <el-icon :size="20"><Avatar></Avatar></el-icon>
        <p>{{ userInfo?.userInfo?.user?.realName || '' }}</p>
      </div>
      <div class="item">
        <el-icon :size="20"><Promotion></Promotion></el-icon>
        <p>{{ userInfo?.userInfo?.user?.mobile || '' }}</p>
      </div>
    </div>
    <div class="btn">
      <div class="item">
        <el-icon :size="23"><Edit></Edit></el-icon>
        <el-button
          style="width: 100px; margin-left: 20px"
          plain
          color="#626aef"
          @click="checkoutInfo">
          查看详情
        </el-button>
      </div>
    </div>
    <div class="btn">
      <div class="item">
        <el-icon :size="23"><SwitchButton></SwitchButton></el-icon>
        <el-button
          style="width: 100px; margin-left: 20px"
          plain
          color="#626aef"
          @click="exit">
          退出
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { Avatar, Promotion, Edit, SwitchButton } from '@element-plus/icons-vue'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/stores/user'
  const userInfo = useUserStore()
  const router = useRouter()
  const props = defineProps({
    show: {
      type: Boolean,
      default: true
    }
  })
  const $show = computed({
    get() {
      return props.show
    },
    set(val) {
      emit('update:show', val)
    }
  })
  const emit = defineEmits(['update:show'])
  const move = () => {
    $show.value = true
  }
  const leave = () => {
    $show.value = false
  }
  const exit = () => {
    // 清空本地缓存
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    router.push('/login')
  }
  const checkoutInfo = () => {
    router.push({
      name: 'userInfo',
      query: {
        userId: userInfo.userInfo.user.id
      }
    })
  }
</script>

<style lang="scss" scoped>
  .transition-box {
    position: absolute;
    width: 200px;
    height: 200px;
    right: 5px;
    top: 60px;
    background-color: #141414;
    color: #fff;
    opacity: 0.8;
    border-radius: 20px;
    padding-left: 10px;
    z-index: 100;
    .info {
      width: 100%;
      height: 35%;
      .item {
        margin: 15px auto;
        width: 100%;
        height: 30px;
        display: flex;
        user-select: none;
        p {
          margin-left: 20px;
        }
      }
    }
    .btn {
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 15px 0;
      .item {
        display: flex;
        width: 100%;
        height: 40px;
      }
    }
  }
</style>
