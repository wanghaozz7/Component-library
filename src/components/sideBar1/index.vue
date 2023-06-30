<template>
  <div class="sideBar-container">
    <top
      :checkedCount="count"
      :checkedState="checkedState"
      @rootStateChange="handleRootStateChange"
    />
    <collapse
      :collapseData="tree"
      :total="total"
      @collapseCountChange="handleCollapseCountChange"
      @collapseStateChange="handleCollapseStateChange"
      :checkedState="checkedState"
    />
  </div>
</template>

<script setup name="sideBar">
import top from "./components/top/index.vue";
import collapse from "./components/collapse/index.vue";
import { reactive, ref, onMounted } from "vue";

const props = defineProps({
  // 树形结构
  sideBarData: {
    type: Array,
    default() {
      return [];
    },
  },
});

const tree = reactive(props.sideBarData);

let checkedState = ref("none");

let count = ref(0);

const getNodeCount = (node) => {
  let count = 1;
  // 叶子节点
  if (!node.children || node.children.length === 0) {
    node.count = count;
    return count;
  }
  for (let children of node.children) {
    count += getNodeCount(children);
  }

  node.count = count;
  return count;
};

const handleCollapseCountChange = (newCount) => {
  console.log("rootCount", newCount);
  count.value = newCount;
};

const handleCollapseStateChange = (state) => {
  checkedState.value = state;
};

const handleRootStateChange = (state) => {
  checkedState.value = state;
  if (state === "all") count.value = total;
  else count.value = 0;
};

// 所有节点的个数
let total = 0;
for (let node of tree) {
  total += getNodeCount(node);
}
</script>

<style scoped lang="less">
.sideBar-container {
  padding: 15px;
  border-right: 1px solid #e6e7eb;
}
</style>
