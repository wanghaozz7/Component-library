<template>
  <div class="top">
    <div class="selected-count">已选中{{ checkedCount }}条</div>
    <div class="selected-all-root">
      <checkBox @check="handleCheck" :checkedState="checkedState" />
    </div>
  </div>
</template>

<script setup name="top">
import checkBox from "../collapse/collapseItem/components/checkBox/index.vue";

const props = defineProps({
  checkedCount: {
    type: Number,
    default: 0,
  },
  checkedState: {
    type: String,
    default: "none",
  },
});

const emit = defineEmits(["rootStateChange"]);

const handleCheck = (state) => {
  emit("rootStateChange", state);
};
</script>

<style scoped lang="less">
.top {
  height: 40px;
  background-color: lightblue;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .selected-count {
    line-height: 40px;
    font-size: 14px;
    color: azure;
  }
  .selected-all-root {
  }
}
</style>
