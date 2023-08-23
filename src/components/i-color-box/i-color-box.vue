<template>
  <div class="color-box" ref="colorBox" :style="getColorBoxStyle">
    <div>{{ label }}</div>
  </div>
</template>

<script setup name="i-color-box">
import { watch, getCurrentInstance, computed } from "vue";

const props = defineProps({
  color: {
    type: String,
    default: "#fff",
  },
  label: {
    type: String,
    default: "白色",
  },
});

const { ctx } = getCurrentInstance();

let lastColorName = props.label;

const getColorBoxStyle = computed(() => {
  const background = props.color;
  return {
    background,
  };
});

watch(
  () => props.color,
  (newVal, oldVal) => {
    const colorBox = ctx.$refs.colorBox;
    const slideBox = document.createElement("div");
    slideBox.className = "slide-box";
    slideBox.style.background = oldVal;
    const innerBox = document.createElement("div");

    innerBox.innerText = lastColorName;
    innerBox.className = "inner-box";
    slideBox.appendChild(innerBox);
    colorBox.appendChild(slideBox);
    setTimeout(() => {
      slideBox.style.transform = "translate(200px,200px)";
      setTimeout(() => {
        colorBox.removeChild(slideBox);
      }, 510);
    }, 10);
    lastColorName = props.label;
  },
  {
    immediate: false,
  }
);
</script>

<style scoped lang="less">
.color-box {
  width: 200px;
  height: 200px;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  div {
    color: white;
    font-weight: 800;
    font-size: 24px;
    text-align: center;
  }
}
</style>

<style lang="less">
.slide-box {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 400px;
  height: 400px;
  transition: all 0.5s ease-in-out;
  -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%);
  display: flex;
  justify-content: right;
  align-items: center;
  color: white;
  font-weight: 800;
  font-size: 24px;

  .inner-box {
    transform: translate(0, 100px);
  }
}
</style>
