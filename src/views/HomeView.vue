<template>
  <div class="homeViewContainer">
    <i-scroll-bar showScrollBar="hover">
      <div class="sideBar">
        <i-side-bar
          :sideBarData="sideBarData"
          :defaultUnfoldAll="true"
          :defaultCheckedAll="false"
          :rowHeight="40"
          :showCheckBox="true"
          @nodeCheckedChange="handleNodeCheckedChange"
        />
      </div>
    </i-scroll-bar>
    <div class="mainContent">
      <i-scroll-bar showScrollBar="hover" @offsetChange="handleOffsetChange">
        <div class="block">
          <transition-group name="translate-right-down" appear>
            <use-component-router
              v-for="component in componentStack"
              :key="component"
              :selectedArr="component.arr"
              :scrollOffset="scrollOffset"
              :componentName="component.name"
            />
          </transition-group>
        </div>
      </i-scroll-bar>
    </div>
  </div>
</template>

<script setup name="HomeView">
import { reactive, ref } from "vue";

import sideBarConfig from "@/components/useComponent/config/index.js";

const componentStack = reactive([]);
let scrollOffset = ref(0);

const sideBarData = sideBarConfig.slice();

const handleOffsetChange = (offset) => (scrollOffset.value = offset);

const handleNodeCheckedChange = (node, type) => {
  const component = node.id.slice(0, node.id.lastIndexOf("-"));
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
  width: 1426px;
  margin: auto;
  display: flex;

  .sideBar {
    width: 290px;
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
