<template>
  <div class="wrapper">
    <div class="row">
      <Switch @change="handleChange" class="item" type="face" />
      <Switch @change="handleChange" class="item" type="dog" />
      <Switch @change="handleChange" class="item" type="displace" />
      <Switch @change="handleChange" class="item" type="basketball" />
    </div>
    <div class="row">
      <Switch @change="handleChange" class="item" type="overturn" />
      <Switch @change="handleChange" class="item" type="parallelogram" />
      <Switch @change="handleChange" class="item" type="ripple" />
      <Switch @change="handleChange" class="item" type="roll" />
    </div>
    <div class="row">
      <Switch @change="handleChange" class="item" type="seesaw" />
      <Switch @change="handleChange" class="item" type="stack" />
      <Switch @change="handleChange" class="item" type="transparent" />
      <Switch @change="handleChange" class="item" type="weather" />
    </div>
  </div>
</template>

<script setup name="swtich3">



const handleChange = value => {
  console.log(value);
}

</script>

<style scoped lang="less">
.wrapper {
  padding: 20px;

  .row {
    display: flex;
    width: 100%;
    height: 150px;
    align-items: center;
    border-bottom: 1px solid #eee;
    background-color: rgb(187, 253, 187);
    padding: 50px;

    .item {
      flex: 1;
    }
  }
}
</style>
