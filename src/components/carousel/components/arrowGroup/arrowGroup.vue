<template>
  <div class="arrow left" @click="handleClick('goBack')">
    <img src="./icons/arrow-left.png" />
  </div>
  <div class="arrow right" @click="handleClick('goForward')">
    <img src="./icons/arrow-right.png" />
  </div>
</template>

<script setup name="arrowGroup">
const emit = defineEmits(["goForward", "goBack"]);

const handleClick = (type) => {
  emit(type);
};
</script>

<style scoped lang="less">
.arrow {
  width: 25px;
  height: 25px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
}
.left {
  left: 0;
}
.right {
  right: 0;
}
</style>
