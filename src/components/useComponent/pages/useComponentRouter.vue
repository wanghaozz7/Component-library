<template>
  <use-component :title="config.title" :lists="config.lists">
    <show-component v-for="(component, index) in selectedArr" :key="index" :code="getCode(component)"
      :title="getTitle(component)">
      <component :is="component" :refreshTooltip="refreshTooltip" />
    </show-component>
  </use-component>
</template>

<script setup name="useComponentRouter">
import { watch, ref } from "vue";

import tableConfig from "../config/table";
import carouselConfig from "../config/carousel";
import tooltipConfig from "../config/tooltip";

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
  }
};

let refreshTooltip = ref(false);

const config = getConfig();
// console.log('config', config, props.selectedArr);

const getCode = (name) => {
  for (let child of config.children) {
    if (child.id === name) return child.code;
  }
}
const getTitle = name => {
  for (let child of config.children) {
    if (child.id === name) return child.title;
  }
}


watch(
  () => props.scrollOffset,
  (newValue, oldValue) => {
    refreshTooltip.value = !refreshTooltip.value;
  }
);
</script>
