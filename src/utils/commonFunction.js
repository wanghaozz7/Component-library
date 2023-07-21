const $paintingStyle = (el, arrays, callback = () => {}) => {
  for (let arr of arrays) {
    const key = arr[0];
    const value = arr[1];
    el.style[key] = value;
    callback(key, value);
  }
};

let id = 1;
const $message = (arg) => {
  const { type, info, delay = 3000, showClose = false } = arg;

  // 计算排在前面的(id小于参数id)的message个数
  const getCurMessageCount = (id) => {
    let before = 0;
    for (let i = 0; i < body.children.length; i++) {
      if (body.children[i].id.slice(0, 7) == "message") {
        if (parseInt(body.children[i].id.slice(8)) < parseInt(id)) {
          before++;
        }
      }
    }
    return before;
  };
  const getMessageBody = () => {
    const el = document.createElement("div");
    const styleArray = [
      ["padding", "8px 12px"],
      ["border", "1px solid #ebebeb"],
      ["border-radius", "4px"],
      ["display", "flex"],
      ["align-items", "center"],
      ["position", "fixed"],
      ["top", `${(getCurMessageCount(messageId) + 1) * 50}px`],
      ["left", "50%"],
      ["transform", "translateX(-50%)"],
      ["transition", "all 0.5s"],
    ];
    $paintingStyle(el, styleArray);
    el.id = `message-${messageId}`;
    return el;
  };
  const getMessageIcon = () => {
    const thumb = document.createElement("div");
    const icon = document.createElement("img");

    thumb.appendChild(icon);

    const thumbStyleArray = [
      ["width", "20px"],
      ["height", "20px"],
      ["display", "flex"],
      ["align-items", "center"],
    ];

    const iconStyleArray = [
      ["width", "100%"],
      ["height", "100%"],
    ];

    $paintingStyle(thumb, thumbStyleArray);
    $paintingStyle(icon, iconStyleArray);

    return thumb;
  };
  const getMessageText = () => {
    const el = document.createElement("div");
    el.innerText = info;
    const styleArray = [
      ["height", "25px"],
      ["line-height", "25px"],
      ["margin-left", "10px"],
    ];
    $paintingStyle(el, styleArray);
    return el;
  };
  const getCloseButton = () => {
    const thumb = document.createElement("div");
    const icon = document.createElement("img");
    const thumbStyleArray = [
      ["width", "12px"],
      ["height", "12px"],
      ["display", "flex"],
      ["align-items", "center"],
      ["margin-left", "10px"],
      ["cursor", "pointer"],
    ];

    const iconStyleArray = [
      ["width", "100%"],
      ["height", "100%"],
    ];

    thumb.addEventListener("click", close);

    $paintingStyle(thumb, thumbStyleArray);
    $paintingStyle(icon, iconStyleArray);

    thumb.appendChild(icon);
    icon.src = require("../assets/icons/close.svg");
    return thumb;
  };
  const close = () => {
    message.style.opacity = 0;
    setTimeout(() => {
      body.removeChild(message);
      clearInterval(timer);
      timer = null;
    }, 550);
  };
  const closeMessage = () => {
    setTimeout(() => {
      close();
    }, parseInt(delay));
  };
  const getSuccessStyle = () => {
    const messageStyle = [
      ["background-color", "#f0f9eb"],
      ["border-color", "#e1f3d8"],
    ];
    const textStyle = [["color", "#67c23a"]];
    icon.children[0].src = require("../assets/icons/checked.svg");
    $paintingStyle(message, messageStyle);
    $paintingStyle(text, textStyle);
  };

  const body = document.getElementsByTagName("body")[0];
  const messageId = id++;
  const message = getMessageBody();
  const icon = getMessageIcon();
  const text = getMessageText();

  let timer = setInterval(() => {
    const before = getCurMessageCount(messageId);
    message.style.top = (before + 1) * 50 + "px";
  }, 10);

  switch (type) {
    case "success":
      getSuccessStyle();
      break;
    case "warning":
      break;
  }

  message.appendChild(icon);
  message.appendChild(text);
  if (showClose) message.appendChild(getCloseButton());

  body.appendChild(message);

  closeMessage();

  return close;
};

export default {
  install: (app) => {
    app.config.globalProperties["$message"] = $message;
    app.config.globalProperties["$paintingStyle"] = $paintingStyle;
  },
};
