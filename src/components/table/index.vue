<template>
  <div class="table-container" :style="tableStyle" ref="table">
    <div v-if="showHeader" ref="tableHeader">
      <table cellspacing="0">
        <colgroup>
          <slot />
        </colgroup>
        <tr>
          <th v-for="(prop, idx) in columnsProps" :key="prop.label" :style="headerCellStyle(prop.prop, idx)">
            {{ prop.label }}
          </th>
        </tr>
      </table>
    </div>
    <div class="body-wrapper" :style="tableBodyStyle" ref="tableBody">
      <table cellspacing="0">
        <colgroup ref="colgroup">
          <slot />
        </colgroup>
        <tr v-for="(row, rowIndex) in data" :key="rowIndex" :class="tableRowClass">
          <td v-for="(colValue, colKey, colIndex) in row" :key="colIndex"
            :style="tableCellStyle(row, colValue, rowIndex, colIndex)">
            {{ getLabel(row, colIndex) }}
          </td>
        </tr>
      </table>
    </div>
    <div class="empty" v-if="data.length === 0">{{ emptyText }}</div>
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
  data: {
    type: Array,
    default() {
      return [];
    },
  },
  height: {
    type: Number,
    default: -1,
  },
  maxHeight: {
    type: Number,
    default: -1,
  },
  stripe: {
    type: Boolean,
    default: false,
  },
  border: {
    type: Boolean,
    default: false,
  },
  outSideBorder: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: "medium",
  },
  showHeader: {
    type: Boolean,
    default: true,
  },
  highlightCurrentRow: {
    type: Boolean,
    default: true,
  },
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
  emptyText: {
    type: String,
    default: "暂无内容",
  },
  cellEmptyText: {
    type: String,
    default: "",
  },
});

const columnsProps = reactive([]);
const widthArr = reactive([]);
let showScrollBar = ref(false);
let bodyHeight = ref("auto");

const ctx = getCurrentInstance().ctx;
const normalBorder = "1px solid #ebebeb";
const noBorder = "0px solid transparent";

const tableStyle = computed(() => {
  const height = props.height === -1 ? "auto" : props.height + "px";
  const maxHeight = props.maxHeight === -1 ? "" : props.maxHeight + "px";
  const border = props.outSideBorder ? normalBorder : '';
  return {
    height,
    maxHeight,
    border
  };
});
const tableBodyStyle = computed(() => {
  const height = bodyHeight.value + "px";
  // 如果有border且表头被隐藏
  const borderTop = !props.showHeader ? props.border ? normalBorder : '' : '';
  const finalStyle = {
    height,
    borderTop
  };
  return props.data.length === 0 ? Object.assign(finalStyle, { border: noBorder }) : finalStyle
});
const tableRowClass = computed(() => {
  return props.highlightCurrentRow ? "highlightCurrentRow" : "";
});
const headerCellStyle = computed(() => {
  return (prop, idx) => {
    // 默认样式
    const getDaultStyle = () => {
      const borderLeft = props.border ? normalBorder : "", borderTop = props.border ? normalBorder : "";
      const borderRight = props.border ? idx === columnsProps.length - 1 ? normalBorder : "" : "";

      const borderBottom = normalBorder;
      const textAlign = 'center';

      let lineHeight, padding, fontSize;

      switch (props.size) {
        case 'big':
          lineHeight = '35px';
          padding = '8px';
          fontSize = '20px'
          break;
        case 'normal':
          lineHeight = '30px';
          padding = '5px';
          fontSize = '18px'
          break;
        case 'small':
          lineHeight = '25px';
          padding = '5px';
          fontSize = '16px'
          break;
        default:
          lineHeight = '25px';
          padding = '5px';
          fontSize = '16px'
      }

      return {
        borderLeft,
        borderTop,
        borderRight,
        borderBottom,
        padding,
        textAlign,
        lineHeight,
        fontSize
      }
    };
    // 通过回调返回的样式
    const getCallBackStyle = () => {
      return typeof props.headerCellStyle === "function"
        ? props.headerCellStyle(prop, idx)
        : props.headerCellStyle;
    };
    // 优先级最高的样式(合并顺序最晚覆盖之前的样式)
    const getImportantStyle = () => {
      return {}
    };
    return Object.assign(getDaultStyle(), getCallBackStyle(), getImportantStyle());
  };
});
const tableCellStyle = computed(() => {
  // 回调参数分别是 行数据 列数据(值) 行索引 列索引
  return (row, col, rowIndex, colIndex) => {
    // 默认样式
    const getDefaultStyle = () => {
      const borderLeft = props.border ? normalBorder : "";
      const borderRight = props.border ? colIndex === columnsProps.length - 1 ? normalBorder : "" : "";
      const borderBottom = normalBorder;
      const textAlign = 'center';

      let height, padding, fontSize;
      switch (props.size) {
        case 'big':
          height = '30px';
          padding = '8px';
          fontSize = '18px'
          break;
        case 'normal':
          height = '25px';
          padding = '5px';
          fontSize = '16px'
          break;
        case 'small':
          height = '15px';
          padding = '5px';
          fontSize = '14px'
          break;
        default:
          height = '25px';
          padding = '5px';
          fontSize = '16px'
      }
      return {
        borderLeft,
        borderRight,
        borderBottom,
        padding,
        textAlign,
        height,
        fontSize
      };
    };
    // 通过回调返回的样式
    const getCallBackStyle = () => {
      return typeof props.cellStyle === "function"
        ? props.cellStyle(row, col, rowIndex, colIndex)
        : props.cellStyle;
    };
    // 优先级最高的样式(合并顺序最晚覆盖之前的样式)
    const getImportantStyle = () => {
      // 最后一行取消底部border由bodywrapper的border代替(防止滚动下的重合)
      const borderBottom = rowIndex === props.data.length - 1 ? noBorder : normalBorder;
      // 斑马纹
      let backgroundColor;
      if (props.stripe) {
        if (rowIndex % 2 === 0) backgroundColor = '#fff';
        else backgroundColor = '#fafafa'
      }
      const finalStyle = {
        borderBottom,
        backgroundColor
      }
      return props.data.length === 0 ? Object.assign(finalStyle, { border: noBorder }) : finalStyle
    };
    return Object.assign(getDefaultStyle(), getCallBackStyle(), getImportantStyle());
  };
});
const getLabel = computed(() => {
  return (row, colIndex) => {
    return row[columnsProps[colIndex]?.prop]
      ? row[columnsProps[colIndex]?.prop]
      : props.cellEmptyText;
  }
})

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

  // 获得table的实际宽度根据每列的width计算并分配宽度
  const tableWidth = window.getComputedStyle(ctx.$refs.tableBody).width;



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
      let headerHeight;
      if (props.showHeader) headerHeight = window.getComputedStyle(ctx.$refs.tableHeader).height;
      else headerHeight = '0'
      const height = props.height !== -1 ? props.height : props.maxHeight;
      bodyHeight.value = height - 40 - filterPx(headerHeight);
    }

  });
});
</script>

<style scoped lang="less">
.table-container {
  padding: 20px;
  overflow: hidden;
  box-sizing: border-box;

  .body-wrapper {
    overflow: auto;
    box-sizing: border-box;
    border-bottom: 1px solid #ebebeb;

    .highlightCurrentRow {
      transition: background-color 0.25s ease;

      &:hover {
        background-color: rgb(236, 242, 244) !important;
      }
    }
  }

  .empty {
    width: 100%;
    height: 150px;
    border: 1px solid #ebeef5;
    border-top: 0px solid transparent;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: gray;
  }
}
</style>
