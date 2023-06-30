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
import top from "./components/top/index.vue";
import collapse from "./components/collapse/index.vue";
import { reactive, ref } from "vue";

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

const tree = reactive(props.sideBarData);

let checkedState = ref("none");

let count = ref(0);

const checkedNodeArray = reactive([]);

// 获取一个节点的所有叶子节点个数()
const getNodeTotal1 = (node) => {
  let total = 0;
  const children = [];
  // 叶子节点
  if (!node.children || node.children.length === 0) {
    return {
      total: 1,
    };
  }
  for (let child of node.children) {
    const obj = getNodeTotal1(child);
    total += obj.total;
    children.push(obj);
  }
  return {
    total,
    children,
  };
};

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

// 所有节点的个数
const children = [];
let total = 0;
for (let node of tree) {
  const tmp = getNodeTotal1(node);
  total += tmp.total;
  children.push(tmp);
}
const totalTree = {
  total,
  children,
};

console.log("totalTree", totalTree);
</script>

<style scoped lang="less">
.sideBar-container {
  padding: 15px;
  border-right: 1px solid #e6e7eb;
}
</style>
