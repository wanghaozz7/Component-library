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

    <rtable
      :data="table_data"
      :border="true"
      :cell-style="getCellStyle"
      :height="200"
    >
      <table-column :width="60" label="#" prop="index" align="center" />
      <table-column :width="120" label="姓名" prop="name" align="center" />
      <table-column :width="80" label="年龄" prop="age" align="center" />
    </rtable>
  </div>
</template>

<script setup>
// 使用组件由以下组成 ： 1.组件名（一级标题）+ 描述  2.使用方法 (二级标题) + 描述 + showComponent (样式展示 + 代码) 3.接口列表  4.前进后退

import showComponent from "./components/showComponent/index";

import rtable from "@/components/table/index.vue";
import tableColumn from "@/components/table/components/tableColumn/index.vue";

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

const table_data = [
  {
    index: 1,
    name: "小明",
    age: 20,
  },
  {
    index: 2,
    name: "小红",
    age: 21,
  },
  {
    index: 3,
    name: "小张",
    age: 22,
  },
  {
    index: 4,
    name: "小南",
    age: 23,
  },
  {
    index: 5,
    name: "小虫",
    age: 24,
  },

  {
    index: 5,
    name: "小虫",
    age: 24,
  },

  {
    index: 5,
    name: "小虫",
    age: 24,
  },

  {
    index: 5,
    name: "小虫",
    age: 24,
  },

  {
    index: 5,
    name: "小虫",
    age: 24,
  },

  {
    index: 5,
    name: "小虫",
    age: 24,
  },
];

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

const getCellStyle = (row, column, rowIndex) => {
  let textAlign = "center",
    lineHeight = "25px",
    padding = "5px";
  // if (rowIndex % 2 === 0) {
  //   textAlign = "left";
  //   backgroundColor = "white";
  // } else {
  //   textAlign = "right";
  //   backgroundColor = "gray";
  // }
  return {
    textAlign,
    lineHeight,
    padding,
  };
};
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
