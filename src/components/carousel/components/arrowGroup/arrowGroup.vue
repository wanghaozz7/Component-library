<template>
  <div
    class="arrow"
    @click="handleClick('goBack')"
    :style="getArrowStyle('left')"
  >
    <img src="./icons/arrow-left.png" :style="getIconStyle('left')" />
  </div>
  <div
    class="arrow"
    @click="handleClick('goForward')"
    :style="getArrowStyle('right')"
  >
    <img src="./icons/arrow-right.png" :style="getIconStyle('right')" />
  </div>
</template>

<script setup name="arrowGroup">
import { computed } from "vue";
const props = defineProps({
  showArrow: {
    type: String,
    default: "hover",
  },
  isHover: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["goForward", "goBack"]);

const getArrowStyle = computed(() => {
  return (direction) => {
    let left, right;
    if (props.showArrow === "hover") {
      if (direction === "left") left = "5px";
      else right = "5px";
    } else {
      if (direction === "left") left = "15px";
      else right = "15px";
    }
    return {
      left,
      right,
    };
  };
});

const getIconStyle = computed(() => {
  return (direction) => {
    let display, transform, opacity;
    if (props.showArrow === "none") display = "none";
    else if (props.showArrow === "hover") {
      opacity = props.isHover ? 0.7 : 0;
      transform = props.isHover
        ? `translateX(${direction === "left" ? 10 : -10}px)`
        : "";
    } else {
      opacity = 0.7;
    }

    const padding =
      direction === "left" ? "3px 4px 3px 3px" : "3px 3px 3px 5px";
    return {
      padding,
      display,
      opacity,
      transform,
    };
  };
});

const handleClick = (type) => {
  emit(type);
};
</script>

<style scoped lang="less">
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  img {
    width: 33px;
    height: 34px;
    border-radius: 50%;
    border: 1px solid gray;
    background-color: #eee;
    transition: all 0.3s;
    cursor: pointer;
  }
}
</style>
