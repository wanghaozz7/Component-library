<template>
  <div class="collapse">
    <collapseItem
      v-for="node in collapseData"
      :node="node"
      :key="node.label"
      @childCountChange="handleChildCountChange"
      :fatherCheckedState="checkedState"
    />
  </div>
</template>

<script setup name="collapse">
import collapseItem from "./collapseItem/index.vue";
import { ref, watch } from "vue";

const props = defineProps({
  collapseData: {
    type: Array,
    default() {
      return [];
    },
  },
  total: {
    type: Number,
    default: 0,
  },
  checkedState: {
    type: String,
    default: "none",
  },
});

const emit = defineEmits(["collapseCountChange", "collapseStateChange"]);

let checkedState = ref("none");

let count = ref(0);

// 收集每个子节点的变化并更新
const handleChildCountChange = (change) => {
  count.value += change;
  // 当count变化后重新计算state
  if (count.value == props.total) checkedState.value = "all";
  else if (count.value == 0) checkedState.value = "none";
  else checkedState.value = "part";
  emit("collapseCountChange", count.value);
  emit("collapseStateChange", checkedState.value);
};

// 监听父节点的全选状态(单向向下)
watch(
  () => props.checkedState,
  (newValue, oldValue) => {
    if (newValue == "all") {
      count.value = props.total;
      checkedState.value = "all";
    } else if (newValue == "none") {
      count.value = 0;
      checkedState.value = "none";
    }
  }
);
</script>

<style scoped lang="less">
.collapse {
}
</style>
