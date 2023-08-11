<template>
  <button @click="handleClick">{{ txt }}</button>
  <transition-group name="box" @enter="onEnter">
    <div v-for="item in arr" :key="item">{{ item }}</div>
  </transition-group>
</template>

<script setup name="transitionAnimation">
import { ref, computed, reactive } from "vue";

let show = ref(true);

let txt = ref("显示");

const handleClick = (e) => {
  show.value = !show.value;
  txt.value = show.value ? "隐藏" : "显示";
  if (show.value) arr.unshift(0);
  else arr.shift();
};
const onEnter = (e) => {
  console.log("e", e);
};

const arr = reactive([0, 1, 2, 3, 4, 5]);
</script>
