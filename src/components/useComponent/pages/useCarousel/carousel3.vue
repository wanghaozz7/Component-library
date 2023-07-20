<template>
  <div class="carousel-container">
    <div class="block">
      <div class="text">使用click触发</div>
      <carousel trigger="click">
        <carousel-item v-for="(url, idx) in imgList" :key="idx">
          <div class="carousel-item"><img :src="url" /></div>
        </carousel-item>
      </carousel>
    </div>
    <div class="block">
      <div class="text">使用hover触发</div>
      <carousel trigger="hover">
        <carousel-item v-for="(url, idx) in imgList" :key="idx">
          <div class="carousel-item"><img :src="url" /></div>
        </carousel-item>
      </carousel>
    </div>
  </div>
</template>

<script setup name="carousel1">
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
  height: 250px;
  margin: 50px;
  display: flex;
  .block {
    flex: 1;
    margin: 15px;
    .text {
      font-size: 14px;
      color: gray;
      text-align: center;
    }
    .carousel-item {
      width: 100%;
      height: 100%;
      font-size: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
        height: calc(100% - 25px);
      }
    }
  }
}
</style>
