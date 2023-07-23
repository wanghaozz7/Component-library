<template>
  <div>
    <table-list :data="tableData1" :out-side-border="false" :border="true" :height="250">
      <table-column prop="date" label="日期" />
      <table-column prop="name" label="姓名" />
      <table-column prop="address" label="地址" />
    </table-list>
    <hr>
    <table-list :data="tableData2" :out-side-border="true" :border="true" :height="250">
      <table-column prop="date" label="日期" />
      <table-column prop="name" label="姓名" />
      <table-column prop="address" label="地址" />
    </table-list>
  </div>
</template>

<script setup>
const tableData1 = [
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
  {
    date: "2016-05-03",
    name: "王小虎",
    address: "上海市普陀区金沙江路1516弄",
  },
  {
    date: "2016-05-03",
    name: "王小虎",
    address: "上海市普陀区金沙江路1516弄",
  },
  {
    date: "2016-05-03",
    name: "王小虎",
    address: "上海市普陀区金沙江路1516弄",
  },
];
const tableData2 = [
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
];

</script>

<style scoped lang="less"></style>
