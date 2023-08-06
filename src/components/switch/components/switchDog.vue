<template>
  <div class="toggle dog-rollover" :style="variable">
    <input :id="id" type="checkbox" v-model="inputValue" @change="handleChange" />
    <label class="toggle-item" :for="id">
      <div class="dog">
        <div class="ear" />
        <div class="ear right" />
        <div class="face">
          <div class="eyes" />
          <div class="mouth" />
        </div>
      </div>
    </label>
  </div>
</template>

<script setup name="switch-dog">
import { ref, computed } from 'vue'
const emits = defineEmits(['change'])

const props = defineProps({
  defaultValue: {
    type: Boolean,
    default: true
  },
  activeColor: {
    type: String,
    default: '#2e394d'
  },
  inactiveColor: {
    type: String,
    default: 'orange'
  },
})

let inputValue = ref(props.defaultValue);

const getRandomNodeId = () => {
  return 'dog' + Date.now() + Math.ceil(Math.random() * 100000);
}

const id = getRandomNodeId()

const variable = computed(() => {
  const dogLeft = inputValue.value ? '68px' : '3px';
  const dogTrans = inputValue.value ? ' rotate(360deg)' : '';
  const mouthTrans = inputValue.value ? 'scale(1)' : 'scale(0)'
  const mouthTransDelay = inputValue.value ? '.7s' : '.1s';
  const earRightTrans = inputValue.value ? 'scaleX(-1) rotate(-35deg)' : 'rotate(60deg) scaleX(-1)'
  const earRightTransDelay = inputValue.value ? '.6s' : '.4s'
  const backgroundColor = inputValue.value ? props.activeColor : props.inactiveColor;

  return {
    '--bgc': backgroundColor,
    '--dog-left': dogLeft,
    '--dog-transform': dogTrans,
    '--mouth-transform': mouthTrans,
    '--mouth-transform-delay': mouthTransDelay,
    '--ear-right-transform': earRightTrans,
    '--ear-right-transform-delay': earRightTransDelay
  }
})


const handleChange = e => {
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
  background-color: #bcdd96;

  @media (max-width: 600px) {

    .toggle {
      border-right: none !important;
      border-bottom: 1px solid #f5f5f5;
    }

    >div>div {
      &:nth-child(odd) {
        border-right: none !important;
      }
    }

  }

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
        height: 40px;
        left: 0;
        opacity: 0;
        position: absolute;
        top: 0;
        width: 40px;
      }
    }
  }
}

.toggle {
  position: relative;
  display: inline-block;
}

label.toggle-item {
  width: 111px;
  background: var(--bgc);
  height: 48px;
  display: inline-block;
  border-radius: 50px;
  position: relative;
  transition: all .3s ease;
  transform-origin: 20% center;
  cursor: pointer;

  &::before {
    display: block;
    width: 40px;
    height: 40px;
    top: 3px;
    left: 4px;
    border-radius: 50%;
    border: 2px solid #88cf8f;
    transition: .3s ease;
  }
}

.dog-rollover {
  label {
    &:before {
      content: none;
    }

    .dog {
      display: inline-block;
      position: absolute;
      width: 40px;
      height: 40px;
      top: 4px;
      left: var(--dog-left);
      transition: .6s ease;
    }

    .eyes {
      position: absolute;
      width: 8px;
      height: 8px;
      background: #222;
      border-radius: 50%;
      transform: translate(8px, 14px);
      box-shadow: 16px 0 0 #222, 22px -4px 0 12px #e4ac04;
    }

    .ear {
      width: 18px;
      height: 20px;
      position: absolute;
      left: -4px;
      bottom: 80%;
      background: #f9bb00;
      margin-bottom: -5px;
      border-radius: 50% 50% 0 0 / 100% 100% 0 0;
      box-shadow: inset 4px 0 0 0px #ffffff, inset -4px 0 0 0px #ffffff;
      transform: rotate(-40deg);

      &.right {
        transform: var(--ear-right-transform);
        left: auto;
        right: 0px;
        transform-origin: center bottom;
        transition: .4s ease-in-out;
      }
    }

    .face {
      overflow: hidden;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      position: absolute;
      background: #fff;
      z-index: 8;
    }

    .mouth {
      position: absolute;
      background: #222;
      width: 14px;
      height: 7px;
      left: 50%;
      margin-left: -7px;
      border-radius: 2px 2px 20px 20px;
      bottom: 8px;
      transform: var(--mouth-transform);
      transition: .1s ease;

      &:before {
        width: 8px;
        height: 8px;
        background: #ec788d;
        border-radius: 0 0 50% 50%;
        position: absolute;
        left: 50%;
        transform: translate(-50%, 5px);
      }
    }

    &:before {
      border-color: white;
      background: white;
    }
  }
}

label {
  .dog {
    left: var(--dog-left);
    transform: var(--dog-transform);
  }

  .mouth {
    transform: var(--mouth-transform);
    transition-delay: var(--mouth-transform-delay);
  }

  .ear.right {
    transform: var(--ear-right-transform);
    transition-delay: var(--ear-right-transform-delay);
  }

}
</style>
