export default {
  title: {
    text: "Switch 开关",
    desc: "表示两种相互对立的状态间的切换，多用于触发「开/关」。",
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
      id: "switch-1",
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
  ],
};
