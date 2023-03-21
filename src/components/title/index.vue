<template>
  <span class="tw-text-[#303133] tw-text-[28px] tw-font-[600]">{{ title }}</span>
</template>

<script setup>
  import { toRefs } from 'vue'

  const props = defineProps({
    title: {
      type: String,
      default: ''
    }
  })
  const { title } = toRefs(props)
</script>

<style lang="scss" scoped></style>
