<template>
  <use-component :title="config.title" :lists="config.lists">
    <transition-group name="box" @enter="onEnter">
      <show-component
        v-for="component in selectedArr"
        :key="getProp(component, 'title')"
        :code="getProp(component, 'code')"
        :title="getProp(component, 'title')"
        :refresh="refreshTooltip"
      >
        <component :is="component" :refreshTooltip="refreshTooltip" />
      </show-component>
    </transition-group>
  </use-component>
</template>

<script setup name="use-component-router">
import { watch, ref } from "vue";

import tableConfig from "../config/table";
import carouselConfig from "../config/carousel";
import tooltipConfig from "../config/tooltip";
import mindConfig from "../config/mind";
import switchConfig from "../config/switch";
import messageConfig from "../config/message";
import sideBarConfig from "../config/sidebar";

const props = defineProps({
  selectedArr: {
    type: Array,
    default() {
      return [];
    },
  },
  componentName: {
    type: String,
    default: "",
  },
  scrollOffset: {
    type: Number,
    default: 0,
  },
});

const getConfig = () => {
  switch (props.componentName) {
    case "table":
      return tableConfig;
    case "tooltip":
      return tooltipConfig;
    case "carousel":
      return carouselConfig;
    case "mind":
      return mindConfig;
    case "switch":
      return switchConfig;
    case "message":
      return messageConfig;
    case "sidebar":
      return sideBarConfig;
  }
};

let refreshTooltip = ref(false);

const config = getConfig();

const getProp = (name, arg) => {
  return config.children.find((x) => {
    return x.id === name;
  })[arg];
};

const onEnter = (e) => {
  console.log("e", e);
};

watch(
  () => props.scrollOffset,
  (newValue, oldValue) => {
    refreshTooltip.value = !refreshTooltip.value;
  }
);
</script>

<style>
.box {
  width: 100px;
  height: 100px;
  background-color: blue;
}

.box-enter-from {
  opacity: 0;
  transform: translateX(15px);
}

.box-enter-active {
  transition: all 0.3s ease;
}

.box-enter-to {
  opacity: 1;
}

.box-leave-from {
}

.box-leave-active {
  transition: all 0.3s ease;
}

.box-leave-to {
  opacity: 0;
  transform: translateX(15px);
}
</style>
