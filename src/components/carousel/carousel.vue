<template>
  <div class="carousel" ref="carousel" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <div class="carousel-body" :style="{ left: offset + 'px' }">
      <slot />
    </div>
    <arrowGroup @goForward="handleGoForward" @goBack="handleGoBack" />
    <indicatorGroup :indicatorCount="itemCount" :activeIdx="curIdx" :trigger="trigger" :indicatorType="indicatorType"
      @change="handleChange" />
  </div>
</template>

<script setup name="carousel">
import { ref, onMounted, onUnmounted, getCurrentInstance } from "vue";

const props = defineProps({
  // 是否循环滚动
  circular: {
    type: Boolean,
    default: true,
  },
  // 是否自动滚动
  autoRolling: {
    type: Boolean,
    default: true,
  },
  // 自动滚动间隔
  interval: {
    type: Number,
    default: 3000,
  },
  // 滚动一次的延迟 (ms)
  delay: {
    type: Number,
    default: 250,
  },
  // 动画的帧数
  frame: {
    type: Number,
    default: 50,
  },
  // 触发方式 (hover,click)
  trigger: {
    type: String,
    default: "hover",
  },
  // 箭头显示方式 (hover,none,always)
  showArrow: {
    type: String,
    default: "hover",
  },
  // 指示器显示方式 (inside,outside,none)
  showIndicator: {
    type: String,
    default: "inside",
  },
  // 指示器类型 (dot,rectangle)
  indicatorType: {
    type: String,
    default: "dot",
  },
});

// 控制轮播图展示的offset左偏移量
let offset = ref(0);
// 当前展示内容的下标
let curIdx = ref(0);
// 是否正在滚动
let isMoving = ref(false);
// 轮播内容的个数
let itemCount;
// 轮播图的宽度
let carouselWidth;
// 定时器的间隔
const interval = props.delay / props.frame;
// 自动滚动定时器
let autoRollingInterval = null;
// 存储定时器的沙漏实现定时器的开始和暂停
let hourglass = 0;
// 上下文content
const ctx = getCurrentInstance().ctx;
let carousel, carousel_body, carousel_item;

const getOffsetByIdx = (idx) => {
  return Math.abs(idx * carouselWidth) * -1;
};

const preCirculation = () => {
  // 在首位添加一个末位元素 在末位添加一个首位元素
  let el = ``,
    t = ``;
  //在首部添加尾元素
  el += `<div class='carousel-item'>${carousel_item[itemCount - 1].innerHTML
    }</div>`;
  for (let tmp of carousel_item) {
    t = `<div class="carousel-item">${tmp.innerHTML}</div>`;
    el += t;
  }
  //在尾部添加首元素
  el += `<div class='carousel-item'>${carousel_item[0].innerHTML}</div>`;
  //重新设置body的HTML
  carousel_body.innerHTML = el;

  // 重置下标范围   curIdx:1 ~ itemCount+1    偏移量范围 offset:carouselWidth*-1 ~ itemCount*carouselWidth*-1
  offset.value = carouselWidth * -1; // 默认偏移量更改
  curIdx.value = 1; // 默认下标更改
};

const renderMove = (targetIdx) => {
  if (isMoving.value) return;
  isMoving.value = true;
  const dif = Math.abs(curIdx.value - targetIdx);
  if (dif === 1) {
    // 单次滚动
    const targetOffset = getOffsetByIdx(targetIdx);
    const offsetDif = targetOffset - offset.value;
    const step = Math.ceil(offsetDif / props.frame);
    const callBack = function () {
      offset.value = targetOffset;
      curIdx.value = targetIdx;
      if (props.circular) {
        if (targetIdx === itemCount + 1) {
          // 循环滚动超出范围
          curIdx.value = 1;
          offset.value = getOffsetByIdx(curIdx.value);
        } else if (targetIdx === 0) {
          curIdx.value = itemCount;
          offset.value = getOffsetByIdx(curIdx.value);
        }
      }
      isMoving.value = false;
    };
    moveAnimate(step, targetOffset, targetIdx, callBack);
  } else {
    // 跳跃滚动
    // 两个idx的差值大于等于1 代表至少中间有一块 滚动时将两个idx之间的块全部隐藏(与循环同理,使我们的闪现不被看出来)
    // 用一半的时间滚动到第一个隐藏块 然后闪现到最后一个隐藏块 用另一半时间滚动到目标块
    let l, r, firstIdx, lastIdx;
    if (targetIdx > curIdx.value) {
      l = curIdx.value;
      r = targetIdx;
      firstIdx = l + 1;
      lastIdx = r - 1;
    } else {
      l = targetIdx;
      r = curIdx.value;
      firstIdx = r - 1;
      lastIdx = l + 1;
    }
    // 将之间的内容隐藏
    for (let i = l + 1; i < r; i++) carousel_item[i].style.opacity = 0;
    // 执行第一次滚动 到达第一个隐藏块
    const firstOffset = getOffsetByIdx(firstIdx);
    const fitstOffsetDif = firstOffset - offset.value;
    const fitstStep = Math.ceil(fitstOffsetDif / props.frame) * 2; // 步长翻倍时间减半
    const callBack = function () {
      // 执行完毕后闪现到最后一个隐藏块
      const lastOffset = getOffsetByIdx(lastIdx);
      offset.value = lastOffset;

      // 从最后一个隐藏块到目标块
      const targetOffset = getOffsetByIdx(targetIdx);
      const offsetDif = targetOffset - offset.value;
      const step = Math.ceil(offsetDif / props.frame) * 2; // 步长翻倍时间减半
      const innerCallBack = function () {
        // 到达目标块后将隐藏的内容显示
        for (let i = l + 1; i < r; i++) carousel_item[i].style.opacity = 1;
        offset.value = targetOffset;
        curIdx.value = targetIdx;
        if (props.circular) {
          if (targetIdx === itemCount + 1) {
            // 循环滚动超出范围
            curIdx.value = 1;
            offset.value = getOffsetByIdx(curIdx.value);
          } else if (targetIdx === 0) {
            curIdx.value = itemCount;
            offset.value = getOffsetByIdx(curIdx.value);
          }
        }
        isMoving.value = false;
      };
      moveAnimate(step, targetOffset, targetIdx, innerCallBack);
    };
    moveAnimate(fitstStep, firstOffset, firstIdx, callBack);
  }
};

const moveAnimate = (step, targetOffset, targetIdx, callBack = () => { }) => {
  offset.value += step;
  // 到达终点 => 处理状态
  if (
    (step > 0 && offset.value >= targetOffset) ||
    (step < 0 && offset.value <= targetOffset)
  ) {
    // 执行回调
    callBack();
    return;
  }
  // 未到达终点 => 继续滚动
  setTimeout(() => {
    moveAnimate(step, targetOffset, targetIdx, callBack);
  }, interval);
};

const intervalGoForward = () => {
  // 判断元素是否在可视范围内和浏览器是否休眠
  if (webIsActive() || isInViePortOfOne(carousel)) {
    // 将时间间隔分为10份,当第十次时触发滚动并清除沙子 通过沙漏中的沙子实现计时器的暂停和继续
    hourglass += props.interval / 10;
    if (hourglass === props.interval) {
      handleGoForward();
      hourglass = 0;
    }
  }
};

const setAutoRollingInterval = () => {
  if (props.autoRolling && autoRollingInterval === null) {
    autoRollingInterval = setInterval(() => {
      intervalGoForward();
    }, props.interval / 10);
  }
};

const clearAutoRollingInterval = () => {
  if (props.autoRolling && autoRollingInterval !== null) {
    window.clearInterval(autoRollingInterval);
    autoRollingInterval = null;
  }
};

// 浏览器是否休眠
const webIsActive = () => {
  let bowhidden =
    "hidden" in document
      ? "hidden"
      : "webkithidden" in document
        ? "webkithidden"
        : "mozhidden" in document
          ? "mozhidden"
          : null;
  let vibchage =
    "visibilitychange" || "webkitvisibilitychange" || "mozvisibilitychange";
  document.addEventListener(vibchage, function () {
    if (!document[bowhidden]) return true;
    else return false;
  });
};

// 元素是否处于可视区域内
const isInViePortOfOne = (el) => {
  const viewPortHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
  const offsetTop = el.offsetTop;
  const scollTop = document.documentElement.scrollTop;
  const top = offsetTop - scollTop;
  return top <= viewPortHeight && top >= 0;
};

const handleGoForward = () => renderMove(curIdx.value + 1);

const handleGoBack = () => renderMove(curIdx.value - 1);

const handleChange = (idx) => renderMove(idx);

const handleMouseEnter = () => clearAutoRollingInterval();

const handleMouseLeave = () => setAutoRollingInterval();

onMounted(() => {
  // 获取属性
  carousel = ctx.$refs.carousel;
  carousel_body = carousel.children[0];
  carousel_item = carousel_body.children;
  carouselWidth = carousel.offsetWidth;
  itemCount = carousel_item.length;
  // 循环滚动结构
  if (props.circular) preCirculation();
  // 设置自动滚动定时器
  setAutoRollingInterval();
});

onUnmounted(() => {
  clearAutoRollingInterval();
});
</script>

<style scoped lang="less">
.carousel {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .carousel-body {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
  }
}
</style>
