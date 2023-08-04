<template>
  <Switch v-model="val" @change="handleChange" type="basketball" />
</template>

<script setup name="swtich1">

let val;

const handleChange = value => {
  console.log('val', val, value);
}

</script>

<style scoped lang="less"></style>
