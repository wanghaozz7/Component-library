export default {
  title: {
    text: "Table 表格",
    desc: "用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。",
  },
  lists: [
    {
      title: "Table Attributes",
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
      type: "attributes",
    },
  ],
  children: [
    {
      id: "table-1",
      title: {
        text: "基础表格",
        desc: "基础的表格展示用法。",
      },
      code: `
          <table-list :data="tableData" :out-side-border="false">
              <table-column prop="date" label="日期" :width="180" />
              <table-column prop="name" label="姓名" :width="180" />
              <table-column prop="address" label="地址" :min-width="180" />
          </table-list>

          <script setup>
            const tableData = [
                {
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
    },
    {
      id: "table-2",
      title: {
        text: "带斑马纹表格",
        desc: "使用带斑马纹的表格，可以更容易区分出不同行的数据。",
      },
      code: `
          <table-list :data="tableData" :out-side-border="false" :stripe="true">
              <table-column prop="date" label="日期" :width="180" />
              <table-column prop="name" label="姓名" :width="180" />
              <table-column prop="address" label="地址" :min-width="180" />
          </table-list>

          <script setup>
            const tableData = [
                {
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
    },
    {
      id: "table-3",
      title: {
        text: "带边框表格",
        desc: "使单元格获得纵向的边框",
      },
      code: `
          <table-list :data="tableData" :out-side-border="false" :stripe="true" :border="true">
              <table-column prop="date" label="日期" :width="180" />
              <table-column prop="name" label="姓名" :width="180" />
              <table-column prop="address" label="地址" :min-width="180" />
          </table-list>

          <script setup>
            const tableData = [
                {
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
    },
  ],
};
