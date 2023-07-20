export default {
  title: {
    text: "Carousel 轮播图",
    desc: "在有限空间内,展示更多的内容",
  },
  lists: [
    {
      title: "Carousel Attributes",
      listData: [
        {
          params: "circular",
          desc: "是否循环滚动",
          type: "boolean",
          optional: "",
          default: "true",
        },
        {
          params: "autoRolling",
          desc: "是否自动滚动",
          type: "boolean",
          optional: "",
          default: "true",
        },
        {
          params: "interval",
          desc: "自动滚动间隔",
          type: "number",
          optional: "",
          default: "3000",
        },
        {
          params: "delay",
          desc: "滚动一次的延迟",
          type: "number",
          optional: "",
          default: "250",
        },
        {
          params: "frame",
          desc: "动画的帧数",
          type: "number",
          optional: "",
          default: "50",
        },
        {
          params: "trigger",
          desc: "触发方式",
          type: "string",
          optional: "hover/click",
          default: "hover",
        },
        {
          params: "showArrow",
          desc: "箭头显示方式",
          type: "string",
          optional: "hover/none/always",
          default: "hover",
        },
        {
          params: "indicatorType",
          desc: "指示器类型",
          type: "string",
          optional: "dot/rectangle",
          default: "dot",
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
      <template>
        <div class="carousel-container">
          <carousel>
            <carousel-item v-for="item in 5" :key="item">
              <div class="carousel-item">+++++{{ item }}+++++</div>
            </carousel-item>
          </carousel>
        </div>
      </template>

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
    {
      id: "carousel-2",
      title: {
        text: "指示器",
        desc: "设置不同类型的指示器",
      },
      code: `
      <template>
        <div class="carousel-container">
          <carousel indicatorType="rectangle">
            <carousel-item v-for="item in 5" :key="item">
              <div class="carousel-item">+++++{{ item }}+++++</div>
            </carousel-item>
          </carousel>
        </div>
      </template>

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
    {
      id: "carousel-3",
      title: {
        text: "触发方式",
        desc: "指示器的触发方式——默认下hover 可改为click",
      },
      code: `
      <template>
        <div class="carousel-container">
          <carousel trigger="click">
            <carousel-item v-for="item in 5" :key="item">
              <div class="carousel-item">+++++{{ item }}+++++</div>
            </carousel-item>
          </carousel>
        </div>
      </template>

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
    {
      id: "carousel-4",
      title: {
        text: "箭头的显示时机",
        desc: "总是显示/总是不显示/鼠标进入轮播图时显示",
      },
      code: `
      <template>
        <div class="carousel-container">
          <carousel showArrow="hover">
            <carousel-item v-for="item in 5" :key="item">
              <div class="carousel-item">+++++{{ item }}+++++</div>
            </carousel-item>
          </carousel>
        </div>
      </template>

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
