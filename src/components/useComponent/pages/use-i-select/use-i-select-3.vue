<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      height: 100px;
      gap: 20px;
      padding: 20px;
    "
  >
    <i-select v-model="value" :option="option" disabled />
    <i-select v-model="value" :option="option" />
  </div>
</template>

<script setup>
let value = undefined;

const option = [
  {
    label: "桃子",
    value: "桃子",
  },
  {
    label: "香蕉",
    value: "香蕉",
    disabled: true,
  },
  {
    label: "苹果",
    value: "苹果",
  },
  {
    label: "橙子",
    value: "橙子",
  },
  {
    label: "葡萄",
    value: "葡萄",
  },
];
</script>

<style scoped lang="less"></style>
