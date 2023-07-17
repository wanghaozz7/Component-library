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
          params: "delay",
          desc: "消失的延迟",
          type: "number",
          optional: "",
          default: "500",
        },
        {
          params: "content",
          desc: "悬浮的文字提示",
          type: "function/object",
          optional: "",
          default: "我是tooltip",
        },
        {
          params: "theme",
          desc: "样式风格",
          type: "string",
          optional: "light/dark",
          default: "light",
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
