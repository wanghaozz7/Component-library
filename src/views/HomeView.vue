<template>
  <div class="homeViewContainer">
    <scroll-bar showScrollBar="hover" :wheelSensitivity="50" direction="normal">
      <div class="sideBar">
        <side-bar :sideBarData="sideBarData" :defaultUnfoldAll="false" :rowHeight="40"
          @checkedNodeArrayChange="handleCheckedNodeArrayChange" />
      </div>
    </scroll-bar>

    <scroll-bar showScrollBar="hover" :wheelSensitivity="150" direction="normal">
      <div class="mainContent">
        <div class="block">
          <use-component :title="tableConfig.title" :lists="tableConfig.lists" v-show="tableSelected.length !== 0">
            <div v-show="getShowType('table', '1')">
              <show-component :code="tableConfig.children[0].code" :title="tableConfig.children[0].title">
                <table-list :data="tableData" :out-side-border="false">
                  <table-column prop="date" label="日期" :width="180" />
                  <table-column prop="name" label="姓名" :width="180" />
                  <table-column prop="address" label="地址" :min-width="180" />
                </table-list>
              </show-component>
            </div>
            <div v-show="getShowType('table', '2')">
              <show-component :code="tableConfig.children[1].code" :title="tableConfig.children[1].title">
                <table-list :data="tableData" :out-side-border="false" :stripe="true">
                  <table-column prop="date" label="日期" :width="180" />
                  <table-column prop="name" label="姓名" :width="180" />
                  <table-column prop="address" label="地址" :min-width="180" />
                </table-list>
              </show-component>
            </div>
            <div v-show="getShowType('table', '3')">
              <show-component :code="tableConfig.children[2].code" :title="tableConfig.children[2].title">
                <table-list :data="tableData" :out-side-border="false" :stripe="true" :border="true">
                  <table-column prop="date" label="日期" :width="180" />
                  <table-column prop="name" label="姓名" :width="180" />
                  <table-column prop="address" label="地址" :min-width="180" />
                </table-list>
              </show-component>
            </div>
          </use-component>
          <use-component :title="carouselConfig.title" :lists="carouselConfig.lists"
            v-show="carouselSelected.length !== 0">
            <show-component :code="carouselConfig.children[0].code" :title="carouselConfig.children[0].title">
              <div class="carousel-container">
                <carousel indicatorType="rectangle" trigger="click">
                  <carousel-item v-for="item in 5" :key="item">
                    <div class="carousel-item">
                      +++++{{ item }}+++++
                    </div>
                  </carousel-item>
                </carousel>
              </div>
            </show-component>
          </use-component>
        </div>
      </div>
    </scroll-bar>

  </div>
</template>

<script setup name="HomeView">
import { reactive, computed } from "vue";

import tableConfig from '../config/table.js'
import carouselConfig from '../config/carousel.js'


const tableSelected = reactive([]);
const carouselSelected = reactive([]);


const tableData = [{
  date: '2016-05-02',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄'
}, {
  date: '2016-05-04',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1517 弄'
}, {
  date: '2016-05-01',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1519 弄'
}, {
  date: '2016-05-03',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1516 弄'
}]


const getShowType = computed(() => {
  return (component, id) => {
    let searchArr;
    switch (component) {
      case 'table':
        searchArr = tableSelected;
        break;
      case 'carousel':
        searchArr = carouselSelected;
        break
    }
    const res = searchArr.find(x => {
      return x === id;
    })
    return res !== undefined
  }
})


// 已选中的叶子节点一维数组
let checkedNodeArray = reactive([]);
// 侧边栏数据
const sideBarData = [
  {
    label: "一级节点10000000000000000000000",
    defaultUnfold: false,
    children: [
      {
        label: "二级节点10000000000000000000000",
        defaultUnfold: false,
        children: [
          {
            label: "三级节点110000000000000000000000",
            defaultUnfold: false,
            children: [
              {
                label: "四级节点111000000000000000000000000",
                defaultUnfold: false,
              },
              {
                label: "四级节点112000000000000000000000000",
                defaultUnfold: true,
              },
            ],
          },
          { label: "三级节点12" },
          { label: "三级节点13" },
        ],
      },
      {
        label: "二级节点2",
        children: [
          { label: "三级节点21" },
          { label: "三级节点22" },
          { label: "三级节点23" },
        ],
      },
      {
        label: "二级节点3",
        children: [
          { label: "三级节点31" },
          { label: "三级节点32" },
          { label: "三级节点33" },
        ],
      },
    ],
  },
  {
    label: "一级节点2",
    children: [
      {
        label: "二级节点1",
        children: [
          { label: "三级节点11" },
          { label: "三级节点12" },
          { label: "三级节点13" },
        ],
      },
      {
        label: "二级节点2",
        children: [
          { label: "三级节点21" },
          { label: "三级节点22" },
          { label: "三级节点23" },
        ],
      },
      {
        label: "二级节点3",
        children: [
          { label: "三级节点31" },
          { label: "三级节点32" },
          { label: "三级节点33" },
        ],
      },
    ],
  },
  {
    label: "一级节点2",
    children: [
      {
        label: "二级节点1",
        children: [
          { label: "三级节点11" },
          { label: "三级节点12" },
          { label: "三级节点13" },
        ],
      },
      {
        label: "二级节点2",
        children: [
          { label: "三级节点21" },
          { label: "三级节点22" },
          { label: "三级节点23" },
        ],
      },
      {
        label: "二级节点3",
        children: [
          { label: "三级节点31" },
          { label: "三级节点32" },
          { label: "三级节点33" },
        ],
      },
    ],
  },
  {
    label: "一级节点2",
    children: [
      {
        label: "二级节点1",
        children: [
          { label: "三级节点11" },
          { label: "三级节点12" },
          { label: "三级节点13" },
        ],
      },
      {
        label: "二级节点2",
        children: [
          { label: "三级节点21" },
          { label: "三级节点22" },
          { label: "三级节点23" },
        ],
      },
      {
        label: "二级节点3",
        children: [
          { label: "三级节点31" },
          { label: "三级节点32" },
          { label: "三级节点33" },
        ],
      },
    ],
  },
  {
    label: "一级节点2",
    children: [
      {
        label: "二级节点1",
        children: [
          { label: "三级节点11" },
          { label: "三级节点12" },
          { label: "三级节点13" },
        ],
      },
      {
        label: "二级节点2",
        children: [
          { label: "三级节点21" },
          { label: "三级节点22" },
          { label: "三级节点23" },
        ],
      },
      {
        label: "二级节点3",
        children: [
          { label: "三级节点31" },
          { label: "三级节点32" },
          { label: "三级节点33" },
        ],
      },
    ],
  },
  {
    label: "一级节点2",
    children: [
      {
        label: "二级节点1",
        children: [
          { label: "三级节点11" },
          { label: "三级节点12" },
          { label: "三级节点13" },
        ],
      },
      {
        label: "二级节点2",
        children: [
          { label: "三级节点21" },
          { label: "三级节点22" },
          { label: "三级节点23" },
        ],
      },
      {
        label: "二级节点3",
        children: [
          { label: "三级节点31" },
          { label: "三级节点32" },
          { label: "三级节点33" },
        ],
      },
    ],
  },
  {
    label: "一级节点2",
    children: [
      {
        label: "二级节点1",
        children: [
          { label: "三级节点11" },
          { label: "三级节点12" },
          { label: "三级节点13" },
        ],
      },
      {
        label: "二级节点2",
        children: [
          { label: "三级节点21" },
          { label: "三级节点22" },
          { label: "三级节点23" },
        ],
      },
      {
        label: "二级节点3",
        children: [
          { label: "三级节点31" },
          { label: "三级节点32" },
          { label: "三级节点33" },
        ],
      },
    ],
  },
];


[
  {
    label: 'Table 表格',
    children: [
      {
        label: '基础用法',
        id: 'table-1'
      },
      {
        label: '带斑马纹表格',
        id: 'table-2'
      },
      {
        label: '带边框表格',
        id: 'table-3'
      }
    ]
  },
  {
    label: 'Tooltip 文字提示',
    children: [
      {
        label: '基础用法',
        id: 'tooltip-1'
      }
    ]
  },
  {
    label: 'Carousel 轮播图',
    children: [
      {
        label: '基础用法',
        id: 'carousel-1'
      }
    ]
  },
];

// description: 叶子节点选中变化的回调
// params: array => 选中叶子节点的一维数组(保持追加顺序)
const handleCheckedNodeArrayChange = (array) => {
  checkedNodeArray = array;
  tableSelected.length = 0;
  carouselSelected.length = 0;
  for (let node of checkedNodeArray) {
    const id = node.id;
    const arr = id.split('-');
    switch (arr[0]) {
      case 'table':
        tableSelected.push(arr[1]);
        break;
      case 'carousel':
        carouselSelected.push(arr[1]);
        break
    }
  }

};


</script>

<style scoped lang="less">
.homeViewContainer {
  width: 1226px;
  margin: auto;
  display: flex;

  .sideBar {
    width: 240px;
    height: auto;
  }

  .mainContent {
    flex: 1;



    .block {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }
  }
}

.carousel-container {

  height: 350px;
  margin: 50px;

  .carousel-item {
    width: 100%;
    height: 100%;
    font-size: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(194, 249, 194);
  }
}
</style>
