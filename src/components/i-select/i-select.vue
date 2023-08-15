<template>
  <div class="select-container" :style="getVariable">
    <div
      class="select-input"
      :style="getInputStyle"
      @click="handleClickInput"
      v-click-outside="handleClickOutside"
    >
      <input type="text" readonly :placeholder="placeholder" ref="input" />
      <div class="arrow">
        <arrow :isFold="visible" />
      </div>
    </div>
    <transition name="shrink-in-top">
      <div class="select-dropdown" v-show="visible">
        <div class="dropdown-triangle">
          <div class="inner-triangle"></div>
        </div>
        <div class="dropdown-body">
          <div
            class="row"
            v-for="(obj, idx) in selectOption"
            :key="obj"
            @click="rowClick(obj, idx)"
          >
            {{ obj.label }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup name="">
import { ref, computed, getCurrentInstance } from "vue";

const emits = defineEmits([
  "update:modelValue",
  "select",
  "change",
  "visibleChange",
  "claer",
  "focus",
  "blur",
]);

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  option: {
    type: Array,
    default() {
      return [];
    },
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  width: {
    type: Number,
    default: 240,
  },
  height: {
    type: Number,
    default: 35,
  },
  placeholder: {
    type: String,
    default: "请选择",
  },
});

// 输入框是否聚焦
let focus = ref(false);
// 下拉框是否可见
let visible = ref(false);
const { ctx } = getCurrentInstance();

const getEmptyOption = () => {
  return [
    {
      label: "",
      value: "",
    },
    {
      label: "",
      value: "",
    },
    {
      label: "",
      value: "",
    },
    {
      label: "",
      value: "",
    },
    {
      label: "",
      value: "",
    },
  ];
};

const selectOption =
  props.option && props.option.length !== 0
    ? props.option.slice()
    : getEmptyOption();

const getInputStyle = computed(() => {
  const borderColor = focus.value ? "#43CD80" : "";
  return {
    borderColor,
  };
});

const getVariable = computed(() => {
  const height = props.height + "px";
  const width = props.width + "px";
  const inputWidth = props.width - 30 + "px";
  const bottom = -1 * (15 + selectOption.length * props.height) + "px";
  return {
    "--height": height,
    "--width": width,
    "--input-width": inputWidth,
    "--bottom": bottom,
  };
});

const handleClickInput = (e) => {
  focus.value = true;
  visible.value = !visible.value;
  const input = ctx.$refs.input;
  input.focus();
};

const handleClickOutside = (e) => {
  focus.value = false;
  visible.value = false;
};

const rowClick = (obj, idx) => {
  const input = ctx.$refs.input;
  if (input.value !== obj.value) emits("change", obj);
  input.value = obj.value ? obj.value : "";
  emits("update:modelValue", obj.value);
  emits("select", obj);
  visible.value = false;
};

const vClickOutside = {
  mounted(el, binding) {
    function eventHandler(e) {
      if (el.contains(e.target)) {
        return false;
      }
      if (binding.value && typeof binding.value === "function") {
        binding.value(e);
      }
    }
    el.Tag = eventHandler;
    document.addEventListener("click", eventHandler);
  },
  beforeUnmount(el) {
    document.removeEventListener("click", el.Tag);
    delete el.Tag;
  },
};
</script>

<style scoped lang="less">
.select-container {
  position: relative;

  .select-input {
    width: var(--width);
    height: var(--height);
    border: 1px solid #eee;
    border-radius: 4px;
    display: flex;
    cursor: pointer;

    input[type="text"] {
      width: var(--input-width);
      height: 100%;
      padding-left: 15px;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      outline: none;
      box-sizing: border-box;
      cursor: pointer;
    }

    .arrow {
      width: 30px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &:hover {
      border-color: #d3d3d3;
    }
  }
  .select-dropdown {
    position: absolute;
    left: -1px;
    bottom: var(--bottom);
    width: var(--width);
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 4px;
    box-shadow: 0 0 8px 0 rgba(232, 237, 258, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
    cursor: pointer;
    z-index: 999;
    .dropdown-triangle {
      position: absolute;
      top: -16px;
      left: 50%;
      width: 0;
      height: 0;
      border: 8px solid transparent;
      border-bottom-color: #dedede;
      transform: translateX(-50%);
      z-index: 999;
      .inner-triangle {
        position: absolute;
        top: -6px;
        left: -7px;
        width: 0;
        height: 0;
        border: 7.5px solid transparent;
        border-bottom-color: #fff;
        z-index: 999;
      }
    }

    .dropdown-body {
      .row {
        height: var(--height);
        padding-left: 15px;
        text-align: left;
        border-top: 1px solid #eee;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        &:first-child {
          border-color: #fff;
        }
        &:hover {
          background-color: #f0ffff;
        }
      }
    }
  }
}
</style>
