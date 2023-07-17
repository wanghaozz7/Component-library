<template>
  <use-component
    :title="carouselConfig.title"
    :lists="carouselConfig.lists"
    v-show="selectedArr.length !== 0"
  >
    <div v-show="getShowType(carouselConfig.children[0].id)">
      <show-component
        :code="carouselConfig.children[0].code"
        :title="carouselConfig.children[0].title"
      >
        <div class="carousel-container">
          <carousel indicatorType="rectangle" trigger="click">
            <carousel-item v-for="item in 5" :key="item">
              <div class="carousel-item">+++++{{ item }}+++++</div>
            </carousel-item>
          </carousel>
        </div>
      </show-component>
    </div>
  </use-component>
</template>

<script setup name="useCarousel">
import { computed } from "vue";
import carouselConfig from "../config/carousel";

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
.carousel-container {
  height: 350px;
  margin: 50px;

  .carousel-item {
    width: 100%;
    height: 100%;
    font-size: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(194, 249, 194);
  }
}
</style>
