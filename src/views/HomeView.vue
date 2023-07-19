<template>
  <div class="homeViewContainer">
    <scroll-bar showScrollBar="hover">
      <div class="sideBar">
        <side-bar
          :sideBarData="sideBarData"
          :defaultUnfoldAll="true"
          :defaultCheckedAll="true"
          :rowHeight="40"
          @checkedNodeArrayChange="handleCheckedNodeArrayChange"
          @nodeCheckedChange="handleNodeCheckedChange"
        />
      </div>
    </scroll-bar>
    <div class="mainContent">
      <scroll-bar showScrollBar="hover" @offsetChange="handleOffsetChange">
        <div class="block">
          <use-table :selectedArr="tableSelected" />
          <use-tooltip
            :selectedArr="tooltipSelected"
            :scrollOffset="scrollOffset"
          />
          <use-carousel :selectedArr="carouselSelected" />
        </div>
      </scroll-bar>
    </div>
  </div>
</template>

<script setup name="HomeView">
import { reactive, ref } from "vue";

const tableSelected = reactive([]);
const carouselSelected = reactive([]);
const tooltipSelected = reactive([]);

let scrollOffset = ref(0);

// 已选中的叶子节点一维数组
const checkedNodeArray = reactive([]);
// 侧边栏数据
const sideBarData = [
  {
    label: "Table 表格",
    children: [
      {
        label: "基础用法",
        id: "table-1",
        // defaultChecked: true,
      },
      {
        label: "带斑马纹表格",
        id: "table-2",
      },
      {
        label: "带边框表格",
        id: "table-3",
      },
    ],
  },
  {
    label: "Tooltip 文字提示",
    children: [
      {
        label: "基础用法",
        id: "tooltip-1",
        defaultChecked: true,
      },
    ],
  },
  {
    label: "Carousel 轮播图",
    children: [
      {
        label: "基础用法",
        id: "carousel-1",
      },
    ],
  },
];

// params: array => 选中叶子节点的一维数组(按照点击顺序的逆序)
const handleCheckedNodeArrayChange = (array) => {
  tableSelected.length = 0;
  carouselSelected.length = 0;
  tooltipSelected.length = 0;
  for (let node of array) {
    const id = node.id;
    switch (id.split("-")[0]) {
      case "table":
        tableSelected.push(id);
        break;
      case "tooltip":
        tooltipSelected.push(id);
        break;
      case "carousel":
        carouselSelected.push(id);
        break;
    }
  }
};

// params: node => 变化的节点,type => 变化的类型
const handleNodeCheckedChange = (node, type) => {
  // const component = node.id.split("-")[0],
  //   id = node.id.split("-")[1];
  // console.log("component,id", component, id);
  // if (type === "add") {
  // } else {
  // }
};

const handleOffsetChange = (offset) => (scrollOffset.value = offset);
</script>

<style scoped lang="less">
.homeViewContainer {
  width: 1226px;
  margin: auto;
  display: flex;

  .sideBar {
    width: 240px;
    height: auto;
  }

  .mainContent {
    flex: 1;

    .block {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }
  }
}
</style>
