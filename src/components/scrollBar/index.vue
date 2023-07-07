<template>
  <div class="container" ref="container" :style="containerStyle">
    <div
      class="content"
      v-resize:20="onResize"
      :style="{ top: -1 * offset + 'px' }"
    >
      <slot />
    </div>
    <div class="scroll-bar" :style="scrollBarStyle" />
  </div>
</template>

<script setup name="">
import { getCurrentInstance, onMounted, ref, computed } from "vue";

const ctx = getCurrentInstance().ctx;
let slot;
let scrollBar;
let y;
let maxOffset;

let containerMaxHeight = ref(0);
let scrollBarLen = ref(0);
let contentHeight = ref(0);
let contentWidth = ref(0);
let offset = ref(0);

const containerStyle = computed(() => {
  return {
    maxHeight: containerMaxHeight.value + "px",
    height: contentHeight.value + "px",
    width: contentWidth.value + "px",
  };
});

const scrollBarStyle = computed(() => {
  return {
    height: scrollBarLen.value + "px",
    top: offset.value + "px",
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
  console.log("onResize", arg[0].contentRect.height);
  contentHeight.value = arg[0].contentRect.height;
  contentWidth.value = arg[0].contentRect.width;
  calScrollBarLen();
};

// 计算滚动条的长度
const calScrollBarLen = () => {
  const t = scrollBarLen.value;
  scrollBarLen.value = Math.floor(
    containerMaxHeight.value * (containerMaxHeight.value / contentHeight.value)
  );
  scrollBarLen.value =
    scrollBarLen.value < containerMaxHeight.value ? scrollBarLen.value : 0;
  maxOffset = containerMaxHeight.value - scrollBarLen.value;

  // console.log("newMaxOffset", scrollBarLen.value, maxOffset);
  // const change = scrollBarLen.value - t;
  // if (offset.value !== 0) offset.value += change;
  // console.log("change", change);
};

// 滚动条拖动事件
const mouseDownAndMove = (el, callback) => {
  // 添加鼠标按下监听
  el.addEventListener("mousedown", function (even) {
    // 当鼠标按下时, 添加鼠标移动监听
    y = 0;
    document.addEventListener("mousemove", callback);
  });

  // 添加鼠标弹起监听 , 即鼠标不在按下
  document.addEventListener("mouseup", function () {
    // 此时移除 鼠标移动监听,移除指定 事件函数
    document.removeEventListener("mousemove", callback);
  });
};

const offsetChange = (change) => {
  if (change + offset.value >= maxOffset) offset.value = maxOffset;
  else if (change + offset.value <= 0) offset.value = 0;
  else offset.value += change;
  console.log("offset", offset.value);
};

onMounted(() => {
  containerMaxHeight.value = document.documentElement.clientHeight;

  const container = ctx.$refs.container;
  slot = container.children[0].children[0];
  scrollBar = container.children[1];

  mouseDownAndMove(scrollBar, function (e) {
    if (y === 0) y = e.y;
    else {
      const change = e.y - y;
      offsetChange(change);
      y = e.y;
    }
  });
});
</script>

<style scoped lang="less">
.container {
  position: relative;
  max-height: 100vh;
  overflow: hidden;

  .content {
    position: absolute;
  }
  .scroll-bar {
    position: absolute;
    right: 0;
    width: 8px;
    border-radius: 8px;
    background-color: rgb(172, 172, 172);
    cursor: pointer;
  }
}
</style>
