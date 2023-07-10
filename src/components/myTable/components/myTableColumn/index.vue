<template>
  <th :style="{ width: width + 'px' }" :prop="prop">
    <slot />
    {{ label }}
  </th>
</template>
<script setup>
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  width: {
    type: Number,
    default: 120
  },
  prop: {
    type: String,
    default: ''
  }
})
</script>
<style lang='scss' scoped></style>