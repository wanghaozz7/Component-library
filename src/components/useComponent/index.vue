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

    <attributeList :title="title" :list-data="listData" type="attributes" />


  </div>
</template>

<script setup>
// 使用组件由以下组成 ： 1.组件名（一级标题）+ 描述  2.使用方法 (二级标题) + 描述 + showComponent (样式展示 + 代码) 3.接口列表  4.前进后退
import showComponent from "./components/showComponent/index.vue";
import attributeList from "./components/attributeList/index.vue";


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

const listData = [
  {
    params: "data",
    desc: "显示的数据",
    type: "array",
    optional: "",
    default: "",
  },
  {
    params: "border",
    desc: "是否带有纵向边框",
    type: "boolean",
    optional: "",
    default: "false",
  },
  {
    params: "cellStyle",
    desc: "单元格样式回调,可以根据参数传回不同的样式也可以使所有单元格共享相同样式",
    type: "function/object",
    optional: "",
    default: "",
  },
  {
    params: "height",
    desc: "默认高度为内容高度,设置固定高度后若内容溢出则出现滚动条并固定表头",
    type: "Number",
    optional: "",
    default: "",
  },
  {
    params: "showHeader",
    desc: "是否显示表头",
    type: "boolean",
    optional: "",
    default: "true",
  },
  {
    params: "emptyText",
    desc: "表格没有传数据或数据长度为0时提示内容",
    type: "string",
    optional: "",
    default: "暂无内容",
  },
  {
    params: "cellEmptyText",
    desc: "string",
    type: "表格某一行的某一列无数据时显示的内容",
    optional: "",
    default: " ",
  },
  {
    params: "outsideBorder",
    desc: "是否显示包裹表格的最外层border",
    type: "boolean",
    optional: "",
    default: "true",
  },
];

const title = 'Table Attributes';


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
