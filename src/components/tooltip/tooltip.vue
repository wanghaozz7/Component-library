<template>
  <div ref="slotWrapper">
    <slot />
  </div>
  <div class="tooltip" ref="tooltip">
    <div class="content" :style="contentStyle">{{ content }}</div>
    <div class="icon">
      <div class="inner"></div>
    </div>
  </div>
</template>

<script setup>
import {
  computed,
  getCurrentInstance,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
} from "vue";

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
  // light/dark
  theme: {
    type: String,
    default: "light",
  },
});

let showTooltip = ref(false);

const ctx = getCurrentInstance().ctx;
let slotWidth, tooltipWidth, slotHeight, tooltipHeight, pos;
const innerIconColor = props.theme === "light" ? "#fff" : "#000";

const contentStyle = computed(() => {
  const backgroundColor = props.theme === "light" ? "#fff" : "#000";
  const color = props.theme === "light" ? "#000" : "#fff";
  return {
    backgroundColor,
    color,
  };
});

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
  const tooltipStyleArr = [];
  const iconStyleArr = [];
  const innerStyleArr = [];

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

      innerStyleArr.push(["borderTopColor", innerIconColor]);
      innerStyleArr.push(["bottom", "-6px"]);
      innerStyleArr.push(["left", "-7px"]);
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

      innerStyleArr.push(["borderTopColor", innerIconColor]);
      innerStyleArr.push(["bottom", "-6px"]);
      innerStyleArr.push(["left", "-7px"]);
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

      innerStyleArr.push(["borderLeftColor", innerIconColor]);
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
      tooltipStyleArr.push([
        "top",
        pos.top +
          (styleFilter(slotHeight) - styleFilter(tooltipHeight)) / 2 +
          "px",
      ]);

      iconStyleArr.push(["left", "-15px"]);
      iconStyleArr.push(["top", "50%"]);
      iconStyleArr.push(["transform", "translateY(-50%)"]);
      iconStyleArr.push(["borderRightColor", "black"]);

      innerStyleArr.push(["borderRightColor", innerIconColor]);
      innerStyleArr.push(["bottom", "-7px"]);
      innerStyleArr.push(["left", "-6px"]);
      break;
    default:
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
      innerStyleArr.push(["left", "-7px"]);
  }

  for (let arr of tooltipStyleArr) {
    const key = arr[0],
      value = arr[1];
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
  // console.log("出现", slot.offsetTop);

  const obj = getOffsetOfBody(slot);
  // console.log("出现", obj);

  tooltip.style.display = "block";
};

const handleMouseLeave = (e) => {
  const style = ctx.$refs.tooltip.style;
  setTimeout(() => {
    style.display = "none";
    showTooltip.value = false;
  }, props.delay);
};

const handleBodyMouseWheel = (e) => {
  const slot = ctx.$refs.slotWrapper.children[0];
  const pos = slot.getBoundingClientRect();

  const obj = getOffsetOfBody(slot);
  // console.log("滚动", obj);
};

const getOffsetOfBody = (el) => {
  var left,
    top = null;
  var elPar = el.offsetParent;
  left += el.offsetLeft;
  top += el.offsetTop;
  while (elPar) {
    if (navigator.userAgent.indexOf("MSIE 8.0") == -1) {
      //若不是IE8，则需要加上offsetParent的clientLeft和clientTop
      left += elPar.clientLeft;
      top += elPar.clientTop;
    }
    left += elPar.offsetLeft;
    top += elPar.offsetTop;
    elPar = elPar.offsetParent;
  }
  return { left: left, top: top };
};

onMounted(() => {
  const slot = ctx.$refs.slotWrapper.children[0];
  const tooltip = ctx.$refs.tooltip;
  pos = slot.getBoundingClientRect();

  slot.addEventListener("mouseenter", handleMouseEnter);
  slot.addEventListener("mouseleave", handleMouseLeave);

  const body = document.getElementsByTagName("body")[0];
  body.appendChild(tooltip);
  body.addEventListener("mousewheel", handleBodyMouseWheel);

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
    padding: 6px;
    line-height: 25px;
    white-space: nowrap;
    border: 1px solid black;
    border-radius: 4px;
    background-color: #fff;
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
