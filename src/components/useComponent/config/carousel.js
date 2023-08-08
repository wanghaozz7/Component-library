export default {
  title: {
    text: "Carousel 轮播图",
    desc: "在有限空间内,展示更多的内容",
  },
  lists: [
    {
      title: "Carousel Attributes",
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
    {
      id: "carousel-2",
      title: {
        text: "indicatorType 指示器",
        desc: "设置不同类型的指示器",
      },
      code: `
          <template>
            <div class="carousel-container">
              <carousel indicatorType="rectangle" showArrow="always">
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
    {
      id: "carousel-3",
      title: {
        text: "trigger 触发方式",
        desc: "指示器的触发方式 默认下hover 可改为click",
      },
      code: `
          <template>
            <div class="carousel-container">
              <carousel trigger="click">
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
    {
      id: "carousel-4",
      title: {
        text: "showArrow 箭头的显示时机",
        desc: "总是显示/总是不显示/鼠标进入轮播图时显示",
      },
      code: `
          <template>
            <div class="carousel-container">
              <carousel showArrow="hover">
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
    {
      id: "carousel-5",
      title: {
        text: "autoRolling 自动滚动",
        desc: "自动滚动会在元素激活(浏览器非休眠、元素可见)时触发,可以通过interval设置间隔",
      },
      code: `
          <template>
            <div class="carousel-container">
              <carousel :autoRolling="true" :interval="2500" showArrow="hover">
                <carousel-item v-for="(url, idx) in imgList" :key="idx">
                  <div class="carousel-item">
                    <img :src="url" />
                  </div>
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
    {
      id: "carousel-6",
      title: {
        text: "circular 循环滚动",
        desc: "内容呈现环形衔接,自动滚动默认一直向右",
      },
      code: `
          <template>
            <div class="carousel-container">
              <carousel :circular="true" :autoRolling="true" showArrow="hover">
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
    {
      id: "carousel-7",
      title: {
        text: "indicatorPosition 指示器的位置",
        desc: "指示器可以选择放在内部或者外部",
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
    {
      id: "carousel-8",
      title: {
        text: "arrowPosition 箭头的位置",
        desc: "箭头可以选择放在内部或者外部",
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
