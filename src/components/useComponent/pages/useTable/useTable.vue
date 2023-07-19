<template>
  <use-component
    :title="tableConfig.title"
    :lists="tableConfig.lists"
    v-show="selectedArr.length !== 0"
  >
    <div v-show="getShowType(tableConfig.children[0].id)">
      <show-component
        :code="tableConfig.children[0].code"
        :title="tableConfig.children[0].title"
      >
        <table-list :data="tableData" :out-side-border="false">
          <table-column prop="date" label="日期" :width="180" />
          <table-column prop="name" label="姓名" :width="180" />
          <table-column prop="address" label="地址" :min-width="180" />
        </table-list>
      </show-component>
    </div>
    <div v-show="getShowType(tableConfig.children[1].id)">
      <show-component
        :code="tableConfig.children[1].code"
        :title="tableConfig.children[1].title"
      >
        <table-list :data="tableData" :out-side-border="false" :stripe="true">
          <table-column prop="date" label="日期" :width="180" />
          <table-column prop="name" label="姓名" :width="180" />
          <table-column prop="address" label="地址" :min-width="180" />
        </table-list>
      </show-component>
    </div>
    <div v-show="getShowType(tableConfig.children[2].id)">
      <show-component
        :code="tableConfig.children[2].code"
        :title="tableConfig.children[2].title"
      >
        <table-list
          :data="tableData"
          :out-side-border="false"
          :stripe="true"
          :border="true"
        >
          <table-column prop="date" label="日期" :width="180" />
          <table-column prop="name" label="姓名" :width="180" />
          <table-column prop="address" label="地址" :min-width="180" />
        </table-list>
      </show-component>
    </div>
  </use-component>
</template>

<script setup name="useTable">
import { computed } from "vue";
import tableConfig from "../../config/table.js";

const props = defineProps({
  selectedArr: {
    type: Array,
    default() {
      return [];
    },
  },
});

const getShowType = computed(() => {
  return (id) => {
    const res = props.selectedArr.find((x) => {
      return x === id;
    });
    return res !== undefined;
  };
});

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
