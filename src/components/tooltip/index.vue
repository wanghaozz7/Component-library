<template>
  <div id="tooltip">
    <div
      class="show-part"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      ref="showPart"
    >
      <slot />
    </div>
    <div id="hidden-part" :style="hiddenPartStyle">
      <div class="triangle" :style="triangleStyle">
        <div class="innerTriangle" />
      </div>
      <div id="content" :style="contentStyle" ref="content">
        {{ content }}
      </div>
    </div>
  </div>
</template>

<script setup name="tooltip">
import { computed, onMounted, ref, watch, getCurrentInstance } from "vue";

const props = defineProps({
  // tooltip出现的位置(top,bottom,left,right)
  placement: {
    type: String,
    default: "top",
  },
  // tooltip出现和消失的延迟
  delay: {
    type: Number,
    default: 500,
  },
  content: {
    tpye: String,
    default: "我是tooltip",
  },
});

// show-part的高度
let showPartHeight = ref(0);
// show-part的宽度(hiddent-part居中)
let showPartWidth = ref(0);
// content的宽度(三角形居中)
let contentWidth = ref(0);
let contentHeight = ref(0);
// tooltip是否激活
let showTooltip = ref(false);
// 控制tooltip的透明度
let opacity = ref(0);
// 清除tooltip
let display = ref("");

const hiddenPartStyle = computed(() => {
  const sw = showPartWidth.value,
    sh = showPartHeight.value,
    cw = contentWidth.value,
    ch = contentHeight.value;
  let bottom = "",
    transform = "",
    left = "",
    top = "";
  switch (props.placement) {
    case "bottom":
      left = Math.floor((sw - cw) / 2);
      break;
    case "top":
      bottom = sh;
      left = Math.floor((sw - cw) / 2);
      transform = "rotateX(180deg)";
      break;
    case "left":
      if (ch < sh) {
        top = (sh - ch) / 2;
      } else {
      }
      left = -1 * cw;
      break;
    case "right":
      if (ch < sh) {
        top = (sh - ch) / 2;
      } else {
      }
      left = sw + 16;
      break;
  }
  left += "px";
  bottom += "px";
  top += "px";
  return {
    left,
    bottom,
    top,
    transform,
    opacity: opacity.value,
    display: display.value,
  };
});

const triangleStyle = computed(() => {
  const cw = contentWidth.value,
    ch = contentHeight.value;
  let left = "",
    top = "",
    rotate = "";
  switch (props.placement) {
    case "top":
      left = Math.floor((cw - 16) / 2);
      break;
    case "bottom":
      left = Math.floor((cw - 16) / 2);
      break;
    case "left":
      left = cw - 15;
      rotate = "90deg";
      top = ch / 2 - 8;
      break;
    case "right":
      rotate = "-90deg";
      top = ch / 2 - 8;
      left = -16;
      break;
  }
  left += "px";
  top += "px";

  return {
    left,
    top,
    rotate,
  };
});

const contentStyle = computed(() => {
  let transform = "",
    top = "",
    left = "";
  switch (props.placement) {
    case "bottom":
      top = "16px";
      break;
    case "top":
      top = "16px";
      transform = "rotateX(180deg)";
      break;
    case "left":
      left = "-16px";
    case "right":
  }
  return {
    transform,
    top,
    left,
  };
});

const handleMouseEnter = () => {
  showTooltip.value = true;
};

const handleMouseLeave = () => {
  showTooltip.value = false;
};

onMounted(() => {
  const ctx = getCurrentInstance().ctx;
  const showPart = ctx.$refs.showPart.children[0];
  const content = ctx.$refs.content;
  showPartHeight.value = showPart.clientHeight;
  showPartWidth.value = showPart.clientWidth;
  contentWidth.value = content.clientWidth;
  contentHeight.value = content.clientHeight;
  console.log(
    "sw",
    showPartWidth.value,
    "sh",
    showPartHeight.value,
    "cw",
    contentWidth.value,
    "ch",
    contentHeight.value
  );
});

watch(
  () => showTooltip.value,
  (newVal) => {
    if (newVal) {
      setTimeout(() => {
        display.value = "block";
        opacity.value = 1;
      }, 0);
    } else {
      // setTimeout(() => {
      //   if (!showTooltip.value) {
      //     opacity.value = 0;
      //     setTimeout(() => {
      //       if (!showTooltip.value) display.value = "none";
      //     }, 100);
      //   }
      // }, props.delay);
    }
  }
);
</script>

<style scoped lang="less">
#tooltip {
  position: relative;
  .show-part {
  }
  #hidden-part {
    position: absolute;
    transition: all 0.3s;
    .triangle {
      position: absolute;
      top: 0;
      width: 0;
      height: 0;
      border: 8px solid transparent;
      border-bottom-color: black;
      z-index: 99 !important;
      .innerTriangle {
        position: absolute;
        left: -8px;
        bottom: -9px;
        width: 0;
        height: 0;
        border: 8px solid transparent;
        border-bottom-color: white;
        z-index: 999 !important;
      }
    }
    #content {
      position: absolute;
      white-space: nowrap;
      padding: 5px;
      line-height: 25px;
      border: 1px solid black;
      text-align: center;
      background-color: #fff;
      border-radius: 4px;
    }
  }
}
</style>
