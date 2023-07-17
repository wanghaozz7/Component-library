<template>
  <div ref="slotWrapper">
    <slot />
  </div>
  <div class="tooltip" ref="tooltip">
    <div class="content">{{ content }}</div>
    <div class="icon">
      <div class="inner"></div>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, onUnmounted, ref } from "vue";

const props = defineProps({
  placement: {
    type: String,
    default: "bottom",
  },
  content: {
    type: String,
    default: "我是悬浮文字",
  },
  offset: {
    type: Number,
    default: 20,
  },
  delay: {
    type: Number,
    default: 200,
  },
});

let showTooltip = ref(false);

const ctx = getCurrentInstance().ctx;
let slotWidth, tooltipWidth, slotHeight, tooltipHeight, pos;

const styleFilter = (str) => {
  if (typeof str === "number") return str;
  return parseInt(str.replaceAll("px"));
};

const handleMouseEnter = (e) => {
  if (showTooltip.value) return;
  showTooltip.value = true;
  const tooltip = ctx.$refs.tooltip;
  const content = tooltip.children[0];
  const icon = tooltip.children[1];
  const inner = icon.children[0];
  const slot = ctx.$refs.slotWrapper.children[0];
  const pos = slot.getBoundingClientRect();

  const tooltipStyle = {},
    iconStyle = {},
    innerStyle = {};

  const tooltipStyleArr = [],
    iconStyleArr = [],
    innerStyleArr = [];

  switch (props.placement) {
    case "top":
      // left = 相对left + (slot宽度 - tooltip宽度)/2
      // top = 相对top - (tooltip高度 + 固定值)
      tooltipStyleArr.push([
        "left",
        pos.left +
          (styleFilter(slotWidth) - styleFilter(tooltipWidth)) / 2 +
          "px",
      ]);
      tooltipStyleArr.push([
        "top",
        pos.top - (styleFilter(tooltipHeight) + props.offset) + "px",
      ]);

      iconStyleArr.push(["left", "50%"]);
      iconStyleArr.push(["transform", "translateX(-50%)"]);
      iconStyleArr.push(["bottom", "-15px"]);
      iconStyleArr.push(["borderTopColor", "black"]);

      innerStyleArr.push(["borderTopColor", "white"]);
      innerStyleArr.push(["bottom", "-6px"]);
      innerStyleArr.push(["left", "-7.5px"]);
      break;
    case "bottom":
      // left同上
      // top = 相对top + slot高度 + 固定值
      tooltipStyleArr.push([
        "left",
        pos.left +
          (styleFilter(slotWidth) - styleFilter(tooltipWidth)) / 2 +
          "px",
      ]);
      tooltipStyleArr.push([
        "top",
        pos.top + styleFilter(slotHeight) + props.offset + "px",
      ]);
      tooltipStyleArr.push(["transform", "rotateX(180deg)"]);

      iconStyleArr.push(["left", "50%"]);
      iconStyleArr.push(["bottom", "-15px"]);
      iconStyleArr.push(["transform", "translateX(-50%)"]);
      iconStyleArr.push(["borderTopColor", "black"]);

      innerStyleArr.push(["borderTopColor", "white"]);
      innerStyleArr.push(["bottom", "-6px"]);
      innerStyleArr.push(["left", "-7.5px"]);
      break;
    case "left":
      // left = 相对left - (tooltip宽度 + 固定值)
      // top = 相对top + (slot高度 - tooltip高度)/2
      tooltipStyleArr.push([
        "left",
        pos.left - (styleFilter(tooltipWidth) + props.offset) + "px",
      ]);
      tooltipStyleArr.push([
        "top",
        pos.top +
          (styleFilter(slotHeight) - styleFilter(tooltipHeight)) / 2 +
          "px",
      ]);

      iconStyleArr.push(["right", "-15px"]);
      iconStyleArr.push(["top", "50%"]);
      iconStyleArr.push(["transform", "translateY(-50%)"]);
      iconStyleArr.push(["borderLeftColor", "black"]);

      innerStyleArr.push(["borderLeftColor", "white"]);
      innerStyleArr.push(["bottom", "-7px"]);
      innerStyleArr.push(["left", "-8px"]);
      break;
    case "right":
      // left = 相对left + (slot宽度 + 固定值)
      // top = 同上
      tooltipStyleArr.push([
        "left",
        pos.left + styleFilter(slotWidth) + props.offset + "px",
      ]);
      tooltipStyle.top =
        pos.top + (styleFilter(slotHeight) - styleFilter(tooltipHeight)) / 2;
      tooltipStyleArr.push([
        "top",
        pos.top +
          (styleFilter(slotHeight) - styleFilter(tooltipHeight)) / 2 +
          "px",
      ]);
      tooltipStyleArr.push(["transform", "rotateY(180deg)"]);

      iconStyleArr.push(["right", "-15px"]);
      iconStyleArr.push(["top", "50%"]);
      iconStyleArr.push(["transform", "translateY(-50%)"]);
      iconStyleArr.push(["borderLeftColor", "black"]);

      innerStyleArr.push(["borderLeftColor", "white"]);
      innerStyleArr.push(["bottom", "-7px"]);
      innerStyleArr.push(["left", "-8px"]);
      break;
      break;
  }

  for (let arr of tooltipStyleArr) {
    const key = arr[0],
      value = arr[1];
    console.log("key,value", key, value);
    tooltip.style[key] = value;
    if (key === "transform") content.style[key] = value;
  }
  for (let arr of iconStyleArr) {
    const key = arr[0],
      value = arr[1];
    icon.style[key] = value;
  }
  for (let arr of innerStyleArr) {
    const key = arr[0],
      value = arr[1];
    inner.style[key] = value;
  }
  tooltip.style.display = "block";
};
const handleMouseLeave = (e) => {
  const style = ctx.$refs.tooltip.style;
  setTimeout(() => {
    style.display = "none";
    showTooltip.value = false;
  }, props.delay);
};

onMounted(() => {
  const slot = ctx.$refs.slotWrapper.children[0];
  const tooltip = ctx.$refs.tooltip;
  pos = slot.getBoundingClientRect();

  slot.addEventListener("mouseenter", handleMouseEnter);
  slot.addEventListener("mouseleave", handleMouseLeave);

  const body = document.getElementsByTagName("body")[0];
  body.appendChild(tooltip);

  // 先获取属性再隐藏
  slotWidth = window.getComputedStyle(slot).width;
  tooltipWidth = window.getComputedStyle(tooltip).width;
  slotHeight = window.getComputedStyle(slot).height;
  tooltipHeight = window.getComputedStyle(tooltip).height;
  tooltip.style.display = "none";
});

onUnmounted(() => {
  const slot = ctx.$refs.slotWrapper.children[0];
  slot.removeEventListener("mouseenter", handleMouseEnter);
  slot.removeEventListener("mouseleave", handleMouseLeave);
});
</script>

<style scoped lang="less">
.tooltip {
  position: absolute;
  .content {
    padding: 5px;
    line-height: 25px;
    white-space: nowrap;
    border: 1px solid black;
    border-radius: 4px;
  }
  .icon {
    position: absolute;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    z-index: 9999;
    .inner {
      position: absolute;

      width: 0;
      height: 0;
      border: 7.5px solid transparent;
      z-index: 9999;
    }
  }
}
</style>
