<template>
  <div class="select" v-click-outside="handleClickOutside" @click="handleClick" :style="getSelectStyle">
    <input type="text" style="width: 210px; height: 100%" ref="input" />
    <div class="icon">
      <arrow :isFold="actived" />
    </div>
    <transition name="shrink-in-top">
      <div class="dropdown" v-show="actived">
        <div class="triangle">
          <div class="inner-triangle" />
        </div>
        <div class="body">
          <div class="row" v-for="item in 8">{{ item }}</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup name="select">
import { ref, computed, getCurrentInstance } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const { ctx } = getCurrentInstance();
let actived = ref(false)

const getSelectStyle = computed(() => {
  const borderColor = actived.value ? 'blue' : '';
  return {
    borderColor
  }
})

const handleClickOutside = e => {
  console.log('outside');
  actived.value = false;
}

const handleClick = e => {
  console.log('inside');
  actived.value = true;
  const input = ctx.$refs.input;
  input.focus();
}

const vClickOutside = {
  mounted(el, binding) {
    function eventHandler(e) {
      if (el.contains(e.target)) {
        return false;
      }
      if (binding.value && typeof binding.value === 'function') {
        binding.value(e);
      }
    }
    el.Tag = eventHandler;
    document.addEventListener('click', eventHandler);
  },
  beforeUnmount(el) {
    document.removeEventListener('click', el.Tag);
    delete el.Tag;
  }
};

</script>

<style scoped lang="less">
input[type="text"] {
  border: 0;
  outline: none;
  box-sizing: border-box;
  border-radius: 4px;
  padding-left: 15px;
  cursor: pointer;
}

.select {
  width: 240px;
  height: 35px;
  // box-sizing: border-box;
  border: 1px solid #eee;
  border-radius: 4px;

  display: flex;
  cursor: pointer;
  position: relative;

  &:hover {
    border-color: gray;
  }

  .icon {
    width: 30px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dropdown {
    position: absolute;
    bottom: -315px;
    left: -1px;
    width: 240px;
    height: 300px;
    background-color: #fff;
    border: 1px solid #eee;
    box-shadow: 0 0 8px 0 rgba(232, 237, 258, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
    z-index: 999;
    border-radius: 4px;
    // box-sizing: border-box;

    .triangle {
      position: absolute;
      width: 0;
      height: 0;
      border: 8px solid transparent;
      border-bottom-color: #eee;
      z-index: 9999;
      top: -16px;
      left: 50%;
      transform: translateX(-50%);

      .inner-triangle {
        position: absolute;
        width: 0;
        height: 0;
        top: -6px;
        left: -7px;
        border: 7.5px solid transparent;
        border-bottom-color: #fff;
        z-index: 9999;
      }
    }

    .body {
      .row {
        height: 37.5px;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;

        &:last-child {
          border-bottom: 0px solid #fff;
        }
      }
    }
  }
}
</style>
