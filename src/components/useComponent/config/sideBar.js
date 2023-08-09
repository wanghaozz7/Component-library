export default {
  title: {
    text: "Sidebar 消息提示",
    desc: "常用于用户交互操作之后的反馈",
  },
  lists: [
    {
      title: "Sidebar Attributes",
      listData: [
        {
          params: "sideBarData",
          desc: "数据",
          type: "Array",
          optional: "",
          default: "",
        },
        {
          params: "rowHeight",
          desc: "每一行的高度",
          type: "Number",
          optional: "",
          default: "32",
        },
        {
          params: "defaultCheckedAll",
          desc: "默认全选",
          type: "Boolean",
          optional: "",
          default: "false",
        },
        {
          params: "defaultUnfoldAll",
          desc: "默认展开全部节点",
          type: "Boolean",
          optional: "",
          default: "true",
        },
        {
          params: "showCheckBox",
          desc: "是否显示勾选框",
          type: "Boolean",
          optional: "",
          default: "false",
        },
      ],
      type: "attributes",
    },
    {
      title: "Carousel Events",
      type: "events",
      listData: [
        {
          method: "checkedNodeArrayChange",
          desc: "节点选中状态变化时的回调(在showCheckBox为true的情况下触发)",
          params:
            "包含所有被勾选的叶子节点的一维数组(按照追加顺序 最后一次点击的在队首)",
        },
        {
          method: "nodeCheckedChange",
          desc: "叶子节点被点击时的回调",
          params: "被点击的叶子节点",
        },
      ],
    },
  ],
  children: [
    {
      id: "sidebar-1",
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
      id: "sidebar-2",
      title: {
        text: "showCheckBox 显示勾选框",
        desc: "该字段为true情况下 侧边栏变成了一个树形结构多选框 可以以追加的方式监听所有被选择的叶子节点",
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
