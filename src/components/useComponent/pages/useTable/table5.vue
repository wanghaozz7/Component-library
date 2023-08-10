<template>
  <div>
    <div class="row">
      <div class="col">
        <table-list
          :data="tableData"
          :out-side-border="false"
          size="small"
          :border="true"
        >
          <table-column prop="name" label="姓名" />
          <table-column prop="age" label="年龄" />
          <table-column prop="address" label="地址" />
        </table-list>
      </div>
      <div class="col">
        <table-list
          :data="tableData"
          :out-side-border="false"
          size="medium"
          :border="true"
        >
          <table-column prop="name" label="姓名" />
          <table-column prop="age" label="年龄" />
          <table-column prop="address" label="地址" />
        </table-list>
      </div>
    </div>
    <div>
      <table-list
        :data="tableData"
        :out-side-border="false"
        size="big"
        :border="true"
      >
        <table-column prop="name" label="姓名" />
        <table-column prop="age" label="年龄" />
        <table-column prop="address" label="地址" />
      </table-list>
    </div>
  </div>
</template>

<script setup>
const tableData = [
  {
    name: "小明",
    age: 19,
    address: "上海市静安区彭浦镇",
  },
  {
    name: "小明",
    age: 19,
    address: "上海市静安区彭浦镇",
  },
  {
    name: "小明",
    age: 19,
    address: "上海市静安区彭浦镇",
  },
  {
    name: "小明",
    age: 19,
    address: "上海市静安区彭浦镇",
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
