import carouelConfig from "./carousel";
import tableConfig from "./table";
import tooltipConfig from "./tooltip";
import mindConfig from "./mind";
import switchConfig from "./switch";
import messageConfig from "./message";
import sidebarConfig from "./sidebar";
import transitionConfig from "./transition";

const arr = [
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
