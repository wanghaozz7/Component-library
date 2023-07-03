<template>
  <div id="carousel">
    <div class="carousel-body" :style="{ left: offset + 'px' }">
      <div class="carousel-item" v-for="item in 5" :key="item">
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
          "
        >
          {{ item }}
        </div>
      </div>
    </div>
    <arrowGroup @goForward="handleGoForward" @goBack="handleGoBack" />
    <indicatorGroup />
  </div>
</template>

<script setup name="carousel">
import { ref, onMounted } from "vue";

import arrowGroup from "./components/arrowGroup/index.vue";
import indicatorGroup from "./components/indicatorGroup/index.vue";

const props = defineProps({
  // 是否循环滚动
  circular: {
    type: Boolean,
    default: true,
  },
  // 滚动一次的延迟
  delay: {
    type: Number,
    default: 300,
  },
  // 动画的帧数
  frame: {
    type: Number,
    default: 50,
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

const shouldMove = () => {
  return !isMoving.value;
};

const getOffsetByIdx = (idx) => {
  return Math.abs(idx * carouselWidth) * -1;
};

const preCirculation = () => {
  // 在首位添加一个末位元素 在末位添加一个首位元素
  const carousel_item = document.querySelectorAll(".carousel-item");
  const carousel_body = document.querySelector(".carousel-body");
  itemCount = carousel_item.length;
  let el = ``,
    t = ``;
  //在首部添加尾元素
  el += `<div class='carousel-item'>${
    carousel_item[itemCount - 1].innerHTML
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
  // 默认偏移量更改
  offset.value = carouselWidth * -1;
  // 默认下标更改
  curIdx.value = 1;
};

const handleGoForward = () => {
  renderMove(curIdx.value + 1);
};

const handleGoBack = () => {
  renderMove(curIdx.value - 1);
};

const renderMove = (targetIdx) => {
  if (!shouldMove()) return;
  isMoving.value = true;
  const dif = Math.abs(curIdx.value - targetIdx);
  if (dif === 1) {
    // 单次滚动
    console.log("单次滚动");
    const targetOffset = getOffsetByIdx(targetIdx);
    const offsetDif = targetOffset - offset.value;
    const step = Math.ceil(offsetDif / props.frame);
    moveAnimate(step, targetOffset, targetIdx);
  } else {
    console.log("跳跃滚动");
    // 跳跃滚动
  }
};

const moveAnimate = (step, targetOffset, targetIdx) => {
  offset.value += step;
  // 到达终点 => 对齐offset || 将offset和curIdx的值重置在合法范围(循环滚动的处理)
  if (
    (step > 0 && offset.value >= targetOffset) ||
    (step < 0 && offset.value <= targetOffset)
  ) {
    offset.value = targetOffset;
    curIdx.value = targetIdx;
    isMoving.value = false;
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
    return;
  }
  // 未到达终点 => 相同间隔执行动画
  setTimeout(() => {
    moveAnimate(step, targetOffset, targetIdx);
  }, interval);
};

onMounted(() => {
  const carousel = document.getElementById("carousel");
  const carousel_item = document.querySelectorAll(".carousel-item");
  // 获取轮播图宽度
  carouselWidth = carousel.offsetWidth;
  // 获取轮播对象个数
  itemCount = carousel_item.length;
  // 循环滚动结构
  if (props.circular) preCirculation();
});
</script>

<style scoped lang="less">
#carousel {
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

<style>
.carousel-item {
  width: 100%;
  height: 100%;
  background-color: rgb(253, 227, 231);
  flex-shrink: 0;
}
</style>
