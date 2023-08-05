<template>
  <div style="padding: 20px;">
    <Switch v-model="val" @change="handleChange" />
  </div>
</template>

<script setup name="swtich1">

let val;

const handleChange = value => {
  console.log('val', val, value);
}

</script>

<style scoped lang="less"></style>
