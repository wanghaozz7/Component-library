<template>
  <div class="row">
    <Switch
      v-model="val"
      @change="handleChange"
      activeText="绿色"
      inactiveText="红色"
      class="item"
    />
    <Switch
      v-model="val"
      @change="handleChange"
      activeText="黄色"
      inactiveText="粉色"
      class="item"
      activeColor="yellow"
      inactiveColor="pink"
    />
  </div>
</template>

<script setup>
let val;

const handleChange = (value) => {
  console.log("val", val, value);
};
</script>

<style scoped lang="less">
.row {
  padding: 20px;
  display: flex;

  .item {
    flex: 1;
  }
}
</style>
