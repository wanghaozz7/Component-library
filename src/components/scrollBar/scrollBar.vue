<template>
  <div class="container" ref="container" :style="containerStyle" @wheel="handleWheel" @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave">
    <div class="content" v-resize:20="onResize" :style="{ 'top': getContentOffset + 'px' }" ref="content">
      <slot />
    </div>
    <div class="scroll-bar" :style="scrollBarStyle" />
  </div>
</template>

<script setup name="scroll-bar">
import { getCurrentInstance, onMounted, ref, computed, nextTick } from "vue";

const props = defineProps({
  // 显示滚动条的时机 ('always','hover','none')
  showScrollBar: {
    type: String,
    default: "hover",
  },
  // 滚轮灵敏度 (取数字的绝对值代表滚动一次的距离)
  wheelSensitivity: {
    type: Number,
    default: 100,
  },
  // 滚动方向 ('normal','opposite')
  direction: {
    type: String,
    default: "normal",
  },
});

let containerMaxHeight = ref(0);
let scrollBarLen = ref(0);
let contentHeight = ref(0);
let contentWidth = ref(0);
// 滚动条的偏移量
let scrollBarOffset = ref(0);
let contentOffset = ref(0);
let isHover = ref(false);
let isDrag = ref(false);
let isMove = ref(false);

const ctx = getCurrentInstance().ctx;
let scrollBar;
let y;
let maxOffset;


const getContentOffset = computed(() => {
  contentOffset.value = -1 * (contentHeight.value - containerMaxHeight.value) / (containerMaxHeight.value - scrollBarLen.value) * scrollBarOffset.value;
  return contentOffset.value;
})


const containerStyle = computed(() => {
  const maxHeight = containerMaxHeight.value + "px";
  const height = maxHeight;
  const width = contentWidth.value + "px";
  // 拖动时不高亮选中文本
  const userSelect = isDrag.value ? "none" : "";
  return {
    maxHeight,
    height,
    width,
    userSelect,
  };
});

const scrollBarStyle = computed(() => {
  let opacity;
  const height = scrollBarLen.value + "px";
  const top = scrollBarOffset.value + "px";
  const backgroundColor = isDrag.value ? "#d1d1d1" : "";
  const transition = isDrag.value ? "" : "all 0.2s";

  switch (props.showScrollBar) {
    case "always":
      opacity = "1";
      break;
    case "none":
      opacity = "0";
      break;
    case "hover":
      opacity = isHover.value || isDrag.value ? "1" : "0";
      break;
    default:
      opacity = isHover.value || isDrag.value ? "1" : "0";
  }

  return {
    height,
    top,
    opacity,
    backgroundColor,
    transition,
  };
});

// 自定义指令处理slot高度
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

// slot高度变化回调
const onResize = (arg) => {
  contentHeight.value = arg[0].contentRect.height;
  contentWidth.value = arg[0].contentRect.width;
  calScrollBarLen();
};

// 计算滚动条的长度和位置(内容高度变化后)
const calScrollBarLen = () => {
  // 滚动条长度 = （盒子的长度 / 内容的长度）* 盒子的长度
  // 滚动条走的距离 = 内容走的距离 *（盒子的长度 - 滚动条的长度）/（内容的长度 - 盒子的长度）

  // 更新滚动条长度
  scrollBarLen.value = Math.floor(
    containerMaxHeight.value * (containerMaxHeight.value / contentHeight.value)
  );
  // 判断是否隐藏滚动条
  scrollBarLen.value = scrollBarLen.value < containerMaxHeight.value ? scrollBarLen.value : 0;


  maxOffset = containerMaxHeight.value - scrollBarLen.value;
  // scrollBarOffset(滚动条走的距离)
  scrollBarOffset.value = Math.abs(contentOffset.value) * (containerMaxHeight.value - scrollBarLen.value) / (contentHeight.value - containerMaxHeight.value);
};

// 滚动条拖动事件
const mouseDownAndMove = (el, callback) => {
  // 添加鼠标按下监听
  el.addEventListener("mousedown", function (e) {
    // 当鼠标按下时, 添加鼠标移动监听
    y = 0;
    isDrag.value = true;
    document.addEventListener("mousemove", callback);
  });
  // 添加鼠标弹起监听 , 即鼠标不在按下
  document.addEventListener("mouseup", function () {
    // 此时移除 鼠标移动监听,移除指定 事件函数
    isDrag.value = false;
    document.removeEventListener("mousemove", callback);
  });
};

const scrollBarOffsetChange = (change, type) => {
  // 如果没有出现滚动条则不能滚动
  if (scrollBarLen.value === 0) return;
  if (change + scrollBarOffset.value >= maxOffset) handleMove(maxOffset, type);
  else if (change + scrollBarOffset.value <= 0) handleMove(0, type);
  else handleMove(scrollBarOffset.value + change, type);
};

const handleMove = (target, type) => {
  if (type === "mouse") scrollBarOffset.value = target;
  else {
    if (isMove.value) return;
    const sub = target - scrollBarOffset.value;
    if (sub == 0) return;
    const step = sub / 10;
    const delay = 10;
    isMove.value = true;
    moveAnimate(step, target, delay);
  }
};

const moveAnimate = (step, target, delay) => {
  if (
    (step > 0 && scrollBarOffset.value >= target) ||
    (step < 0 && scrollBarOffset.value <= target)
  ) {
    scrollBarOffset.value = target;
    isMove.value = false;
    return;
  }
  scrollBarOffset.value += step;
  setTimeout(() => {
    moveAnimate(step, target, delay);
  }, delay);
};

const handleWheel = (e) => {
  let k;
  switch (props.direction) {
    case "normal":
      k = 1;
      break;
    case "opposite":
      k = -1;
      break;
    default:
      k = 1;
  }

  if (e.wheelDelta < 0) {
    // 向下
    scrollBarOffsetChange(k * Math.abs(props.wheelSensitivity), "wheel");
  } else {
    // 向上
    scrollBarOffsetChange(k * -1 * Math.abs(props.wheelSensitivity), "wheel");
  }
};

const handleMouseEnter = (e) => {
  isHover.value = true;
};

const handleMouseLeave = (e) => {
  isHover.value = false;
};

onMounted(() => {
  containerMaxHeight.value = document.documentElement.clientHeight;

  const container = ctx.$refs.container;
  const content = container.children[0];
  const slot = content.children[0];
  scrollBar = container.children[1];

  mouseDownAndMove(scrollBar, function (e) {
    if (y === 0) y = e.y;
    else {
      const change = e.y - y;
      scrollBarOffsetChange(change, "mouse");
      y = e.y;
    }
  });

  container.style = slot.style;
  slot.style = {};
  container.classList.add(slot.classList);
  slot.classList.remove(slot.classList);

  const style = window.getComputedStyle(container);
  content.style.width = style.width;
});
</script>

<style scoped lang="less">
.container {
  position: relative;
  max-height: 100vh !important;
  overflow: hidden;

  .content {
    position: absolute;
  }

  .scroll-bar {
    position: absolute;
    right: 0;
    width: 8px;
    border-radius: 8px;
    background-color: #ebebeb;
    cursor: pointer;
    z-index: 99;

    &:hover {
      background-color: #d1d1d1;
    }
  }
}
</style>
