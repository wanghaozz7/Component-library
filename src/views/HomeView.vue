<template>
  <div class="homeViewContainer">
    <!-- <scroll-bar showScrollBar="hover" :wheelSensitivity="50" direction="normal">
      <div class="sideBar">
        <side-bar
          :sideBarData="sideBarData"
          :defaultUnfoldAll="true"
          :rowHeight="40"
          @checkedNodeArrayChange="handleCheckedNodeArrayChange"
        />
      </div>
    </scroll-bar> -->
    <!-- <scroll-bar
      showScrollBar="hover"
      :wheelSensitivity="100"
      direction="normal"
    >
      <div class="mainContent">
        <tooltip
          :delay="300"
          placement="top"
          content="文字提示111111111111111111111111"
          theme="light"
        >
          <div class="tmp">文字提示</div>
        </tooltip>
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
                  background-color: lightgreen;
                "
              >
                +++++{{ item }}+++++
              </div>
            </carousel-item>
          </carousel>
        </div>
        <useComponent />
      </div>
    </scroll-bar> -->
    <div class="sideBar">
      <side-bar
        :sideBarData="sideBarData"
        :defaultUnfoldAll="true"
        :rowHeight="40"
        @checkedNodeArrayChange="handleCheckedNodeArrayChange"
      />
    </div>
    <div class="mainContent">
      <!-- <tooltip
        :delay="300"
        placement="top"
        content="文字提示111111111111111111111111"
        theme="light"
      >
        <div class="tmp">文字提示</div>
      </tooltip>
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
                background-color: lightgreen;
              "
            >
              +++++{{ item }}+++++
            </div>
          </carousel-item>
        </carousel>
      </div> -->
      <use-component />
    </div>
  </div>
</template>

<script setup name="HomeView">
import { reactive } from "vue";

import sideBar from "@/components/sideBar/index.vue";
import tooltip from "@/components/tooltip/index.vue";
import carousel from "@/components/carousel/index.vue";
import carouselItem from "@/components/carousel/components/carouselItem/index.vue";
import scrollBar from "@/components/scrollBar/index.vue";
import useComponent from "@/components/useComponent/index.vue";

// 已选中的叶子节点一维数组
let checkedNodeArray = reactive([]);
// 侧边栏数据
const sideBarData = [
  {
    label: "一级节点10000000000000000000000",
    defaultUnfold: false,
    children: [
      {
        label: "二级节点10000000000000000000000",
        defaultUnfold: false,
        children: [
          {
            label: "三级节点110000000000000000000000",
            defaultUnfold: false,
            children: [
              {
                label: "四级节点111000000000000000000000000",
                defaultUnfold: false,
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
    height: auto;
  }
  .mainContent {
    flex: 1;
    align-items: center;
    justify-content: center;
    // background-color: rgb(207, 207, 207);
    .carousel-container {
      width: 600px;
      height: 350px;
      margin: 100px auto;
    }
  }
}

.tmp {
  width: 80px;
  margin: 100px 250px;
  cursor: pointer;
  line-height: 125px;
  border: 1px solid #eee;
  text-align: center;
  background-color: #fff;
  border-radius: 4px;
  white-space: nowrap;
}

.carousel {
  width: 100%;
  height: 100%;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
}
</style>
