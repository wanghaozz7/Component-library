<template>
  <span
    class="selector"
    @click="handleClick"
    :class="{ active: selectedType === 0 || selectedType === 2 }"
  >
    <!-- 全选 -->
    <img
      src="./icon/select.svg"
      style="width: 14px; height: 14px"
      v-show="selectedType === 0"
    />
    <!-- 全不选 -->
    <img
      src="./icon/select.svg"
      style="width: 14px; height: 14px"
      v-show="selectedType === 1"
    />
    <!-- 部分选中 -->
    <img
      src="./icon/minus-bold.svg"
      style="width: 14px; height: 14px"
      v-show="selectedType === 2"
    />
  </span>
</template>

<script>
export default {
  name: "selector",
  props: {
    // 当前选中的状态(全选，全不选，部分选)
    selectedType: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    handleClick() {
      this.$emit("isChecked");
    },
  },
};
</script>

<script setup name="selector">
const props = defineProps({
  selectedType: {
    type: Number,
    default: 1,
  },
});
const emit = defineEmits(["isChecked"]);
const handleClick = () => {
  emit("isChecked");
};
</script>

<style scoped lang="less">
.selector {
  width: 16px !important;
  height: 16px !important;
  overflow: hidden;
  border-radius: 2px;
  border: 1px solid #bebebe;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #fff !important;
  &.active {
    background-color: #2258f4 !important;
    border: 0px solid transparent !important;
  }
}
</style>
