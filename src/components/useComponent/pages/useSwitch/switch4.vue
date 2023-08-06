<template>
  <div class="row">
    <Switch v-model="val" @change="handleChange" activeText="开灯" inactiveText="关灯" class="item" />
    <Switch v-model="val" @change="handleChange" activeText="开灯" inactiveText="关灯" class="item" :width="120"
      :height="40" />
    <Switch v-model="val" @change="handleChange" activeText="开灯" inactiveText="关灯" class="item" :width="150"
      :height="50" />
  </div>
</template>

<script setup name="swtich1">

let val;

const handleChange = value => {
  console.log('val', val, value);
}

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
