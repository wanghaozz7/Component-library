<template>
  <mind :tree="tree" @treeChange="handleTreeChange" :maxWidth="1014" />
</template>

<script setup name="mind1">
let tree = {
  label: '根节点',
  id: '根节点',

}
const handleTreeChange = newTree => {
  tree = newTree;
  console.log(tree);
}
</script>


