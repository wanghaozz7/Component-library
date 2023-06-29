<template>
  <div class="collapse-container">
    <div class="title">指标筛选</div>
    <!-- 顶部信息栏 -->
    <div class="top-info">
      <div class="selected">
        已选中 <span style="color: #2258f4">{{ getSelectCount }}</span> 个指标
      </div>
      <div class="select-all">
        <div style="margin-right: 5px">全选</div>
        <!-- 全选选中框 -->
        <selector :selectedType="isAllSelected" @isChecked="handleAllSelect" />
      </div>
    </div>
    <!-- 折叠面板行 -->
    <div
      class="collapse-row"
      v-for="(item, index) in collapseData"
      :style="collapseRow(index)"
      :key="item.name"
    >
      <!-- 展示部分 -->
      <div class="show-part">
        <!-- 左侧箭头文字部分 -->
        <arrow
          @rotate="handleClick(index)"
          :rotateArrow="rotateArrow(index)"
          :label="item.name"
        />
        <div class="selector">
          <!-- 大指标选中框 -->
          <selector
            :selectedType="selectState(index)"
            @isChecked="handleBigSelect(index)"
          />
        </div>
      </div>
      <!-- 折叠部分 -->
      <div class="hidden-part" :ref="`hidden-${index}`">
        <div
          class="hidden-row"
          v-for="(child, childIdx) in item.children"
          :key="child.name"
        >
          <div class="hidden-row-text">{{ child.name }}</div>
          <!-- 小指标选中框 -->
          <div class="selector">
            <selector
              :selectedType="isSelected(index, childIdx)"
              @isChecked="handleSmallSelect(index, childIdx)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <script src="./index.js" /> -->

<script setup name="collapse">
import selector from "./components/selector.vue";
import arrow from "./components/arrow.vue";

import { reactive, computed, watch } from "vue";

const props = defineProps({
  collapseData: {
    type: Array,
    default() {
      return [];
    },
  },
  defaultActive: {
    type: Number,
    default: 0,
  },
  expendsAll: {
    type: Boolean,
    default: false,
  },
});

const extend = reactive(new Array(props.collapseData.length).fill(false));

const hiddenHeight = reactive(new Array(props.collapseData.length).fill(0));

const selection = reactive([]);

const emit = defineEmits(["selectChange"]);

import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();

const collapseRow = (index) => {
  let h = hiddenHeight[index] + 40 + 8;
  h += "px";
  return {
    height: extend[index] ? h : "40px",
  };
};

const rotateArrow = (index) => {
  return {
    transform: extend[index] ? "rotate(180deg)" : "",
  };
};

const isSelected = (index, childIdx) => {
  return selection[index][childIdx] ? 0 : 1;
};

// const selectState = computed(() => {
//   return function (index) {
//     const arr = selection[index];
//     const result = arr.find((x) => {
//       return x === true;
//     });
//     if (result === undefined) {
//       return 1;
//     } else {
//       const res = arr.find((x) => {
//         return x === false;
//       });
//       if (res === false) {
//         return 2;
//       } else if (res === undefined) {
//         return 0;
//       }
//     }
//   };
// });

const selectState = (index) => {
  const arr = selection[index];
  const result = arr.find((x) => {
    return x === true;
  });
  if (result === undefined) {
    return 1;
  } else {
    const res = arr.find((x) => {
      return x === false;
    });
    if (res === false) {
      return 2;
    } else if (res === undefined) {
      return 0;
    }
  }
};

const isAllSelected = () => {
  const arr = [];
  for (let i = 0; i < props.collapseData.length; i++) {
    arr.push(selectState(i));
  }

  const res = arr.find((x) => {
    return x === 2;
  });
  if (res === 2) {
    return 2;
  } else {
    const r1 = arr.every((x) => {
      return x === 0;
    });
    if (r1) {
      return 0;
    } else {
      const r2 = arr.every((x) => {
        return x === 1;
      });
      return r2 ? 1 : 2;
    }
  }
};

const getSelectCount = () => {
  let res = 0;
  for (let index in selection) {
    const s1 = selection[index];
    let cnt = s1.reduce((pre, next) => {
      return (pre += next === true ? 1 : 0);
    }, 0);
    res += cnt;
  }
  return res;
};

const handleClick = (index) => {
  extend[index] = !extend[index];
};

const handleSmallSelect = (index, childIdx) => {
  selection[index][childIdx] = !selection[index][childIdx];
  emit("selectChange", getResult());
};

const handleBigSelect = (index) => {
  const arr = selection[index];
  const result = arr.find((x) => {
    return x === false;
  });
  let tmp;

  if (result === undefined) {
    tmp = new Array(arr.length).fill(false);
  } else if (result === false) {
    //相反全部选中
    tmp = new Array(arr.length).fill(true);
  }

  selection[index] = tmp;
  emit("selectChange", getResult());
};

const handleAllSelect = () => {
  let t = [];
  for (let s of selection) {
    const res = s.find((x) => {
      return x === false;
    });
    if (res === false) {
      for (let c of props.collapseData) {
        const tmp = [];
        for (let t of c.children) {
          tmp.push(true);
        }
        t.push(tmp);
      }
      break;
    } else if (res === undefined) {
      for (let c of props.collapseData) {
        const tmp = [];
        for (let t of c.children) {
          tmp.push(false);
        }
        t.push(tmp);
      }
      break;
    }
  }
  selection = t;
  emit("selectChange", getResult());
};

const getResult = () => {
  const res = [];
  for (let idx in selection) {
    const t = selection[idx];
    const tmp = [];
    for (let index in t) {
      if (t[index]) tmp.push(props.collapseData[idx].children[index]);
    }
    res.push({
      title: props.collapseData[idx].name,
      data: tmp,
    });
  }
  return res;
};

const getData = (newVal) => {
  const len = newVal.length;
  for (let c of newVal) {
    const tmp = [];
    for (let t of c.children) {
      tmp.push(false);
    }
    selection.push(tmp);
  }
  this.$nextTick(() => {
    for (let i = 0; i < len; i++) {
      const hidden = proxy.$refs[`hidden-${i}`][0];
      hiddenHeight[i] = hidden.offsetHeight;
    }
    if (props.expendsAll) {
      extend = new Array(len).fill(true);
    } else {
      this.$set(this.extend, props.defaultActive, true);
    }
  });
};

watch(
  () => props.collapseData,
  (newValue, oldValue) => {
    getData(newValue);
  },
  { deep: true }
);
</script>

<style scoped lang="less" src="./index.less" />
