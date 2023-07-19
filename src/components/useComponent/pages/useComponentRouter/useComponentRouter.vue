<template>
  <use-component :title="config.title" :lists="config.lists">
    <show-component
      :code="config.children[index].code"
      :title="config.children[index].title"
      v-for="(component, index) in selectedArr"
      :key="index"
    >
      <component :is="component" :scrollOffset="scrollOffset" />
    </show-component>
  </use-component>
</template>

<script setup name="useComponentRouter">
import tableConfig from "../../config/table";
import carouselConfig from "../../config/carousel";
import tooltipConfig from "../../config/tooltip";

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
const config = getConfig();
console.log("config", config, props.selectedArr);
</script>
