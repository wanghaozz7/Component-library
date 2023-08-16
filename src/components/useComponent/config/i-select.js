export default {
  title: {
    text: "Select 选择器",
    desc: "通过节点和连线绘制简易的思维导图 目前支持拖动、重命名、添加和删除功能",
  },
  lists: [
    {
      title: "Select Attributes",
      type: "attributes",
      listData: [
        {
          params: "v-model",
          desc: "绑定值",
          type: "String/Boolean/Number",
          optional: "",
          default: "",
        },
        {
          params: "option",
          desc: "下拉框的配置项",
          type: "Array",
          optional: "",
          default: "",
        },
        {
          params: "disabled",
          desc: "是否禁用",
          type: "Boolean",
          optional: "",
          default: "false",
        },
        {
          params: "clearable",
          desc: "是否可以清除状态",
          type: "Boolean",
          optional: "",
          default: "false",
        },
        {
          params: "width",
          desc: "选择器的宽度",
          type: "Number",
          optional: "",
          default: "240",
        },
        {
          params: "height",
          desc: "选择器的高度",
          type: "Number",
          optional: "",
          default: "35",
        },
        {
          params: "size",
          desc: "选择器的尺寸",
          type: "String",
          optional: "large/medium/mini",
          default: "medium",
        },
        {
          params: "placeholder",
          desc: "同原生input的placeholder",
          type: "String",
          optional: "",
          default: "请选择",
        },
      ],
    },
    {
      title: "Select Events",
      type: "events",
      listData: [
        {
          method: "select",
          desc: "点击下拉框选项后的回调",
          params: "点击的配置项",
        },
        {
          method: "change",
          desc: "与select的区别是只有在选项发生变化时会触发",
          params: "点击的配置项",
        },
        {
          method: "visibleChange",
          desc: "下拉菜单显示或隐藏时的回调",
          params: "下拉菜单的显隐状态",
        },
        {
          method: "clear",
          desc: "状态被清理时的回调",
          params: "",
        },
        {
          method: "focus",
          desc: "输入框聚焦时的回调",
          params: "",
        },
        {
          method: "blur",
          desc: "输入框失去焦点时的回调",
          params: "",
        },
      ],
    },
  ],
  children: [
    {
      id: "use-i-select-1",
      title: {
        text: "基础用法",
        desc: "鼠标悬浮在内容时立即出现文字提示",
      },
      code: `
          <template>
            <mind
              :tree="tree"
              @treeChange="handleTreeChange"
              :maxWidth="1014"
              @nodeClick="handleNodeClick"
              @nodeEdit="handleNodeEdit"
              @addNode="handleAddNode"
              @deleteNode="handleDeleteNode"
              @dragNodeStart="handleDragStart"
              @dragNodeEnd="handleDragEnd"
            />
          </template>

          <script setup>
          let tree = {
            label: "植物",
            id: "植物",
            children: [
              {
                label: "水果",
                id: "水果",
                children: [
                  {
                    label: "苹果 🍎",
                    id: "苹果",
                  },
                  {
                    label: "香蕉 🍌",
                    id: "香蕉",
                  },
                  {
                    label: "橙子 🍊",
                    id: "橙子",
                  },
                ],
              },
              {
                label: "蔬菜",
                id: "蔬菜",
                children: [
                  {
                    label: "茄子 🍆",
                    id: "茄子",
                  },
                  {
                    label: "南瓜",
                    id: "南瓜",
                  },
                ],
              },
            ],
          };
          const handleTreeChange = (newTree) => {
            tree = newTree;
            console.log("treeChange", tree);
          };
          const handleNodeClick = (node) => {
            console.log("click", node);
          };
          const handleNodeEdit = (node) => {
            console.log("edit", node);
          };
          const handleAddNode = (node) => {
            console.log("add", node);
          };
          const handleDeleteNode = (node) => {
            console.log("delete", node);
          };
          const handleDragStart = (node) => {
            console.log("drag-start", node);
          };
          const handleDragEnd = (node) => {
            console.log("drag-end", node);
          };
          </script>

      `,
    },
    {
      id: "use-i-select-2",
      title: {
        text: "size 定制尺寸",
        desc: "可以用size指定通用的尺寸 也可以使用width和height定制大小 同时指定时后者权重较大",
      },
      code: `
          <template>
            <mind
              :tree="tree"
              @treeChange="handleTreeChange"
              :maxWidth="1014"
              @nodeClick="handleNodeClick"
              @nodeEdit="handleNodeEdit"
              @addNode="handleAddNode"
              @deleteNode="handleDeleteNode"
              @dragNodeStart="handleDragStart"
              @dragNodeEnd="handleDragEnd"
            />
          </template>

          <script setup>
          let tree = {
            label: "植物",
            id: "植物",
            children: [
              {
                label: "水果",
                id: "水果",
                children: [
                  {
                    label: "苹果 🍎",
                    id: "苹果",
                  },
                  {
                    label: "香蕉 🍌",
                    id: "香蕉",
                  },
                  {
                    label: "橙子 🍊",
                    id: "橙子",
                  },
                ],
              },
              {
                label: "蔬菜",
                id: "蔬菜",
                children: [
                  {
                    label: "茄子 🍆",
                    id: "茄子",
                  },
                  {
                    label: "南瓜",
                    id: "南瓜",
                  },
                ],
              },
            ],
          };
          const handleTreeChange = (newTree) => {
            tree = newTree;
            console.log("treeChange", tree);
          };
          const handleNodeClick = (node) => {
            console.log("click", node);
          };
          const handleNodeEdit = (node) => {
            console.log("edit", node);
          };
          const handleAddNode = (node) => {
            console.log("add", node);
          };
          const handleDeleteNode = (node) => {
            console.log("delete", node);
          };
          const handleDragStart = (node) => {
            console.log("drag-start", node);
          };
          const handleDragEnd = (node) => {
            console.log("drag-end", node);
          };
          </script>

      `,
    },
    {
      id: "use-i-select-3",
      title: {
        text: "disabled 禁用状态和禁用选项",
        desc: "通过disabled字段使select不可用或者使选项不可用",
      },
      code: `
          <template>
            <mind
              :tree="tree"
              @treeChange="handleTreeChange"
              :maxWidth="1014"
              @nodeClick="handleNodeClick"
              @nodeEdit="handleNodeEdit"
              @addNode="handleAddNode"
              @deleteNode="handleDeleteNode"
              @dragNodeStart="handleDragStart"
              @dragNodeEnd="handleDragEnd"
            />
          </template>

          <script setup>
          let tree = {
            label: "植物",
            id: "植物",
            children: [
              {
                label: "水果",
                id: "水果",
                children: [
                  {
                    label: "苹果 🍎",
                    id: "苹果",
                  },
                  {
                    label: "香蕉 🍌",
                    id: "香蕉",
                  },
                  {
                    label: "橙子 🍊",
                    id: "橙子",
                  },
                ],
              },
              {
                label: "蔬菜",
                id: "蔬菜",
                children: [
                  {
                    label: "茄子 🍆",
                    id: "茄子",
                  },
                  {
                    label: "南瓜",
                    id: "南瓜",
                  },
                ],
              },
            ],
          };
          const handleTreeChange = (newTree) => {
            tree = newTree;
            console.log("treeChange", tree);
          };
          const handleNodeClick = (node) => {
            console.log("click", node);
          };
          const handleNodeEdit = (node) => {
            console.log("edit", node);
          };
          const handleAddNode = (node) => {
            console.log("add", node);
          };
          const handleDeleteNode = (node) => {
            console.log("delete", node);
          };
          const handleDragStart = (node) => {
            console.log("drag-start", node);
          };
          const handleDragEnd = (node) => {
            console.log("drag-end", node);
          };
          </script>

      `,
    },
    {
      id: "use-i-select-4",
      title: {
        text: "clearable 清除当前的选中值",
        desc: "通过disabled字段使select不可用或者使选项不可用",
      },
      code: `
          <template>
            <mind
              :tree="tree"
              @treeChange="handleTreeChange"
              :maxWidth="1014"
              @nodeClick="handleNodeClick"
              @nodeEdit="handleNodeEdit"
              @addNode="handleAddNode"
              @deleteNode="handleDeleteNode"
              @dragNodeStart="handleDragStart"
              @dragNodeEnd="handleDragEnd"
            />
          </template>

          <script setup>
          let tree = {
            label: "植物",
            id: "植物",
            children: [
              {
                label: "水果",
                id: "水果",
                children: [
                  {
                    label: "苹果 🍎",
                    id: "苹果",
                  },
                  {
                    label: "香蕉 🍌",
                    id: "香蕉",
                  },
                  {
                    label: "橙子 🍊",
                    id: "橙子",
                  },
                ],
              },
              {
                label: "蔬菜",
                id: "蔬菜",
                children: [
                  {
                    label: "茄子 🍆",
                    id: "茄子",
                  },
                  {
                    label: "南瓜",
                    id: "南瓜",
                  },
                ],
              },
            ],
          };
          const handleTreeChange = (newTree) => {
            tree = newTree;
            console.log("treeChange", tree);
          };
          const handleNodeClick = (node) => {
            console.log("click", node);
          };
          const handleNodeEdit = (node) => {
            console.log("edit", node);
          };
          const handleAddNode = (node) => {
            console.log("add", node);
          };
          const handleDeleteNode = (node) => {
            console.log("delete", node);
          };
          const handleDragStart = (node) => {
            console.log("drag-start", node);
          };
          const handleDragEnd = (node) => {
            console.log("drag-end", node);
          };
          </script>

      `,
    },
  ],
};
