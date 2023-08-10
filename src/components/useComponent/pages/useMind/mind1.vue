<template>
  <mind
    :tree="tree"
    @treeChange="handleTreeChange"
    :maxWidth="1014"
    @nodeClick="handleNodeClick"
    @nodeEdit="handleNodeEdit"
    @addNode="handleAddNode"
    @deleteNode="handleDeleteNode"
    @dragNodeStart="handleDragStart"
    @dragNodeEnd="handleDragEnd"
  />
</template>

<script setup>
let tree = {
  label: "植物",
  id: "植物",
  children: [
    {
      label: "水果",
      id: "水果",
      children: [
        {
          label: "苹果 🍎",
          id: "苹果",
        },
        {
          label: "香蕉 🍌",
          id: "香蕉",
        },
        {
          label: "橙子 🍊",
          id: "橙子",
        },
      ],
    },
    {
      label: "蔬菜",
      id: "蔬菜",
      children: [
        {
          label: "茄子 🍆",
          id: "茄子",
        },
        {
          label: "南瓜",
          id: "南瓜",
        },
      ],
    },
  ],
};
const handleTreeChange = (newTree) => {
  tree = newTree;
  console.log("treeChange", tree);
};
const handleNodeClick = (node) => {
  console.log("click", node);
};
const handleNodeEdit = (node) => {
  console.log("edit", node);
};
const handleAddNode = (node) => {
  console.log("add", node);
};
const handleDeleteNode = (node) => {
  console.log("delete", node);
};
const handleDragStart = (node) => {
  console.log("drag-start", node);
};
const handleDragEnd = (node) => {
  console.log("drag-end", node);
};
</script>
