<template>
  <div
    class="scroll-bar-container"
    ref="scrollBarContainer"
    v-resize:16="onResize"
    :style="{ maxHeight: screenVisibleHeight + 'px' }"
  >
    <slot></slot>
    <div class="scroll-bar" :style="scrollBarStyle"></div>
  </div>
</template>

<script setup name="scrollBar">
import { onMounted, ref, getCurrentInstance, computed } from "vue";

const props = defineProps({
  maxHeight: {
    type: String,
    default: "100vh",
  },
});

const ctx = getCurrentInstance().ctx;
let scrollBarContainer;
let slot;
let scrollBar;
let screenVisibleHeight = 0;

let slotHeight = ref(0);
let scrollBarVisible = ref(false);
let scrollBarLength = ref(0);

const mouseDownAndMove = (el, callback) => {
  // 添加鼠标按下监听
  el.addEventListener("mousedown", function (even) {
    // 当鼠标按下时, 添加鼠标移动监听
    document.addEventListener("mousemove", callback);
  });

  // 添加鼠标弹起监听 , 即鼠标不在按下
  document.addEventListener("mouseup", function () {
    // 此时移除 鼠标移动监听,移除指定 事件函数
    document.removeEventListener("mousemove", callback);
  });
};

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
  const computedStyle = window.getComputedStyle(slot);
  let t = computedStyle.height;
  t.replaceAll("px");
  console.log("t", t);
  slotHeight.value = Number.parseInt(t);
  console.log("slotHeight", slotHeight.value);
  if (screenVisibleHeight !== 0) {
    console.log(
      "是否出现滚动条",
      showScrollBar(),
      "滚动条高度",
      scrollBarLength.value
    );
  }
};

// 判断是否出现滚动条 更新滚动条的长度
const showScrollBar = () => {
  scrollBarVisible.value = slotHeight.value > screenVisibleHeight;
  if (scrollBarVisible.value) {
    scrollBarLength.value = Math.ceil(
      screenVisibleHeight * (screenVisibleHeight / slotHeight.value)
    );
  } else {
    scrollBarLength.value = 0;
  }
  return scrollBarVisible.value;
};

const scrollBarStyle = computed(() => {
  return {
    height: scrollBarLength.value + "px",
  };
});

onMounted(() => {
  screenVisibleHeight = document.documentElement.clientHeight;
  scrollBarContainer = ctx.$refs.scrollBarContainer;
  const childNodes = scrollBarContainer.children;
  scrollBar = childNodes[childNodes.length - 1];
  // 如果slot内容由一个元素包裹则将他的class和style转移到container中
  if (childNodes.length === 2) {
    const slotContainer = childNodes[0];
    scrollBarContainer.style = getComputedStyle(slotContainer);
    scrollBarContainer.classList.add(slotContainer.classList);
    slotContainer.classList.remove(slotContainer.classList);
    slot = childNodes[0];
  } else {
    slot = Array.from(childNodes).slice(0, childNodes.length);
  }

  const computedStyle = window.getComputedStyle(slot);
  console.log("slot", slot, computedStyle.height);

  mouseDownAndMove(scrollBar, function (e) {
    console.log("mouseDownAndMove", e.y);
  });
});
</script>

<style scoped lang="less">
.scroll-bar-container {
  overflow-y: hidden;
  overflow-x: visible;
  position: relative;
  // top: -100px;
  .scroll-bar {
    position: absolute;
    right: 0;
    top: 0;
    width: 8px;
    height: 300px;
    border-radius: 8px;
    background-color: rgb(172, 172, 172);
  }
}
</style>
