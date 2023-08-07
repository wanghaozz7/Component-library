<template>
  <div class="wrapper">
    <div class="row">
      <Switch @change="handleChange" class="item" type="face" v-model="face" />
      <Switch @change="handleChange" class="item" type="dog" v-model="dog" />
      <Switch @change="handleChange" class="item" type="displace" v-model="displace" />
      <Switch @change="handleChange" class="item" type="basketball" v-model="basketball" />
    </div>
    <div class="row">
      <Switch @change="handleChange" class="item" type="overturn" v-model="overturn" />
      <Switch @change="handleChange" class="item" type="parallelogram" v-model="parallelogram" />
      <Switch @change="handleChange" class="item" type="ripple" v-model="ripple" />
      <Switch @change="handleChange" class="item" type="roll" v-model="roll" />
    </div>
    <div class="row">
      <Switch @change="handleChange" class="item" type="seesaw" v-model="seesaw" />
      <Switch @change="handleChange" class="item" type="pancake" v-model="pancake" />
      <Switch @change="handleChange" class="item" type="transparent" v-model="transparent" />
      <Switch @change="handleChange" class="item" type="weather" v-model="weather" />
    </div>
  </div>
</template>

<script setup name="swtich3">

let face, displace, dog, basketball, overturn, parallelogram, ripple, roll, seesaw, pancake, transparent, weather;

const handleChange = value => {
  console.log(value);
  console.log(face, displace, dog, basketball, overturn, parallelogram, ripple, roll, seesaw, pancake, transparent, weather);
}

</script>

<style scoped lang="less">
.wrapper {
  padding: 20px;

  .row {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    border-bottom: 2px solid #fff;
    background-color: rgb(187, 253, 187);
    padding: 50px;

    .item {
      flex: 1;
    }
  }
}
</style>
