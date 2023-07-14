<template>
  <div class="table-container" :style="tableStyle" ref="table">
    <div class="header-wrapper" ref="tableHeader">
      <table cellspacing="0">
        <colgroup ref="colgroup">
          <slot />
        </colgroup>
        <tr>
          <th
            v-for="(prop, idx) in columnsProps"
            :key="prop.label"
            class="header-cell"
            :style="headerCellStyle(prop.prop, idx)"
          >
            {{ prop.label }}
          </th>
        </tr>
      </table>
    </div>
    <div class="body-wrapper" :style="tableBodyStyle">
      <table cellspacing="0">
        <colgroup>
          <slot />
        </colgroup>
        <tr
          v-for="(row, rowIndex) in data"
          :key="rowIndex"
          class="table-row"
          :class="tableRowClass"
        >
          <td
            v-for="(colValue, colKey, colIndex) in row"
            :key="colIndex"
            class="table-cell"
            :style="tableCellStyle(row, colValue, rowIndex, colIndex)"
          >
            {{
              row[columnsProps[colIndex]?.prop]
                ? row[columnsProps[colIndex]?.prop]
                : ""
            }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup name="table">
import {
  onMounted,
  getCurrentInstance,
  reactive,
  computed,
  ref,
  nextTick,
} from "vue";

const props = defineProps({
  // ok
  data: {
    type: Array,
    default() {
      return [];
    },
  },
  // ok
  height: {
    type: Number,
    default: -1,
  },
  // ok
  maxHeight: {
    type: Number,
    default: -1,
  },
  stripe: {
    type: Boolean,
    default: false,
  },
  // ok
  border: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "normal",
  },
  fit: {
    type: Boolean,
    default: false,
  },
  showHeader: {
    type: Boolean,
    default: true,
  },
  // ok
  highlightCurrentRow: {
    type: Boolean,
    default: true,
  },
  // ok
  cellStyle: {
    type: [Function, Object],
    default() {
      return {};
    },
  },
  headerCellStyle: {
    type: [Function, Object],
    default() {
      return {};
    },
  },
});

const columnsProps = reactive([]);
const widthArr = reactive([]);
let showScrollBar = ref(false);
let bodyHeight = ref("auto");

const ctx = getCurrentInstance().ctx;
const normalBorder = "1px solid #ebebeb";

const tableStyle = computed(() => {
  const height = props.height === -1 ? "auto" : props.height + "px";
  const maxHeight = props.maxHeight === -1 ? "" : props.maxHeight + "px";
  return {
    height,
    maxHeight,
  };
});

const tableBodyStyle = computed(() => {
  const height = bodyHeight.value + "px";
  return {
    height,
  };
});

const tableRowClass = computed(() => {
  return props.highlightCurrentRow ? "highlightCurrentRow" : "";
});

const headerCellStyle = computed(() => {
  return (prop, idx) => {
    const defaultStyle = {
      borderLeft: props.border ? normalBorder : "",
      borderTop: props.border ? normalBorder : "",
      borderRight: props.border
        ? idx === columnsProps.length - 1
          ? normalBorder
          : ""
        : "",
    };
    const callBackStyle =
      typeof props.headerCellStyle === "function"
        ? props.headerCellStyle(prop, idx)
        : props.headerCellStyle;
    const importStyle = {};
    const finalStyle = Object.assign(defaultStyle, callBackStyle, importStyle);
    return finalStyle;
  };
});

const tableCellStyle = computed(() => {
  // 回调参数分别是 行数据 列数据(值) 行索引 列索引
  return (row, col, rowIndex, colIndex) => {
    // 默认样式
    const defaultStyle = {
      borderLeft: props.border ? normalBorder : "",
      borderRight: props.border
        ? colIndex === columnsProps.length - 1
          ? normalBorder
          : ""
        : "",
    };
    // 通过回调返回的样式
    const callBacktyle =
      typeof props.cellStyle === "function"
        ? props.cellStyle(row, col, rowIndex, colIndex)
        : props.cellStyle;
    // 优先级最高的样式(合并顺序最晚覆盖之前的样式)
    const importStyle = {
      // 最后一行取消底部border由bodywrapper的border代替(防止滚动下的重合)
      borderBottom:
        rowIndex === props.data.length - 1
          ? "0px solid transparent"
          : normalBorder,
    };
    const finalStyle = Object.assign(defaultStyle, callBacktyle, importStyle);
    return finalStyle;
  };
});

const filterPx = (str) => {
  return parseInt(str.replaceAll("px"));
};

onMounted(() => {
  const colgroup = ctx.$refs.colgroup.children;
  // 获取每一列(column)的props
  for (let col of colgroup) columnsProps.push(col.__vueParentComponent.props);

  // 判断是否出现溢出
  const table = ctx.$refs.table;
  showScrollBar.value = table.scrollHeight > table.clientHeight;

  const header = ctx.$refs.tableHeader;
  const style = window.getComputedStyle(header);
  // 获得table的实际宽度根据每列的width计算并分配宽度
  const tableWidth = style.width;
  let availableWidth = filterPx(tableWidth);
  if (showScrollBar.value) availableWidth -= 17;
  let count = 0;

  for (let idx in columnsProps) {
    const prop = columnsProps[idx];
    const width = prop.width,
      minWidth = prop.minWidth;
    widthArr[idx] = {
      prop: prop.prop,
    };
    console.log("width", width, typeof width, "minWidth", minWidth);
    // 对于固定宽度的列 直接赋值
    // 同时 可分配availableWidth = tableWidth - 固定宽度之和
    // 对于minWidth
    // 将availableWidth 均等分给需要分配的列 如果小于minWidth 则减去minWidth 并赋值
    if (width !== -1) {
      availableWidth -= width;
      widthArr[idx].width = width;
    } else {
      count++;
    }
  }

  // 从左到右赋值 如果当前平均值大于等于minWidth则直接赋值 如果小于则依然赋值(压缩右侧)
  let averageWidth = parseInt(availableWidth / count);

  for (let idx in columnsProps) {
    const prop = columnsProps[idx];
    const width = prop.width,
      minWidth = prop.minWidth;
    if (width !== -1) continue;
    if (averageWidth >= minWidth) {
      // 直接赋平均值
      widthArr[idx].width = averageWidth;
      availableWidth -= averageWidth;
      count--;
      // 平均值不变
    } else {
      // 赋最小值
      if (availableWidth > minWidth) {
        widthArr[idx].width = minWidth;
        availableWidth -= minWidth;
        count--;
        // 重新计算平均值
        averageWidth = parseInt(availableWidth / count);
      } else {
        // 将剩下的全部分配给该列
        widthArr[idx].width = availableWidth;
        availableWidth = 0;
        averageWidth = 0;
        count--;
      }
    }
  }

  nextTick(() => {
    // 溢出则计算高度显示滚动条
    if (showScrollBar.value) {
      const headerHeight = style.height;
      const height = props.height !== -1 ? props.height : props.maxHeight;
      bodyHeight.value = height - 40 - filterPx(headerHeight);
    }
  });
});
</script>

<style scoped lang="less">
.table-container {
  padding: 20px;
  border: 1px solid #ebebeb;
  overflow: hidden;
  box-sizing: border-box;
  .header-wrapper {
    .header-cell {
      border-bottom: 1px solid #ebebeb;
      padding: 5px;
      text-align: center;
      line-height: 25px;
    }
  }
  .body-wrapper {
    overflow: auto;
    box-sizing: border-box;
    border-bottom: 1px solid #ebebeb;
    .table-row {
      .table-cell {
        border-bottom: 1px solid #ebebeb;
        padding: 5px;
        text-align: center;
        height: 25px;
      }
    }
    .highlightCurrentRow {
      transition: background-color 0.25s ease;
      &:hover {
        background-color: rgb(236, 242, 244) !important;
      }
    }
  }
}
</style>
