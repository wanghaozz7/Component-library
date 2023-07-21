<template>
  <div class="homeViewContainer">
    <scroll-bar showScrollBar="hover">
      <div class="sideBar">
        <side-bar
          :sideBarData="sideBarData"
          :defaultUnfoldAll="true"
          :defaultCheckedAll="false"
          :rowHeight="40"
          @nodeCheckedChange="handleNodeCheckedChange"
        />
      </div>
    </scroll-bar>
    <div class="mainContent">
      <scroll-bar showScrollBar="hover" @offsetChange="handleOffsetChange">
        <div class="block">
          <use-component-router
            v-for="component in componentStack"
            :key="component"
            :selectedArr="component.arr"
            :scrollOffset="scrollOffset"
            :componentName="component.name"
          />
        </div>
      </scroll-bar>
    </div>
  </div>
</template>

<script setup name="HomeView">
import { reactive, ref } from "vue";
import sideBarConfig from "@/components/useComponent/config/sideBar";

const componentStack = reactive([]);
let scrollOffset = ref(0);

const sideBarData = sideBarConfig.slice();

const handleOffsetChange = (offset) => (scrollOffset.value = offset);

// params: node => 变化的节点,type => 变化的类型
const handleNodeCheckedChange = (node, type) => {
  const component = node.id.split("-")[0];
  const id = node.id.split("-")[1];

  let idx = componentStack.indexOf(
    componentStack.find((x) => {
      return x.name === component;
    })
  );

  if (type === "add") {
    if (idx === -1) {
      componentStack.unshift({
        name: component,
        arr: new Array(),
      });
      idx = 0;
    }
    componentStack[idx].arr.unshift(node.id);
  } else {
    const arr = componentStack[idx].arr;
    let index = arr.indexOf(node.id);
    arr.splice(index, 1);
    if (arr.length === 0) componentStack.splice(idx, 1);
  }
};
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
