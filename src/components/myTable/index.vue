<template>
  <table border="1px" cellpadding="10px">
    <tr ref="header">
      <slot></slot>
    </tr>
    <tr v-for="obj in data" :key="obj">
      <td v-for="prop in propArray" :key="prop">{{ obj[prop] }}</td>
    </tr>
  </table>
</template>
<script setup>
import { getCurrentInstance, onMounted, reactive } from "vue";

const props = defineProps({
  data: {
    type: Array,
    default() {
      return [];
    },
  },
});

const propArray = reactive([]);

const ctx = getCurrentInstance().ctx;

onMounted(() => {
  const header = ctx.$refs.header;
  const arr = header.children;
  for (let th of arr) propArray.push(th.attributes.prop.nodeValue);
  console.log("propArray", propArray);
});
</script>
<style lang="scss" scoped></style>
