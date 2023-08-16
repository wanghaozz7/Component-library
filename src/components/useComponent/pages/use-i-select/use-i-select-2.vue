<template>
  <div class="wrapper">
    <div class="row">
      <div class="text" style="font-size: 18px">较大尺寸(size:large) :</div>
      <i-select v-model="value" :option="option" size="large" />
    </div>
    <div class="row">
      <div class="text">中等尺寸(size:medium) :</div>
      <i-select v-model="value" :option="option" size="medium" />
    </div>
    <div class="row">
      <div class="text" style="font-size: 14px">较小尺寸(size:mini) :</div>
      <i-select v-model="value" :option="option" size="mini" />
    </div>
    <div class="row">
      <div class="text" style="font-weight: bold">
        自定义尺寸(width:180,height:30) :
      </div>
      <i-select v-model="value" :option="option" :width="180" :height="30" />
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

<style scoped lang="less">
.wrapper {
  padding: 20px;
  .row {
    height: 70px;
    display: flex;
    align-items: center;
    .text {
      margin-right: 20px;
      color: gray;
    }
  }
}
</style>
