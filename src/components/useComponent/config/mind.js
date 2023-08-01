export default {
  title: {
    text: "Mind 思维导图",
    desc: "通过节点和连线绘制简易的思维导图 目前支持拖动、重命名、添加和删除功能",
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
      id: "mind-1",
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
      id: "mind-2",
      title: {
        text: "attributes 修改节点的样式属性",
        desc: "包括节点的行高、内间距、字体样式、边框颜色、按钮颜色等",
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
