<template>
  <div class="carousel-container">
    <carousel indicatorType="rectangle" trigger="click">
      <carousel-item v-for="item in 5" :key="item">
        <div class="carousel-item">+++++{{ item }}+++++</div>
      </carousel-item>
    </carousel>
  </div>
</template>

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
