<template>
  <div>
    <div style="font-size: 14px;color: gray;margin:20px 20px 0 20px">根据行的内容或者索引对特定行添加类名</div>
    <table-list :data="tableData" :out-side-border="false" :row-class-name="getRowClassName" :border="true">
      <table-column prop="date" label="日期" :width="180" />
      <table-column prop="name" label="姓名" :width="180" />
      <table-column prop="address" label="地址" :min-width="180" />
    </table-list>
    <div style="font-size: 14px;color: gray;margin:20px 20px 0 20px">依照这个规则可以自己实现斑马纹</div>
    <table-list :data="tableData" :out-side-border="false" :row-class-name="getStripeClass" :border="true">
      <table-column prop="date" label="日期" :width="180" />
      <table-column prop="name" label="姓名" :width="180" />
      <table-column prop="address" label="地址" :min-width="180" />
    </table-list>
  </div>
</template>

<script setup>
const tableData = [
  {
    date: "2016-05-02",
    name: "王小虎",
    address: "上海市普陀区金沙江路1518弄",
  },
  {
    date: "2016-05-04",
    name: "王小虎",
    address: "上海市普陀区金沙江路1517弄",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路1519弄",
  },
  {
    date: "2016-05-03",
    name: "王小虎",
    address: "上海市普陀区金沙江路1516弄",
  },
];
const getRowClassName = (row, rowIndex) => {
  return {
    'warning-row': rowIndex % 2 === 0,
    'danger-row': rowIndex % 4 === 0
  }
}
const getStripeClass = (row, rowIndex) => {
  return {
    'stripe-row': rowIndex % 2 !== 0,
  }
}
</script>

<style>
.warning-row {
  background-color: rgb(255, 228, 178);
}

.danger-row {
  background-color: rgb(249, 167, 167);
}

.stripe-row {
  background-color: #eee;
}
</style>
