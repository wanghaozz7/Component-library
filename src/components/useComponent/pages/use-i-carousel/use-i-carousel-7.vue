<template>
  <div class="carousel-container">
    <i-carousel trigger="click" indicatorPosition="outside">
      <carousel-item v-for="(url, idx) in imgList" :key="url">
        <div class="carousel-item"><img :src="url" /></div>
      </carousel-item>
    </i-carousel>
  </div>
</template>

<script setup>
const imgList = [
  "https://i0.hippopx.com/photos/320/918/427/sky-clouds-sunlight-dark-thumb.jpg",
  "https://i0.hippopx.com/photos/683/318/324/wolf-wolves-snow-wolf-landscape-thumb.jpg",
  "https://i0.hippopx.com/photos/477/768/839/swimmer-sport-swim-water-thumb.jpg",
  "https://i0.hippopx.com/photos/969/496/921/woman-girl-dom-happy-thumb.jpg",
  "https://i0.hippopx.com/photos/856/151/610/panorama-sunrise-dawn-bled-thumb.jpg",
];
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
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
