export default {
  title: {
    text: "Button 按钮",
    desc: "在有限空间内,展示更多的内容",
  },
  lists: [
    {
      title: "Button Attributes",
      type: "attributes",
      listData: [
        {
          params: "circular",
          desc: "是否循环滚动",
          type: "Boolean",
          optional: "",
          default: "true",
        },
        {
          params: "autoRolling",
          desc: "是否自动滚动",
          type: "Boolean",
          optional: "",
          default: "true",
        },
        {
          params: "interval",
          desc: "自动滚动间隔",
          type: "Number",
          optional: "",
          default: "3000",
        },
        {
          params: "delay",
          desc: "滚动一次的延迟",
          type: "Number",
          optional: "",
          default: "250",
        },
        {
          params: "frame",
          desc: "动画的帧数",
          type: "Number",
          optional: "",
          default: "50",
        },
        {
          params: "trigger",
          desc: "触发方式",
          type: "String",
          optional: "hover/click",
          default: "hover",
        },
        {
          params: "showArrow",
          desc: "箭头显示方式",
          type: "String",
          optional: "hover/none/always",
          default: "hover",
        },
        {
          params: "indicatorType",
          desc: "指示器类型",
          type: "String",
          optional: "dot/rectangle",
          default: "dot",
        },
      ],
    },
    {
      title: "Carousel Events",
      type: "events",
      listData: [
        {
          method: "change",
          desc: "轮播图变化的事件回调(动画开始时)",
          params: "(变化前的索引,变化后的索引)",
        },
        {
          method: "changeAfterAnimation",
          desc: "轮播图变化的事件回调(动画结束时)",
          params: "(变化前的索引,变化后的索引)",
        },
      ],
    },
  ],
  children: [
    {
      id: "use-i-button-1",
      title: {
        text: "基础轮播图",
        desc: "基础的轮播图展示用法。",
      },
      code: `
          <template>
            <div class="carousel-container">
              <carousel
                @change="handleChange"
                @changeAfterAnimation="handleChangeAfterAnimation"
              >
                <carousel-item v-for="(url, idx) in imgList" :key="url">
                  <div class="carousel-item"><img :src="url" /></div>
                </carousel-item>
              </carousel>
            </div>
          </template>

          <script setup>
          const imgList = [
            "https://i0.hippopx.com/photos/320/918/427/sky-clouds-sunlight-dark-thumb.jpg",
            "https://i0.hippopx.com/photos/683/318/324/wolf-wolves-snow-wolf-landscape-thumb.jpg",
            "https://i0.hippopx.com/photos/477/768/839/swimmer-sport-swim-water-thumb.jpg",
            "https://i0.hippopx.com/photos/969/496/921/woman-girl-dom-happy-thumb.jpg",
            "https://i0.hippopx.com/photos/856/151/610/panorama-sunrise-dawn-bled-thumb.jpg",
          ];

          const handleChange = (preIdx, curIdx) => {
            console.log(preIdx, curIdx);
          };

          const handleChangeAfterAnimation = (pre, cur) => {
            console.log(pre, cur);
          };
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
