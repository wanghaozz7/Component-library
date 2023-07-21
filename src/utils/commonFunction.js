const $paintingStyle = (el, arrays, callback = () => {}) => {
  for (let arr of arrays) {
    const key = arr[0];
    const value = arr[1];
    el.style[key] = value;
    callback(key, value);
  }
};

const $message = (arg) => {
  const { type, info, delay = 3000, showClose = false } = arg;
  const getMessageBody = () => {
    const el = document.createElement("div");
    const styleArray = [
      ["padding", "8px 12px"],
      ["border", "1px solid #ebebeb"],
      ["borderRadius", "4px"],
      ["display", "flex"],
      ["alignItems", "center"],
      ["position", "fixed"],
      ["top", "45px"],
      ["left", "50%"],
      ["transform", "translateX(-50%)"],
      ["transition", "all 0.5s"],
    ];
    $paintingStyle(el, styleArray);
    return el;
  };

  const getMessageIcon = () => {
    const thumb = document.createElement("div");
    const icon = document.createElement("img");

    thumb.appendChild(icon);

    const thumbStyleArray = [
      ["width", "20px"],
      ["height", "20px"],
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
      ["lineHeight", "25px"],
      ["marginLeft", "10px"],
    ];
    $paintingStyle(el, styleArray);
    return el;
  };

  const message = getMessageBody();
  const icon = getMessageIcon();
  const text = getMessageText();

  message.appendChild(icon);
  message.appendChild(text);

  const getSuccessStyle = () => {
    const messageStyle = [
      ["backgroundColor", "#f0f9eb"],
      ["borderColor", "#e1f3d8"],
    ];
    const textStyle = [["color", "#67c23a"]];
    icon.children[0].src = require("../assets/icons/checked.svg");
    $paintingStyle(message, messageStyle);
    $paintingStyle(text, textStyle);
  };

  switch (type) {
    case "success":
      getSuccessStyle();
      break;
    case "warning":
      break;
  }

  const body = document.getElementsByTagName("body")[0];
  body.appendChild(message);

  const close = () => {
    message.style.opacity = 0;
    setTimeout(() => {
      body.removeChild(message);
    }, 550);
  };

  const closeMessage = () => {
    setTimeout(() => {
      close();
    }, parseInt(delay));
  };

  closeMessage();
  return close;
};

export default {
  install: (app) => {
    app.config.globalProperties["$message"] = $message;
    app.config.globalProperties["$paintingStyle"] = $paintingStyle;
  },
};
