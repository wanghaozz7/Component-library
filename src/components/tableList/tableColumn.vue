<template>
  <col :width="colWidth" ref="col" />
</template>

<script setup name="table-column">
import { onMounted, getCurrentInstance, nextTick, ref } from "vue";

const props = defineProps({
  width: {
    type: Number,
    default: -1,
  },
  minWidth: {
    type: Number,
    default: 0,
  },
  label: {
    type: String,
    default: "",
  },
  prop: {
    type: String,
    default: "",
  },
  align: {},
  headerAlign: {},
});

let colWidth = ref(props.width !== -1 ? props.width : props.minWidth);

const ctx = getCurrentInstance().ctx;

onMounted(() => {
  nextTick(() => {
    const colgroup = ctx.$refs.col.parentNode;
    const widthArr =
      colgroup.__vueParentComponent.devtoolsRawSetupState.widthArr;
    const res = widthArr.find((x) => {
      return x.prop === props.prop;
    });
    colWidth.value = res.width;
  });
});
</script>

<style scoped lang="less"></style>
