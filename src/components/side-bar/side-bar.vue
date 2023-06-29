<template>
  <collapse
    @selectChange="handleSelectChange"
    :collapseData="sideBarData"
    :defaultActive="defaultActive"
  />
</template>

<!-- <script>
import collapse from "./collapse/index.vue";

export default {
  name: "side-bar",
  components: { collapse },
  props: {
    // 默认展开下标
    defaultActive: {
      type: Number,
      default: 0,
    },
    // 侧边栏数据
    sideBarData: {
      type: Array,
      default() {
        return [];
      },
    },
    // 默认全部展开
    expendsAll: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleSelectChange(result) {
      this.$emit("selectChange", result);
    },
  },
};
</script> -->

<script setup name="SideBar">
import collapse from "./collapse/index.vue";
const props = defineProps({
  // 默认展开下标
  defaultActive: {
    type: Number,
    default: 0,
  },
  // 侧边栏数据
  sideBarData: {
    type: Array,
    default() {
      return [];
    },
  },
  // 默认全部展开
  expendsAll: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["selectChange"]);
const handleSelectChange = (result) => {
  emit("selectChange", result);
};
</script>
