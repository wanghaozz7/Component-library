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
                <carousel-item v-for="(url, idx) in imgList" :key="idx">
                  <div class="carousel-item"><img :src="url" /></div>
                </carousel-item>
              </carousel>
            </div>
          </template>

          <script setup name="carousel1">
          const imgList = [
            "https://i0.hippopx.com/photos/320/918/427/sky-clouds-sunlight-dark-thumb.jpg",
            "https://i0.hippopx.com/photos/683/318/324/wolf-wolves-snow-wolf-landscape-thumb.jpg",
            "https://i0.hippopx.com/photos/477/768/839/swimmer-sport-swim-water-thumb.jpg",
            "https://i0.hippopx.com/photos/969/496/921/woman-girl-dom-happy-thumb.jpg",
            "https://i0.hippopx.com/photos/856/151/610/panorama-sunrise-dawn-bled-thumb.jpg",
          ];
          </script>

          <style scoped lang="less">
          .carousel-container {
            height: 350px;
            margin: 50px;

            .carousel-item {
              width: 100%;
              height: 100%;
              font-size: 36px;
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: rgb(194, 249, 194);
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
          </style>

      `,
    },
  ],
};
