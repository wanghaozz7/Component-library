<template>
  <div class="toggle normal" :style="variable">
    <input :id="id" type="checkbox" v-model="inputValue" @change="handleChange" />
    <label class="toggle-item" :for="id" :style="getLabelStyle" />
  </div>
</template>

<script setup name="switch-normal">
import { ref, computed } from 'vue'

const emits = defineEmits(['change'])

const props = defineProps({
  defaultValue: {
    type: Boolean,
    default: true
  },
  activeColor: {
    type: String,
    default: 'green'
  },
  inactiveColor: {
    type: String,
    default: 'red'
  },
  width: {
    type: Number,
    default: 60
  },
  height: {
    type: Number,
    default: 30
  }
})

let inputValue = ref(props.defaultValue);

const variable = computed(() => {
  const width = props.width + 'px';
  const left = props.width - props.height + 'px';
  const height = props.height + 'px';
  const button = props.height - 4 + 'px';
  const activeColor = props.activeColor;
  const inactiveColor = props.inactiveColor;
  return {
    '--activeColor': activeColor,
    '--inactiveColor': inactiveColor,
    '--width': width,
    '--left': left,
    '--height': height,
    '--button': button
  }
})

const getLabelStyle = computed(() => {
  const left = !inputValue.value ? '2px' : props.width - props.height + 'px';
  const backgroundColor = inputValue.value ? props.activeColor : props.inactiveColor;
  console.log(left, backgroundColor);

  return {
    '--cur': left,
    '--bgc': backgroundColor
  }
})

const getRandomNodeId = () => {
  return Date.now() + Math.ceil(Math.random() * 100000);
}

const id = ref(getRandomNodeId());

const handleChange = e => {
  console.log(inputValue.value);
  emits('change', inputValue.value)
}
</script>


<style scoped lang="less">
* {
  box-sizing: border-box;

  &::before,
  &::after {
    content: '';
    position: absolute;
  }
}

body {
  display: flex;
  justify-content: center;
  align-items: center;

  >div {
    width: 604px;
    border: 1px solid #f5f5f5;
    flex-wrap: wrap;
    text-align: center;
    font-size: 0;

    >div {
      width: 300px;
      display: inline-block;
      padding: 20px 0;

      &:not(:last-child) {
        &:nth-child(odd) {
          border-right: 1px solid #f5f5f5;
        }
      }

      input {
        width: 0;
        height: 0;
        left: 0;
        top: 0;
        opacity: 0;
        position: absolute;
      }
    }
  }
}

.toggle {
  position: relative;
  display: inline-block;
}

label.toggle-item {
  width: var(--width);
  height: var(--height);
  display: inline-block;
  position: relative;
  transition: all .3s ease;
  transform-origin: 20% center;
  border-radius: 50px;
  cursor: pointer;

  &::before {
    display: block;
    width: var(--button);
    height: var(--button);
    top: 1px;
    border-radius: 50%;
    border: 2px solid var(--activeColor);
    transition: .3s ease;
  }
}

.normal {
  label {
    border: .5px solid rgba(117, 117, 117, 0.31);

    &::before {
      background: #fff;
      border: none;
    }

    &::after {
      width: calc(100% + 8px);
      height: calc(100% + 8px);
      top: -5px;
      left: -4px;
      background: transparent;
      border-radius: 45px;
      z-index: 0;
    }
  }
}

.toggle-item {
  background: var(--bgc);

  &::before {
    left: var(--cur);
  }
}
</style>
