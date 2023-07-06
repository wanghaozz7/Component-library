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
    <div class="mainContent">
      <div style="display: flex; padding: 100px">
        <tooltip
          :delay="300"
          placement="top"
          content="文字提示111111111111111111111111"
        >
          <div
            style="
              width: 80px;
              height: 45px;
              margin-right: 100px;
              cursor: pointer;
              line-height: 45px;
              border: 1px solid #eee;
              text-align: center;
              background-color: #fff;
              border-radius: 4px;
              white-space: nowrap;
            "
          >
            文字提示
          </div>
        </tooltip>
        <tooltip
          :delay="300"
          placement="right"
          content="文字提示2222222222222222222222222222222222"
          ><div
            style="
              width: 250px;
              height: 45px;
              margin: 0 100px;
              cursor: pointer;
              line-height: 45px;
              border: 1px solid #eee;
              text-align: center;
              background-color: #fff;
              border-radius: 4px;
              white-space: nowrap;
            "
          >
            文字提示
          </div></tooltip
        >
        <tooltip :delay="300" placement="bottom" content="文字提示333"
          ><div
            style="
              width: 250px;
              height: 45px;
              cursor: pointer;
              margin-right: 200px;
              line-height: 45px;
              border: 1px solid #eee;
              text-align: center;
              background-color: #fff;
              border-radius: 4px;
              white-space: nowrap;
            "
          >
            文字提示
          </div></tooltip
        >
        <tooltip :delay="300" placement="left" content="文字提示444444444"
          ><div
            style="
              width: 150px;
              height: 45px;
              cursor: pointer;
              margin-right: 200px;
              line-height: 45px;
              border: 1px solid #eee;
              text-align: center;
              background-color: #fff;
              border-radius: 4px;
              white-space: nowrap;
            "
          >
            文字提示
          </div></tooltip
        >
      </div>
      <div class="carousel-container">
        <carousel
          :circular="true"
          :autoRolling="false"
          :interval="2500"
          indicatorType="rectangle"
          trigger="click"
        >
          <carousel-item v-for="item in 5" :key="item">
            <div
              style="
                width: 100%;
                height: 100%;
                font-size: 36px;
                display: flex;
                justify-content: center;
                align-items: center;
                background: #fff;
              "
            >
              +++++{{ item }}+++++
            </div>
          </carousel-item>
        </carousel>
      </div>
      <div style="width: 300px; height: 300px; margin: auto">
        <carousel
          :circular="true"
          :autoRolling="false"
          :interval="2500"
          indicatorType="rectangle"
          trigger="click"
        >
          <carousel-item v-for="item in 5" :key="item">
            <div
              style="
                width: 100%;
                height: 100%;
                font-size: 36px;
                display: flex;
                justify-content: center;
                align-items: center;
                background: #fff;
              "
            >
              ++{{ item }}++
            </div>
          </carousel-item>
        </carousel>
      </div>
    </div>
  </div>
</template>

<script setup name="HomeView">
import { reactive } from "vue";

import sideBar from "@/components/sideBar/index.vue";
import tooltip from "@/components/tooltip/index.vue";
import carousel from "@/components/carousel/index.vue";
import carouselItem from "@/components/carousel/components/carouselItem/index.vue";

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
              {
                label: "四级节点112000000000000000000000000",
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
    background-color: rgb(214, 253, 214);
    .carousel-container {
      width: 600px;
      height: 350px;
      margin: 100px auto;
    }
  }
}
</style>
