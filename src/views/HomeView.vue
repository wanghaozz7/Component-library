<template>
  <div class="sideBar"><side-bar :sideBarData="sideBarData" /></div>
  <div class="main-content"></div>
</template>

<script setup name="HomeView">
import sideBar from "@/components/sideBar1/index.vue";

const sideBarData = [
  {
    label: "一级节点1",
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
</script>

<style scoped lang="less">
.sideBar {
  width: 240px;
  // background: #e9bdbd;

  min-height: 100vh;
  overflow-y: auto;
}
.main-content {
  flex: 1;
  overflow-y: auto;

  background-color: lightgreen;
}
</style>
