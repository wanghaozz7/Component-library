<template>
  <div style="padding: 20px">
    <i-select v-model="value" @select="handleSelect" />
  </div>
</template>

<script setup>
let value = undefined;

const handleSelect = (val) => {
  console.log("handleSelect", val, value);
};
</script>

<style scoped lang="less"></style>
