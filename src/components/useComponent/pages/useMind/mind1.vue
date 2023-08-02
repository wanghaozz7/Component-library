<template>
  <mind :tree="tree" @treeChange="handleTreeChange" :maxWidth="1014" />
</template>

<script setup name="mind1">
let tree = {
  label: '植物',
  id: '植物',
  children: [
    {
      label: '水果',
      id: '水果',
      children: [
        {
          label: '苹果 🍎',
          id: '苹果'
        }, {
          label: '香蕉 🍌',
          id: '香蕉'
        }, {
          label: '橙子 🍊',
          id: '橙子'
        }
      ]
    },
    {
      label: '蔬菜',
      id: '蔬菜',
      children: [
        {
          label: '茄子 🍆',
          id: '茄子',
        }, {
          label: '南瓜',
          id: '南瓜'
        }
      ]
    }
  ]
}
const handleTreeChange = newTree => {
  tree = newTree;
  console.log(tree);
}
</script>


