import selector from "./components/selector.vue";
import arrow from "./components/arrow.vue";

export default {
  name: "collapse",
  components: {
    selector,
    arrow,
  },
  data() {
    return {
      // 折叠面板是否展开
      extend: null,
      // 折叠面板每一行隐藏的高度
      hiddenHeight: null,
      // 子指标是否被选中
      selection: null,
      //选中个数
      count: 0,
    };
  },
  props: {
    // 折叠面板数据
    collapseData: {
      type: Array,
      default() {
        return [];
      },
    },
    // 默认展开的面板索引
    defaultActive: {
      type: Number,
      default: 0,
    },
    // 默认全部展开
    expendsAll: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    // 计算折叠面板的高度
    collapseRow() {
      return function (index) {
        // 隐藏部分的高度加上固定高度40 + 8
        let h = this.hiddenHeight[index] + 40 + 8;
        h += "px";
        return {
          height: this.extend[index] ? h : "40px",
        };
      };
    },
    // 计算箭头旋转的角度
    rotateArrow() {
      return function (index) {
        return {
          transform: this.extend[index] ? "rotate(180deg)" : "",
        };
      };
    },
    // 计算是否被选中(选中-0，未选中1)
    isSelected() {
      return function (index, childIdx) {
        return this.selection[index][childIdx] ? 0 : 1;
      };
    },
    // 判断第i个大指标的选中状态(全选-0，全不选-1，部分选中-2)
    selectState() {
      return function (index) {
        const arr = this.selection[index];
        const result = arr.find((x) => {
          return x === true;
        });
        if (result === undefined) {
          // 没有一个选中
          // console.log('全不选')
          return 1;
        } else {
          // 至少有一个选中则判断是否有未选中
          const res = arr.find((x) => {
            return x === false;
          });
          if (res === false) {
            // 部分选中
            // console.log('部分选中')
            return 2;
          } else if (res === undefined) {
            // 全选
            // console.log('全选')
            return 0;
          }
        }
      };
    },
    // 判断是否全选中(全选-0,全不选-1,部分选中-2)
    isAllSelected() {
      const arr = [];
      for (let i = 0; i < this.collapseData.length; i++) {
        arr.push(this.selectState(i));
      }
      //如果每个大指标都是全选则全选，每个大指标都是全不选则全不选
      const res = arr.find((x) => {
        return x === 2;
      });
      if (res === 2) {
        //如果找到一个部分选中则是部分选中
        return 2;
      } else {
        // 判断大指标是否全选，判断是不是全不选
        const r1 = arr.every((x) => {
          return x === 0;
        });
        if (r1) {
          return 0;
        } else {
          // 是否大指标全不选
          const r2 = arr.every((x) => {
            return x === 1;
          });
          return r2 ? 1 : 2;
        }
      }
    },
    // 计算选中的个数
    getSelectCount() {
      let res = 0;
      for (let index in this.selection) {
        const s1 = this.selection[index];
        let cnt = s1.reduce((pre, next) => {
          return (pre += next === true ? 1 : 0);
        }, 0);
        res += cnt;
      }
      return res;
    },
  },
  methods: {
    // 展开第index个折叠面板
    handleClick(index) {
      this.$set(this.extend, index, !this.extend[index]);
    },
    // 小指标选中(选中第index个折叠面板中的第childIdx项)
    handleSmallSelect(index, childIdx) {
      // vue.set处理二维数组比较麻烦，直接将修改的一维数组修改后splice
      const tmp = this.selection[index];
      this.$set(tmp, childIdx, !tmp[childIdx]);
      // 进行替换
      this.selection.splice(index, 1, tmp);
      this.$emit("selectChange", this.getResult());
    },
    // 大指标选中
    handleBigSelect(index) {
      // 判断是否所有元素都被选中了，是则全部取消，否则全部选中（find返回找到的元素false）
      const arr = this.selection[index];
      const result = arr.find((x) => {
        return x === false;
      });
      let tmp;
      // result是undefined => 没有找到一个false => 原来state全部选中 => 点击后全部不选
      if (result === undefined) {
        tmp = new Array(arr.length).fill(false);
      } else if (result === false) {
        //相反全部选中
        tmp = new Array(arr.length).fill(true);
      }
      this.selection.splice(index, 1, tmp);
      this.$emit("selectChange", this.getResult());
    },
    // 全选
    handleAllSelect() {
      // 如果全部选中，则全部取消
      // 否则全部选中
      let t = [];
      for (let s of this.selection) {
        const res = s.find((x) => {
          return x === false;
        });
        if (res === false) {
          //不是全部选中 => 全部选中
          for (let c of this.collapseData) {
            const tmp = [];
            for (let t of c.children) {
              tmp.push(true);
            }
            t.push(tmp);
          }
          break;
        } else if (res === undefined) {
          //是全部取消
          for (let c of this.collapseData) {
            const tmp = [];
            for (let t of c.children) {
              tmp.push(false);
            }
            t.push(tmp);
          }
          break;
        }
      }
      this.selection = t;
      this.$emit("selectChange", this.getResult());
    },
    // 将选中的树形结构返回
    getResult() {
      const res = [];
      for (let idx in this.selection) {
        const t = this.selection[idx];
        const tmp = [];
        for (let index in t) {
          if (t[index]) tmp.push(this.collapseData[idx].children[index]);
        }
        res.push({
          title: this.collapseData[idx].name,
          data: tmp,
        });
      }
      return res;
    },
    // 根据collapseData初始化数据
    getData(newVal) {
      const len = newVal.length;
      this.extend = new Array(len).fill(false);
      this.hiddenHeight = new Array(len).fill(0);
      this.selection = [];
      for (let c of newVal) {
        const tmp = [];
        for (let t of c.children) {
          tmp.push(false);
        }
        this.selection.push(tmp);
      }
      this.$nextTick(() => {
        for (let i = 0; i < len; i++) {
          const hidden = this.$refs[`hidden-${i}`][0];
          this.hiddenHeight[i] = hidden.offsetHeight;
        }
        if (this.expendsAll) {
          // 默认全部展开
          this.extend = new Array(len).fill(true);
        } else {
          // 默认展开第一个
          this.$set(this.extend, this.defaultActive, true);
        }
      });
    },
  },
  watch: {
    collapseData: {
      handler(newVal, oldVal) {
        this.getData(newVal);
      },
    },
  },
};
