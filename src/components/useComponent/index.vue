<template>
  <div class="title">{{ title.text }}</div>
  <div class="desc">{{ title.desc }}</div>
  <showComponent :code="obj.code" :title="obj.subTitle" v-for="obj in objs">
    <div style="height: 150px;display: flex;align-items: center;justify-content: center;">我是展示组件</div>
  </showComponent>
  <myTable :data="table_data">
    <myTableColumn label="#" :width="80" prop="index"></myTableColumn>
    <myTableColumn label="姓名" :width="80" prop="name"></myTableColumn>
    <myTableColumn label="年龄" :width="80" prop="age"></myTableColumn>
  </myTable>
</template>


<script setup>
// 使用组件由以下组成 ： 1.组件名（一级标题）+ 描述  2.使用方法 (二级标题) + 描述 + showComponent (样式展示 + 代码) 3.接口列表  4.前进后退

import showComponent from './components/showComponent/index'
import myTable from '@/components/myTable/index.vue'
import myTableColumn from '@/components/myTable/components/myTableColumn/index.vue'

const props = defineProps({
  title: {
    type: Object,
    default() {
      return {
        text: 'Dropdown 下拉菜单',
        desc: '将动作或菜单折叠到下拉菜单中。'
      }
    }
  }
})

const table_data = [
  {
    index: 1,
    name: '小明',
    age: 20
  },
  {
    index: 2,
    name: '小红',
    age: 21
  }, {
    index: 3,
    name: '小张',
    age: 22
  }, {
    index: 4,
    name: '小南',
    age: 23
  }, {
    index: 5,
    name: '小虫',
    age: 24
  }
]

const objs = [{
  text: 'Slider 滑块',
  desc: '通过拖动滑块在一个固定区间内进行选择',
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

`
}, {
  text: 'Slider 滑块',
  desc: '通过拖动滑块在一个固定区间内进行选择',
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

`
}, {
  text: 'Slider 滑块',
  desc: '通过拖动滑块在一个固定区间内进行选择',
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

`
}, {
  text: 'Slider 滑块',
  desc: '通过拖动滑块在一个固定区间内进行选择',
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

`
}]




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