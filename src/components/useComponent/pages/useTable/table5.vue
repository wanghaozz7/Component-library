<template>
  <div class="row">
    <div class="col">
      <table-list :data="tableData" :out-side-border="false" size="small" :border="true">
        <table-column prop="date" label="日期" />
        <table-column prop="name" label="姓名" />
        <table-column prop="address" label="地址" />
      </table-list>
    </div>
    <div class="col">
      <table-list :data="tableData" :out-side-border="false" size="medium" :border="true">
        <table-column prop="date" label="日期" />
        <table-column prop="name" label="姓名" />
        <table-column prop="address" label="地址" />
      </table-list>
    </div>
  </div>
  <div>
    <table-list :data="tableData" :out-side-border="false" size="big" :border="true">
      <table-column prop="date" label="日期" />
      <table-column prop="name" label="姓名" />
      <table-column prop="address" label="地址" />
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
</script>

<style scoped lang="less">
.row {
  display: flex;

  .col {
    flex: 1;
  }
}
</style>
