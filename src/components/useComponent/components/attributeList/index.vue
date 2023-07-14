<template>
  <h2 style="font-weight: 500; padding-left: 20px">Table Attributes</h2>
  <!-- <rtable
    cellEmptyText="—"
    :data="table_data"
    :border="false"
    :cell-style="getCellStyle"
    :outside-border="false"
    style="width: 868px"
  >
    <table-column :width="120" label="参数" prop="params" align="center" />
    <table-column label="说明" prop="desc" align="center" class="header-cell" />
    <table-column label="类型" prop="type" align="center" />
    <table-column label="可选值	" prop="optional" align="center" />
    <table-column label="默认值	" prop="default" align="center" />
  </rtable> -->
</template>

<script setup name="attributeList">
// import rtable from "@/components/table/index.vue";
// import tableColumn from "@/components/table/components/tableColumn/index.vue";

const table_data = [
  {
    params: "data",
    desc: "显示的数据",
    type: "array",
    optional: "",
    default: "",
  },
  {
    params: "border",
    desc: "是否带有纵向边框",
    type: "boolean",
    optional: "",
    default: "false",
  },
  {
    params: "cellStyle",
    desc: "单元格样式回调,可以根据参数传回不同的样式也可以使所有单元格共享相同样式",
    type: "function/object",
    optional: "",
    default: "",
  },
  {
    params: "height",
    desc: "默认高度为内容高度,设置固定高度后若内容溢出则出现滚动条并固定表头",
    type: "Number",
    optional: "",
    default: "",
  },
  {
    params: "showHeader",
    desc: "是否显示表头",
    type: "boolean",
    optional: "",
    default: "true",
  },
  {
    params: "emptyText",
    desc: "表格没有传数据或数据长度为0时提示内容",
    type: "string",
    optional: "",
    default: "暂无内容",
  },
  {
    params: "cellEmptyText",
    desc: "string",
    type: "表格某一行的某一列无数据时显示的内容",
    optional: "",
    default: " ",
  },
  {
    params: "outsideBorder",
    desc: "是否显示包裹表格的最外层border",
    type: "boolean",
    optional: "",
    default: "true",
  },
  // {
  //   params: "",
  //   desc: "",
  //   type: "",
  //   optional: "",
  //   default: "",
  // },
];

const getCellStyle = (row, column, rowIndex, colIndex) => {
  let textAlign = "center",
    lineHeight = "25px",
    padding = "5px",
    fontSize = "14px";
  return {
    textAlign,
    lineHeight,
    padding,
    fontSize,
  };
};
</script>

<style scoped lang="less">
.header-cell {
  font-size: 14px;
  color: gray;
  font-weight: normal;
}
</style>
