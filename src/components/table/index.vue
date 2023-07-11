<template>
  <div class="table-container" :border="border" :style="tableStyle">
    <div class="table-wrapper" :style="tableWrapperStyle('header')">
      <table cellpadding="10px" cellspacing="0">
        <tr ref="header">
          <slot />
        </tr>
      </table>
    </div>
    <div class="table-wrapper" :style="tableWrapperStyle('body')">
      <table cellpadding="10px" cellspacing="0" ref="table">
        <colgroup>
          <col v-for="arr in attrArray" :key="arr" :width="arr.width" />
        </colgroup>
        <tr v-for="(obj, rowIndex) in data" :key="obj" class="table-row">
          <td
            v-for="(attr, colIndex) in attrArray"
            :key="attr"
            class="table-cell"
            :style="tableCellStyle(obj, attr, rowIndex, colIndex)"
          >
            {{ obj[attr.prop] }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script setup>
import { getCurrentInstance, onMounted, reactive, ref, computed } from "vue";

const props = defineProps({
  // 表格数据
  data: {
    type: Array,
    default() {
      return [];
    },
  },
  // 是否带有边框
  border: {
    type: Boolean,
    default: false,
  },
  // 单元格的样式回调
  cellStyle: {
    type: [Object, Function],
    default() {
      return {};
    },
  },
  // 表格高度 (内容溢出显示滚动条固定表头)
  height: {
    type: Number,
    default: -1,
  },
});

// 表头子组件的属性数组(prop,width)
const attrArray = reactive([]);
// 表格宽度
let tableWidth = ref(0);
// 是否有滚动条
let hasScrollBar = ref(undefined);

const ctx = getCurrentInstance().ctx;

const tableStyle = computed(() => {
  const width = tableWidth.value === 0 ? "auto" : tableWidth.value + 17 + "px";
  return {
    width,
  };
});

const tableWrapperStyle = computed(() => {
  return (type) => {
    const width =
      tableWidth.value === 0
        ? "auto"
        : (type === "header" ? tableWidth.value : tableWidth.value + 17) + "px";
    const height = type === "header" ? "" : props.height + "px";
    const paddingRight =
      type === "header" ? (hasScrollBar.value ? "15px" : "") : "";
    return {
      width,
      height,
      // paddingRight,
    };
  };
});

const tableCellStyle = computed(() => {
  return (row, column, rowIndex, colIndex) => {
    const borderColor = props.border ? "#ebeef5" : "";
    const defaultStyle = { borderColor };
    if (typeof props.cellStyle === "function") {
      // 如果是函数则执行回调并将对象合并
      const obj = props.cellStyle(row, column, rowIndex);
      return Object.assign(defaultStyle, obj);
    } else if (typeof props.cellStyle === "object" && props.cellStyle !== {}) {
      // 如果所有cell都是固定样式对象
      return Object.assign(defaultStyle, props.cellStyle);
    }
    return defaultStyle;
  };
});

onMounted(() => {
  const header = ctx.$refs.header;
  const arr = header.children;

  for (let th of arr)
    attrArray.push({
      prop: th.attributes.prop.nodeValue,
      width: th.attributes.width.nodeValue,
    });

  tableWidth.value = attrArray.reduce((pre, next) => {
    return (pre += Number.parseInt(next.width));
  }, 0);

  // 由于height打上行内样式已经无法通过table-wrapper的offsetheight等判断是否出现滚动条
  // 所以获取行数加行高手动计算出实际高度判断是否出现滚动条
  const table = ctx.$refs.table;
  const row = table.children[1];
  const rowStyle = window.getComputedStyle(row);
  console.log("srtle", rowStyle, typeof rowStyle, rowStyle.height);
});
</script>

<style lang="less" scoped>
.table-container {
  border: 1px solid #ebeef5;
  padding: 20px;
  .table-wrapper {
    overflow: auto;
    .table-row {
      transition: background-color 0.25s ease;
      &:hover {
        background-color: rgb(236, 242, 244) !important;
      }
      .table-cell {
        border-bottom: 1px solid #ebeef5;
        border-left: 1px solid transparent;
        &:last-child {
          border-right: 1px solid transparent;
        }
      }
    }
  }
}
</style>
