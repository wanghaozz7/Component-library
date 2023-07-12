<template>
  <div
    class="table-container"
    :border="border"
    :averageWidth="averageWidth"
    :style="tableStyle"
  >
    <div
      class="table-wrapper"
      :style="tableWrapperStyle('header')"
      v-show="showHeader"
    >
      <table cellpadding="10px" cellspacing="0">
        <tr ref="header">
          <slot />
        </tr>
      </table>
    </div>
    <div class="table-wrapper" :style="tableWrapperStyle('body')">
      <table cellpadding="10px" cellspacing="0" ref="table">
        <colgroup>
          <col
            v-for="(arr, idx) in attrArray"
            :key="arr"
            :width="widthArr[idx]"
          />
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
  // 是否显示表头
  showHeader: {
    type: Boolean,
    default: true,
  },
});

// 表头子组件的属性数组(prop,width)
const attrArray = reactive([]);
// 是否有滚动条
let hasScrollBar = ref(undefined);
// 列宽度分配后数组
let widthArr = reactive([]);
let averageWidth = ref(0);

const ctx = getCurrentInstance().ctx;

const tableStyle = computed(() => {
  // const width = tableWidth.value === 0 ? "auto" : tableWidth.value + 17 + "px";
  return {
    // width,
  };
});

const tableWrapperStyle = computed(() => {
  return (type) => {
    // const width =
    //   tableWidth.value === 0
    //     ? "auto"
    //     : (type === "header" ? tableWidth.value : tableWidth.value + 17) + "px";
    const height = type === "header" ? "" : props.height + "px";
    // const paddingRight =
    //   type === "header" ? (hasScrollBar.value ? "15px" : "") : "";
    return {
      // width,
      height,
      // paddingRight,
    };
  };
});

const tableCellStyle = computed(() => {
  return (row, column, rowIndex, colIndex) => {
    const borderColor = props.border ? "#ebeef5" : "";
    // 如果不展示表头则补上border
    const borderTop = !props.showHeader
      ? rowIndex == 0
        ? "1px solid #ebeef5"
        : ""
      : "";
    const defaultStyle = { borderColor, borderTop };
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
  // 由于height打上行内样式已经无法通过table-wrapper的offsetheight等判断是否出现滚动条
  // 所以获取行数加行高手动计算出实际高度判断是否出现滚动条
  const header = ctx.$refs.header;
  const table = ctx.$refs.table;
  const arr = header.children;
  for (let th of arr)
    attrArray.push({
      prop: th.attributes.prop.nodeValue,
      width: th.attributes.width.nodeValue,
    });

  const tableWrapper = table.parentNode;
  const tableWrapperStyle = window.getComputedStyle(tableWrapper);
  // 计算table的真实的width并根据表头传来的width字段计算出每一列的宽度赋值给colgroup和header
  const tableWidth =
    Number.parseInt(tableWrapperStyle.width.replaceAll("px")) - 17;
  let count = 0;
  // 首先减去所有固定宽度
  const constWidthSum = attrArray.reduce((pre, next) => {
    const width = Number.parseInt(next.width);
    if (width !== -1) {
      return (pre += width);
    } else {
      count++;
      return pre;
    }
  }, 0);
  const fixedWidth = tableWidth - constWidthSum;
  averageWidth.value = fixedWidth / count;
  widthArr = attrArray.map((x) => {
    const width = Number.parseInt(x.width);
    return width === -1 ? averageWidth.value : width;
  });

  console.log("widthArr", widthArr);
  console.log("averageWidth", averageWidth.value);

  // nextTick(() => {
  //   const cell = table.children[1];
  //   const cellStyle = window.getComputedStyle(cell);
  //   const cellHeight = cellStyle["height"];
  //   const len = props.data.length;
  // });
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
