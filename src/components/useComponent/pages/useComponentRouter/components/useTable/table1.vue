<template>
  <table-list :data="tableData" :out-side-border="false">
    <table-column prop="date" label="日期" :width="180" />
    <table-column prop="name" label="姓名" :width="180" />
    <table-column prop="address" label="地址" :min-width="180" />
  </table-list>
</template>

<script setup name="">
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
</script>

<style scoped lang="less"></style>
