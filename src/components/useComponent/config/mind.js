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
        <mind :tree="tree" @treeChange="handleTreeChange" :maxWidth="1014" />
      </template>
      
      <script setup name="mind1">
      let tree = {
        label: '植物',
        id: '植物',
        children: [
          {
            label: '水果',
            id: '水果',
            children: [
              {
                label: '苹果 🍎',
                id: '苹果'
              }, {
                label: '香蕉 🍌',
                id: '香蕉'
              }, {
                label: '橙子 🍊',
                id: '橙子'
              }
            ]
          },
          {
            label: '蔬菜',
            id: '蔬菜',
            children: [
              {
                label: '茄子 🍆',
                id: '茄子',
              }, {
                label: '南瓜',
                id: '南瓜'
              }
            ]
          }
        ]
      }
      const handleTreeChange = newTree => {
        tree = newTree;
        console.log(tree);
      }
      </script>
      `,
    },
    {
      id: "mind-2",
      title: {
        text: "ligatureType 节点之间连线的类型",
        desc: "包括直线、折线、曲线三种类型",
      },
      code: `
      <template>
        <mind :tree="tree" @treeChange="handleTreeChange" :maxWidth="1014" ligatureType="curve" />
      </template>
      
      <script setup name="mind2">
      let tree = {
        label: '植物',
        id: '植物',
        children: [
          {
            label: '水果',
            id: '水果',
            children: [
              {
                label: '苹果 🍎',
                id: '苹果'
              }, {
                label: '香蕉 🍌',
                id: '香蕉',
                children: [
                  {
                    label: '猕猴桃 🥝',
                    id: '猕猴桃'
                  },
                  {
                    label: '奇异果 🥝',
                    id: '奇异果'
                  }
                ]
              }, {
                label: '橙子 🍊',
                id: '橙子'
              }
            ]
          },
          {
            label: '蔬菜',
            id: '蔬菜',
            children: [
              {
                label: '白菜',
                id: '白菜'
              }, {
                label: '西红柿 🍅',
                id: '西红柿',
                children: [
                  {
                    label: '番茄',
                    id: '番茄'
                  },
                  {
                    label: '柿子',
                    id: '柿子'
                  }
                ]
              }, {
                label: '茄子 🍆',
                id: '茄子'
              }
            ]
          },
        ]
      }
      const handleTreeChange = newTree => {
        tree = newTree;
        console.log(tree);
      }
      </script>
      `,
    },
    {
      id: "mind-3",
      title: {
        text: "nodeAttributes 样式属性",
        desc: "包括节点边框颜色、高亮颜色、连线颜色、字体样式、边距等",
      },
      code: `
      <template>
        <mind :tree="tree" @treeChange="handleTreeChange" :maxWidth="1014" ligatureType="curve" defaultStrokeStyle="#000"
          hoverStrokeStyle="lightgreen" :ligatureLineWidth="5" ligatureStrokeStyle="pink" :buttonRadius="15"
          buttonBackgroundColor="yellow" nodeInDragFillStyle="#eee" nodeInDragStrokeStyle="#eee" />
      </template>
      
      <script setup name="mind2">
      let tree = {
        label: '植物',
        id: '植物',
        children: [
          {
            label: '水果',
            id: '水果',
            children: [
              {
                label: '苹果 🍎',
                id: '苹果'
              }, {
                label: '香蕉 🍌',
                id: '香蕉',
                children: [
                  {
                    label: '猕猴桃 🥝',
                    id: '猕猴桃'
                  },
                  {
                    label: '奇异果 🥝',
                    id: '奇异果'
                  }
                ]
              }, {
                label: '橙子 🍊',
                id: '橙子'
              }
            ]
          },
          {
            label: '蔬菜',
            id: '蔬菜',
            children: [
              {
                label: '白菜',
                id: '白菜'
              }, {
                label: '西红柿 🍅',
                id: '西红柿',
                children: [
                  {
                    label: '番茄',
                    id: '番茄'
                  },
                  {
                    label: '柿子',
                    id: '柿子'
                  }
                ]
              }, {
                label: '茄子 🍆',
                id: '茄子'
              }
            ]
          },
        ]
      }
      const handleTreeChange = newTree => {
        tree = newTree;
        console.log(tree);
      }
      </script>
      `,
    },
  ],
};
