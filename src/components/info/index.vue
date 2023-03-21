<template>
  <div class="yp_info">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'YpInfo',
    provide() {
      return {
        YpInfo: this
      }
    },
    props: {
      labelWidth: {
        type: String,
        default: '120px'
      }
    }
  }
</script>
<style lang="scss"></style>
