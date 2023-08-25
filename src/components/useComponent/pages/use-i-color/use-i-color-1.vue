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
    <div class="blocks">
      <i-color-box
        v-for="(,idx) in colorList"
        :key="idx"
        :color="colorList[idx].color"
        :label="colorList[idx].label"
        showOpacity
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
      { label: "Aggressive Baby Blue", color: "#6fffff" },
      { label: "Ahriman Blue", color: "#199ebd" },
      { label: "After Work Blue", color: "#24246d" },
      { label: "Air Blue", color: "#69a3c1" },
      { label: "Airy Blue", color: "#88ccee" },
      { label: "Adriatic Blue", color: "#5c899b" },
      { label: "Advertising Blue", color: "#0081a8" },
      { label: "Aegean Blue", color: "#4f6d83" },
      { label: "Air Force Blue", color: "#5d8aa8" },
    ],
  },
  {
    label: "brown",
    colors: [
      { label: "All the Leaves Are Brown", color: "#994411" },
      { label: "Amber Brown", color: "#b46a4d" },
      { label: "Ash Brown", color: "#98623c" },
      { label: "American Brown", color: "#804040" },
      { label: "Antique Brown", color: "#553f2d" },
      { label: "Apple Brown Betty", color: "#9c6757" },
      { label: "Arable Brown", color: "#7a552e" },
      { label: "Ashen Brown", color: "#994444" },
      { label: "Aurora Brown", color: "#6a4238" },
      { label: "Authentic Brown", color: "#6b5446" },
      { label: "Autumn Leaf Brown", color: "#7a560e" },
      { label: "Badshahi Brown", color: "#d3a194" },
      { label: "Baikō Brown", color: "#887938" },
    ],
  },
  {
    label: "orange",
    colors: [
      { label: "Orange Soda", color: "#fa5b3d" },
      { label: "Orange Supreme", color: "#ff7435" },
      { label: "Orange Tea Rose", color: "#ff8379" },
      { label: "Orange Sulphur", color: "#e8a320" },
      { label: "Orange Tiger", color: "#f95c14" },
      { label: "Orange Vermillion", color: "#bc5339" },
      { label: "Orange Sherbet", color: "#fec49b" },
      { label: "Orange Shot", color: "#dd7744" },
      { label: "Orange Spice", color: "#fea060" },
      { label: "Orange White", color: "#eae3cd" },
      { label: "Orange Wood", color: "#b74923" },
      { label: "Orange Yellow", color: "#fdb915" },
    ],
  },
  {
    label: "purple",
    colors: [
      { label: "Aconite Purple", color: "#7249d6" },
      { label: "Amora Purple", color: "#bb22aa" },
      { label: "Amaranth Deep Purple", color: "#9f2b68" },
      { label: "Aged Purple", color: "#a442a0" },
      { label: "Amethyst Purple", color: "#562f7e" },
      { label: "Akebi Purple", color: "#983fb2" },
      { label: "Bright Purple", color: "#be03fd" },
      { label: "Alien Purple", color: "#490648" },
      { label: "Amaranth Purple", color: "#723f89" },
      { label: "Benimidori Purple", color: "#78779b" },
      { label: "Blue Purple", color: "#5729ce" },
      { label: "Blue With A Hint Of Purple", color: "#533cc6" },
      { label: "Bluish Purple Anemone", color: "#6666bb" },
      { label: "Brave Purple", color: "#968db8" },
      { label: "C64 Purple", color: "#6f6ed1" },
      { label: "Campanula Purple", color: "#6c6d94" },
    ],
  },
  {
    label: "pink",
    colors: [
      { label: "Barbie Pink", color: "#fe46a5" },
      { label: "Ballerina Pink", color: "#f7b6ba" },
      { label: "Baker-Miller Pink", color: "#ff92ae" },
      { label: "Aurora Pink", color: "#e881a6" },
      { label: "Avant-Garde Pink", color: "#ff77ee" },
      { label: "Baby Pink", color: "#ffb7ce" },
      { label: "Aries Hot Pink", color: "#f887c7" },
      { label: "Bazooka Pink", color: "#ffa6c9" },
      { label: "Begonia Pink", color: "#ec9abe" },
      { label: "Abbey Pink", color: "#cd716b" },
      { label: "Adventure Island Pink", color: "#f87858" },
      { label: "Aristocratic Pink", color: "#ddaacc" },
      { label: "Art House Pink", color: "#c06f70" },
      { label: "Artful Pink", color: "#cc6c82" },
      { label: "Altered Pink", color: "#efc7be" },
      { label: "Amaranth Pink", color: "#f19cbb" },
      { label: "American Pink", color: "#ff9899" },
      { label: "Angora Pink", color: "#ebdfea" },
      { label: "Antique Hot Pink", color: "#b07f9e" },
    ],
  },
  {
    label: "red",
    colors: [
      { label: "Assassin's Red", color: "#f60206" },
      { label: "Astorath Red", color: "#dd482b" },
      { label: "Atlas Red", color: "#82193a" },
      { label: "Artful Red", color: "#b30103" },
      { label: "Bara Red", color: "#e9546b" },
      { label: "Aurora Red", color: "#c13435" },
      { label: "Bethlehem Red", color: "#ee0022" },
      { label: "Bijou Red", color: "#a33d3b" },
      { label: "Bindi Red", color: "#b0003c" },
      { label: "Barn Red", color: "#8b4044" },
      { label: "Bengala Red", color: "#8f2e14" },
      { label: "Bengara Red", color: "#913225" },
      { label: "Benihi Red", color: "#f35336" },
    ],
  },
  {
    label: "white",
    colors: [
      { label: "Bean White", color: "#ebf0e4" },
      { label: "Belyi White", color: "#f0f1e1" },
      { label: "Birch White", color: "#f6eedf" },
      { label: "Black White", color: "#e5e4db" },
      { label: "Bleach White", color: "#ebe1ce" },
      { label: "Bleached White", color: "#dfe3e8" },
      { label: "Blossom White", color: "#f2eee4" },
      { label: "Blues White Shoes", color: "#99badd" },
      { label: "Bone White", color: "#f1e1b0" },
      { label: "Breakwater White", color: "#ebf1e9" },
      { label: "Bright White", color: "#f6f2f1" },
      { label: "Brilliant White", color: "#e8eefe" },
      { label: "Broken White", color: "#eeebe3" },
      { label: "Butter White", color: "#fddebd" },
      { label: "Buttery White", color: "#f1ebda" },
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

const str = ``;

const fn = (str) => {
  const arr = str.split("\n");
  const ans = [];
  for (let i = 0; i < arr.length; i++) {
    if (i % 2 === 0) ans[Math.floor(i / 2)] = { label: arr[i] };
    else ans[Math.floor(i / 2)].color = arr[i];
  }
  return ans;
};

console.log(fn(str));

let activeIdx = ref(6);

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
    for (let i = 0; i < 9; i++) {
      colorList[i] = colorTable[newVal].colors[i];
    }
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
.blocks {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 10px;
  border-radius: 4px 0 0 4px;
}
</style>
