<template>
  <div class="toggle checkbox-ripple" :style="variable">
    <input type="checkbox" :id="id" v-model="inputValue" @change="handleChange" />
    <label :for="id" class="label">
      <span />
    </label>
  </div>
</template>

<script setup name="switch-ripple">
import { ref, computed } from 'vue'

const emits = defineEmits(['change'])

const props = defineProps({
  defaultValue: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: 'mini'
  },
  activeColor: {
    type: String,
    default: '#947ADA'
  },
  inactiveColor: {
    type: String,
    default: '#9A9999'
  },
  spanActiveColor: {
    type: String,
    default: '#4F2EDC'
  },
  spanInActiveColor: {
    type: String,
    default: '#fff'
  }
})

let inputValue = ref(props.defaultValue);

const getRandomNodeId = () => {
  return 'face' + Date.now() + Math.ceil(Math.random() * 100000);
}

const id = getRandomNodeId()

const variable = computed(() => {
  const labelBackgroundColor = inputValue.value ? props.activeColor : props.inactiveColor;
  const spanBackgroundColor = inputValue.value ? props.spanActiveColor : props.spanInActiveColor;
  const spanTrans = inputValue.value ? 'translateX(70px)' : '';
  const spanTransition = inputValue.value ? 'all 0.2s cubic-bezier(0.8, 0.4, 0.3, 1.25), background 0.15s ease' : 'all 0.2s ease';
  const spanBoxShadow = inputValue.value ? '0 3px 8px rgba(79, 46, 220, 0.2)' : '0 3px 8px rgba(154, 153, 153, 0.5)';
  const spanBeforeTrans = inputValue.value ? 'scale(1)' : 'scale(0)';
  const spanBeforeOpacity = inputValue.value ? 0 : 1;
  const spanBeforeTransition = inputValue.value ? 'all 0.4s ease' : '';
  return {
    '--label-bgc': labelBackgroundColor,
    '--span-bgc': spanBackgroundColor,
    '--span-transform': spanTrans,
    '--span-transition': spanTransition,
    '--span-box-shadow': spanBoxShadow,
    '--span-before-transform': spanBeforeTrans,
    '--span-before-transition': spanBeforeTransition,
    '--span-before-opacity': spanBeforeOpacity
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
  background: #2e394d;
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

.checkbox-ripple input[type="checkbox"] {
  visibility: hidden;
  display: none;
}

.checkbox-ripple .label {
  position: relative;
  display: inline-block;
  width: 111px;
  height: 48px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transform: translate3d(0, 0, 0);
}

.checkbox-ripple .label:before {
  content: "";
  position: relative;
  top: 3px;
  width: 111px;
  height: 40px;
  display: block;
  background: var(--label-bgc);
  border-radius: 60px;
  transition: background 0.2s ease;
}

.checkbox-ripple .label span {
  position: absolute;
  top: 0;
  left: 0;
  width: 47px;
  height: 47px;
  display: block;
  background: white;
  border-radius: 30px;
  box-shadow: 0 3px 8px rgba(154, 153, 153, 0.5);
  transition: var(--span-transition);
}

.checkbox-ripple .label span:before {
  content: "";
  position: absolute;
  display: block;
  margin: -18px;
  width: 80px;
  height: 80px;
  background: rgba(79, 46, 220, 0.5);
  border-radius: 50%;
  transform: var(--span-before-transform);
  opacity: var(--span-before-opacity);
  pointer-events: none;
}

.label:before {
  background: var(--label-bgc);
}

.label span {
  background: var(--span-bgc);
  transform: var(--span-transform);
  transition: var(--span-transition);
  box-shadow: var(--span-box-shadow);
}

.label span:before {
  transform: var(--span-before-transform);
  opacity: var(--span-before-opacity);
  transition: var(--span-before-transition);
}
</style>
