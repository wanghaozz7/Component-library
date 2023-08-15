<template>
  <div style="position: relative">
    <div
      class="select"
      :style="getSelectStyle"
      @click="handleClickInput"
      v-click-outside="handleClickOutside"
    >
      <input
        type="text"
        style="width: 210px; height: 100%"
        ref="input"
        readonly
        placeholder="请选择"
      />
      <div class="icon">
        <arrow :isFold="actived" />
      </div>
    </div>
    <transition name="shrink-in-top">
      <div class="dropdown" v-show="actived" :style="getDropdownStyle">
        <div class="triangle">
          <div class="inner-triangle" />
        </div>
        <div class="body">
          <div
            class="row"
            v-for="(item, idx) in option"
            :key="item"
            @click="selectRow(item, idx)"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup name="select">
import { ref, computed, getCurrentInstance } from "vue";

const emits = defineEmits(["update:modelValue", "select"]);

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const { ctx } = getCurrentInstance();
let actived = ref(false);

const option = [
  {
    label: "桃子",
    value: "桃子",
  },
  {
    label: "香蕉",
    value: "香蕉",
  },
  {
    label: "苹果",
    value: "苹果",
  },
  {
    label: "橙子",
    value: "橙子",
  },
  {
    label: "葡萄",
    value: "葡萄",
  },
];

const getSelectStyle = computed(() => {
  const borderColor = actived.value ? "#43CD80" : "";
  return {
    borderColor,
  };
});

const handleClickOutside = (e) => {
  actived.value = false;
};

const handleClickInput = (e) => {
  actived.value = !actived.value;
  if (actived.value) {
    const input = ctx.$refs.input;
    input.focus();
  }
};

const selectRow = (row, idx) => {
  const input = ctx.$refs.input;
  input.value = row.label;
  emits("update:modelValue", row.value);
  emits("select", row);
  actived.value = false;
};

const getDropdownStyle = computed(() => {
  const bottom = -1 * (15 + option.length * 35) + "px";
  return {
    bottom,
    "--rowHeight": "35px",
  };
});

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
input[type="text"] {
  border: 0;
  outline: none;
  box-sizing: border-box;
  border-radius: 4px;
  padding-left: 15px;
  cursor: pointer;
  font-size: 16px;
}

.select {
  width: 240px;
  height: 35px;
  border: 1px solid #eee;
  border-radius: 4px;
  display: flex;
  position: relative;
  cursor: pointer;

  &:hover {
    border-color: #d3d3d3;
  }

  .icon {
    width: 30px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.dropdown {
  position: absolute;
  left: -1px;
  width: 240px;
  background-color: #fff;
  border: 1px solid #eee;
  box-shadow: 0 0 8px 0 rgba(232, 237, 258, 0.6),
    0 2px 4px 0 rgba(232, 237, 250, 0.5);
  z-index: 999;
  border-radius: 4px;
  cursor: pointer;
  .triangle {
    position: absolute;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-bottom-color: #dedede;
    top: -16px;
    left: 50%;
    z-index: 999;
    transform: translateX(-50%);

    .inner-triangle {
      position: absolute;
      width: 0;
      height: 0;
      top: -6px;
      left: -7px;
      z-index: 999;
      border: 7.5px solid transparent;
      border-bottom-color: #fff;
    }
  }

  .body {
    gap: 5px;
    .row {
      text-align: left;
      height: var(--rowHeight);
      box-sizing: border-box;
      border-top: 1px solid #eee;
      display: flex;
      align-items: center;
      padding-left: 15px;
      &:first-child {
        border-color: #fff;
      }
      &:hover {
        background-color: #f0ffff;
      }
    }
  }
}
</style>
