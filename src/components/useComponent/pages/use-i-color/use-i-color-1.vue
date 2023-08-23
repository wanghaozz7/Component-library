<template>
  <div style="padding: 20px">
    <div class="color-tabs">
      <div
        class="color-circle"
        v-for="(color, idx) in tabs"
        :key="color"
        :style="getVariable(color)"
        @click="activeIdx = idx"
      >
        <transition name="ease-in-out">
          <div class="triangle" v-show="idx === activeIdx" />
        </transition>
      </div>
    </div>
    <div class="content">
      <div
        class="parallelogram"
        v-for="color in tabs"
        :key="color"
        :style="{ background: color }"
      >
        <div class="text">
          {{ color }}
        </div>
      </div>
      <!-- <div
        class="parallelogram"
        v-for="color in tabs"
        :key="color"
        :style="{ background: color }"
      >
        <div class="text">
          {{ color }}
        </div>
      </div> -->
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 40px">
      <i-color-box
        v-for="(,idx) in colorList"
        :key="idx"
        :color="colorList[idx].color"
        :label="colorList[idx].label"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, reactive } from "vue";

const tabs = [
  "black",
  "blue",
  "brown",
  "orange",
  "purple",
  "pink",
  "red",
  "white",
  "yellow",
  "linear-gradient(to left, #40e0d0, #ff8c00, #ff0080)",
];

const colorTable = [
  {
    label: "black",
    colors: [
      { label: "Abaddon Black", color: "#231f20" },
      { label: "Accursed Black", color: "#090807" },
      { label: "Anubis Black", color: "#312231" },
      { label: "Apple Herb Black", color: "#4b4247" },
      { label: "Aswad Black", color: "#17181c" },
      { label: "Back In Black", color: "#16141c" },
      { label: "Badab Black Wash", color: "#0a0908" },
      { label: "Basalt Black", color: "#4d423e" },
      { label: "Benthic Black", color: "#000011" },
      { label: "Berry Blackmail", color: "#662277" },
      { label: "Beryl Black Green", color: "#2b322d" },
      { label: "Binrouji Black", color: "#433d3c" },
      { label: "Black", color: "#000000" },
      { label: "Black Bamboo", color: "#5b5d53" },
    ],
  },
  {
    label: "blue",
    colors: [
      {
        label: "Adriatic Blue",
        color: "#5c899b",
      },
      {
        label: "Advertising Blue",
        color: "#0081a8",
      },
      {
        label: "Aegean Blue",
        color: "#4f6d83",
      },
      {
        label: "Aero Blue",
        color: "#c0e8d5",
      },
      {
        label: "After Work Blue",
        color: "#24246d",
      },
      {
        label: "Aggressive Baby Blue",
        color: "#6fffff",
      },
      {
        label: "Ahoy! Blue",
        color: "#0082a1",
      },
      {
        label: "Ahriman Blue",
        color: "#199ebd",
      },
      {
        label: "Air Blue",
        color: "#69a3c1",
      },
      {
        label: "Air Force Blue",
        color: "#5d8aa8",
      },
      {
        label: "Air Superiority Blue",
        color: "#72a0c1",
      },
      {
        label: "Aircraft Blue",
        color: "#354f58",
      },
      {
        label: "Airy Blue",
        color: "#88ccee",
      },
      {
        label: "Alaitoc Blue",
        color: "#8e8c97",
      },
    ],
  },
  {
    label: "brown",
    colors: [
      {
        label: "All the Leaves Are Brown",
        color: "#994411",
      },
      {
        label: "Amber Brown",
        color: "#b46a4d",
      },
      {
        label: "American Brown",
        color: "#804040",
      },
      {
        label: "Antiquarian Brown",
        color: "#946644",
      },
      {
        label: "Antique Brown",
        color: "#553f2d",
      },
      {
        label: "Apple Brown Betty",
        color: "#9c6757",
      },
      {
        label: "Apricot Brown",
        color: "#cc7e5b",
      },
      {
        label: "Arable Brown",
        color: "#7a552e",
      },
      {
        label: "Ash Brown",
        color: "#98623c",
      },
      {
        label: "Ashen Brown",
        color: "#994444",
      },
      {
        label: "Aurora Brown",
        color: "#6a4238",
      },
      {
        label: "Authentic Brown",
        color: "#6b5446",
      },
      {
        label: "Autumn Leaf Brown",
        color: "#7a560e",
      },
      {
        label: "Badshahi Brown",
        color: "#d3a194",
      },
      {
        label: "Baikō Brown",
        color: "#887938",
      },
    ],
  },
  {
    label: "orange",
    colors: [
      {
        label: "Orange Sherbet",
        color: "#fec49b",
      },
      {
        label: "Orange Shimmer",
        color: "#e2d6bd",
      },
      {
        label: "Orange Shot",
        color: "#dd7744",
      },
      {
        label: "Orange Soda",
        color: "#fa5b3d",
      },
      {
        label: "Orange Spice",
        color: "#fea060",
      },
      {
        label: "Orange Squash",
        color: "#c27635",
      },
      {
        label: "Orange Sulphur",
        color: "#e8a320",
      },
      {
        label: "Orange Supreme",
        color: "#ff7435",
      },
      {
        label: "Orange Tea Rose",
        color: "#ff8379",
      },
      {
        label: "Orange Tiger",
        color: "#f95c14",
      },
      {
        label: "Orange Vermillion",
        color: "#bc5339",
      },
      {
        label: "Orange White",
        color: "#eae3cd",
      },
      {
        label: "Orange Wood",
        color: "#b74923",
      },
      {
        label: "Orange Yellow",
        color: "#fdb915",
      },
    ],
  },
  {
    label: "purple",
    colors: [
      {
        label: "Benikeshinezumi Purple",
        color: "#44312e",
      },
      {
        label: "Benimidori Purple",
        color: "#78779b",
      },
      {
        label: "Blue Purple",
        color: "#5729ce",
      },
      {
        label: "Blue With A Hint Of Purple",
        color: "#533cc6",
      },
      {
        label: "Bluish Lilac Purple",
        color: "#d0d5d3",
      },
      {
        label: "Bluish Purple",
        color: "#703be7",
      },
      {
        label: "Bluish Purple Anemone",
        color: "#6666bb",
      },
      {
        label: "Brave Purple",
        color: "#968db8",
      },
      {
        label: "Bright Purple",
        color: "#be03fd",
      },
      {
        label: "Brownish Purple",
        color: "#76424e",
      },
      {
        label: "Brownish Purple Red",
        color: "#8d746f",
      },
      {
        label: "C64 Purple",
        color: "#6f6ed1",
      },
      {
        label: "Cadmium Purple",
        color: "#b60c26",
      },
      {
        label: "Campanula Purple",
        color: "#6c6d94",
      },
    ],
  },
  {
    label: "pink",
    colors: [
      {
        label: "Abbey Pink",
        color: "#cd716b",
      },
      {
        label: "Adventure Island Pink",
        color: "#f87858",
      },
      {
        label: "After-Party Pink",
        color: "#c95efb",
      },
      {
        label: "Aged Pink",
        color: "#c99f99",
      },
      {
        label: "Almond Blossom Pink",
        color: "#e0d2d1",
      },
      {
        label: "Almost Pink",
        color: "#f0e3da",
      },
      {
        label: "Altered Pink",
        color: "#efc7be",
      },
      {
        label: "Amaranth Pink",
        color: "#f19cbb",
      },
      {
        label: "American Pink",
        color: "#ff9899",
      },
      {
        label: "Angora Pink",
        color: "#ebdfea",
      },
      {
        label: "Antique Hot Pink",
        color: "#b07f9e",
      },
    ],
  },
  {
    label: "red",
    colors: [
      {
        label: "Awning Red",
        color: "#90413e",
      },
      {
        label: "Azuki Red",
        color: "#672422",
      },
      {
        label: "Baal Red Wash",
        color: "#610023",
      },
      {
        label: "Bacchanalia Red",
        color: "#8a3a3c",
      },
      {
        label: "Balsamic Reduction",
        color: "#434340",
      },
      {
        label: "Bara Red",
        color: "#e9546b",
      },
      {
        label: "Barn Red",
        color: "#8b4044",
      },
      {
        label: "Baroque Red",
        color: "#7b4f5d",
      },
      {
        label: "Battered Sausage",
        color: "#ede2d4",
      },
      {
        label: "Beastly Red",
        color: "#680c08",
      },
      {
        label: "Beet Red",
        color: "#7e203f",
      },
      {
        label: "Beige Red",
        color: "#de9408",
      },
      {
        label: "Bengala Red",
        color: "#8f2e14",
      },
      {
        label: "Bengara Red",
        color: "#913225",
      },
      {
        label: "Benihi Red",
        color: "#f35336",
      },
    ],
  },
  {
    label: "white",
    colors: [
      {
        label: "Bean White",
        color: "#ebf0e4",
      },
      {
        label: "Belyi White",
        color: "#f0f1e1",
      },
      {
        label: "Birch White",
        color: "#f6eedf",
      },
      {
        label: "Black White",
        color: "#e5e4db",
      },
      {
        label: "Bleach White",
        color: "#ebe1ce",
      },
      {
        label: "Bleached White",
        color: "#dfe3e8",
      },
      {
        label: "Blossom White",
        color: "#f2eee4",
      },
      {
        label: "Blues White Shoes",
        color: "#99badd",
      },
      {
        label: "Bone White",
        color: "#f1e1b0",
      },
      {
        label: "Breakwater White",
        color: "#ebf1e9",
      },
      {
        label: "Bright White",
        color: "#f6f2f1",
      },
      {
        label: "Brilliant White",
        color: "#e8eefe",
      },
      {
        label: "Broken White",
        color: "#eeebe3",
      },
      {
        label: "Butter White",
        color: "#fddebd",
      },
      {
        label: "Buttery White",
        color: "#f1ebda",
      },
    ],
  },
  {
    label: "yellow",
    colors: [
      { label: "Angelic Yellow", color: "#f4dfa7" },
      { label: "Anise Grey Yellow", color: "#b0ac98" },
      { label: "Apricot Yellow", color: "#f7bd81" },
      { label: "Aquarelle Yellow", color: "#f4eeda" },
      { label: "Arnica Yellow", color: "#e59b00" },
      { label: "Arylide Yellow", color: "#e9d66b" },
      { label: "Asagi Yellow", color: "#f7bb7d" },
      { label: "Asfar Yellow", color: "#fcef01" },
      { label: "Ash Yellow", color: "#f0bd7e" },
      { label: "Asparagus Yellow", color: "#dac98e" },
      { label: "Aspen Yellow", color: "#f6df9f" },
      { label: "Autumn Apple Yellow", color: "#cda449" },
      { label: "Autumn Yellow", color: "#e99700" },
      { label: "Bad Moon Yellow", color: "#f2e5b4" },
      { label: "Bakelite Yellow", color: "#c6b788" },
      { label: "Bamboo Yellow", color: "#ae884b" },
    ],
  },
];

let activeIdx = ref(0);

let colorList = reactive([]);

const getVariable = computed(() => {
  return (color) => {
    return {
      "--color": color,
      "--triangle-color": color === "white" ? "#EEE9BF" : color,
      "--border": color === "white" ? "1px solid #EEE9BF" : "",
      "--box-shadow": `0 0 5px 1px ${
        color === "white" ||
        color === "linear-gradient(to left, #40e0d0, #ff8c00, #ff0080)"
          ? "#CDC9A5"
          : color
      }`,
    };
  };
});

watch(
  () => activeIdx.value,
  (newVal, oldVal) => {
    for (let i = 0; i < 10; i++) {
      colorList[i] = colorTable[newVal].colors[i];
    }
    console.log(colorList);
  },
  {
    immediate: true,
  }
);
</script>

<style lang="less" scoped>
.color-tabs {
  display: flex;
  padding: 15px 15px 25px 15px;
  .color-circle {
    position: relative;
    width: 25px;
    height: 25px;
    background: var(--color);
    border: var(--border);
    border-radius: 50%;
    margin-right: 15px;
    cursor: pointer;
    &:hover {
      box-shadow: var(--box-shadow);
    }
    .triangle {
      position: absolute;
      bottom: -18px;
      left: 50%;
      transform: translateX(-50%);
      -webkit-clip-path: polygon(0 0, 100% 0, 50% 90%);
      background: var(--triangle-color);
      width: 15px;
      height: 15px;
    }
  }
}
.content {
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;
  .parallelogram {
    flex: 1;
    height: 50px;
    transform: skew(45deg);
    cursor: pointer;
    &:first-child {
      margin-left: 30px;
    }
    &:last-child {
      margin-right: 30px;
    }
    .text {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      transform: skew(-45deg);
      color: white;
      font-size: large;
      font-weight: bold;
    }
  }
}
</style>
