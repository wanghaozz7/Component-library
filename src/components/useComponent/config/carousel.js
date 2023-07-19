export default {
  title: {
    text: "Carousel 轮播图",
    desc: "在有限空间内，循环播放同一类型的图片、文字等内容",
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
        text: "基础轮播图",
        desc: "基础的轮播图展示用法。",
      },
      code: `
      <div class="carousel-container">
          <carousel indicatorType="rectangle" trigger="click">
                <carousel-item v-for="item in 5" :key="item">
                      <div class="carousel-item">
                        +++++{{ item }}+++++
                      </div>
                </carousel-item>
          </carousel>
      </div>

      <style scoped>
      .carousel-container {
          height: 350px;
          margin: 50px;
      }
      .carousel-item {
          width: 100%;
          height: 100%;
          font-size: 36px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgb(194, 249, 194);
      }
      </style>
      `,
    },
  ],
};
