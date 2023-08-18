<template>
  <div>
    <div class="color-tabs">
      <div
        class="color-circle"
        v-for="color in tabs"
        :key="color"
        :style="getVariable(color)"
        @click="activeColor = color"
      >
        <transition name="ease-in-out">
          <div class="triangle" v-show="color === activeColor" />
        </transition>
      </div>
    </div>
    <div class="content">
      <div
        class="parallelogram"
        v-for="color in tabs"
        :key="color"
        :style="{ background: color }"
      >
        <div class="text">
          {{ color }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";

const tabs = [
  "black",
  "blue",
  "brown",
  "orange",
  "purple",
  "pink",
  "red",
  "white",
  "yellow",
  "linear-gradient(to left, #40e0d0, #ff8c00, #ff0080)",
];

const colorList = [
  {
    label: "",
    color: "",
  },
];

let activeColor = ref("black");

const getVariable = computed(() => {
  return (color) => {
    return {
      "--color": color,
      "--triangle-color": color === "white" ? "#EEE9BF" : color,
      "--border": color === "white" ? "1px solid #EEE9BF" : "",
      "--box-shadow": `0 0 5px 1px ${
        color === "white" ||
        color === "linear-gradient(to left, #40e0d0, #ff8c00, #ff0080)"
          ? "#CDC9A5"
          : color
      }`,
    };
  };
});
</script>
<style lang="less" scoped>
.color-tabs {
  display: flex;
  // background-color: #f5f5f5;
  padding: 15px 15px 25px 15px;
  .color-circle {
    position: relative;
    width: 25px;
    height: 25px;
    background: var(--color);
    border: var(--border);
    border-radius: 50%;
    margin-right: 15px;
    cursor: pointer;
    &:hover {
      box-shadow: var(--box-shadow);
    }
    .triangle {
      position: absolute;
      bottom: -18px;
      left: 50%;
      transform: translateX(-50%);
      -webkit-clip-path: polygon(0 0, 100% 0, 50% 90%);
      background: var(--triangle-color);
      width: 15px;
      height: 15px;
    }
  }
}
.content {
  display: flex;
  overflow: hidden;
  .parallelogram {
    flex: 1;
    height: 50px;
    transform: skew(45deg);
    cursor: pointer;
    &:first-child {
      margin-left: 30px;
    }
    &:last-child {
      margin-right: 30px;
    }
    .text {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      transform: skew(-45deg);
      color: white;
      font-size: large;
      font-weight: bold;
    }
  }
}
</style>
