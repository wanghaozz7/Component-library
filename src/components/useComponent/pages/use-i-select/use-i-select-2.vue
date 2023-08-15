<template>
  <div style="padding: 20px">
    <div style="display: flex;align-items: center;">
      <div style="margin-right: 20px;font-size: 18px;color: gray;">较大尺寸(width:360,height:50) : </div>
      <i-select v-model="value" :option="option" :height="50" :width="360" />
    </div>
    <div style="display: flex;align-items: center;">
      <div style="margin-right: 20px;font-size: 16px;color: gray;">较大尺寸(width:360,height:50) : </div>
      <i-select v-model="value" :option="option" :height="50" :width="360" />
    </div>
    <div style="display: flex;align-items: center;">
      <div style="margin-right: 20px;font-size: 14px;color: gray;">较大尺寸(width:360,height:50) : </div>
      <i-select v-model="value" :option="option" :height="50" :width="360" />
    </div>
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

</script>

<style scoped lang="less"></style>
