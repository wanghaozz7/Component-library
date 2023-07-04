<template>
  <div class="indicator-group">
    <div v-for="idx in indicatorCount" :key="idx" @click="handleClick(idx)">
      <dot :isActive="idx === activeIdx" />
    </div>
  </div>
</template>

<script setup name="indicatorGroup">
import dot from "./components/dot/index.vue";

const props = defineProps({
  // 个数
  indicatorCount: {
    type: Number,
    default: 5,
  },
  // 选中索引
  activeIdx: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["change"]);

const handleClick = (idx) => {
  emit("change", idx);
};
</script>

<style scoped lang="less">
.indicator-group {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translate(-50%);
  display: flex;
}
</style>
