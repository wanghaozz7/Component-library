<template>
  <div class="tooltip" ref="tooltip" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" v-resize:20="onResize">
    <slot />
    <div class="tooltip-body" :style="hiddenPartStyle">
      <div class="triangle" :style="triangleStyle">
        <div class="innerTriangle" :style="innerTriangleStyle" />
      </div>
      <div class="content" :style="contentStyle" ref="content">
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
  // 主题(light,dark)
  theme: {
    type: String,
    default: "light",
  },
});

let showPartHeight = ref(0);
let showPartWidth = ref(0);
let contentWidth = ref(0);
let contentHeight = ref(0);
let showTooltip = ref(false);
let opacity = ref(0);
let display = ref("");

const ctx = getCurrentInstance().ctx;

const hiddenPartStyle = computed(() => {
  const sw = showPartWidth.value,
    sh = showPartHeight.value,
    cw = contentWidth.value,
    ch = contentHeight.value;
  let bottom, transform, left, top;
  switch (props.placement) {
    case "top":
      bottom = sh;
      left = Math.floor((sw - cw) / 2);
      transform = "rotateX(180deg)";
      break;
    case "right":
      if (ch < sh) {
        top = (sh - ch) / 2;
      } else {
      }
      left = sw + 16;
      break;
    case "bottom":
      left = Math.floor((sw - cw) / 2);
      break;
    case "left":
      if (ch < sh) {
        top = (sh - ch) / 2;
      } else {
      }
      left = -1 * cw;
      break;
    default:
      left = Math.floor((sw - cw) / 2);
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
  let left, top, rotate;
  switch (props.placement) {
    case "top":
      left = Math.floor((cw - 16) / 2);
      break;
    case "right":
      rotate = "-90deg";
      top = ch / 2 - 8;
      left = -16;
      break;
    case "bottom":
      left = Math.floor((cw - 16) / 2);
      break;
    case "left":
      left = cw - 15;
      rotate = "90deg";
      top = ch / 2 - 8;
      break;
    default:
      left = Math.floor((cw - 16) / 2);
  }
  left += "px";
  top += "px";
  return {
    left,
    top,
    rotate,
  };
});

const innerTriangleStyle = computed(() => {
  let borderBottomColor;
  switch (props.theme) {
    case "light":
      borderBottomColor = "white";
      break;
    case "dark":
      borderBottomColor = "black";
      break;
    default:
      borderBottomColor = "white";
      break;
  }
  return {
    borderBottomColor,
  };
});

const contentStyle = computed(() => {
  let transform, top, left, backgroundColor, color;
  switch (props.placement) {
    case "top":
      top = "16px";
      transform = "rotateX(180deg)";
      break;
    case "right":
      break;
    case "bottom":
      top = "16px";
      break;
    case "left":
      left = "-16px";
      break;
    default:
      top = "16px";
  }
  switch (props.theme) {
    case "light":
      color = "black";
      backgroundColor = "white";
      break;
    case "dark":
      color = "white";
      backgroundColor = "black";
      break;
    default:
      color = "black";
      backgroundColor = "white";
      break;
  }

  return {
    transform,
    top,
    left,
    backgroundColor,
    color,
  };
});

const handleMouseEnter = () => (showTooltip.value = true);

const handleMouseLeave = () => (showTooltip.value = false);

const openTooltip = () => {
  setTimeout(() => {
    display.value = "block";
    opacity.value = 1;
  }, 0);
};

const closeTooltip = () => {
  setTimeout(() => {
    if (!showTooltip.value) {
      opacity.value = 0;
      setTimeout(() => {
        if (!showTooltip.value) display.value = "none";
      }, props.delay);
    }
  }, props.delay);
};

const vResize = {
  mounted(el, binding) {
    // 这里使用debounce防抖处理，防抖的延时时间可以通过自定义指令的参数传过来，如`v-resize:300`表示300ms延时
    // 也可以将此处延时去掉，放在绑定的函数中自定义
    function debounce(fn, delay = 16) {
      let t = null;
      return function () {
        if (t) {
          clearTimeout(t);
        }
        const context = this;
        const args = arguments;
        t = setTimeout(function () {
          fn.apply(context, args);
        }, delay);
      };
    }
    el._resizer = new window.ResizeObserver(
      debounce(binding.value, Number(binding.arg) || 16)
    );
    el._resizer.observe(el);
  },
  unmounted(el) {
    el._resizer.disconnect();
  },
};

const onResize = (arg) => {
  // const height = arg[0].contentRect.height;
  // const width = arg[0].contentRect.width;


  const tooltip = ctx.$refs.tooltip;
  const showPart = tooltip.children[0];
  const content = ctx.$refs.content;


  // 将内层的样式转移到外层

  tooltip.style = showPart.style;

  if (showPart.classList.length !== 0) {
    tooltip.classList.add(showPart.classList);
    showPart.classList.remove(showPart.classList);
  }


  showPartWidth.value = showPart.clientWidth;
  showPartHeight.value = showPart.clientHeight;
  contentWidth.value = content.clientWidth;
  contentHeight.value = content.clientHeight;
};


onMounted(() => {

});

watch(
  () => showTooltip.value,
  (newVal) => {
    if (newVal) {
      openTooltip();
    } else {
      closeTooltip();
    }
  }
);
</script>

<style scoped lang="less">
.tooltip {
  position: relative;

  .tooltip-body {
    position: absolute;
    transition: all 0.3s;
    z-index: 999 !important;

    .triangle {
      position: absolute;
      top: 0;
      width: 0;
      height: 0;
      border: 8px solid transparent;
      border-bottom-color: black;
      z-index: 999 !important;

      .innerTriangle {
        position: absolute;
        left: -8px;
        bottom: -9px;
        width: 0;
        height: 0;
        border: 8px solid transparent;
      }
    }

    .content {
      position: absolute;
      white-space: nowrap;
      padding: 5px;
      line-height: 25px;
      border: 1px solid black;
      text-align: center;
      border-radius: 4px;
      z-index: 998 !important;
    }
  }
}
</style>
