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
        <div style="margin-top: 50px" class="cont">
          <tooltip
            placement="top"
            content="我悬浮在上边~"
            :refreshTooltip="refreshTooltip"
          >
            <div class="item">上</div>
          </tooltip>
        </div>
        <div style="margin: 50px 0; gap: 150px" class="cont">
          <tooltip
            placement="left"
            content="我悬浮在左边~"
            :refreshTooltip="refreshTooltip"
          >
            <div class="item">左</div>
          </tooltip>
          <tooltip
            placement="right"
            content="我悬浮在右边~"
            :refreshTooltip="refreshTooltip"
          >
            <div class="item">右</div>
          </tooltip>
        </div>
        <div style="margin-bottom: 50px" class="cont">
          <tooltip
            placement="bottom"
            content="我悬浮在下边~"
            :refreshTooltip="refreshTooltip"
          >
            <div class="item">下</div>
          </tooltip>
        </div>
      </show-component>
    </div>
  </use-component>
</template>

<script setup name="useTooltip">
import { computed, ref, watch } from "vue";
import tooltipConfig from "../../config/tooltip.js";

const props = defineProps({
  selectedArr: {
    type: Array,
    default() {
      return [];
    },
  },
  scrollOffset: {
    type: Number,
    default: 0,
  },
});

let refreshTooltip = ref(false);

const getShowType = computed(() => {
  return (id) => {
    const res = props.selectedArr.find((x) => {
      return x === id;
    });
    return res !== undefined;
  };
});

watch(
  () => props.scrollOffset,
  (newValue, oldValue) => {
    refreshTooltip.value = !refreshTooltip.value;
  }
);
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
.item {
  width: 75px;
  height: 75px;
  border: 1px solid gray;
  margin: 100px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.cont {
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
