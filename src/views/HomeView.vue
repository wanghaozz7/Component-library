<template>
  <div class="homeViewContainer">
    <div class="sideBar">
      <side-bar
        :sideBarData="sideBarData"
        :defaultUnfoldAll="false"
        :rowHeight="40"
        @checkedNodeArrayChange="handleCheckedNodeArrayChange"
      />
    </div>
    <div class="mainContent"></div>
  </div>
</template>

<script setup name="HomeView">
import { reactive } from "vue";

import sideBar from "@/components/sideBar/index.vue";

// 已选中的叶子节点一维数组
let checkedNodeArray = reactive([]);
// 侧边栏数据
const sideBarData = [
  {
    label: "一级节点10000000000000000000000",
    defaultUnfold: true,
    children: [
      {
        label: "二级节点10000000000000000000000",
        defaultUnfold: true,
        children: [
          {
            label: "三级节点110000000000000000000000",
            defaultUnfold: true,
            children: [
              {
                label: "四级节点111000000000000000000000000",
                defaultUnfold: true,
              },
            ],
          },
          { label: "三级节点12" },
          { label: "三级节点13" },
        ],
      },
      {
        label: "二级节点2",
        children: [
          { label: "三级节点21" },
          { label: "三级节点22" },
          { label: "三级节点23" },
        ],
      },
      {
        label: "二级节点3",
        children: [
          { label: "三级节点31" },
          { label: "三级节点32" },
          { label: "三级节点33" },
        ],
      },
    ],
  },
  {
    label: "一级节点2",
    children: [
      {
        label: "二级节点1",
        children: [
          { label: "三级节点11" },
          { label: "三级节点12" },
          { label: "三级节点13" },
        ],
      },
      {
        label: "二级节点2",
        children: [
          { label: "三级节点21" },
          { label: "三级节点22" },
          { label: "三级节点23" },
        ],
      },
      {
        label: "二级节点3",
        children: [
          { label: "三级节点31" },
          { label: "三级节点32" },
          { label: "三级节点33" },
        ],
      },
    ],
  },
];

// description: 叶子节点选中变化的回调
// params: array => 选中叶子节点的一维数组(保持追加顺序)
const handleCheckedNodeArrayChange = (array) => (checkedNodeArray = array);
</script>

<style scoped lang="less">
.homeViewContainer {
  display: flex;
  .sideBar {
    width: 240px;
    min-height: 100vh;
  }
  .mainContent {
    flex: 1;
    min-height: 100vh;
    background-color: rgb(187, 234, 187);
  }
}
</style>
