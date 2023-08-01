export default {
  title: {
    text: "Tooltip 文字提示",
    desc: "常用于展示鼠标 hover 时的提示信息。",
  },
  lists: [
    {
      title: "Tooltip Attributes",
      listData: [
        {
          params: "placement",
          desc: "悬浮的位置",
          type: "string",
          optional: "top/bottom/left/right",
          default: "top",
        },
        {
          params: "content",
          desc: "悬浮的文字提示",
          type: "function/object",
          optional: "",
          default: "我是tooltip",
        },
        {
          params: "offset",
          desc: "三角形箭头的偏移量",
          type: "number",
          optional: "",
          default: "20",
        },
        {
          params: "theme",
          desc: "样式风格",
          type: "string",
          optional: "light/dark",
          default: "light",
        },
        {
          params: "delay",
          desc: "消失的延迟",
          type: "number",
          optional: "",
          default: "500",
        },
      ],
      type: "attributes",
    },
  ],
  children: [
    {
      id: "tooltip-1",
      title: {
        text: "基础用法",
        desc: "鼠标悬浮在内容时立即出现文字提示",
      },
      code: `
            <template>
              <div style="margin-top: 50px" class="cont">
                <tooltip placement="top" content="我悬浮在上边~">
                  <div class="item">上</div>
                </tooltip>
              </div>
              <div style="margin: 50px 0; gap: 150px" class="cont">
                <tooltip placement="left" content="我悬浮在左边~">
                  <div class="item">左</div>
                </tooltip>
                <tooltip placement="right" content="我悬浮在右边~">
                  <div class="item">右</div>
                </tooltip>
              </div>
              <div style="margin-bottom: 50px" class="cont">
                <tooltip placement="bottom" content="我悬浮在下边~">
                  <div class="item">下</div>
                </tooltip>
              </div>
            </template>
            <style scoped lang="less">
            .tooltip-container {
              height: 100px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;

              .tooltip-content {
                border: 1px solid gray;
                border-radius: 4px;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 8px;
              }
            }

            .item {
              width: 75px;
              height: 75px;
              border: 1px solid gray;
              margin: 100px auto;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
            }

            .cont {
              height: 75px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            </style>
      `,
    },
    {
      id: "tooltip-2",
      title: {
        text: "placement 不同的出现位置",
        desc: "通过placement字段选择tooltip出现的位置",
      },
      code: `
            <template>
              <div style="margin-top: 50px" class="cont">
                <tooltip placement="top" content="我悬浮在上边~">
                  <div class="item">上</div>
                </tooltip>
              </div>
              <div style="margin: 50px 0; gap: 150px" class="cont">
                <tooltip placement="left" content="我悬浮在左边~">
                  <div class="item">左</div>
                </tooltip>
                <tooltip placement="right" content="我悬浮在右边~">
                  <div class="item">右</div>
                </tooltip>
              </div>
              <div style="margin-bottom: 50px" class="cont">
                <tooltip placement="bottom" content="我悬浮在下边~">
                  <div class="item">下</div>
                </tooltip>
              </div>
            </template>
            <style scoped lang="less">
            .tooltip-container {
              height: 100px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;

              .tooltip-content {
                border: 1px solid gray;
                border-radius: 4px;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 8px;
              }
            }

            .item {
              width: 75px;
              height: 75px;
              border: 1px solid gray;
              margin: 100px auto;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
            }

            .cont {
              height: 75px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            </style>
      `,
    },
    {
      id: "tooltip-3",
      title: {
        text: "theme 颜色主题",
        desc: "根据页面的风格选择不同的主题",
      },
      code: `
            <template>
              <div style="margin-top: 50px" class="cont">
                <tooltip placement="top" content="我悬浮在上边~">
                  <div class="item">上</div>
                </tooltip>
              </div>
              <div style="margin: 50px 0; gap: 150px" class="cont">
                <tooltip placement="left" content="我悬浮在左边~">
                  <div class="item">左</div>
                </tooltip>
                <tooltip placement="right" content="我悬浮在右边~">
                  <div class="item">右</div>
                </tooltip>
              </div>
              <div style="margin-bottom: 50px" class="cont">
                <tooltip placement="bottom" content="我悬浮在下边~">
                  <div class="item">下</div>
                </tooltip>
              </div>
            </template>
            <style scoped lang="less">
            .tooltip-container {
              height: 100px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;

              .tooltip-content {
                border: 1px solid gray;
                border-radius: 4px;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 8px;
              }
            }

            .item {
              width: 75px;
              height: 75px;
              border: 1px solid gray;
              margin: 100px auto;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
            }

            .cont {
              height: 75px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            </style>
      `,
    },
    {
      id: "tooltip-4",
      title: {
        text: "delay 触发延迟",
        desc: "在鼠标移动频率较高的区域,频繁触发tooltip可能会造成困扰,通过设置触发延迟让他的出现次数减少",
      },
      code: `
            <template>
              <div style="margin-top: 50px" class="cont">
                <tooltip placement="top" content="我悬浮在上边~">
                  <div class="item">上</div>
                </tooltip>
              </div>
              <div style="margin: 50px 0; gap: 150px" class="cont">
                <tooltip placement="left" content="我悬浮在左边~">
                  <div class="item">左</div>
                </tooltip>
                <tooltip placement="right" content="我悬浮在右边~">
                  <div class="item">右</div>
                </tooltip>
              </div>
              <div style="margin-bottom: 50px" class="cont">
                <tooltip placement="bottom" content="我悬浮在下边~">
                  <div class="item">下</div>
                </tooltip>
              </div>
            </template>
            <style scoped lang="less">
            .tooltip-container {
              height: 100px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;

              .tooltip-content {
                border: 1px solid gray;
                border-radius: 4px;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 8px;
              }
            }

            .item {
              width: 75px;
              height: 75px;
              border: 1px solid gray;
              margin: 100px auto;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
            }

            .cont {
              height: 75px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            </style>
      `,
    },
    {
      id: "tooltip-5",
      title: {
        text: "offset 箭头到内容的距离",
        desc: "三角形尖端到绑定元素的垂直距离,默认值为20(px)",
      },
      code: `
            <template>
              <div style="margin-top: 50px" class="cont">
                <tooltip placement="top" content="我悬浮在上边~">
                  <div class="item">上</div>
                </tooltip>
              </div>
              <div style="margin: 50px 0; gap: 150px" class="cont">
                <tooltip placement="left" content="我悬浮在左边~">
                  <div class="item">左</div>
                </tooltip>
                <tooltip placement="right" content="我悬浮在右边~">
                  <div class="item">右</div>
                </tooltip>
              </div>
              <div style="margin-bottom: 50px" class="cont">
                <tooltip placement="bottom" content="我悬浮在下边~">
                  <div class="item">下</div>
                </tooltip>
              </div>
            </template>
            <style scoped lang="less">
            .tooltip-container {
              height: 100px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;

              .tooltip-content {
                border: 1px solid gray;
                border-radius: 4px;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 8px;
              }
            }

            .item {
              width: 75px;
              height: 75px;
              border: 1px solid gray;
              margin: 100px auto;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
            }

            .cont {
              height: 75px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            </style>
      `,
    },
  ],
};
