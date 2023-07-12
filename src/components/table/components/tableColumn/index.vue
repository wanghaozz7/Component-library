<template>
  <th
    :style="headerCellStyle"
    class="header-cell"
    :prop="prop"
    :width="width"
    ref="th"
  >
    <slot />
    {{ label }}
  </th>
</template>
<script setup>
import { computed, onMounted, getCurrentInstance, ref, nextTick } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  width: {
    type: Number,
    default: -1,
  },
  prop: {
    type: String,
    default: "",
  },
  align: {
    type: String,
    default: "left",
  },
});

let border = ref(false);

let headerWidth = ref(0);

let averageWidth;

const ctx = getCurrentInstance().ctx;

const headerCellStyle = computed(() => {
  const width = headerWidth.value + "px";
  const borderColor = border.value ? "#ebeef5" : "";
  const textAlign = props.align;
  // console.log("width", width);
  return {
    width,
    borderColor,
    textAlign,
  };
});

onMounted(() => {
  const table = ctx.$refs.th.parentNode.parentNode.parentNode.parentNode;
  const attr = table.attributes;
  const rawValue = attr.border.nodeValue;
  if (rawValue === "false") border.value = false;
  else if (rawValue === "true") border.value = true;
  setTimeout(() => {
    averageWidth = attr.averageWidth.nodeValue;
    if (props.width !== -1) headerWidth.value = props.width;
    else headerWidth.value = Number.parseInt(averageWidth);
    console.log("headerWidth", headerWidth.value);
  }, 0);
});
</script>

<style lang="less" scoped>
.header-cell {
  // text-align: left;
  border-bottom: 1px solid #ebeef5;
  border-top: 1px solid transparent;
  border-left: 1px solid transparent;
  box-sizing: border-box;
  font-weight: bold;
  &:last-child {
    border-right: 1px solid transparent;
  }
}
</style>
