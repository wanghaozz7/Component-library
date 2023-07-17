export default {
  title: {
    text: "Tooltip 文字提示",
    desc: "常用于展示鼠标 hover 时的提示信息。",
  },
  lists: [
    {
      title: "Carousel Attributes",
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
      id: "carousel-1",
      title: {
        text: "基础用法",
        desc: "提供了4种不同悬浮位置的用法",
      },
      code: `
            <div 
                style="
                height: 250px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
              "
            >
              <tooltip content="我是文字提示">
                <div
                  style="
                    height: 100px;
                    background-color: lightpink;
                    width: 100px;
                    border: 1px solid black;
                  "
                >
                  111
                </div>
              </tooltip>
            </div>
      `,
    },
  ],
};
