export default {
  title: {
    text: "Button 按钮",
    desc: "用于用户的点击交互操作",
  },
  lists: [
    {
      title: "Button Attributes",
      type: "attributes",
      listData: [
        {
          params: "type",
          desc: "按钮的类型",
          type: "String",
          optional: "normal/info/success/warning/danger",
          default: "normal",
        },
        {
          params: "size",
          desc: "按钮的尺寸",
          type: "String",
          optional: "large/medium/mini",
          default: "medium",
        },
        {
          params: "round",
          desc: "是否圆角按钮",
          type: "Boolean",
          optional: "",
          default: "false",
        },
      ],
    },
  ],
  children: [
    {
      id: "use-i-button-1",
      title: {
        text: "基础用法",
        desc: "基础按钮",
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
    {
      id: "use-i-button-2",
      title: {
        text: "size 按钮的尺寸",
        desc: "size —— large medium mini",
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
