<template>
  <div style="padding: 20px">
    <div class="title">{{ title.text }}</div>
    <div class="desc">{{ title.desc }}</div>
    <show-component v-for="obj in objs" :code="obj.code" :title="obj.title" :key="obj.title">
      <table-list :data="tableData" :out-side-border="false">
        <table-column prop="date" label="日期" :width="180"></table-column>
        <table-column prop="name" label="姓名" :width="180"></table-column>
        <table-column prop="address" label="地址" :min-width="180"></table-column>
      </table-list>
    </show-component>
    <attribute-list v-for="list in lists" :key="list.title" :title="list.title" :list-data="list.listData"
      :type="list.type" />
  </div>
</template>

<script setup>
// 使用组件由以下组成 ： 1.组件名（一级标题）+ 描述  2.使用方法 (二级标题) + 描述 + showComponent (样式展示 + 代码) 3.接口列表  4.前进后退

const props = defineProps({
  title: {
    type: Object,
    default() {
      return {};
    },
  },
  lists: {
    type: Array,
    default() {
      return [
        {
          title: 'Table Attributes',
          listData: [
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
          ],
          type: 'attributes'
        }
      ]
    }
  }
});

const tableData = [{
  date: '2016-05-02',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄'
}, {
  date: '2016-05-04',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1517 弄'
}, {
  date: '2016-05-01',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1519 弄'
}, {
  date: '2016-05-03',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1516 弄'
}]

const objs = [
  {
    title: {
      text: "Slider 滑块",
      desc: "通过拖动滑块在一个固定区间内进行选择",
    },
    code: `
      <table-list :data="tableData">
          <table-column prop="date" label="日期" :width="180"></table-column>
          <table-column prop="name" label="姓名" :width="180"></table-column>
          <table-column prop="address" label="地址" :min-width="180"></table-column>
      </table-list>

      <script setup>
          const tableData = [{
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
              }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
              }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
              }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
              }]
      <\/script>
  `,
  }
];
</script>

<style lang="less" scoped>
.title {
  font-size: 26px;
}

.desc {
  font-size: 14px;
  color: gray;
  margin: 15px 0;
}
</style>
