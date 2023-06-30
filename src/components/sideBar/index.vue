<template>
  <div class="sideBar-container">
    <top
      :checkedCount="count"
      :checkedState="checkedState"
      @rootStateChange="handleRootStateChange"
    />
    <collapse
      :collapseData="tree"
      :totalTree="totalTree"
      @collapseCountChange="handleCollapseCountChange"
      @collapseStateChange="handleCollapseStateChange"
      @nodeChange="handleNodeChange"
      :checkedState="checkedState"
    />
  </div>
</template>

<script setup name="sideBar">
import { reactive, ref } from "vue";

import top from "./components/top/index.vue";
import collapse from "./components/collapse/index.vue";

const props = defineProps({
  // 树形结构
  sideBarData: {
    type: Array,
    default() {
      return [];
    },
  },
});

const emit = defineEmits(["checkedNodeArrayChange"]);

// 侧边栏数据的树形结构
const tree = reactive(props.sideBarData);
// 选中的叶子节点的一维数组
const checkedNodeArray = reactive([]);
// 根节点的选中状态
let checkedState = ref("none");
// 选中个数
let count = ref(0);
// 所有节点的个数
let total = 0;

// 获取一个节点的所有叶子节点个数
const getNodeTotal = (node) => {
  let total = 0;
  const children = [];
  // 叶子节点
  if (!node.children || node.children.length === 0) {
    return {
      total: 1,
    };
  }
  for (let child of node.children) {
    const obj = getNodeTotal(child);
    total += obj.total;
    children.push(obj);
  }
  return {
    total,
    children,
  };
};

const children = [];
for (let node of tree) {
  const tmp = getNodeTotal(node);
  total += tmp.total;
  children.push(tmp);
}
const totalTree = {
  total,
  children,
};

console.log("totalTree", totalTree);
console.log("tree", tree);

// 根节点选中个数变化
const handleCollapseCountChange = (newCount) => {
  count.value = newCount;
};

// 根节点选中状态变化
const handleCollapseStateChange = (state) => {
  checkedState.value = state;
};

// top中点击选中根节点
const handleRootStateChange = (state) => {
  checkedState.value = state;
  if (state === "all") count.value = total;
  else count.value = 0;
};

// 叶子节点选中变化
const handleNodeChange = (node, type) => {
  switch (type) {
    // 追加
    case "add":
      checkedNodeArray.push(node);
      break;
    case "delete":
      const index = checkedNodeArray.indexOf((x) => {
        return x.label === node.label;
      });
      checkedNodeArray.splice(index, 1);
      break;
  }
  emit("checkedNodeArrayChange", checkedNodeArray);
};
</script>

<style scoped lang="less">
.sideBar-container {
  padding: 15px;
  border-right: 1px solid #e6e7eb;
}
</style>
