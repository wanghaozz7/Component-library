export default {
  title: {
    text: "Message 消息提示",
    desc: "常用于用户交互操作之后的反馈",
  },
  lists: [
    {
      title: "Carousel Attributes",
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
      type: "attributes",
    },
  ],
  children: [
    {
      id: "message-1",
      title: {
        text: "基础用法",
        desc: "默认消息提示会在3秒之后关闭 重复点击会从上到下进行排列",
      },
      code: `
          <template>
            <div class="wrapper">
              <div class="btn" @click="handleClick">打开消息提示</div>
            </div>
          </template>

          <script setup name="message1">
          import { getCurrentInstance } from 'vue'

          const { proxy } = getCurrentInstance();

          const handleClick = e => {
            proxy.$message({
              info: '这是一段默认的消息提示'
            })
          }

          </script>

          <style scoped lang="less">
          .wrapper {
            height: 150px;
            display: flex;
            align-items: center;
            margin-left: 20px;

            .btn {
              line-height: 25px;
              padding: 15px;
              border: 1px solid #eee;
              border-radius: 2px;
              cursor: pointer;

              &:hover {
                border-color: lightblue;
                color: skyblue;
              }
            }
          }
          </style>


      `,
    },
    {
      id: "message-2",
      title: {
        text: "type 不同状态",
        desc: "提供了四种不同的状态 分别是info(默认) warning(警告) error(错误) success(成功)",
      },
      code: `
          <template>
            <div class="wrapper">
              <div class="btn" @click="handleClick(item)" v-for="item in arr" :key="item">{{ item }}</div>
            </div>
          </template>

          <script setup name="message2">
          import { getCurrentInstance } from 'vue'

          const { proxy } = getCurrentInstance();

          const handleClick = type => {
            proxy.$message({
              info: '消息提示',
              type
            })
          }

          const arr = ['success', 'error', 'warning', 'info']

          </script>

          <style scoped lang="less">
          .wrapper {
            height: 150px;
            display: flex;
            align-items: center;
            margin-left: 20px;

            .btn {
              line-height: 25px;
              padding: 15px;
              border: 1px solid #eee;
              border-radius: 2px;
              margin: auto;
              cursor: pointer;

              &:hover {
                border-color: lightblue;
                color: skyblue;
              }
            }
          }
          </style>
      `,
    },
    {
      id: "message-3",
      title: {
        text: "showClose 显示关闭按钮",
        desc: "可以通过设置dalay延长显示时间 这时候添加关闭按钮可以主动关闭message",
      },
      code: `
          <template>
            <div class="wrapper">
              <div class="btn" @click="handleClick">打开消息提示</div>
            </div>
          </template>

          <script setup name="message1">
          import { getCurrentInstance } from 'vue'

          const { proxy } = getCurrentInstance();

          const handleClick = e => {
            proxy.$message({
              info: '这是一段默认的消息提示'
            })
          }

          </script>

          <style scoped lang="less">
          .wrapper {
            height: 150px;
            display: flex;
            align-items: center;
            margin-left: 20px;

            .btn {
              line-height: 25px;
              padding: 15px;
              border: 1px solid #eee;
              border-radius: 2px;
              cursor: pointer;

              &:hover {
                border-color: lightblue;
                color: skyblue;
              }
            }
          }
          </style>


      `,
    },
  ],
};
