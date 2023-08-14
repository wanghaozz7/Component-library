import carouelConfig from "./i-carousel";
import tableConfig from "./i-table";
import tooltipConfig from "./i-tooltip";
import mindConfig from "./i-mind";
import switchConfig from "./i-switch";
import messageConfig from "./i-message";
import sidebarConfig from "./i-side-bar";
import transitionConfig from "./i-transition";
import buttonConfig from "./i-button";
import selectConfig from "./i-select";

const arr = [
  selectConfig,
  buttonConfig,
  transitionConfig,
  sidebarConfig,
  mindConfig,
  messageConfig,
  switchConfig,
  tableConfig,
  tooltipConfig,
  carouelConfig,
];

const sideBarConfig = arr.map((x) => {
  return {
    label: x.title.text,
    children: x.children.map((child) => {
      return {
        label: child.title.text,
        id: child.id,
      };
    }),
  };
});

export default sideBarConfig;
