<template>
  <div class="homeViewContainer">
    <scroll-bar showScrollBar="hover">
      <div class="sideBar">
        <side-bar
          :sideBarData="sideBarData"
          :defaultUnfoldAll="true"
          :defaultCheckedAll="false"
          :rowHeight="40"
          :showCheckBox="true"
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
import { reactive, ref, getCurrentInstance, onMounted } from "vue";

import sideBarConfig from "@/components/useComponent/config/sideBarData";

const componentStack = reactive([]);
let scrollOffset = ref(0);
const { ctx } = getCurrentInstance();

const sideBarData = sideBarConfig.slice();

const handleOffsetChange = (offset) => (scrollOffset.value = offset);

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

const removeScroll = (dom) => {
  // const dom = document.getElementById(idValue);
  let eventType = "mousewheel";
  if (document.mozFullScreen !== undefined) {
    eventType = "DOMMouseScroll";
  }
  if (dom) {
    dom.addEventListener(eventType, function (event) {
      if (event) {
        let scrollTop = this.scrollTop,
          scrollHeight = this.scrollHeight,
          height = this.clientHeight;

        const delta = event.wheelDelta
          ? event.wheelDelta
          : -(event.detail || 0);

        if (
          (delta > 0 && scrollTop <= delta) ||
          (delta < 0 && scrollHeight - height - scrollTop <= -1 * delta)
        ) {
          // IE浏览器下滚动会跨越边界直接影响父级滚动，因此，临界时候手动边界滚动定位
          this.scrollTop = delta > 0 ? 0 : scrollHeight;
          // 向上滚 || 向下滚
          event.preventDefault();
        }
      }
    });
  }
};

onMounted(() => {
  const scroll = ctx.$refs.scroll;
  removeScroll(scroll);
});
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
