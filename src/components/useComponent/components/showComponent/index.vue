<template>
  <div class="title">{{ title.text }}</div>
  <div class="desc">{{ title.desc }}</div>
  <card class="card-container">
    <template v-slot:header>
      <div class="header">
        <slot />
      </div>
    </template>
    <div class="code-area">
      <div class="code" v-text="code" :style="codeStyle" ref="code"></div>
      <div class="extention" @click="handleClick">
        <div class="button">
          <div class="icon" :style="iconStyle"></div>
          <div class="text"><span v-show="!showCode">显示</span><span v-show="showCode">收起</span>代码</div>
        </div>
      </div>
    </div>
  </card>
</template>

<script setup>
import { ref, computed, onMounted, getCurrentInstance } from 'vue'

import card from '@/components/card/index.vue'

const props = defineProps({
  code: {
    type: String,
    default: ``
  },
  title: {
    type: Object,
    default() {
      return {
        text: 'Dropdown 下拉菜单',
        desc: '将动作或菜单折叠到下拉菜单中。'
      }
    }
  },
  defaultShowCode: {
    type: Boolean,
    default: false
  }
})

let showCode = ref(false);

const ctx = getCurrentInstance().ctx;
let maxHeight, minHeight;

const codeStyle = computed(() => {
  const height = showCode.value ? maxHeight : minHeight;
  return {
    height,
  }
})

const iconStyle = computed(() => {
  const rotate = showCode.value ? '180deg' : '';
  const marginTop = showCode.value ? '-2px' : '8px';
  return {
    rotate,
    marginTop
  }
})

const handleClick = () => {
  showCode.value = !showCode.value;
}

onMounted(() => {
  const codeRef = ctx.$refs.code;
  const style = window.getComputedStyle(codeRef);
  maxHeight = style.height;
  minHeight = 0
  if (!props.defaultShowCode) codeRef.style.height = 0;
  else showCode.value = true
})

</script>

<style lang="less" scoped>
.title {
  font-size: 22px;
  margin-top: 45px;
}

.desc {
  font-size: 14px;
  color: gray;
  margin: 15px 0;
}


.card-container {
  width: 300px;

  .code-area {
    position: relative;

    .code {
      overflow: hidden;
      font-size: 14px;
      white-space: pre-wrap;
      transition: all .2s;
      background-color: #FAFAFA;
    }

    .extention {
      height: 45px;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 999;
      cursor: pointer;

      &:hover {
        background-color: #ebebeb;

        .button .text {
          color: skyblue;
        }

        .button .icon {
          border-top-color: skyblue;
        }
      }

      .button {
        height: 20px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;

        .icon {
          transition: all .3s;
          width: 0;
          height: 0;
          margin: 8px 8px 0 auto;
          border: 6px solid transparent;
          border-top-color: #ebebeb;
        }

        .text {
          transition: all .3s;
          overflow: hidden;
          color: #ebebeb;
          font-size: 12px;
        }

      }
    }


  }
}
</style>