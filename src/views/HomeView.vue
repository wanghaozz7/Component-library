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
          <use-component-router
            v-for="component in stack"
            :key="component"
            :selectedArr="component.arr"
            :scrollOffset="scrollOffset"
            :componentName="component.name"
          ></use-component-router>
        </div>
      </scroll-bar>
    </div>
  </div>
</template>

<script setup name="HomeView">
import { reactive, ref } from "vue";

import sideBarConfig from "@/components/useComponent/config/sideBar";

const tableSelected = reactive([]);
const carouselSelected = reactive([]);
const tooltipSelected = reactive([]);

let scrollOffset = ref(0);

// 已选中的叶子节点一维数组
const checkedNodeArray = reactive([]);

// 追加顺序的数组
const stack = reactive([]);

// 侧边栏数据
const sideBarData = sideBarConfig.slice();

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
  const component = node.id.split("-")[0],
    id = node.id.split("-")[1];
  let idx = -1;
  for (let i in stack) {
    const obj = stack[i];
    if (obj.name === component) {
      idx = i;
      break;
    }
  }
  if (type === "add") {
    if (idx === -1) {
      stack.push({
        name: component,
        arr: [],
      });
      idx = stack.length - 1;
    }
    stack[idx].arr.push(node.id);
  } else {
    const arr = stack[idx].arr;
    let index = -1;
    for (let i in arr) {
      if (arr[i].id === node.id) {
        index = -1;
        break;
      }
    }
    arr.splice(index, 1);
    if (arr.length === 0) stack.splice(idx, 1);
  }
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
