<template>
  <th
    :style="headerCellStyle"
    class="header-cell-class"
    :prop="prop"
    :width="width"
    ref="th"
  >
    <slot />
    {{ label }}
  </th>
</template>
<script setup>
import { computed, onMounted, getCurrentInstance, ref } from "vue";

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
  border.value = rawValue === "false" ? false : true;
  // averagerWidth在父组件onMounted后计算 子组件的onMounted在父组件之前 设置定时器加入宏任务队列
  setTimeout(() => {
    averageWidth = attr.averageWidth.nodeValue;
    headerWidth.value =
      props.width !== -1 ? props.width : Number.parseInt(averageWidth);
  }, 0);
});
</script>

<style lang="less" scoped>
.header-cell-class {
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
