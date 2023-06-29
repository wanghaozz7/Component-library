<template>
  <div class="collapse-item" :style="{ height: getHeight }">
    <div class="show-part">
      <div class="left-part">
        <arrow
          @fold="handleFold"
          :isFold="isFold"
          v-if="node.children !== undefined && node.children.length !== 0"
        />
        <div>{{ node.label }}</div>
      </div>
      <checkBox @check="handleCheck" :checkedState="checkedState" />
    </div>
    <div class="hidden-part" ref="hiddenPart">
      <collapseItem
        v-for="(children, index) in node.children"
        :node="children"
        :key="children.label"
        @heightChange="handleHeightChange"
        @childCountChange="handleChildCountChange"
        :ref="`childrenNode${index}`"
        :fatherCheckedState="checkedState"
      />
    </div>
  </div>
</template>

<script>
// 控制组件的关键变量
// isFold(当前节点是否折叠 递归调用直接通知父组件进行高度的变化)
// checkedState(当前节点是否被选中 与父子节点的关系复杂 不直接判断 再每次count变化后判断和total的值进行赋值)
// count(节点及子节点被选中的个数 受控当前节点的点击 由于点击后只能是全选和全不选 将当前状态直接覆盖给子节点 并将变化后的个数通知父节点重新计算个数和状态)
export default {
  name: "collapseItem",
};
</script>

<script setup name="collapseItem">
import checkBox from "./components/checkBox/index.vue";
import arrow from "./components/arrow/index.vue";
import { ref, computed, getCurrentInstance, onMounted, watch } from "vue";

const props = defineProps({
  node: {
    type: Object,
    default() {
      return {};
    },
  },
  fatherCheckedState: {
    type: String,
    default: "none",
  },
  rowHeight: {
    type: Number,
    default: 32,
  },
});

const emit = defineEmits(["heightChange", "childCountChange"]);

// 是否被选中
let checkedState = ref("none");
// 是否折叠
let isFold = ref(true);
// 计算隐藏部分的总高度
let hiddenPartHeight = ref(0);
// 总节点个数
const total = props.node.count;

// 当前节点包括子节点所选中的个数
let count = ref(0);

// 展示部分的高度(传参可以改变)
const showPartHeight = props.rowHeight;

// 当前节点被点击
const handleCheck = (state) => {
  checkedState.value = state;
  // 点击后的状态只能是全选或者全不选 (通过props直接改变所有子节点的状态(不断向下),通过事件将变化的个数发送父节点修改并重新计算状态(不断向上))
  if (state == "all") {
    const oldCount = count.value;
    count.value = total;
    const newCount = total;
    const change = newCount - oldCount;
    emit("childCountChange", change);
  } else {
    const oldCount = count.value;
    count.value = 0;
    const newCount = 0;
    const change = newCount - oldCount;
    emit("childCountChange", change);
  }
};

// 当折叠/展开
const handleFold = (state) => {
  isFold.value = state;
};

// 计算总高度
const getHeight = computed(
  () =>
    (isFold.value ? showPartHeight : hiddenPartHeight.value + showPartHeight) +
    "px"
);

const handleHeightChange = (height) => {
  hiddenPartHeight.value += height;
};

// 子节点count改变(单向向上)
const handleChildCountChange = (change) => {
  count.value += change;
  // 当count变化后重新计算state
  if (count.value == total - 1) {
    checkedState.value = "all";
    // 当所有子节点被选中时当前节点也被选中
    count.value++;
    change++;
  } else if (count.value == 0) checkedState.value = "none";
  else checkedState.value = "part";
  // 向上传递
  emit("childCountChange", change);
  console.log("collapseItem", props.node.label, count.value);
};

onMounted(() => {
  const ctx = getCurrentInstance().ctx;
  // 获取隐藏部分的值
  hiddenPartHeight.value = ctx.$refs.hiddenPart.offsetHeight;
});

// 监听折叠状态(单次向上)
watch(
  // 当子节点高度变化 通知父节点高度变化(值相同)
  () => isFold.value,
  (newValue, oldValue) => {
    if (newValue) {
      emit("heightChange", -hiddenPartHeight.value);
    } else {
      emit("heightChange", hiddenPartHeight.value);
    }
  }
);

// 监听父节点的全选状态(单向向下)
watch(
  () => props.fatherCheckedState,
  (newValue, oldValue) => {
    if (newValue == "all") {
      count.value = total;
      checkedState.value = "all";
    } else if (newValue == "none") {
      count.value = 0;
      checkedState.value = "none";
    }
  }
);
</script>

<style scoped lang="less">
.collapse-item {
  width: 100%;
  overflow: hidden;
  transition: all 0.3s;
  .show-part {
    line-height: 32px;
    background-color: lightcoral;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left-part {
      display: flex;
      align-items: center;
    }
  }
  .hidden-part {
    background-color: #9bc3ac;
  }
}
</style>
