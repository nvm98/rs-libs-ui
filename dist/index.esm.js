import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Modal, TitleBar } from '@shopify/app-bridge-react';
import { Icon, Text, BlockStack, TextField, Select, Divider, Box, InlineStack, RangeSlider, Checkbox, Button, SkeletonDisplayText, SkeletonBodyText } from '@shopify/polaris';
import { useFetcher } from '@remix-run/react';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var SvgButtonIcon = function SvgButtonIcon(props) {
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M6.75 4a3.75 3.75 0 0 0-3.75 3.75v2.5a3.75 3.75 0 0 0 3.75 3.75h1.5a.75.75 0 0 0 0-1.5h-1.5a2.25 2.25 0 0 1-2.25-2.25v-2.5a2.25 2.25 0 0 1 2.25-2.25h6.5a2.25 2.25 0 0 1 2.25 2.25v.5a.75.75 0 0 0 1.5 0v-.5a3.75 3.75 0 0 0-3.75-3.75h-6.5Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9.464 8.464a.75.75 0 0 1 .78-.176l6.01 2.12a.75.75 0 0 1 .281 1.238l-1.237 1.238 1.414 1.414a.75.75 0 0 1 0 1.06l-.353.354a.75.75 0 0 1-1.06 0l-1.415-1.414-1.238 1.238a.75.75 0 0 1-1.237-.281l-2.121-6.01a.75.75 0 0 1 .176-.78Z"
  }));
};
SvgButtonIcon.displayName = "ButtonIcon";

var SvgDeleteIcon = function SvgDeleteIcon(props) {
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M11.5 8.25a.75.75 0 0 1 .75.75v4.25a.75.75 0 0 1-1.5 0v-4.25a.75.75 0 0 1 .75-.75Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9.25 9a.75.75 0 0 0-1.5 0v4.25a.75.75 0 0 0 1.5 0v-4.25Z"
  }), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M7.25 5.25a2.75 2.75 0 0 1 5.5 0h3a.75.75 0 0 1 0 1.5h-.75v5.45c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311c-.642.327-1.482.327-3.162.327h-.4c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311c-.327-.642-.327-1.482-.327-3.162v-5.45h-.75a.75.75 0 0 1 0-1.5h3Zm1.5 0a1.25 1.25 0 1 1 2.5 0h-2.5Zm-2.25 1.5h7v5.45c0 .865-.001 1.423-.036 1.848-.033.408-.09.559-.128.633a1.5 1.5 0 0 1-.655.655c-.074.038-.225.095-.633.128-.425.035-.983.036-1.848.036h-.4c-.865 0-1.423-.001-1.848-.036-.408-.033-.559-.09-.633-.128a1.5 1.5 0 0 1-.656-.655c-.037-.074-.094-.225-.127-.633-.035-.425-.036-.983-.036-1.848v-5.45Z"
  }));
};
SvgDeleteIcon.displayName = "DeleteIcon";

var SvgDragHandleIcon = function SvgDragHandleIcon(props) {
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M7.5 4.5c-.552 0-1 .448-1 1v.5c0 .552.448 1 1 1h.5c.552 0 1-.448 1-1v-.5c0-.552-.448-1-1-1h-.5Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7.5 8.75c-.552 0-1 .448-1 1v.5c0 .552.448 1 1 1h.5c.552 0 1-.448 1-1v-.5c0-.552-.448-1-1-1h-.5Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6.5 14c0-.552.448-1 1-1h.5c.552 0 1 .448 1 1v.5c0 .552-.448 1-1 1h-.5c-.552 0-1-.448-1-1v-.5Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 4.5c-.552 0-1 .448-1 1v.5c0 .552.448 1 1 1h.5c.552 0 1-.448 1-1v-.5c0-.552-.448-1-1-1h-.5Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11 9.75c0-.552.448-1 1-1h.5c.552 0 1 .448 1 1v.5c0 .552-.448 1-1 1h-.5c-.552 0-1-.448-1-1v-.5Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 13c-.552 0-1 .448-1 1v.5c0 .552.448 1 1 1h.5c.552 0 1-.448 1-1v-.5c0-.552-.448-1-1-1h-.5Z"
  }));
};
SvgDragHandleIcon.displayName = "DragHandleIcon";

var SvgEmailIcon = function SvgEmailIcon(props) {
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M5.75 4.5c-1.519 0-2.75 1.231-2.75 2.75v5.5c0 1.519 1.231 2.75 2.75 2.75h8.5c1.519 0 2.75-1.231 2.75-2.75v-5.5c0-1.519-1.231-2.75-2.75-2.75h-8.5Zm-1.25 2.75c0-.69.56-1.25 1.25-1.25h8.5c.69 0 1.25.56 1.25 1.25v5.5c0 .69-.56 1.25-1.25 1.25h-8.5c-.69 0-1.25-.56-1.25-1.25v-5.5Zm2.067.32c-.375-.175-.821-.013-.997.363-.175.375-.013.821.363.997l3.538 1.651c.335.156.723.156 1.058 0l3.538-1.651c.376-.176.538-.622.363-.997-.175-.376-.622-.538-.997-.363l-3.433 1.602-3.433-1.602Z"
  }));
};
SvgEmailIcon.displayName = "EmailIcon";

var SvgImageIcon = function SvgImageIcon(props) {
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M12.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
  }), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M9.018 3.5h1.964c.813 0 1.469 0 2 .043.546.045 1.026.14 1.47.366a3.75 3.75 0 0 1 1.64 1.639c.226.444.32.924.365 1.47.043.531.043 1.187.043 2v1.964c0 .813 0 1.469-.043 2-.045.546-.14 1.026-.366 1.47a3.75 3.75 0 0 1-1.639 1.64c-.444.226-.924.32-1.47.365-.531.043-1.187.043-2 .043h-1.964c-.813 0-1.469 0-2-.043-.546-.045-1.026-.14-1.47-.366a3.75 3.75 0 0 1-1.64-1.639c-.226-.444-.32-.924-.365-1.47-.043-.531-.043-1.187-.043-2v-1.964c0-.813 0-1.469.043-2 .045-.546.14-1.026.366-1.47a3.75 3.75 0 0 1 1.639-1.64c.444-.226.924-.32 1.47-.365.531-.043 1.187-.043 2-.043Zm-1.877 1.538c-.454.037-.715.107-.912.207a2.25 2.25 0 0 0-.984.984c-.1.197-.17.458-.207.912-.037.462-.038 1.057-.038 1.909v1.428l.723-.867a1.75 1.75 0 0 1 2.582-.117l2.695 2.695 1.18-1.18a1.75 1.75 0 0 1 2.604.145l.216.27v-2.374c0-.852 0-1.447-.038-1.91-.037-.453-.107-.714-.207-.911a2.25 2.25 0 0 0-.984-.984c-.197-.1-.458-.17-.912-.207-.462-.037-1.056-.038-1.909-.038h-1.9c-.852 0-1.447 0-1.91.038Zm-2.103 7.821a7.12 7.12 0 0 1-.006-.08.746.746 0 0 0 .044-.049l1.8-2.159a.25.25 0 0 1 .368-.016l3.226 3.225a.75.75 0 0 0 1.06 0l1.71-1.71a.25.25 0 0 1 .372.021l1.213 1.516c-.021.06-.045.114-.07.165-.216.423-.56.767-.984.983-.197.1-.458.17-.912.207-.462.037-1.056.038-1.909.038h-1.9c-.852 0-1.447 0-1.91-.038-.453-.037-.714-.107-.911-.207a2.25 2.25 0 0 1-.984-.984c-.1-.197-.17-.458-.207-.912Z"
  }));
};
SvgImageIcon.displayName = "ImageIcon";

var SvgMinusIcon = function SvgMinusIcon(props) {
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M5 10c0-.414.336-.75.75-.75h8.5c.414 0 .75.336.75.75s-.336.75-.75.75h-8.5c-.414 0-.75-.336-.75-.75Z"
  }));
};
SvgMinusIcon.displayName = "MinusIcon";

var SvgPlusCircleIcon = function SvgPlusCircleIcon(props) {
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M6.25 10a.75.75 0 0 1 .75-.75h2.25v-2.25a.75.75 0 0 1 1.5 0v2.25h2.25a.75.75 0 0 1 0 1.5h-2.25v2.25a.75.75 0 0 1-1.5 0v-2.25h-2.25a.75.75 0 0 1-.75-.75Z"
  }), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm0-1.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"
  }));
};
SvgPlusCircleIcon.displayName = "PlusCircleIcon";

var SvgProductIcon = function SvgProductIcon(props) {
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M13 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
  }), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M11.276 3.5a3.75 3.75 0 0 0-2.701 1.149l-4.254 4.417a2.75 2.75 0 0 0 .036 3.852l2.898 2.898a2.5 2.5 0 0 0 3.502.033l4.747-4.571a3.25 3.25 0 0 0 .996-2.341v-2.187a3.25 3.25 0 0 0-3.25-3.25h-1.974Zm-1.62 2.19a2.25 2.25 0 0 1 1.62-.69h1.974c.966 0 1.75.784 1.75 1.75v2.187c0 .475-.194.93-.536 1.26l-4.747 4.572a1 1 0 0 1-1.401-.014l-2.898-2.898a1.25 1.25 0 0 1-.016-1.75l4.253-4.418Z"
  }));
};
SvgProductIcon.displayName = "ProductIcon";

var SvgTextIcon = function SvgTextIcon(props) {
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M7 3.25a.75.75 0 0 1 .695.467l2.75 6.75a.75.75 0 0 1-1.39.566l-.632-1.553a.752.752 0 0 1-.173.02h-2.68l-.625 1.533a.75.75 0 1 1-1.39-.566l2.75-6.75a.75.75 0 0 1 .695-.467Zm.82 4.75-.82-2.012-.82 2.012h1.64Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4.25 12.5a.75.75 0 0 0 0 1.5h11.5a.75.75 0 0 0 0-1.5h-11.5Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4.25 15a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7Z"
  }), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M15.066 5.94a3 3 0 1 0 0 5.118.75.75 0 0 0 1.434-.308v-4.5a.75.75 0 0 0-1.434-.31Zm-1.566 4.06a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
  }));
};
SvgTextIcon.displayName = "TextIcon";

var initialBlocks = [{
  id: '1',
  type: 'header',
  content: {
    logoUrl: '{{shop_logo_url}}',
    shopName: '{{shop_name}}',
    showLogo: true,
    alignment: 'center'
  },
  styles: {
    backgroundColor: '#ffffff',
    padding: '32px 24px',
    textAlign: 'center'
  }
}, {
  id: '2',
  type: 'text',
  content: {
    text: 'Hi {{customer_first_name}}, your order is ready!',
    variables: true
  },
  styles: {
    fontSize: '16px',
    color: '#333333',
    textAlign: 'left',
    padding: '16px 24px'
  }
}, {
  id: '3',
  type: 'product',
  content: {
    showImage: true,
    showPrice: true,
    showDescription: false
  },
  styles: {
    backgroundColor: '#f9f9f9',
    border: '1px solid #e1e3e5',
    borderRadius: '8px',
    padding: '20px',
    margin: '16px 24px'
  }
}, {
  id: '4',
  type: 'button',
  content: {
    text: 'Shop Now',
    link: '{{shop_url}}',
    variables: true
  },
  styles: {
    backgroundColor: '#007ace',
    color: '#ffffff',
    padding: '14px 32px',
    borderRadius: '6px',
    textAlign: 'center',
    margin: '16px 24px'
  }
}, {
  id: '5',
  type: 'footer',
  content: {
    text: '© 2024 {{shop_name}}. All rights reserved.',
    unsubscribeText: 'Unsubscribe from these notifications',
    showSocial: false
  },
  styles: {
    backgroundColor: '#f6f6f7',
    color: '#6d7175',
    fontSize: '14px',
    textAlign: 'center',
    padding: '24px'
  }
}];
var BLOCK_TEMPLATES = {
  header: {
    type: 'header',
    content: {
      logoUrl: '{{shop_logo_url}}',
      shopName: '{{shop_name}}',
      showLogo: true,
      alignment: 'center'
    },
    styles: {
      backgroundColor: '#ffffff',
      padding: '32px 24px',
      textAlign: 'center'
    }
  },
  text: {
    type: 'text',
    content: {
      text: 'Your text content here...',
      variables: true
    },
    styles: {
      fontSize: '16px',
      color: '#333333',
      textAlign: 'left',
      padding: '16px 24px'
    }
  },
  image: {
    type: 'image',
    content: {
      src: 'https://via.placeholder.com/600x200',
      alt: 'Image',
      link: ''
    },
    styles: {
      width: '100%',
      maxWidth: '600px',
      padding: '16px 24px',
      textAlign: 'center'
    }
  },
  button: {
    type: 'button',
    content: {
      text: 'Click Here',
      link: '#',
      variables: true
    },
    styles: {
      backgroundColor: '#007ace',
      color: '#ffffff',
      padding: '14px 32px',
      borderRadius: '6px',
      textAlign: 'center',
      margin: '16px 24px'
    }
  },
  product: {
    type: 'product',
    content: {
      showImage: true,
      showPrice: true,
      showDescription: false
    },
    styles: {
      backgroundColor: '#f9f9f9',
      border: '1px solid #e1e3e5',
      borderRadius: '8px',
      padding: '20px',
      margin: '16px 24px'
    }
  },
  divider: {
    type: 'divider',
    content: {},
    styles: {
      borderColor: '#e1e3e5',
      margin: '24px 0'
    }
  },
  spacer: {
    type: 'spacer',
    content: {},
    styles: {
      height: '32px'
    }
  },
  footer: {
    type: 'footer',
    content: {
      text: '© 2024 {{shop_name}}. All rights reserved.',
      unsubscribeText: 'Unsubscribe from these notifications',
      showSocial: false
    },
    styles: {
      backgroundColor: '#f6f6f7',
      color: '#6d7175',
      fontSize: '14px',
      textAlign: 'center',
      padding: '24px'
    }
  }
};

function AddBlockZone(_a) {
  var position = _a.position,
    onAddBlock = _a.onAddBlock,
    _b = _a.isDragOver,
    isDragOver = _b === void 0 ? false : _b,
    _c = _a.isDragging,
    isDragging = _c === void 0 ? false : _c;
  var _d = useState(false),
    isHovered = _d[0],
    setIsHovered = _d[1];
  var _e = useState(false),
    showMenu = _e[0],
    setShowMenu = _e[1];
  // Block type icons
  var getBlockIcon = function getBlockIcon(type) {
    var iconMap = {
      header: SvgImageIcon,
      text: SvgTextIcon,
      image: SvgImageIcon,
      button: SvgButtonIcon,
      product: SvgProductIcon,
      divider: SvgMinusIcon,
      spacer: SvgPlusCircleIcon,
      footer: SvgTextIcon
    };
    return iconMap[type];
  };
  // Block type labels
  var getBlockLabel = function getBlockLabel(type) {
    var labelMap = {
      header: 'Header',
      text: 'Text',
      image: 'Image',
      button: 'Button',
      product: 'Product',
      divider: 'Divider',
      spacer: 'Spacer',
      footer: 'Footer'
    };
    return labelMap[type];
  };
  var handleAddBlock = function handleAddBlock(type) {
    var index;
    if (position === 'top') {
      index = 0;
    } else if (typeof position === 'number') {
      index = position + 1;
    }
    // For 'bottom', index remains undefined (append to end)
    onAddBlock(type, index);
    setShowMenu(false);
  };
  var isActive = isHovered || isDragOver;
  // Hide add block zone when dragging
  if (isDragging) {
    return jsx("div", {
      "data-add-block-zone": true,
      style: {
        position: 'relative',
        height: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      children: jsx("div", {
        style: {
          position: 'absolute',
          top: '50%',
          left: '20px',
          right: '20px',
          height: '1px',
          backgroundColor: '#e5e7eb',
          transform: 'translateY(-50%)',
          opacity: 0.2
        }
      })
    });
  }
  return jsxs("div", {
    "data-add-block-zone": true,
    style: {
      position: 'relative',
      height: isActive ? '32px' : '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: isActive ? 'pointer' : 'default',
      transition: 'height 0.2s ease'
    },
    onMouseEnter: function onMouseEnter() {
      return setIsHovered(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setIsHovered(false);
    },
    onClick: function onClick() {
      return isActive && setShowMenu(!showMenu);
    },
    children: [jsx("div", {
      style: {
        position: 'absolute',
        top: '50%',
        left: '20px',
        right: '20px',
        height: '1px',
        backgroundColor: isActive ? '#007ace' : '#e5e7eb',
        transform: 'translateY(-50%)',
        transition: 'all 0.2s ease',
        opacity: isActive ? 0.6 : 0.3
      }
    }), isActive && jsx("div", {
      style: {
        position: 'relative',
        width: '20px',
        height: '20px',
        backgroundColor: '#007ace',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 2px 6px rgba(0, 122, 206, 0.25)',
        transition: 'all 0.2s ease',
        zIndex: 10,
        border: '1.5px solid #ffffff'
      },
      onMouseEnter: function onMouseEnter(e) {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.boxShadow = '0 3px 10px rgba(0, 122, 206, 0.35)';
      },
      onMouseLeave: function onMouseLeave(e) {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 122, 206, 0.25)';
      },
      children: jsx("svg", {
        width: "8",
        height: "8",
        viewBox: "0 0 8 8",
        fill: "none",
        children: jsx("path", {
          d: "M4 1V7M1 4H7",
          stroke: "white",
          strokeWidth: "1",
          strokeLinecap: "round"
        })
      })
    }), showMenu && jsx("div", {
      style: {
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#ffffff',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
        zIndex: 1000,
        marginTop: '8px',
        minWidth: '240px',
        padding: '8px'
      },
      children: jsx("div", {
        style: {
          display: 'flex',
          flexDirection: 'column',
          gap: '2px'
        },
        children: Object.entries(BLOCK_TEMPLATES).map(function (_a) {
          var type = _a[0];
          return jsxs("div", {
            onClick: function onClick() {
              return handleAddBlock(type);
            },
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease',
              backgroundColor: 'transparent'
            },
            onMouseEnter: function onMouseEnter(e) {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            },
            onMouseLeave: function onMouseLeave(e) {
              e.currentTarget.style.backgroundColor = 'transparent';
            },
            children: [jsx("div", {
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '20px',
                height: '20px',
                color: '#007ace'
              },
              children: jsx(Icon, {
                source: getBlockIcon(type)
              })
            }), jsx(Text, {
              as: "span",
              variant: "bodyMd",
              fontWeight: "medium",
              children: getBlockLabel(type)
            })]
          }, type);
        })
      })
    })]
  });
}

function DropZone(_a) {
  var index = _a.index,
    isDragOver = _a.isDragOver,
    isDragging = _a.isDragging,
    _onDragOver = _a.onDragOver,
    onDragLeave = _a.onDragLeave,
    _onDrop = _a.onDrop;
  // Only show drop zone when dragging
  if (!isDragging) {
    return null;
  }
  return jsx("div", {
    onDragOver: function onDragOver(e) {
      return _onDragOver(e, index);
    },
    onDragLeave: onDragLeave,
    onDrop: function onDrop(e) {
      return _onDrop(e, index);
    },
    style: {
      height: '4px',
      backgroundColor: isDragOver ? '#007ace' : 'transparent',
      transition: 'background-color 0.2s ease'
    }
  });
}

function BlockHeader(_a) {
  var block = _a.block,
    isSelected = _a.isSelected,
    isHovered = _a.isHovered,
    onSelect = _a.onSelect,
    onRemove = _a.onRemove,
    onDragStart = _a.onDragStart,
    onDragEnd = _a.onDragEnd,
    onMouseEnter = _a.onMouseEnter,
    onMouseLeave = _a.onMouseLeave;
  // Block type icons
  var getBlockIcon = function getBlockIcon(type) {
    var iconMap = {
      header: SvgImageIcon,
      text: SvgTextIcon,
      image: SvgImageIcon,
      button: SvgButtonIcon,
      product: SvgProductIcon,
      divider: SvgMinusIcon,
      spacer: SvgPlusCircleIcon,
      footer: SvgTextIcon
    };
    return iconMap[type];
  };
  // Block type labels
  var getBlockLabel = function getBlockLabel(type) {
    var labelMap = {
      header: 'Header',
      text: 'Text',
      image: 'Image',
      button: 'Button',
      product: 'Product',
      divider: 'Divider',
      spacer: 'Spacer',
      footer: 'Footer'
    };
    return labelMap[type];
  };
  return jsxs("div", {
    draggable: true,
    onDragStart: onDragStart,
    onDragEnd: onDragEnd,
    onClick: function onClick(e) {
      // Don't trigger if clicking on drag handle or delete button
      if (!e.target.closest('[data-drag-handle]') && !e.target.closest('[data-delete-button]')) {
        onSelect();
      }
    },
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    onMouseDown: function onMouseDown(e) {
      if (e.target === e.currentTarget || e.target.closest('[data-drag-handle]')) {
        e.currentTarget.style.cursor = 'grabbing';
      }
    },
    onMouseUp: function onMouseUp(e) {
      if (e.target.closest('[data-drag-handle]')) {
        e.currentTarget.style.cursor = 'grab';
      }
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '8px 12px',
      cursor: isSelected ? 'default' : 'pointer',
      backgroundColor: isSelected ? '#f8f9fa' : isHovered ? '#f9fafb' : 'transparent',
      transition: 'background-color 0.15s ease'
    },
    children: [jsxs("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      },
      children: [jsx("div", {
        "data-drag-handle": true,
        style: {
          cursor: 'grab'
        },
        children: jsx(Icon, {
          source: SvgDragHandleIcon
        })
      }), jsx(Icon, {
        source: getBlockIcon(block.type)
      }), jsx(Text, {
        as: "span",
        variant: "bodySm",
        fontWeight: isSelected ? 'medium' : 'regular',
        children: getBlockLabel(block.type)
      })]
    }), jsxs("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      },
      children: [isSelected && jsx("div", {
        style: {
          fontSize: '12px',
          color: '#6b7280'
        },
        children: "Click to collapse"
      }), jsx("div", {
        "data-delete-button": true,
        onClick: function onClick(e) {
          e.stopPropagation();
          onRemove();
        },
        style: {
          cursor: isHovered ? 'pointer' : 'default',
          padding: '4px',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '24px',
          height: '24px',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.15s ease'
        },
        children: jsx(Icon, {
          source: SvgDeleteIcon,
          tone: "base"
        })
      })]
    })]
  });
}

function HeaderBlockSettings(_a) {
  var block = _a.block,
    updateContent = _a.updateContent,
    updateStyles = _a.updateStyles;
  // Helper functions to convert between different units
  var parsePixelValue = function parsePixelValue(value) {
    var parsed = parseInt(value.replace('px', ''));
    return isNaN(parsed) ? 0 : parsed;
  };
  var parsePaddingValue = function parsePaddingValue(value) {
    // Handle padding like "24px" or "24px 16px" - take first value
    var firstValue = value.split(' ')[0];
    return parsePixelValue(firstValue);
  };
  return jsxs(BlockStack, {
    gap: "300",
    children: [jsx(Text, {
      as: "h4",
      variant: "headingXs",
      children: "Content"
    }), jsx(TextField, {
      label: "Header Text",
      value: block.content.text || '',
      onChange: function onChange(value) {
        return updateContent({
          text: value
        });
      },
      placeholder: "Welcome to our store!",
      autoComplete: "off"
    }), jsx(Select, {
      label: "Header Level",
      options: [{
        label: 'H1 (Largest)',
        value: 'h1'
      }, {
        label: 'H2 (Large)',
        value: 'h2'
      }, {
        label: 'H3 (Medium)',
        value: 'h3'
      }, {
        label: 'H4 (Small)',
        value: 'h4'
      }],
      value: block.content.level || 'h2',
      onChange: function onChange(value) {
        return updateContent({
          level: value
        });
      }
    }), jsx(Select, {
      label: "Text Alignment",
      options: [{
        label: 'Left',
        value: 'left'
      }, {
        label: 'Center',
        value: 'center'
      }, {
        label: 'Right',
        value: 'right'
      }],
      value: block.content.alignment || 'center',
      onChange: function onChange(value) {
        return updateContent({
          alignment: value
        });
      }
    }), jsx(Divider, {}), jsx(Text, {
      as: "h4",
      variant: "headingXs",
      children: "Styling"
    }), jsxs(Box, {
      children: [jsx(Text, {
        as: "p",
        variant: "bodyMd",
        children: "Background Color"
      }), jsx(Box, {
        paddingBlockStart: "100",
        children: jsx("input", {
          type: "color",
          value: block.styles.backgroundColor || '#ffffff',
          onChange: function onChange(e) {
            return updateStyles({
              backgroundColor: e.target.value
            });
          },
          style: {
            width: '100%',
            height: '36px',
            border: '1px solid #c9cccf',
            borderRadius: '6px',
            cursor: 'pointer'
          }
        })
      })]
    }), jsxs(Box, {
      children: [jsx(Text, {
        as: "p",
        variant: "bodyMd",
        children: "Text Color"
      }), jsx(Box, {
        paddingBlockStart: "100",
        children: jsx("input", {
          type: "color",
          value: block.styles.color || '#333333',
          onChange: function onChange(e) {
            return updateStyles({
              color: e.target.value
            });
          },
          style: {
            width: '100%',
            height: '36px',
            border: '1px solid #c9cccf',
            borderRadius: '6px',
            cursor: 'pointer'
          }
        })
      })]
    }), jsxs(Box, {
      children: [jsx(Box, {
        paddingBlockEnd: "100",
        children: jsxs(InlineStack, {
          align: "space-between",
          children: [jsx(Text, {
            as: "p",
            variant: "bodyMd",
            children: "Font Size"
          }), jsxs(Text, {
            as: "p",
            variant: "bodyMd",
            tone: "subdued",
            children: [parsePixelValue(block.styles.fontSize || '24px'), "px"]
          })]
        })
      }), jsx(RangeSlider, {
        label: "",
        value: parsePixelValue(block.styles.fontSize || '24px'),
        min: 12,
        max: 72,
        step: 1,
        onChange: function onChange(value) {
          return updateStyles({
            fontSize: "".concat(value, "px")
          });
        }
      })]
    }), jsxs(Box, {
      children: [jsx(Box, {
        paddingBlockEnd: "100",
        children: jsxs(InlineStack, {
          align: "space-between",
          children: [jsx(Text, {
            as: "p",
            variant: "bodyMd",
            children: "Padding"
          }), jsxs(Text, {
            as: "p",
            variant: "bodyMd",
            tone: "subdued",
            children: [parsePaddingValue(block.styles.padding || '24px'), "px"]
          })]
        })
      }), jsx(RangeSlider, {
        label: "",
        value: parsePaddingValue(block.styles.padding || '24px'),
        min: 0,
        max: 80,
        step: 4,
        onChange: function onChange(value) {
          return updateStyles({
            padding: "".concat(value, "px")
          });
        }
      })]
    })]
  });
}

// Helper function to parse pixel values
var parsePixelValue$4 = function parsePixelValue(value) {
  var parsed = parseInt(value.replace('px', ''));
  return isNaN(parsed) ? 16 : parsed;
};
// Helper function to parse padding values (simplified to single value)
var parsePaddingValue$3 = function parsePaddingValue(value) {
  var firstValue = value.split(' ')[0];
  var parsed = parseInt(firstValue.replace('px', ''));
  return isNaN(parsed) ? 16 : parsed;
};
function TextBlockSettings(_a) {
  var block = _a.block,
    updateContent = _a.updateContent,
    updateStyles = _a.updateStyles;
  return jsxs(BlockStack, {
    gap: "300",
    children: [jsx(Text, {
      as: "h4",
      variant: "headingXs",
      children: "Content"
    }), jsx(TextField, {
      label: "Text Content",
      value: block.content.text || '',
      onChange: function onChange(value) {
        return updateContent({
          text: value
        });
      },
      multiline: 4,
      autoComplete: "off"
    }), jsx(Divider, {}), jsx(Text, {
      as: "h4",
      variant: "headingXs",
      children: "Styling"
    }), jsxs(Box, {
      children: [jsx(Box, {
        paddingBlockEnd: "100",
        children: jsxs(InlineStack, {
          align: "space-between",
          children: [jsx(Text, {
            as: "p",
            variant: "bodyMd",
            children: "Font Size"
          }), jsxs(Text, {
            as: "p",
            variant: "bodyMd",
            tone: "subdued",
            children: [parsePixelValue$4(block.styles.fontSize || '16px'), "px"]
          })]
        })
      }), jsx(RangeSlider, {
        label: "",
        value: parsePixelValue$4(block.styles.fontSize || '16px'),
        min: 12,
        max: 48,
        step: 1,
        onChange: function onChange(value) {
          return updateStyles({
            fontSize: "".concat(value, "px")
          });
        }
      })]
    }), jsxs(Box, {
      children: [jsx(Text, {
        as: "p",
        variant: "bodyMd",
        tone: "base",
        children: "Text Color"
      }), jsx(Box, {
        paddingBlockStart: "100",
        children: jsx("input", {
          type: "color",
          value: block.styles.color || '#333333',
          onChange: function onChange(e) {
            return updateStyles({
              color: e.target.value
            });
          },
          style: {
            width: '100%',
            height: '36px',
            border: '1px solid #c9cccf',
            borderRadius: '6px',
            cursor: 'pointer'
          }
        })
      })]
    }), jsx(Select, {
      label: "Text Alignment",
      options: [{
        label: 'Left',
        value: 'left'
      }, {
        label: 'Center',
        value: 'center'
      }, {
        label: 'Right',
        value: 'right'
      }, {
        label: 'Justify',
        value: 'justify'
      }],
      value: block.styles.textAlign || 'left',
      onChange: function onChange(value) {
        return updateStyles({
          textAlign: value
        });
      }
    }), jsxs(Box, {
      children: [jsx(Box, {
        paddingBlockEnd: "100",
        children: jsxs(InlineStack, {
          align: "space-between",
          children: [jsx(Text, {
            as: "p",
            variant: "bodyMd",
            children: "Padding"
          }), jsxs(Text, {
            as: "p",
            variant: "bodyMd",
            tone: "subdued",
            children: [parsePaddingValue$3(block.styles.padding || '16px'), "px"]
          })]
        })
      }), jsx(RangeSlider, {
        label: "",
        value: parsePaddingValue$3(block.styles.padding || '16px'),
        min: 0,
        max: 80,
        step: 4,
        onChange: function onChange(value) {
          return updateStyles({
            padding: "".concat(value, "px")
          });
        }
      })]
    })]
  });
}

// Helper function to parse pixel values
var parsePixelValue$3 = function parsePixelValue(value) {
  var parsed = parseInt(value.replace('px', ''));
  return isNaN(parsed) ? 300 : parsed;
};
// Helper function to parse padding values (simplified to single value)
var parsePaddingValue$2 = function parsePaddingValue(value) {
  var firstValue = value.split(' ')[0];
  var parsed = parseInt(firstValue.replace('px', ''));
  return isNaN(parsed) ? 16 : parsed;
};
function ImageBlockSettings(_a) {
  var block = _a.block,
    updateContent = _a.updateContent,
    updateStyles = _a.updateStyles;
  return jsxs(BlockStack, {
    gap: "300",
    children: [jsx(Text, {
      as: "h4",
      variant: "headingXs",
      children: "Content"
    }), jsx(TextField, {
      label: "Image URL",
      value: block.content.src || '',
      onChange: function onChange(value) {
        return updateContent({
          src: value
        });
      },
      placeholder: "https://example.com/image.jpg",
      autoComplete: "off"
    }), jsx(TextField, {
      label: "Alt Text",
      value: block.content.alt || '',
      onChange: function onChange(value) {
        return updateContent({
          alt: value
        });
      },
      placeholder: "Image description",
      autoComplete: "off"
    }), jsx(TextField, {
      label: "Link URL (optional)",
      value: block.content.link || '',
      onChange: function onChange(value) {
        return updateContent({
          link: value
        });
      },
      placeholder: "https://example.com",
      autoComplete: "off"
    }), jsx(Divider, {}), jsx(Text, {
      as: "h4",
      variant: "headingXs",
      children: "Styling"
    }), jsxs(Box, {
      children: [jsx(Box, {
        paddingBlockEnd: "100",
        children: jsxs(InlineStack, {
          align: "space-between",
          children: [jsx(Text, {
            as: "p",
            variant: "bodyMd",
            children: "Width"
          }), jsxs(Text, {
            as: "p",
            variant: "bodyMd",
            tone: "subdued",
            children: [parsePixelValue$3(block.styles.width || '300px'), "px"]
          })]
        })
      }), jsx(RangeSlider, {
        label: "",
        value: parsePixelValue$3(block.styles.width || '300px'),
        min: 100,
        max: 600,
        step: 10,
        onChange: function onChange(value) {
          return updateStyles({
            width: "".concat(value, "px")
          });
        }
      })]
    }), jsx(TextField, {
      label: "Height",
      value: block.styles.height || 'auto',
      onChange: function onChange(value) {
        return updateStyles({
          height: value
        });
      },
      placeholder: "200px or auto",
      autoComplete: "off"
    }), jsx(Select, {
      label: "Alignment",
      options: [{
        label: 'Left',
        value: 'left'
      }, {
        label: 'Center',
        value: 'center'
      }, {
        label: 'Right',
        value: 'right'
      }],
      value: block.styles.textAlign || 'center',
      onChange: function onChange(value) {
        return updateStyles({
          textAlign: value
        });
      }
    }), jsxs(Box, {
      children: [jsx(Box, {
        paddingBlockEnd: "100",
        children: jsxs(InlineStack, {
          align: "space-between",
          children: [jsx(Text, {
            as: "p",
            variant: "bodyMd",
            children: "Padding"
          }), jsxs(Text, {
            as: "p",
            variant: "bodyMd",
            tone: "subdued",
            children: [parsePaddingValue$2(block.styles.padding || '16px'), "px"]
          })]
        })
      }), jsx(RangeSlider, {
        label: "",
        value: parsePaddingValue$2(block.styles.padding || '16px'),
        min: 0,
        max: 80,
        step: 4,
        onChange: function onChange(value) {
          return updateStyles({
            padding: "".concat(value, "px")
          });
        }
      })]
    })]
  });
}

// Helper function to parse pixel values
var parsePixelValue$2 = function parsePixelValue(value) {
  var parsed = parseInt(value.replace('px', ''));
  return isNaN(parsed) ? 6 : parsed;
};
function ButtonBlockSettings(_a) {
  var block = _a.block,
    updateContent = _a.updateContent,
    updateStyles = _a.updateStyles;
  return jsxs(BlockStack, {
    gap: "300",
    children: [jsx(Text, {
      as: "h4",
      variant: "headingXs",
      children: "Content"
    }), jsx(TextField, {
      label: "Button Text",
      value: block.content.text || '',
      onChange: function onChange(value) {
        return updateContent({
          text: value
        });
      },
      placeholder: "Click Here",
      autoComplete: "off"
    }), jsx(TextField, {
      label: "Link URL",
      value: block.content.link || '',
      onChange: function onChange(value) {
        return updateContent({
          link: value
        });
      },
      placeholder: "https://example.com",
      autoComplete: "off"
    }), jsx(Divider, {}), jsx(Text, {
      as: "h4",
      variant: "headingXs",
      children: "Styling"
    }), jsxs(Box, {
      children: [jsx(Text, {
        as: "p",
        variant: "bodyMd",
        tone: "base",
        children: "Background Color"
      }), jsx(Box, {
        paddingBlockStart: "100",
        children: jsx("input", {
          type: "color",
          value: block.styles.backgroundColor || '#007ace',
          onChange: function onChange(e) {
            return updateStyles({
              backgroundColor: e.target.value
            });
          },
          style: {
            width: '100%',
            height: '36px',
            border: '1px solid #c9cccf',
            borderRadius: '6px',
            cursor: 'pointer'
          }
        })
      })]
    }), jsxs(Box, {
      children: [jsx(Text, {
        as: "p",
        variant: "bodyMd",
        tone: "base",
        children: "Text Color"
      }), jsx(Box, {
        paddingBlockStart: "100",
        children: jsx("input", {
          type: "color",
          value: block.styles.color || '#ffffff',
          onChange: function onChange(e) {
            return updateStyles({
              color: e.target.value
            });
          },
          style: {
            width: '100%',
            height: '36px',
            border: '1px solid #c9cccf',
            borderRadius: '6px',
            cursor: 'pointer'
          }
        })
      })]
    }), jsxs(Box, {
      children: [jsx(Box, {
        paddingBlockEnd: "100",
        children: jsxs(InlineStack, {
          align: "space-between",
          children: [jsx(Text, {
            as: "p",
            variant: "bodyMd",
            children: "Border Radius"
          }), jsxs(Text, {
            as: "p",
            variant: "bodyMd",
            tone: "subdued",
            children: [parsePixelValue$2(block.styles.borderRadius || '6px'), "px"]
          })]
        })
      }), jsx(RangeSlider, {
        label: "",
        value: parsePixelValue$2(block.styles.borderRadius || '6px'),
        min: 0,
        max: 24,
        step: 1,
        onChange: function onChange(value) {
          return updateStyles({
            borderRadius: "".concat(value, "px")
          });
        }
      })]
    }), jsx(Select, {
      label: "Alignment",
      options: [{
        label: 'Left',
        value: 'left'
      }, {
        label: 'Center',
        value: 'center'
      }, {
        label: 'Right',
        value: 'right'
      }],
      value: block.styles.textAlign || 'center',
      onChange: function onChange(value) {
        return updateStyles({
          textAlign: value
        });
      }
    })]
  });
}

// Helper function to parse padding values (simplified to single value)
var parsePaddingValue$1 = function parsePaddingValue(value) {
  var firstValue = value.split(' ')[0];
  var parsed = parseInt(firstValue.replace('px', ''));
  return isNaN(parsed) ? 20 : parsed;
};
// Helper function to parse border width from border string
var parseBorderWidth = function parseBorderWidth(borderValue) {
  var match = borderValue.match(/(\d+)px/);
  return match ? parseInt(match[1]) : 1;
};
// Helper function to parse border color from border string
var parseBorderColor = function parseBorderColor(borderValue) {
  var match = borderValue.match(/#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}/);
  return match ? match[0] : '#e1e3e5';
};
function ProductBlockSettings(_a) {
  var block = _a.block,
    updateContent = _a.updateContent,
    updateStyles = _a.updateStyles;
  return jsxs(BlockStack, {
    gap: "300",
    children: [jsx(Text, {
      as: "h4",
      variant: "headingXs",
      children: "Display Options"
    }), jsx(Checkbox, {
      label: "Show Product Image",
      checked: block.content.showImage,
      onChange: function onChange(checked) {
        return updateContent({
          showImage: checked
        });
      }
    }), jsx(Checkbox, {
      label: "Show Product Price",
      checked: block.content.showPrice,
      onChange: function onChange(checked) {
        return updateContent({
          showPrice: checked
        });
      }
    }), jsx(Checkbox, {
      label: "Show Product Description",
      checked: block.content.showDescription,
      onChange: function onChange(checked) {
        return updateContent({
          showDescription: checked
        });
      }
    }), jsx(Divider, {}), jsx(Text, {
      as: "h4",
      variant: "headingXs",
      children: "Styling"
    }), jsxs(Box, {
      children: [jsx(Text, {
        as: "p",
        variant: "bodyMd",
        tone: "base",
        children: "Background Color"
      }), jsx(Box, {
        paddingBlockStart: "100",
        children: jsx("input", {
          type: "color",
          value: block.styles.backgroundColor || '#ffffff',
          onChange: function onChange(e) {
            return updateStyles({
              backgroundColor: e.target.value
            });
          },
          style: {
            width: '100%',
            height: '36px',
            border: '1px solid #c9cccf',
            borderRadius: '6px',
            cursor: 'pointer'
          }
        })
      })]
    }), jsxs(Box, {
      children: [jsx(Text, {
        as: "p",
        variant: "bodyMd",
        tone: "base",
        children: "Text Color"
      }), jsx(Box, {
        paddingBlockStart: "100",
        children: jsx("input", {
          type: "color",
          value: block.styles.color || '#333333',
          onChange: function onChange(e) {
            return updateStyles({
              color: e.target.value
            });
          },
          style: {
            width: '100%',
            height: '36px',
            border: '1px solid #c9cccf',
            borderRadius: '6px',
            cursor: 'pointer'
          }
        })
      })]
    }), jsxs(Box, {
      children: [jsx(Text, {
        as: "p",
        variant: "bodyMd",
        tone: "base",
        children: "Border Color"
      }), jsx(Box, {
        paddingBlockStart: "100",
        children: jsx("input", {
          type: "color",
          value: parseBorderColor(block.styles.border || '1px solid #e1e3e5'),
          onChange: function onChange(e) {
            var currentWidth = parseBorderWidth(block.styles.border || '1px solid #e1e3e5');
            updateStyles({
              border: "".concat(currentWidth, "px solid ").concat(e.target.value)
            });
          },
          style: {
            width: '100%',
            height: '36px',
            border: '1px solid #c9cccf',
            borderRadius: '6px',
            cursor: 'pointer'
          }
        })
      })]
    }), jsxs(Box, {
      children: [jsx(Box, {
        paddingBlockEnd: "100",
        children: jsxs(InlineStack, {
          align: "space-between",
          children: [jsx(Text, {
            as: "p",
            variant: "bodyMd",
            children: "Border Width"
          }), jsxs(Text, {
            as: "p",
            variant: "bodyMd",
            tone: "subdued",
            children: [parseBorderWidth(block.styles.border || '1px solid #e1e3e5'), "px"]
          })]
        })
      }), jsx(RangeSlider, {
        label: "",
        value: parseBorderWidth(block.styles.border || '1px solid #e1e3e5'),
        min: 0,
        max: 8,
        step: 1,
        onChange: function onChange(value) {
          var currentColor = parseBorderColor(block.styles.border || '1px solid #e1e3e5');
          updateStyles({
            border: value === 0 ? 'none' : "".concat(value, "px solid ").concat(currentColor)
          });
        }
      })]
    }), jsxs(Box, {
      children: [jsx(Box, {
        paddingBlockEnd: "100",
        children: jsxs(InlineStack, {
          align: "space-between",
          children: [jsx(Text, {
            as: "p",
            variant: "bodyMd",
            children: "Padding"
          }), jsxs(Text, {
            as: "p",
            variant: "bodyMd",
            tone: "subdued",
            children: [parsePaddingValue$1(block.styles.padding || '20px'), "px"]
          })]
        })
      }), jsx(RangeSlider, {
        label: "",
        value: parsePaddingValue$1(block.styles.padding || '20px'),
        min: 0,
        max: 80,
        step: 4,
        onChange: function onChange(value) {
          return updateStyles({
            padding: "".concat(value, "px")
          });
        }
      })]
    })]
  });
}

// Helper function to parse margin values (simplified to single value)
var parseMarginValue = function parseMarginValue(value) {
  var firstValue = value.split(' ')[0];
  var parsed = parseInt(firstValue.replace('px', ''));
  return isNaN(parsed) ? 24 : parsed;
};
function DividerBlockSettings(_a) {
  var block = _a.block,
    updateStyles = _a.updateStyles;
  return jsxs(BlockStack, {
    gap: "300",
    children: [jsx(Text, {
      as: "h4",
      variant: "headingXs",
      children: "Styling"
    }), jsxs(Box, {
      children: [jsx(Text, {
        as: "p",
        variant: "bodyMd",
        tone: "base",
        children: "Border Color"
      }), jsx(Box, {
        paddingBlockStart: "100",
        children: jsx("input", {
          type: "color",
          value: block.styles.borderColor || '#e1e3e5',
          onChange: function onChange(e) {
            return updateStyles({
              borderColor: e.target.value
            });
          },
          style: {
            width: '100%',
            height: '36px',
            border: '1px solid #c9cccf',
            borderRadius: '6px',
            cursor: 'pointer'
          }
        })
      })]
    }), jsxs(Box, {
      children: [jsx(Box, {
        paddingBlockEnd: "100",
        children: jsxs(InlineStack, {
          align: "space-between",
          children: [jsx(Text, {
            as: "p",
            variant: "bodyMd",
            children: "Margin"
          }), jsxs(Text, {
            as: "p",
            variant: "bodyMd",
            tone: "subdued",
            children: [parseMarginValue(block.styles.margin || '24px'), "px"]
          })]
        })
      }), jsx(RangeSlider, {
        label: "",
        value: parseMarginValue(block.styles.margin || '24px'),
        min: 0,
        max: 80,
        step: 4,
        onChange: function onChange(value) {
          return updateStyles({
            margin: "".concat(value, "px 0")
          });
        }
      })]
    })]
  });
}

// Helper function to parse pixel values
var parsePixelValue$1 = function parsePixelValue(value) {
  var parsed = parseInt(value.replace('px', ''));
  return isNaN(parsed) ? 32 : parsed;
};
function SpacerBlockSettings(_a) {
  var block = _a.block,
    updateStyles = _a.updateStyles;
  return jsxs(BlockStack, {
    gap: "300",
    children: [jsx(Text, {
      as: "h4",
      variant: "headingXs",
      children: "Sizing"
    }), jsxs(Box, {
      children: [jsx(Box, {
        paddingBlockEnd: "100",
        children: jsxs(InlineStack, {
          align: "space-between",
          children: [jsx(Text, {
            as: "p",
            variant: "bodyMd",
            children: "Height"
          }), jsxs(Text, {
            as: "p",
            variant: "bodyMd",
            tone: "subdued",
            children: [parsePixelValue$1(block.styles.height || '32px'), "px"]
          })]
        })
      }), jsx(RangeSlider, {
        label: "",
        value: parsePixelValue$1(block.styles.height || '32px'),
        min: 8,
        max: 120,
        step: 4,
        onChange: function onChange(value) {
          return updateStyles({
            height: "".concat(value, "px")
          });
        }
      })]
    })]
  });
}

// Helper function to parse pixel values
var parsePixelValue = function parsePixelValue(value) {
  var parsed = parseInt(value.replace('px', ''));
  return isNaN(parsed) ? 12 : parsed;
};
// Helper function to parse padding values (simplified to single value)
var parsePaddingValue = function parsePaddingValue(value) {
  var firstValue = value.split(' ')[0];
  var parsed = parseInt(firstValue.replace('px', ''));
  return isNaN(parsed) ? 24 : parsed;
};
function FooterBlockSettings(_a) {
  var block = _a.block,
    updateContent = _a.updateContent,
    updateStyles = _a.updateStyles;
  return jsxs(BlockStack, {
    gap: "300",
    children: [jsx(Text, {
      as: "h4",
      variant: "headingXs",
      children: "Content"
    }), jsx(TextField, {
      label: "Footer Text",
      value: block.content.text || '',
      onChange: function onChange(value) {
        return updateContent({
          text: value
        });
      },
      placeholder: "\xA9 2024 {{shop_name}}. All rights reserved.",
      multiline: 2,
      autoComplete: "off"
    }), jsx(TextField, {
      label: "Unsubscribe Text",
      value: block.content.unsubscribeText || '',
      onChange: function onChange(value) {
        return updateContent({
          unsubscribeText: value
        });
      },
      placeholder: "Unsubscribe from these notifications",
      autoComplete: "off"
    }), jsx(Checkbox, {
      label: "Show Social Media Links",
      checked: block.content.showSocial,
      onChange: function onChange(checked) {
        return updateContent({
          showSocial: checked
        });
      }
    }), jsx(Divider, {}), jsx(Text, {
      as: "h4",
      variant: "headingXs",
      children: "Styling"
    }), jsxs(Box, {
      children: [jsx(Text, {
        as: "p",
        variant: "bodyMd",
        tone: "base",
        children: "Background Color"
      }), jsx(Box, {
        paddingBlockStart: "100",
        children: jsx("input", {
          type: "color",
          value: block.styles.backgroundColor || '#f8f9fa',
          onChange: function onChange(e) {
            return updateStyles({
              backgroundColor: e.target.value
            });
          },
          style: {
            width: '100%',
            height: '36px',
            border: '1px solid #c9cccf',
            borderRadius: '6px',
            cursor: 'pointer'
          }
        })
      })]
    }), jsxs(Box, {
      children: [jsx(Text, {
        as: "p",
        variant: "bodyMd",
        tone: "base",
        children: "Text Color"
      }), jsx(Box, {
        paddingBlockStart: "100",
        children: jsx("input", {
          type: "color",
          value: block.styles.color || '#6c757d',
          onChange: function onChange(e) {
            return updateStyles({
              color: e.target.value
            });
          },
          style: {
            width: '100%',
            height: '36px',
            border: '1px solid #c9cccf',
            borderRadius: '6px',
            cursor: 'pointer'
          }
        })
      })]
    }), jsxs(Box, {
      children: [jsx(Box, {
        paddingBlockEnd: "100",
        children: jsxs(InlineStack, {
          align: "space-between",
          children: [jsx(Text, {
            as: "p",
            variant: "bodyMd",
            children: "Font Size"
          }), jsxs(Text, {
            as: "p",
            variant: "bodyMd",
            tone: "subdued",
            children: [parsePixelValue(block.styles.fontSize || '12px'), "px"]
          })]
        })
      }), jsx(RangeSlider, {
        label: "",
        value: parsePixelValue(block.styles.fontSize || '12px'),
        min: 10,
        max: 24,
        step: 1,
        onChange: function onChange(value) {
          return updateStyles({
            fontSize: "".concat(value, "px")
          });
        }
      })]
    }), jsxs(Box, {
      children: [jsx(Box, {
        paddingBlockEnd: "100",
        children: jsxs(InlineStack, {
          align: "space-between",
          children: [jsx(Text, {
            as: "p",
            variant: "bodyMd",
            children: "Padding"
          }), jsxs(Text, {
            as: "p",
            variant: "bodyMd",
            tone: "subdued",
            children: [parsePaddingValue(block.styles.padding || '24px'), "px"]
          })]
        })
      }), jsx(RangeSlider, {
        label: "",
        value: parsePaddingValue(block.styles.padding || '24px'),
        min: 0,
        max: 80,
        step: 4,
        onChange: function onChange(value) {
          return updateStyles({
            padding: "".concat(value, "px")
          });
        }
      })]
    })]
  });
}

function EmailBlockSettings(_a) {
  var block = _a.block,
    onUpdate = _a.onUpdate;
  var updateContent = function updateContent(contentUpdates) {
    onUpdate(__assign(__assign({}, block), {
      content: __assign(__assign({}, block.content), contentUpdates)
    }));
  };
  var updateStyles = function updateStyles(styleUpdates) {
    onUpdate(__assign(__assign({}, block), {
      styles: __assign(__assign({}, block.styles), styleUpdates)
    }));
  };
  // Component mapping for cleaner organization
  var components = {
    header: HeaderBlockSettings,
    text: TextBlockSettings,
    image: ImageBlockSettings,
    button: ButtonBlockSettings,
    product: ProductBlockSettings,
    divider: DividerBlockSettings,
    spacer: SpacerBlockSettings,
    footer: FooterBlockSettings
  };
  var Component = components[block.type];
  if (!Component) {
    return null;
  }
  // Handle components that don't need updateContent (divider, spacer)
  if (block.type === 'divider' || block.type === 'spacer') {
    var StyleOnlyComponent = Component;
    return jsx(StyleOnlyComponent, {
      block: block,
      updateStyles: updateStyles
    });
  }
  var FullComponent = Component;
  return jsx(FullComponent, {
    block: block,
    updateContent: updateContent,
    updateStyles: updateStyles
  });
}

function BlockItem(_a) {
  var block = _a.block,
    isSelected = _a.isSelected,
    isDragging = _a.isDragging,
    onSelect = _a.onSelect,
    onRemove = _a.onRemove,
    onUpdate = _a.onUpdate,
    onDragStart = _a.onDragStart,
    onDragEnd = _a.onDragEnd;
  var _b = useState(false),
    isHovered = _b[0],
    setIsHovered = _b[1];
  return jsxs("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      opacity: isDragging ? 0.5 : 1,
      border: isHovered || isSelected ? 'solid #e1e3e5' : 'solid transparent',
      borderWidth: isHovered ? '1px 0 1px 0' : '1px',
      backgroundColor: isHovered || isSelected ? '#ffffff' : 'transparent',
      transition: 'all 0.15s ease',
      boxShadow: isSelected ? '0 2px 4px rgba(0,0,0,0.1)' : isHovered ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
    },
    children: [jsx(BlockHeader, {
      block: block,
      isSelected: isSelected,
      isHovered: isHovered,
      onSelect: onSelect,
      onRemove: onRemove,
      onDragStart: onDragStart,
      onDragEnd: onDragEnd,
      onMouseEnter: function onMouseEnter() {
        return setIsHovered(true);
      },
      onMouseLeave: function onMouseLeave() {
        return setIsHovered(false);
      }
    }), isSelected && jsx("div", {
      style: {
        borderTop: '1px solid #e1e3e5',
        padding: '16px',
        backgroundColor: '#f8f9fa',
        borderRadius: '0 0 8px 8px'
      },
      children: jsx(EmailBlockSettings, {
        block: block,
        onUpdate: onUpdate
      })
    })]
  });
}

function useDragAndDrop(blocks, onMoveBlock) {
  var _a = useState({
      draggedBlockId: null,
      dragOverIndex: null
    }),
    dragState = _a[0],
    setDragState = _a[1];
  // Drag start handler
  var handleDragStart = useCallback(function (e, blockId) {
    setDragState(function (prev) {
      return __assign(__assign({}, prev), {
        draggedBlockId: blockId
      });
    });
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', blockId);
  }, []);
  // Drag over handler
  var handleDragOver = useCallback(function (e, index) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragState(function (prev) {
      return __assign(__assign({}, prev), {
        dragOverIndex: index
      });
    });
  }, []);
  // Drag leave handler
  var handleDragLeave = useCallback(function () {
    setDragState(function (prev) {
      return __assign(__assign({}, prev), {
        dragOverIndex: null
      });
    });
  }, []);
  // Drop handler
  var handleDrop = useCallback(function (e, dropIndex) {
    e.preventDefault();
    var draggedId = e.dataTransfer.getData('text/plain');
    if (draggedId && draggedId !== dragState.draggedBlockId) return;
    var draggedIndex = blocks.findIndex(function (block) {
      return block.id === draggedId;
    });
    if (draggedIndex === -1 || draggedIndex === dropIndex) return;
    onMoveBlock(draggedIndex, dropIndex);
    setDragState({
      draggedBlockId: null,
      dragOverIndex: null
    });
  }, [blocks, dragState.draggedBlockId, onMoveBlock]);
  // Drag end handler
  var handleDragEnd = useCallback(function () {
    setDragState({
      draggedBlockId: null,
      dragOverIndex: null
    });
  }, []);
  return {
    dragState: dragState,
    handleDragStart: handleDragStart,
    handleDragOver: handleDragOver,
    handleDragLeave: handleDragLeave,
    handleDrop: handleDrop,
    handleDragEnd: handleDragEnd
  };
}

function BlockList(_a) {
  var blocks = _a.blocks,
    selectedBlockId = _a.selectedBlockId,
    onSelectedBlockChange = _a.onSelectedBlockChange,
    onAddBlock = _a.onAddBlock,
    onRemoveBlock = _a.onRemoveBlock,
    onUpdateBlock = _a.onUpdateBlock,
    onMoveBlock = _a.onMoveBlock;
  var _b = useDragAndDrop(blocks, onMoveBlock),
    dragState = _b.dragState,
    handleDragStart = _b.handleDragStart,
    handleDragOver = _b.handleDragOver,
    handleDragLeave = _b.handleDragLeave,
    handleDrop = _b.handleDrop,
    handleDragEnd = _b.handleDragEnd;
  // Close selected block when it's removed
  useEffect(function () {
    if (selectedBlockId && !blocks.find(function (block) {
      return block.id === selectedBlockId;
    })) {
      onSelectedBlockChange(null);
    }
  }, [blocks, selectedBlockId, onSelectedBlockChange]);
  return jsxs("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    },
    children: [jsx(AddBlockZone, {
      position: "top",
      onAddBlock: onAddBlock,
      isDragOver: dragState.dragOverIndex === -1,
      isDragging: !!dragState.draggedBlockId
    }), blocks.map(function (block, index) {
      return jsxs("div", {
        children: [jsx(DropZone, {
          index: index,
          isDragOver: dragState.dragOverIndex === index,
          isDragging: !!dragState.draggedBlockId,
          onDragOver: handleDragOver,
          onDragLeave: handleDragLeave,
          onDrop: handleDrop
        }), jsx(BlockItem, {
          block: block,
          isSelected: selectedBlockId === block.id,
          isDragging: dragState.draggedBlockId === block.id,
          onSelect: function onSelect() {
            return onSelectedBlockChange(selectedBlockId === block.id ? null : block.id);
          },
          onRemove: function onRemove() {
            return onRemoveBlock(block.id);
          },
          onUpdate: function onUpdate(updates) {
            return onUpdateBlock(block.id, updates);
          },
          onDragStart: function onDragStart(e) {
            return handleDragStart(e, block.id);
          },
          onDragEnd: handleDragEnd
        }), jsx(AddBlockZone, {
          position: index,
          onAddBlock: onAddBlock,
          isDragOver: dragState.dragOverIndex === index + 1,
          isDragging: !!dragState.draggedBlockId
        })]
      }, block.id);
    }), jsx("div", {
      onDragOver: function onDragOver(e) {
        return handleDragOver(e, blocks.length);
      },
      onDragLeave: handleDragLeave,
      onDrop: function onDrop(e) {
        return handleDrop(e, blocks.length);
      },
      children: jsx(AddBlockZone, {
        position: "bottom",
        onAddBlock: onAddBlock,
        isDragOver: dragState.dragOverIndex === blocks.length,
        isDragging: !!dragState.draggedBlockId
      })
    })]
  });
}

var VARIABLES = [{
  variable: '{{customer_first_name}}',
  example: 'John',
  description: 'The first name of the customer who placed the order'
}, {
  variable: '{{customer_email}}',
  example: 'john@example.com',
  description: 'The email address of the customer'
}, {
  variable: '{{shop_name}}',
  example: 'My Awesome Store',
  description: 'The name of your Shopify store'
}, {
  variable: '{{shop_logo_url}}',
  example: 'https://cdn.shopify.com/s/files/1/0000/0000/0000/files/logo.png',
  description: 'The URL of your shop logo'
}, {
  variable: '{{order_number}}',
  example: '#1001',
  description: 'The unique order number for this purchase'
}, {
  variable: '{{product_title}}',
  example: 'Wireless Headphones',
  description: 'The title of the product in the order'
}, {
  variable: '{{product_price}}',
  example: '$199.99',
  description: 'The price of the product'
}, {
  variable: '{{shop_domain}}',
  example: 'mystore.myshopify.com',
  description: 'The domain of your Shopify store'
}];

function VariablePanel(_a) {
  var showVariables = _a.showVariables,
    setShowVariables = _a.setShowVariables;
  var _b = useState(null),
    hoveredVariable = _b[0],
    setHoveredVariable = _b[1];
  return jsxs("div", {
    style: {
      position: 'absolute',
      bottom: '0',
      left: '0',
      right: '0',
      backgroundColor: '#ffffff',
      borderTop: '1px solid #e1e3e5',
      zIndex: 1000
    },
    children: [jsxs("div", {
      style: {
        padding: '12px 16px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f8f9fa',
        borderBottom: showVariables ? '1px solid #e1e3e5' : 'none'
      },
      onClick: function onClick() {
        return setShowVariables(!showVariables);
      },
      children: [jsx(Text, {
        as: "span",
        variant: "bodySm",
        fontWeight: "medium",
        children: "Available Variables"
      }), jsx("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: showVariables ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease'
        },
        children: jsx("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 16 16",
          fill: "none",
          children: jsx("path", {
            d: "M4 6L8 10L12 6",
            stroke: "#6b7280",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          })
        })
      })]
    }), showVariables && jsx("div", {
      style: {
        padding: '12px 16px',
        backgroundColor: '#ffffff',
        maxHeight: '200px',
        overflowY: 'auto'
      },
      children: jsx("div", {
        style: {
          fontSize: '12px',
          color: '#6b7280',
          lineHeight: '1.4',
          backgroundColor: '#ffffff'
        },
        children: VARIABLES.map(function (item, index) {
          return jsxs("div", {
            style: {
              marginBottom: index === VARIABLES.length - 1 ? '0' : '8px'
            },
            children: [jsxs("div", {
              style: {
                position: 'relative',
                display: 'inline-block'
              },
              onMouseEnter: function onMouseEnter() {
                return setHoveredVariable(item.variable);
              },
              onMouseLeave: function onMouseLeave() {
                return setHoveredVariable(null);
              },
              children: [jsx("code", {
                style: {
                  cursor: 'help',
                  padding: '2px 2px 4px 2px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '3px',
                  border: '1px solid #e5e7eb',
                  fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                  fontSize: '11px',
                  fontWeight: '500'
                },
                children: item.variable
              }), hoveredVariable === item.variable && jsxs("div", {
                style: {
                  position: 'absolute',
                  bottom: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginBottom: '12px',
                  backgroundColor: '#1f2937',
                  color: '#ffffff',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  zIndex: 1000,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  maxWidth: '250px',
                  whiteSpace: 'normal',
                  textAlign: 'center'
                },
                children: [item.example, jsx("div", {
                  style: {
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '0',
                    height: '0',
                    borderLeft: '6px solid transparent',
                    borderRight: '6px solid transparent',
                    borderTop: '6px solid #1f2937'
                  }
                })]
              })]
            }), jsxs("span", {
              style: {
                color: '#4b5563',
                fontSize: '13px',
                lineHeight: '1.6',
                paddingLeft: '12px',
                textIndent: '-12px',
                display: 'inline'
              },
              children: [": ", item.description]
            })]
          }, item.variable);
        })
      })
    })]
  });
}

var AVAILABLE_LANGUAGES = [{
  value: 'en',
  label: 'English'
}, {
  value: 'vi',
  label: 'Tiếng Việt'
}, {
  value: 'fr',
  label: 'Français'
}, {
  value: 'es',
  label: 'Español'
}, {
  value: 'de',
  label: 'Deutsch'
}, {
  value: 'ja',
  label: '日本語'
}, {
  value: 'ko',
  label: '한국어'
}, {
  value: 'zh',
  label: '中文'
}, {
  value: 'pt',
  label: 'Português'
}, {
  value: 'it',
  label: 'Italiano'
}, {
  value: 'ru',
  label: 'Русский'
}, {
  value: 'ar',
  label: 'العربية'
}, {
  value: 'hi',
  label: 'हिन्दी'
}, {
  value: 'th',
  label: 'ไทย'
}, {
  value: 'nl',
  label: 'Nederlands'
}, {
  value: 'sv',
  label: 'Svenska'
}, {
  value: 'da',
  label: 'Dansk'
}, {
  value: 'no',
  label: 'Norsk'
}, {
  value: 'fi',
  label: 'Suomi'
}, {
  value: 'pl',
  label: 'Polski'
}];

function useBlockManager(blocks, onBlocksChange) {
  // Add new block
  var addBlock = useCallback(function (type, index) {
    var newBlock = __assign({
      id: Date.now().toString()
    }, BLOCK_TEMPLATES[type]);
    var newBlocks = __spreadArray([], blocks, true);
    if (index !== undefined) {
      newBlocks.splice(index, 0, newBlock);
    } else {
      newBlocks.push(newBlock);
    }
    onBlocksChange(newBlocks);
  }, [blocks, onBlocksChange]);
  // Remove block
  var removeBlock = useCallback(function (id) {
    var newBlocks = blocks.filter(function (block) {
      return block.id !== id;
    });
    onBlocksChange(newBlocks);
  }, [blocks, onBlocksChange]);
  // Update block
  var updateBlock = useCallback(function (id, updates) {
    var newBlocks = blocks.map(function (block) {
      return block.id === id ? __assign(__assign({}, block), updates) : block;
    });
    onBlocksChange(newBlocks);
  }, [blocks, onBlocksChange]);
  // Move block (for drag and drop)
  var moveBlock = useCallback(function (fromIndex, toIndex) {
    var newBlocks = __spreadArray([], blocks, true);
    var movedBlock = newBlocks.splice(fromIndex, 1)[0];
    newBlocks.splice(toIndex, 0, movedBlock);
    onBlocksChange(newBlocks);
  }, [blocks, onBlocksChange]);
  return {
    addBlock: addBlock,
    removeBlock: removeBlock,
    updateBlock: updateBlock,
    moveBlock: moveBlock
  };
}

function EmailEditorSidebar(_a) {
  var _b = _a.templates,
    templates = _b === void 0 ? [] : _b,
    selectedBlockId = _a.selectedBlockId,
    showVariables = _a.showVariables,
    onTemplateChange = _a.onTemplateChange,
    onTemplatesUpdate = _a.onTemplatesUpdate,
    onBlocksChange = _a.onBlocksChange,
    onSelectedBlockChange = _a.onSelectedBlockChange,
    setShowVariables = _a.setShowVariables;
  var _c = useState('en'),
    selectedLanguage = _c[0],
    setSelectedLanguage = _c[1];
  // Tìm template hiện tại dựa trên ngôn ngữ được chọn
  var currentTemplate = useMemo(function () {
    return templates.find(function (template) {
      return template.locale === selectedLanguage;
    });
  }, [templates, selectedLanguage]);
  var _d = useBlockManager(currentTemplate === null || currentTemplate === void 0 ? void 0 : currentTemplate.blocks, onBlocksChange),
    addBlock = _d.addBlock,
    removeBlock = _d.removeBlock,
    updateBlock = _d.updateBlock,
    moveBlock = _d.moveBlock;
  var _e = useState(false),
    showAddLanguageForm = _e[0],
    setShowAddLanguageForm = _e[1];
  var _f = useState(''),
    selectedNewLanguage = _f[0],
    setSelectedNewLanguage = _f[1];
  // Lấy danh sách ngôn ngữ có sẵn từ templates
  var availableLanguages = useMemo(function () {
    var templateLocales = new Set(templates.map(function (template) {
      return template.locale;
    }));
    var filteredLanguages = AVAILABLE_LANGUAGES.filter(function (lang) {
      return templateLocales.has(lang.value);
    });
    if (!templateLocales.has('en')) {
      filteredLanguages.unshift({
        value: 'en',
        label: 'English'
      });
    }
    return filteredLanguages;
  }, [templates]);
  // Effect để cập nhật blocks khi thay đổi template hoặc ngôn ngữ
  useEffect(function () {
    onSelectedBlockChange(null);
    if (currentTemplate) {
      if (onTemplateChange) {
        onTemplateChange(currentTemplate);
      }
      if (currentTemplate.blocks && Array.isArray(currentTemplate.blocks) && currentTemplate.blocks.length > 0) {
        onBlocksChange(currentTemplate.blocks);
      } else {
        onBlocksChange(initialBlocks);
      }
    } else {
      onBlocksChange(initialBlocks);
    }
  }, [currentTemplate, onTemplateChange, onBlocksChange, selectedLanguage, onSelectedBlockChange]);
  // Lấy danh sách ngôn ngữ chưa có template
  var getAvailableLanguagesForSelection = useCallback(function () {
    var existingLanguageCodes = availableLanguages.map(function (lang) {
      return lang.value;
    });
    return AVAILABLE_LANGUAGES.filter(function (lang) {
      return !existingLanguageCodes.includes(lang.value);
    });
  }, [availableLanguages]);
  var handleLanguageChange = useCallback(function (value) {
    setSelectedLanguage(value);
  }, []);
  var handleAddLanguage = useCallback(function () {
    if (selectedNewLanguage) {
      var languageToAdd = AVAILABLE_LANGUAGES.find(function (lang) {
        return lang.value === selectedNewLanguage;
      });
      if (languageToAdd) {
        var englishTemplate = templates.find(function (template) {
          return template.locale === 'en';
        });
        var newTemplate = {
          name: "Template ".concat(languageToAdd.label),
          content: (englishTemplate === null || englishTemplate === void 0 ? void 0 : englishTemplate.content) || '',
          locale: languageToAdd.value,
          type: 'email',
          engine: 'liquid',
          is_active: true,
          blocks: (englishTemplate === null || englishTemplate === void 0 ? void 0 : englishTemplate.blocks) ? __spreadArray([], englishTemplate.blocks, true) : undefined
        };
        var updatedTemplates = __spreadArray(__spreadArray([], templates, true), [newTemplate], false);
        // Cập nhật templates ngay lập tức để availableLanguages được tính toán lại
        if (onTemplatesUpdate) {
          onTemplatesUpdate(updatedTemplates);
        }
        // Chuyển sang ngôn ngữ vừa thêm
        setSelectedLanguage(languageToAdd.value);
        setSelectedNewLanguage('');
        setShowAddLanguageForm(false);
        // Gọi callback template change với template mới
        if (onTemplateChange) {
          onTemplateChange(newTemplate);
        }
      }
    }
  }, [selectedNewLanguage, templates, onTemplateChange, onTemplatesUpdate]);
  // Tạo options cho language selector với option "Add new language"
  var languageOptions = __spreadArray(__spreadArray([], availableLanguages.map(function (lang) {
    return {
      label: lang.label,
      value: lang.value
    };
  }), true), [{
    label: '+ Add new language',
    value: 'add_new'
  }], false);
  var handleLanguageSelectChange = useCallback(function (value) {
    if (value === 'add_new') {
      setShowAddLanguageForm(true);
    } else {
      handleLanguageChange(value);
    }
  }, [handleLanguageChange]);
  var handleFormClose = useCallback(function () {
    setShowAddLanguageForm(false);
    setSelectedNewLanguage('');
  }, []);
  return jsxs("div", {
    style: {
      width: '320px',
      borderRight: '1px solid #e1e3e5',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      position: 'relative'
    },
    children: [jsxs("div", {
      style: {
        flex: 1,
        paddingBottom: '60px',
        overflowY: 'auto'
      },
      children: [jsxs(Box, {
        padding: '400',
        width: "100%",
        children: [jsx(Box, {
          width: "100%",
          children: jsxs(InlineStack, {
            align: "space-between",
            blockAlign: "center",
            gap: "200",
            children: [jsx(Text, {
              as: "h3",
              variant: "headingSm",
              children: "Settings"
            }), jsx("div", {
              style: {
                minWidth: '150px'
              },
              children: jsx(Select, {
                label: "",
                options: languageOptions,
                value: selectedLanguage,
                onChange: handleLanguageSelectChange,
                placeholder: "Select language"
              })
            })]
          })
        }), showAddLanguageForm && jsxs("div", {
          style: {
            marginTop: '12px',
            padding: '12px',
            border: '1px solid #e1e3e5',
            borderRadius: '8px',
            backgroundColor: '#f9fafb'
          },
          children: [jsx("div", {
            children: jsx(Select, {
              label: "Select Language",
              options: getAvailableLanguagesForSelection().map(function (lang) {
                return {
                  label: lang.label,
                  value: lang.value
                };
              }),
              onChange: setSelectedNewLanguage,
              value: selectedNewLanguage,
              placeholder: "Choose a language to add"
            })
          }), jsxs("div", {
            style: {
              marginTop: '12px',
              display: 'flex',
              gap: '8px'
            },
            children: [jsx(Button, {
              variant: "primary",
              onClick: handleAddLanguage,
              disabled: !selectedNewLanguage,
              size: "slim",
              children: "Add Language"
            }), jsx(Button, {
              onClick: handleFormClose,
              size: "slim",
              children: "Cancel"
            })]
          })]
        })]
      }), jsx(BlockList, {
        blocks: currentTemplate === null || currentTemplate === void 0 ? void 0 : currentTemplate.blocks,
        selectedBlockId: selectedBlockId,
        onSelectedBlockChange: onSelectedBlockChange,
        onAddBlock: addBlock,
        onRemoveBlock: removeBlock,
        onUpdateBlock: updateBlock,
        onMoveBlock: moveBlock
      })]
    }), jsx(VariablePanel, {
      showVariables: showVariables,
      setShowVariables: setShowVariables
    })]
  });
}

function HeaderBlockRenderer(_a) {
  var block = _a.block,
    replaceVariables = _a.replaceVariables;
  var content = block.content,
    styles = block.styles;
  return jsx("div", {
    style: {
      backgroundColor: styles.backgroundColor || '#ffffff',
      padding: styles.padding || '32px 24px',
      textAlign: styles.textAlign || 'center'
    },
    children: content.showLogo && jsxs(Fragment, {
      children: [jsx("img", {
        src: replaceVariables(content.logoUrl || '{{shop_logo_url}}'),
        alt: replaceVariables(content.shopName || '{{shop_name}}'),
        style: {
          maxHeight: '60px',
          maxWidth: '200px',
          height: 'auto',
          width: 'auto'
        },
        onError: function onError(e) {
          var target = e.target;
          target.style.display = 'none';
          var fallback = target.nextElementSibling;
          if (fallback) fallback.style.display = 'inline-block';
        }
      }), jsx("div", {
        style: {
          display: 'none',
          padding: '12px 24px',
          backgroundColor: '#6366f1',
          color: 'white',
          borderRadius: '6px',
          fontWeight: 'bold',
          fontSize: '18px'
        },
        children: replaceVariables(content.shopName || '{{shop_name}}')
      })]
    })
  });
}

function TextBlockRenderer(_a) {
  var block = _a.block,
    replaceVariables = _a.replaceVariables;
  var content = block.content,
    styles = block.styles;
  return jsx("div", {
    style: {
      fontSize: styles.fontSize || '16px',
      color: styles.color || '#333333',
      textAlign: styles.textAlign || 'left',
      padding: styles.padding || '16px 24px',
      lineHeight: '1.6',
      whiteSpace: 'pre-wrap'
    },
    children: content.variables ? replaceVariables(content.text) : content.text
  });
}

function ImageBlockRenderer(_a) {
  var block = _a.block,
    replaceVariables = _a.replaceVariables;
  var content = block.content,
    styles = block.styles;
  return jsx("div", {
    style: {
      padding: styles.padding || '16px 24px',
      textAlign: styles.textAlign || 'center'
    },
    children: content.link ? jsx("a", {
      href: replaceVariables(content.link),
      style: {
        display: 'inline-block'
      },
      children: jsx("img", {
        src: replaceVariables(content.src),
        alt: content.alt || 'Image',
        style: {
          width: styles.width || '100%',
          maxWidth: styles.maxWidth || '600px',
          height: 'auto',
          borderRadius: styles.borderRadius || '0px'
        }
      })
    }) : jsx("img", {
      src: replaceVariables(content.src),
      alt: content.alt || 'Image',
      style: {
        width: styles.width || '100%',
        maxWidth: styles.maxWidth || '600px',
        height: 'auto',
        borderRadius: styles.borderRadius || '0px'
      }
    })
  });
}

function ButtonBlockRenderer(_a) {
  var block = _a.block,
    replaceVariables = _a.replaceVariables;
  var content = block.content,
    styles = block.styles;
  return jsx("div", {
    style: {
      textAlign: styles.textAlign || 'center',
      margin: styles.margin || '16px 24px'
    },
    children: jsx("a", {
      href: content.variables ? replaceVariables(content.link) : content.link,
      style: {
        display: 'inline-block',
        backgroundColor: styles.backgroundColor || '#007ace',
        color: styles.color || '#ffffff',
        textDecoration: 'none',
        padding: styles.padding || '14px 32px',
        borderRadius: styles.borderRadius || '6px',
        fontWeight: 'bold',
        fontSize: '16px'
      },
      children: content.variables ? replaceVariables(content.text) : content.text
    })
  });
}

function ProductBlockRenderer(_a) {
  var block = _a.block,
    replaceVariables = _a.replaceVariables;
  var content = block.content,
    styles = block.styles;
  return jsx("div", {
    style: {
      backgroundColor: styles.backgroundColor || '#f9f9f9',
      border: styles.border || '1px solid #e1e3e5',
      borderRadius: styles.borderRadius || '8px',
      padding: styles.padding || '20px',
      margin: styles.margin || '16px 24px'
    },
    children: jsxs("div", {
      style: {
        display: 'flex',
        gap: '16px',
        alignItems: 'center'
      },
      children: [content.showImage && jsx("div", {
        style: {
          width: '80px',
          height: '80px',
          backgroundColor: '#e1e3e5',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px'
        },
        children: "\uD83D\uDCE6"
      }), jsxs("div", {
        style: {
          flex: 1
        },
        children: [jsx("div", {
          style: {
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#333333',
            marginBottom: content.showPrice ? '4px' : '0'
          },
          children: replaceVariables('{{product_name}}')
        }), content.showPrice && jsx("div", {
          style: {
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#007ace'
          },
          children: replaceVariables('{{product_price}}')
        }), content.showDescription && jsx("div", {
          style: {
            fontSize: '14px',
            color: '#6d7175',
            marginTop: '8px'
          },
          children: replaceVariables('{{product_description}}')
        })]
      })]
    })
  });
}

function DividerBlockRenderer(_a) {
  var block = _a.block;
  var styles = block.styles;
  return jsx("div", {
    style: {
      margin: styles.margin || '24px 0',
      padding: '0 24px'
    },
    children: jsx("hr", {
      style: {
        border: 'none',
        borderTop: "1px solid ".concat(styles.borderColor || '#e1e3e5'),
        margin: 0
      }
    })
  });
}

function SpacerBlockRenderer(_a) {
  var block = _a.block;
  var styles = block.styles;
  return jsx("div", {
    style: {
      height: styles.height || '32px'
    }
  });
}

function FooterBlockRenderer(_a) {
  var block = _a.block,
    replaceVariables = _a.replaceVariables;
  var content = block.content,
    styles = block.styles;
  return jsxs("div", {
    style: {
      backgroundColor: styles.backgroundColor || '#f6f6f7',
      color: styles.color || '#6d7175',
      fontSize: styles.fontSize || '14px',
      textAlign: styles.textAlign || 'center',
      padding: styles.padding || '24px',
      lineHeight: '1.4'
    },
    children: [jsx("div", {
      style: {
        marginBottom: '8px'
      },
      children: replaceVariables(content.text || '© 2024 {{shop_name}}. All rights reserved.')
    }), content.unsubscribeText && jsx("div", {
      style: {
        fontSize: '12px',
        color: '#999999'
      },
      children: jsx("a", {
        href: "#",
        style: {
          color: '#999999'
        },
        children: content.unsubscribeText
      })
    }), content.showSocial && jsx("div", {
      style: {
        marginTop: '16px'
      },
      children: jsx("span", {
        style: {
          fontSize: '12px'
        },
        children: "Follow us on social media"
      })
    })]
  });
}

function EmailBlockRenderer(_a) {
  var blocks = _a.blocks,
    replaceVariables = _a.replaceVariables,
    _b = _a.selectedBlockId,
    selectedBlockId = _b === void 0 ? null : _b;
  return jsxs("div", {
    style: {
      backgroundColor: '#f6f6f7',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    children: [jsx("div", {
      style: {
        backgroundColor: '#f8f9fa',
        padding: '12px',
        maxWidth: '600px',
        margin: '0 auto',
        borderRadius: '8px 8px 0 0'
      },
      children: jsxs("div", {
        style: {
          fontSize: '13px',
          color: '#6d7175',
          lineHeight: '1.6'
        },
        children: [jsxs("div", {
          style: {
            marginBottom: '6px'
          },
          children: [jsx("strong", {
            children: "From:"
          }), " ", replaceVariables('{{shop_name}}'), " <noreply@", replaceVariables('{{shop_domain}}'), " >"]
        }), jsxs("div", {
          style: {
            marginBottom: '6px'
          },
          children: [jsx("strong", {
            children: "To:"
          }), " ", replaceVariables('{{customer_email}}')]
        }), jsxs("div", {
          children: [jsx("strong", {
            children: "Subject:"
          }), " ", replaceVariables('Your order update')]
        })]
      })
    }), jsx("div", {
      style: {
        backgroundColor: '#ffffff',
        maxWidth: '600px',
        margin: '0 auto',
        borderRadius: '0 0 8px 8px',
        overflow: 'hidden'
      },
      children: blocks.map(function (block, index) {
        return jsx("div", {
          style: {
            marginBottom: index < blocks.length - 1 ? '20px' : '0',
            position: 'relative',
            outline: selectedBlockId === block.id ? '2px solid #007ace' : 'none',
            outlineOffset: selectedBlockId === block.id ? '2px' : '0',
            transition: 'outline 0.2s ease'
          },
          children: jsx(BlockComponent, {
            block: block,
            replaceVariables: replaceVariables
          })
        }, block.id);
      })
    })]
  });
}
// Individual Block Component
function BlockComponent(_a) {
  var block = _a.block,
    replaceVariables = _a.replaceVariables;
  // Handle each block type explicitly to ensure proper typing
  switch (block.type) {
    case 'header':
      return jsx(HeaderBlockRenderer, {
        block: block,
        replaceVariables: replaceVariables
      });
    case 'text':
      return jsx(TextBlockRenderer, {
        block: block,
        replaceVariables: replaceVariables
      });
    case 'image':
      return jsx(ImageBlockRenderer, {
        block: block,
        replaceVariables: replaceVariables
      });
    case 'button':
      return jsx(ButtonBlockRenderer, {
        block: block,
        replaceVariables: replaceVariables
      });
    case 'product':
      return jsx(ProductBlockRenderer, {
        block: block,
        replaceVariables: replaceVariables
      });
    case 'footer':
      return jsx(FooterBlockRenderer, {
        block: block,
        replaceVariables: replaceVariables
      });
    case 'divider':
      return jsx(DividerBlockRenderer, {
        block: block
      });
    case 'spacer':
      return jsx(SpacerBlockRenderer, {
        block: block
      });
    default:
      return null;
  }
}

function EmailPreviewPanel(_a) {
  var blocks = _a.blocks,
    selectedBlockId = _a.selectedBlockId,
    replaceVariables = _a.replaceVariables;
  return jsxs("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f6f6f7'
    },
    children: [jsx("div", {
      style: {
        padding: '16px 20px',
        borderBottom: '1px solid #e1e3e5',
        backgroundColor: '#ffffff'
      },
      children: jsx(Text, {
        as: "h3",
        variant: "headingSm",
        children: "Email Preview"
      })
    }), jsx("div", {
      style: {
        flex: 1,
        padding: '20px',
        overflowY: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start'
      },
      children: blocks.length > 0 ? jsx("div", {
        style: {
          width: '100%',
          maxWidth: '600px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          border: '1px solid #e1e3e5',
          overflow: 'hidden',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        },
        children: jsx(EmailBlockRenderer, {
          blocks: blocks,
          replaceVariables: replaceVariables,
          selectedBlockId: selectedBlockId
        })
      }) : jsxs("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '400px',
          flexDirection: 'column',
          gap: '16px',
          color: '#6d7175'
        },
        children: [jsx("div", {
          style: {
            fontSize: '64px'
          },
          children: "\uD83D\uDCE7"
        }), jsxs("div", {
          style: {
            textAlign: 'center'
          },
          children: [jsx("div", {
            style: {
              fontSize: '18px',
              marginBottom: '8px',
              fontWeight: 'bold'
            },
            children: "Email Preview"
          }), jsx("div", {
            style: {
              fontSize: '14px'
            },
            children: "Add blocks to see your email template"
          })]
        })]
      })
    })]
  });
}

function EmailEditorLayout(_a) {
  var _b = _a.templates,
    templates = _b === void 0 ? [] : _b,
    selectedBlockId = _a.selectedBlockId,
    showVariables = _a.showVariables,
    onBlocksChange = _a.onBlocksChange,
    onSelectedBlockChange = _a.onSelectedBlockChange,
    setShowVariables = _a.setShowVariables,
    onTemplateChange = _a.onTemplateChange,
    onTemplatesUpdate = _a.onTemplatesUpdate;
  // State để theo dõi template hiện tại
  var _c = useState(templates[0]),
    currentTemplate = _c[0],
    setCurrentTemplate = _c[1];
  // Helper function to replace variables with example values
  var replaceVariables = useCallback(function (text) {
    var result = text;
    VARIABLES.forEach(function (variable) {
      result = result.replace(new RegExp(variable.variable.replace(/[{}]/g, '\\$&'), 'g'), variable.example);
    });
    return result;
  }, []);
  // Callback để xử lý khi template thay đổi từ sidebar
  var handleTemplateChange = useCallback(function (template) {
    setCurrentTemplate(template);
    if (onTemplateChange) {
      onTemplateChange(template);
    }
  }, [onTemplateChange]);
  return jsxs("div", {
    style: {
      display: 'flex',
      height: '100vh'
    },
    children: [jsx(EmailEditorSidebar, {
      templates: templates,
      onTemplateChange: handleTemplateChange,
      onTemplatesUpdate: onTemplatesUpdate,
      onBlocksChange: onBlocksChange,
      selectedBlockId: selectedBlockId,
      onSelectedBlockChange: onSelectedBlockChange,
      showVariables: showVariables,
      setShowVariables: setShowVariables
    }), jsx(EmailPreviewPanel, {
      blocks: currentTemplate === null || currentTemplate === void 0 ? void 0 : currentTemplate.blocks,
      selectedBlockId: selectedBlockId,
      replaceVariables: replaceVariables
    })]
  });
}

function EmailEditorEmptyState(_a) {
  var onCreateTemplate = _a.onCreateTemplate,
    templateName = _a.templateName;
  var getTemplateName = function getTemplateName(name) {
    if (!name) return 'Email Template';
    if (name.includes('back-to-stock')) return 'Back to Stock Email';
    if (name.includes('confirmation')) return 'Confirmation Email';
    return 'Email Template';
  };
  var getTemplateDescription = function getTemplateDescription(name) {
    if (!name) return 'Create a new email template with customizable blocks';
    if (name.includes('back-to-stock')) return 'Notify customers when out-of-stock products are available again';
    if (name.includes('confirmation')) return 'Send confirmation emails to customers for their orders or subscriptions';
    return 'Create a new email template with customizable blocks';
  };
  return jsxs("div", {
    style: {
      display: 'flex',
      height: '100vh'
    },
    children: [jsxs("div", {
      style: {
        width: '320px',
        borderRight: '1px solid #e1e3e5',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        position: 'relative'
      },
      children: [jsx(Box, {
        padding: '400',
        children: jsx(Text, {
          as: "h3",
          variant: "headingSm",
          tone: "subdued",
          children: "Template Blocks"
        })
      }), jsx("div", {
        style: {
          flex: 1,
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
        children: jsxs(BlockStack, {
          gap: "300",
          align: "center",
          children: [jsx("div", {
            style: {
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#f6f6f7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            },
            children: jsx(SvgEmailIcon, {})
          }), jsxs(BlockStack, {
            gap: "100",
            align: "center",
            children: [jsx(Text, {
              as: "p",
              variant: "bodyMd",
              tone: "subdued",
              alignment: "center",
              children: "No blocks yet"
            }), jsx(Text, {
              as: "p",
              variant: "bodySm",
              tone: "subdued",
              alignment: "center",
              children: "Create your first template to get started"
            })]
          })]
        })
      })]
    }), jsxs("div", {
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f6f6f7'
      },
      children: [jsx("div", {
        style: {
          padding: '16px 20px',
          borderBottom: '1px solid #e1e3e5',
          backgroundColor: '#ffffff'
        },
        children: jsx(Text, {
          as: "h3",
          variant: "headingSm",
          tone: "subdued",
          children: "Email Preview"
        })
      }), jsx("div", {
        style: {
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        },
        children: jsx("div", {
          style: {
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '48px',
            textAlign: 'center',
            maxWidth: '500px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          },
          children: jsxs(BlockStack, {
            gap: "500",
            align: "center",
            children: [jsx("div", {
              style: {
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#f0f8ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #007ace'
              },
              children: jsx("div", {
                style: {
                  fontSize: '32px',
                  color: '#007ace'
                },
                children: jsx(SvgEmailIcon, {})
              })
            }), jsxs(BlockStack, {
              gap: "300",
              align: "center",
              children: [jsx(Text, {
                as: "h2",
                variant: "headingLg",
                children: getTemplateName(templateName)
              }), jsx(Text, {
                as: "p",
                variant: "bodyMd",
                tone: "subdued",
                alignment: "center",
                children: getTemplateDescription(templateName)
              })]
            }), jsx("div", {
              style: {
                width: '100%'
              },
              children: jsxs(BlockStack, {
                gap: "200",
                children: [jsx(Text, {
                  as: "h4",
                  variant: "headingSm",
                  alignment: "center",
                  children: "What you can create:"
                }), jsx("div", {
                  style: {
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                    textAlign: 'left'
                  },
                  children: ['Header with logo', 'Custom text blocks', 'Product showcases', 'Call-to-action buttons', 'Footer information', 'Dynamic variables'].map(function (feature, index) {
                    return jsxs("div", {
                      style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      },
                      children: [jsx("div", {
                        style: {
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: '#007ace'
                        }
                      }), jsx(Text, {
                        as: "span",
                        variant: "bodySm",
                        children: feature
                      })]
                    }, index);
                  })
                })]
              })
            }), jsx(Button, {
              variant: "primary",
              size: "large",
              icon: SvgPlusCircleIcon,
              onClick: onCreateTemplate,
              children: "Create Template"
            }), jsx(Text, {
              as: "p",
              variant: "bodySm",
              tone: "subdued",
              alignment: "center",
              children: "You can always customize and modify your template later"
            })]
          })
        })
      })]
    })]
  });
}

function EmailEditorErrorState(_a) {
  var handleTryAgain = _a.handleTryAgain,
    templateName = _a.templateName;
  return jsxs(BlockStack, {
    children: [jsx(Text, {
      as: "h2",
      variant: "heading2xl",
      children: "Template not found"
    }), jsx(Text, {
      as: "p",
      variant: "bodyLg",
      children: "We couldn't load the template you're looking for. This might be due to a temporary issue or the template may no longer be available."
    }), jsx(Button, {
      variant: "primary",
      onClick: function onClick() {
        return handleTryAgain(templateName);
      },
      children: "Try again"
    })]
  });
}

function EmailEditorSkeleton(_a) {
  _a.showPreview;
  return jsxs("div", {
    style: {
      display: 'flex',
      height: '100vh'
    },
    children: [jsxs("div", {
      style: {
        width: '320px',
        borderRight: '1px solid #e1e3e5',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        position: 'relative'
      },
      children: [jsx(Box, {
        padding: '400',
        children: jsx("div", {
          style: {
            height: '20px',
            backgroundColor: '#f6f6f7',
            borderRadius: '4px',
            width: '80px'
          }
        })
      }), jsx("div", {
        style: {
          flex: 1,
          padding: '0 16px',
          paddingBottom: '60px',
          overflowY: 'auto'
        },
        children: jsx(BlockStack, {
          gap: "200",
          children: [1, 2, 3, 4, 5].map(function (index) {
            return jsx("div", {
              style: {
                padding: '12px',
                border: '1px solid #e1e3e5',
                borderRadius: '8px',
                backgroundColor: '#ffffff'
              },
              children: jsxs(InlineStack, {
                align: "space-between",
                blockAlign: "center",
                children: [jsxs(InlineStack, {
                  gap: "200",
                  blockAlign: "center",
                  children: [jsx("div", {
                    style: {
                      width: '16px',
                      height: '16px',
                      backgroundColor: '#f6f6f7',
                      borderRadius: '2px'
                    }
                  }), jsx("div", {
                    style: {
                      height: '16px',
                      backgroundColor: '#f6f6f7',
                      borderRadius: '4px',
                      width: "".concat(60 + Math.random() * 40, "px")
                    }
                  })]
                }), jsx("div", {
                  style: {
                    width: '16px',
                    height: '16px',
                    backgroundColor: '#f6f6f7',
                    borderRadius: '2px'
                  }
                })]
              })
            }, index);
          })
        })
      }), jsx("div", {
        style: {
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          backgroundColor: '#ffffff',
          borderTop: '1px solid #e1e3e5',
          padding: '16px'
        },
        children: jsxs(BlockStack, {
          gap: "200",
          children: [jsxs(InlineStack, {
            align: "space-between",
            blockAlign: "center",
            children: [jsx("div", {
              style: {
                height: '16px',
                backgroundColor: '#f6f6f7',
                borderRadius: '4px',
                width: '80px'
              }
            }), jsx("div", {
              style: {
                width: '16px',
                height: '16px',
                backgroundColor: '#f6f6f7',
                borderRadius: '2px'
              }
            })]
          }), jsx("div", {
            style: {
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px'
            },
            children: [1, 2, 3, 4].map(function (index) {
              return jsx("div", {
                style: {
                  height: '24px',
                  backgroundColor: '#f6f6f7',
                  borderRadius: '4px',
                  border: '1px solid #e1e3e5'
                }
              }, index);
            })
          })]
        })
      })]
    }), jsxs("div", {
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f6f6f7'
      },
      children: [jsx("div", {
        style: {
          padding: '16px 20px',
          borderBottom: '1px solid #e1e3e5',
          backgroundColor: '#ffffff'
        },
        children: jsx("div", {
          style: {
            height: '20px',
            backgroundColor: '#f6f6f7',
            borderRadius: '4px',
            width: '120px'
          }
        })
      }), jsx("div", {
        style: {
          flex: 1,
          padding: '20px',
          overflowY: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start'
        },
        children: jsx("div", {
          style: {
            width: '100%',
            maxWidth: '600px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e1e3e5',
            overflow: 'hidden',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          },
          children: jsx("div", {
            style: {
              padding: '24px'
            },
            children: jsxs(BlockStack, {
              gap: "400",
              children: [jsx("div", {
                style: {
                  textAlign: 'center',
                  paddingBottom: '16px',
                  borderBottom: '1px solid #e1e3e5'
                },
                children: jsx("div", {
                  style: {
                    height: '32px',
                    backgroundColor: '#f6f6f7',
                    borderRadius: '4px',
                    width: '200px',
                    margin: '0 auto'
                  }
                })
              }), jsxs("div", {
                children: [jsx(SkeletonDisplayText, {
                  size: "small"
                }), jsx("div", {
                  style: {
                    marginTop: '8px'
                  },
                  children: jsx(SkeletonBodyText, {
                    lines: 3
                  })
                })]
              }), jsx("div", {
                style: {
                  border: '1px solid #e1e3e5',
                  borderRadius: '8px',
                  padding: '16px'
                },
                children: jsxs(InlineStack, {
                  gap: "300",
                  children: [jsx("div", {
                    style: {
                      width: '80px',
                      height: '80px',
                      backgroundColor: '#f6f6f7',
                      borderRadius: '6px'
                    }
                  }), jsx("div", {
                    style: {
                      flex: 1
                    },
                    children: jsxs(BlockStack, {
                      gap: "200",
                      children: [jsx("div", {
                        style: {
                          height: '20px',
                          backgroundColor: '#f6f6f7',
                          borderRadius: '4px',
                          width: '70%'
                        }
                      }), jsx(SkeletonBodyText, {
                        lines: 2
                      }), jsx("div", {
                        style: {
                          height: '16px',
                          backgroundColor: '#f6f6f7',
                          borderRadius: '4px',
                          width: '40%'
                        }
                      })]
                    })
                  })]
                })
              }), jsx("div", {
                style: {
                  display: 'flex',
                  justifyContent: 'center'
                },
                children: jsx("div", {
                  style: {
                    height: '44px',
                    backgroundColor: '#f6f6f7',
                    borderRadius: '6px',
                    width: '150px'
                  }
                })
              }), jsx("div", {
                style: {
                  borderTop: '1px solid #e1e3e5',
                  paddingTop: '16px',
                  textAlign: 'center'
                },
                children: jsx(SkeletonBodyText, {
                  lines: 2
                })
              })]
            })
          })
        })
      })]
    })]
  });
}

function useTemplateLoader() {
  var _a = useState(),
    templates = _a[0],
    setTemplates = _a[1];
  var _b = useState(null),
    template = _b[0],
    setTemplate = _b[1];
  var _c = useState(false),
    loading = _c[0],
    setLoading = _c[1];
  var _d = useState(null),
    error = _d[0],
    setError = _d[1];
  var fetcher = useFetcher();
  // load template
  var loadTemplate = useCallback(function (templateName) {
    setLoading(true);
    setError(null);
    var searchParams = new URLSearchParams({
      name: templateName
    });
    var url = "/api/templates/search?".concat(searchParams.toString());
    fetcher.load(url);
  }, [fetcher]);
  //save template
  var saveTemplate = useCallback(function (templateData) {
    setLoading(true);
    setError(null);
    var formData = new FormData();
    Object.entries(templateData).forEach(function (_a) {
      var key = _a[0],
        value = _a[1];
      formData.append(key, String(value));
    });
    fetcher.submit(formData, {
      method: 'POST',
      action: '/api/templates'
    });
  }, [fetcher]);
  // clear template
  var clearTemplate = useCallback(function () {
    setTemplate(null);
    setError(null);
    setLoading(false);
  }, []);
  // update templates manually
  var updateTemplates = useCallback(function (newTemplates) {
    setTemplates(newTemplates);
  }, []);
  // select tempalte
  var selectTemplate = useCallback(function (template) {
    setTemplate(template);
  }, []);
  // Handle fetcher state changes
  useEffect(function () {
    if (fetcher.state === 'loading') {
      setLoading(true);
    }
    if (fetcher.state === 'idle') {
      setLoading(false);
      var response = fetcher.data;
      if (!response) {
        return;
      }
      if (!response.success) {
        setError(response.error);
      }
      if (response && Array.isArray(response.data) && response.data.length > 0) {
        var templates_1 = response.data;
        templates_1[0];
        setTemplates(templates_1);
        setTemplate(templates_1[0]);
      } else {
        setTemplates(undefined);
        setTemplate(null);
      }
    }
  }, [fetcher.state, fetcher.data]);
  return {
    templates: templates,
    template: template,
    loading: loading,
    error: error,
    loadTemplate: loadTemplate,
    saveTemplate: saveTemplate,
    clearTemplate: clearTemplate,
    updateTemplates: updateTemplates,
    selectTemplate: selectTemplate
  };
}

function EmailTemplateEditor(_a) {
  var isOpen = _a.isOpen,
    templateName = _a.templateName,
    propInitialBlocks = _a.initialBlocks,
    _b = _a.autoLoadTemplate,
    autoLoadTemplate = _b === void 0 ? true : _b,
    onClose = _a.onClose,
    onSave = _a.onSave,
    onSettingsChange = _a.onSettingsChange;
  // Template loader
  var templateLoader = useTemplateLoader();
  var _c = useState(false),
    isTemplateLoaded = _c[0],
    setIsTemplateLoaded = _c[1];
  var _d = useState(propInitialBlocks || initialBlocks),
    blocks = _d[0],
    setBlocks = _d[1];
  var _e = useState(null),
    selectedBlockId = _e[0],
    setSelectedBlockId = _e[1];
  var _f = useState(false),
    showVariables = _f[0],
    setShowVariables = _f[1];
  // Load template when modal opens
  useEffect(function () {
    if (isOpen && templateName && !isTemplateLoaded && autoLoadTemplate) {
      templateLoader.loadTemplate(templateName);
      setIsTemplateLoaded(true);
    }
  }, [isOpen, templateName, isTemplateLoaded, templateLoader, autoLoadTemplate]);
  // Update blocks when template blocks are loaded
  useEffect(function () {
    if (templateLoader.template) {
      setBlocks(templateLoader.template.blocks);
    }
  }, [templateLoader.template]);
  // Update blocks when prop initialBlocks change
  useEffect(function () {
    if (propInitialBlocks) {
      setBlocks(propInitialBlocks);
    }
  }, [propInitialBlocks]);
  // Reset state when modal closes
  useEffect(function () {
    if (!isOpen) {
      setIsTemplateLoaded(false);
      templateLoader.clearTemplate();
      setSelectedBlockId(null);
      setShowVariables(false);
    }
  }, [isOpen, templateLoader]);
  // Handle creating default template
  var handleCreateDefaultTemplate = function handleCreateDefaultTemplate() {
    setBlocks(propInitialBlocks || initialBlocks);
  };
  var handleTryAgain = function handleTryAgain(templateName) {
    templateLoader.loadTemplate(templateName);
  };
  // Handle save
  var handleSave = function handleSave() {
    if (templateLoader.template && templateLoader.template.id) {
      templateLoader.template.blocks = blocks;
      templateLoader.saveTemplate(templateLoader.template);
    }
    onSave(blocks);
  };
  // Handle blocks change
  var handleBlocksChange = function handleBlocksChange(newBlocks) {
    setBlocks(newBlocks);
    // Notify parent of settings changes if callback provided
    if (onSettingsChange) {
      onSettingsChange({
        blocks: newBlocks
      });
    }
  };
  // Select template
  var onTemplateChange = function onTemplateChange(template) {
    templateLoader.selectTemplate(template);
    console.log('Template changed:', template);
  };
  // Add or remove template when choose language
  var onTemplatesUpdate = function onTemplatesUpdate(newTemplates) {
    templateLoader.updateTemplates(newTemplates);
  };
  // Determine modal content based on state
  var getModalContent = function getModalContent() {
    if (templateLoader.loading && !templateLoader.template) {
      return jsx(EmailEditorSkeleton, {
        showPreview: true
      });
    }
    if (!templateLoader.loading && !templateLoader.error && !templateLoader.template && isTemplateLoaded) {
      return jsx(EmailEditorEmptyState, {
        templateName: templateName,
        onCreateTemplate: handleCreateDefaultTemplate
      });
    }
    if (templateLoader.error) {
      return jsx(EmailEditorErrorState, {
        templateName: templateName || '',
        handleTryAgain: handleTryAgain
      });
    }
    return jsx(EmailEditorLayout, {
      templates: templateLoader.templates,
      onBlocksChange: handleBlocksChange,
      selectedBlockId: selectedBlockId,
      onSelectedBlockChange: setSelectedBlockId,
      showVariables: showVariables,
      setShowVariables: setShowVariables,
      onTemplateChange: onTemplateChange,
      onTemplatesUpdate: onTemplatesUpdate
    });
  };
  // Determine modal title based on state
  var getModalTitle = function getModalTitle() {
    if (templateLoader.loading) {
      return "Loading Template...";
    }
    if (!templateLoader.loading && !templateLoader.error && !templateLoader.template && isTemplateLoaded) {
      return "Create Email Template";
    }
    if (templateLoader.error) {
      return "Error Loading Template";
    }
    return "Email Template Builder";
  };
  // Determine title bar actions based on state
  var getTitleBarActions = function getTitleBarActions() {
    if (!templateLoader.loading && !templateLoader.error && !(!templateLoader.template && isTemplateLoaded)) {
      return {
        primaryAction: {
          content: 'Save',
          onAction: handleSave
        }
      };
    }
    return {};
  };
  var titleBarActions = getTitleBarActions();
  return jsxs(Modal, {
    open: isOpen,
    variant: "max",
    onHide: onClose,
    children: [jsx(TitleBar, {
      title: getModalTitle(),
      children: titleBarActions.primaryAction && jsx("button", {
        variant: "primary",
        onClick: titleBarActions.primaryAction.onAction,
        children: titleBarActions.primaryAction.content
      })
    }), getModalContent()]
  });
}

// Default template constants
var DEFAULT_TEMPLATES = {
  SMS: "Hi {{customer_name}}, your {{subscription_name}} subscription is due for renewal. Amount: {{amount}}",
  WHATSAPP: "🎉 Hello {{customer_name}}! Your subscription *{{subscription_name}}* is now active. Thank you for choosing us!",
  WEB_PUSH: "🔔 {{customer_name}} | Your subscription {{subscription_name}} needs attention!"
};
// Template validation limits
var TEMPLATE_LIMITS = {
  SMS: {
    MAX_LENGTH: 1530,
    WARNING_LENGTH: 160,
    SEGMENT_LENGTH: 160
  },
  WHATSAPP: {
    MAX_LENGTH: 1024,
    WARNING_LENGTH: 800
  },
  WEB_PUSH: {
    MAX_LENGTH: 150,
    WARNING_LENGTH: 120,
    TITLE_MAX_LENGTH: 50,
    BODY_MAX_LENGTH: 100
  }
};
// Sample data for previews
var SAMPLE_DATA = {
  customer_name: 'John Doe',
  product_name: 'iPhone 15 Pro',
  subscription_name: 'Back in Stock Alert',
  amount: '$999',
  store_name: 'Your Store'
};
// Helper functions
var getSmsSegmentCount = function getSmsSegmentCount(text) {
  return Math.ceil(text.length / TEMPLATE_LIMITS.SMS.SEGMENT_LENGTH);
};
var validateSmsTemplate = function validateSmsTemplate(text) {
  var length = text.length;
  return {
    isValid: length <= TEMPLATE_LIMITS.SMS.MAX_LENGTH,
    isWarning: length > TEMPLATE_LIMITS.SMS.WARNING_LENGTH,
    length: length,
    maxLength: TEMPLATE_LIMITS.SMS.MAX_LENGTH,
    warningLength: TEMPLATE_LIMITS.SMS.WARNING_LENGTH,
    segments: getSmsSegmentCount(text)
  };
};
var validateWhatsappTemplate = function validateWhatsappTemplate(text) {
  var length = text.length;
  return {
    isValid: length <= TEMPLATE_LIMITS.WHATSAPP.MAX_LENGTH,
    isWarning: length > TEMPLATE_LIMITS.WHATSAPP.WARNING_LENGTH,
    length: length,
    maxLength: TEMPLATE_LIMITS.WHATSAPP.MAX_LENGTH,
    warningLength: TEMPLATE_LIMITS.WHATSAPP.WARNING_LENGTH
  };
};
var validateWebPushTemplate = function validateWebPushTemplate(text) {
  var length = text.length;
  return {
    isValid: length <= TEMPLATE_LIMITS.WEB_PUSH.MAX_LENGTH,
    isWarning: length > TEMPLATE_LIMITS.WEB_PUSH.WARNING_LENGTH,
    length: length,
    maxLength: TEMPLATE_LIMITS.WEB_PUSH.MAX_LENGTH,
    warningLength: TEMPLATE_LIMITS.WEB_PUSH.WARNING_LENGTH
  };
};
var replaceVariablesWithSampleData = function replaceVariablesWithSampleData(text) {
  return text.replace(/\{\{(\w+)\}\}/g, function (match, variable) {
    return SAMPLE_DATA[variable] || match;
  });
};
var availableLanguages = [{
  value: 'en',
  label: 'English'
}, {
  value: 'vi',
  label: 'Tiếng Việt'
}, {
  value: 'fr',
  label: 'Français'
}, {
  value: 'es',
  label: 'Español'
}, {
  value: 'de',
  label: 'Deutsch'
}, {
  value: 'ja',
  label: '日本語'
}, {
  value: 'ko',
  label: '한국어'
}, {
  value: 'zh',
  label: '中文'
}, {
  value: 'pt',
  label: 'Português'
}, {
  value: 'it',
  label: 'Italiano'
}, {
  value: 'ru',
  label: 'Русский'
}, {
  value: 'ar',
  label: 'العربية'
}, {
  value: 'hi',
  label: 'हिन्दी'
}, {
  value: 'th',
  label: 'ไทย'
}, {
  value: 'nl',
  label: 'Nederlands'
}, {
  value: 'sv',
  label: 'Svenska'
}, {
  value: 'da',
  label: 'Dansk'
}, {
  value: 'no',
  label: 'Norsk'
}, {
  value: 'fi',
  label: 'Suomi'
}, {
  value: 'pl',
  label: 'Polski'
}];
var TEMPLATE_NAME = {
  BACK_IN_STOCK: 'back-in-stock',
  CONFIRMATION: 'confirmation'
};

export { BLOCK_TEMPLATES, BlockList, ButtonBlockRenderer, ButtonBlockSettings, DEFAULT_TEMPLATES, DividerBlockRenderer, DividerBlockSettings, EmailBlockRenderer, EmailBlockSettings, EmailEditorEmptyState, EmailEditorErrorState, EmailEditorLayout, EmailEditorSidebar, EmailPreviewPanel, EmailTemplateEditor, FooterBlockRenderer, FooterBlockSettings, HeaderBlockRenderer, HeaderBlockSettings, ImageBlockRenderer, ImageBlockSettings, ProductBlockRenderer, ProductBlockSettings, SAMPLE_DATA, SpacerBlockRenderer, SpacerBlockSettings, TEMPLATE_LIMITS, TEMPLATE_NAME, TextBlockRenderer, TextBlockSettings, VARIABLES, VariablePanel, availableLanguages, getSmsSegmentCount, initialBlocks, replaceVariablesWithSampleData, useBlockManager, useDragAndDrop, useTemplateLoader, validateSmsTemplate, validateWebPushTemplate, validateWhatsappTemplate };
//# sourceMappingURL=index.esm.js.map
