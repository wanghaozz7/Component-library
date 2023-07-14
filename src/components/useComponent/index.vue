<template>
  <div style="padding: 20px">
    <!-- <div class="title">{{ title.text }}</div>
    <div class="desc">{{ title.desc }}</div>
    <show-component
      v-for="obj in objs"
      :code="obj.code"
      :title="obj.subTitle"
      :key="obj.subTitle"
    >
      <div
        style="
          height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        我是展示组件
      </div>
    </show-component> -->

    <!-- <attributeList></attributeList> -->

    <table-list :data="tableData" :border="true" :max-height="350" :cell-style="getcellStyle" :stripe="true"
      :header-cell-style="getHeaderCellStyle" :show-header="true" size="normal">
      <table-column :width="80" label="#" prop="index"></table-column>
      <table-column :min-width="80" label="姓名" prop="name"></table-column>
      <table-column :min-width="80" label="年龄" prop="age"></table-column>
    </table-list>
  </div>
</template>

<script setup>
// 使用组件由以下组成 ： 1.组件名（一级标题）+ 描述  2.使用方法 (二级标题) + 描述 + showComponent (样式展示 + 代码) 3.接口列表  4.前进后退
import showComponent from "./components/showComponent/index.vue";
import attributeList from "./components/attributeList/index.vue";

import tableList from "@/components/table/index.vue";
import tableColumn from "@/components/table/tableColumn.vue";

const props = defineProps({
  title: {
    type: Object,
    default() {
      return {
        text: "Dropdown 下拉菜单",
        desc: "将动作或菜单折叠到下拉菜单中。",
      };
    },
  },
});

const tableData = [
  {
    index: 1,
    name: "小明",
    age: 18,
  },
  {
    name: "小明",
    age: 18,
    index: 2,
  },
  {
    index: undefined,
    age: 18,
    name: "小明",
  },
  {
    index: 4,
    name: "小明",
    age: 18,
  },
  {
    index: 5,
    name: "小明",
    age: 18,
  },
  {
    index: 6,
    name: "小明",
    age: 18,
  },
  {
    index: 7,
    name: "小明",
    age: 18,
  },
  {
    index: 8,
    name: "小明",
    age: 18,
  },
  {
    index: 9,
    name: "小明",
    age: 18,
  },
  {
    index: 10,
    name: "小明",
    age: 18,
  },
  {
    index: 11,
    name: "小明",
    age: 18,
  },
  {
    index: 12,
    name: "小明",
    age: 18,
  },
  {
    index: 13,
    name: "小明",
    age: 18,
  },
];

const getcellStyle = (row, col, rowIndex, colIndex) => {
  const lineHeight = 20 + rowIndex * 5 + "px";
  return {
    lineHeight,
  };
};

const getHeaderCellStyle = (prop, idx) => {
  return {
    lineHeight: "45px",
    backgroundColor: "lightblue",
    color: "white",
  };
};

const objs = [
  {
    text: "Slider 滑块",
    desc: "通过拖动滑块在一个固定区间内进行选择",
    code: `
    <el-input
      placeholder="请输入内容"
      v-model="input"
      clearable>
    </el-input>

    <script>
      export default {
        data() {
          return {
            input: ''
          }
        }
      }
    <\/script>

`,
  },
  {
    text: "Slider 滑块",
    desc: "通过拖动滑块在一个固定区间内进行选择",
    code: `
    <el-input
      placeholder="请输入内容"
      v-model="input"
      clearable>
    </el-input>

    <script>
      export default {
        data() {
          return {
            input: ''
          }
        }
      }
    <\/script>

`,
  },
  {
    text: "Slider 滑块",
    desc: "通过拖动滑块在一个固定区间内进行选择",
    code: `
    <el-input
      placeholder="请输入内容"
      v-model="input"
      clearable>
    </el-input>

    <script>
      export default {
        data() {
          return {
            input: ''
          }
        }
      }
    <\/script>

`,
  },
  {
    text: "Slider 滑块",
    desc: "通过拖动滑块在一个固定区间内进行选择",
    code: `
    <el-input
      placeholder="请输入内容"
      v-model="input"
      clearable>
    </el-input>

    <script>
      export default {
        data() {
          return {
            input: ''
          }
        }
      }
    <\/script>

`,
  },
];
</script>

<style lang="less" scoped>
.title {
  font-size: 24px;
  font-weight: 900;
}

.desc {
  font-size: 14px;
  color: gray;
  margin-bottom: 35px;
}
</style>
