<template>
  <use-component
    :title="tooltipConfig.title"
    :lists="tooltipConfig.lists"
    v-show="selectedArr.length !== 0"
  >
    <div v-show="getShowType(tooltipConfig.children[0].id)">
      <show-component
        :code="tooltipConfig.children[0].code"
        :title="tooltipConfig.children[0].title"
      >
        <tooltip placement="top">
          <div
            style="
              width: 100px;
              height: 100px;
              background-color: red;
              margin: 100px auto;
              display: flex;
              justify-content: center;
              align-items: center;
            "
          >
            111
          </div>
        </tooltip>
        <tooltip placement="right">
          <div
            style="
              width: 100px;
              height: 100px;
              background-color: red;
              margin: 100px auto;
              display: flex;
              justify-content: center;
              align-items: center;
            "
          >
            111
          </div>
        </tooltip>
        <tooltip placement="bottom">
          <div
            style="
              width: 100px;
              height: 100px;
              background-color: red;
              margin: 100px auto;
              display: flex;
              justify-content: center;
              align-items: center;
            "
          >
            111
          </div>
        </tooltip>
        <tooltip placement="left">
          <div
            style="
              width: 100px;
              height: 100px;
              background-color: red;
              margin: 100px auto;
              display: flex;
              justify-content: center;
              align-items: center;
            "
          >
            111
          </div>
        </tooltip>
      </show-component>
    </div>
  </use-component>
</template>

<script setup name="useTooltip">
import { computed } from "vue";
import tooltipConfig from "../config/tooltip.js";

const props = defineProps({
  selectedArr: {
    type: Array,
    default() {
      return [];
    },
  },
});

const getShowType = computed(() => {
  return (id) => {
    const res = props.selectedArr.find((x) => {
      return x === id;
    });
    return res !== undefined;
  };
});
</script>

<style scoped lang="less">
.tooltip-container {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  .tooltip-content {
    border: 1px solid gray;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
  }
}
</style>
