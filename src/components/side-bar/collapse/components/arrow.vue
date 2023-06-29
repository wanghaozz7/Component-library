<template>
  <span class="arrow"
    ><img
      src="./icon/arrow_down.svg"
      :style="rotateArrow"
      @click="handleClick"
      class="inner-icon"
    />
    <span class="row-title">{{ label }}</span>
  </span>
</template>

<!-- <script>
export default {
  name: "arrow",
  props: {
    rotateArrow: {
      type: Object,
      default() {
        return {};
      },
    },
    label: {
      type: String,
      default: "",
    },
  },
  methods: {
    handleClick() {
      this.$emit("rotate");
    },
  },
};
</script> -->

<script setup name="arrow">
const props = defineProps({
  rotateArrow: {
    type: Object,
    default() {
      return {};
    },
  },
  label: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["rotate"]);
const handleClick = () => {
  emit("rotate");
};
</script>

<style scoped lang="less">
.arrow {
  display: flex;
  align-items: center;
  height: 100%;
  // margin: 0 5px;
  width: auto;

  .inner-icon {
    transition: all 0.3s;
    cursor: pointer;
  }
  .row-title {
    font-family: "PingFang SC";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: #1a1c24;
    margin-left: 4px;
    cursor: default;
  }
}
</style>
