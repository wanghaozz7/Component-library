<template>
  <div style="padding: 20px">
    <Switch
      v-model="val"
      @change="handleChange"
      @active="handleActive"
      @inactive="handleInactive"
    />
  </div>
</template>

<script setup>
let val;

const handleChange = (value) => {
  console.log("val", val, value);
};

const handleActive = (e) => {
  console.log("active", val, e);
};

const handleInactive = (e) => {
  console.log("inactive", val, e);
};
</script>
