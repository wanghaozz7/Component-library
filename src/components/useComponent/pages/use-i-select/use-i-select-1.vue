<template>
  <div style="padding: 20px">
    <i-select v-model="value" @select="handleSelect" @change="handleChange" :option="option" />
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

const handleSelect = (val) => {
  console.log("handleSelect", val, value);
};

const handleChange = (val) => {
  console.log("handleChange", val, value);
};
</script>

<style scoped lang="less"></style>
