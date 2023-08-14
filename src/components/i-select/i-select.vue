<template>
  <div class="select">
    <input type="text" style="width: 210px; height: 35px" />
    <div class="icon"></div>
  </div>
</template>

<script setup name="select">
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});
</script>

<style scoped lang="less">
input[type="text"] {
  border: 0;
  outline: none;
  box-sizing: border-box;
  border-radius: 4px;
}
.select {
  width: 240px;
  height: 35px;
  border: 1px solid #eee;
  border-radius: 4px;
  padding-left: 15px;
  &:hover {
    border-color: gray;
  }
}
</style>
