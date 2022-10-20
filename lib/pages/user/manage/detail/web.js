"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var tdesign_react_1 = require("tdesign-react");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var ListItem = tdesign_react_1.List.ListItem, ListItemMeta = tdesign_react_1.List.ListItemMeta;
function render() {
    var _a = this.state, nickname = _a.nickname, avatar = _a.avatar, name = _a.name, mobile = _a.mobile, userState = _a.userState, idState = _a.idState, stateColor = _a.stateColor, idStateColor = _a.idStateColor, mobileCount = _a.mobileCount;
    var getMobile = function () {
        if (mobileCount > 1) {
            return "".concat(mobileCount, "\u6761\u624B\u673A\u53F7");
        }
        else if (mobileCount === 1) {
            return mobile;
        }
        else {
            return '未设置';
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)(tdesign_react_1.List, tslib_1.__assign({ split: true, className: web_module_less_1.default.list }, { children: [(0, jsx_runtime_1.jsx)(ListItem, tslib_1.__assign({ action: avatar ? (0, jsx_runtime_1.jsx)(tdesign_react_1.Avatar, { image: avatar }) : '未设置' }, { children: (0, jsx_runtime_1.jsx)(ListItemMeta, { title: "\u5934\u50CF" }) })), (0, jsx_runtime_1.jsx)(ListItem, tslib_1.__assign({ action: nickname || '未设置' }, { children: (0, jsx_runtime_1.jsx)(ListItemMeta, { title: "\u6635\u79F0" }) })), (0, jsx_runtime_1.jsx)(ListItem, tslib_1.__assign({ action: name || '未设置' }, { children: (0, jsx_runtime_1.jsx)(ListItemMeta, { title: "\u771F\u5B9E\u59D3\u540D" }) })), (0, jsx_runtime_1.jsx)(ListItem, tslib_1.__assign({ action: getMobile() }, { children: (0, jsx_runtime_1.jsx)(ListItemMeta, { title: "\u624B\u673A\u53F7" }) })), (0, jsx_runtime_1.jsx)(ListItem, tslib_1.__assign({ action: (0, jsx_runtime_1.jsx)(tdesign_react_1.Tag, tslib_1.__assign({ theme: stateColor[userState] }, { children: this.t("user:v.userState.".concat(userState)) })) }, { children: (0, jsx_runtime_1.jsx)(ListItemMeta, { title: "\u7528\u6237\u72B6\u6001" }) })), (0, jsx_runtime_1.jsx)(ListItem, tslib_1.__assign({ action: (0, jsx_runtime_1.jsx)(tdesign_react_1.Tag, tslib_1.__assign({ theme: idStateColor[idState] }, { children: this.t("user:v.idState.".concat(idState)) })) }, { children: (0, jsx_runtime_1.jsx)(ListItemMeta, { title: "\u5B9E\u540D\u9A8C\u8BC1" }) }))] })) }));
}
exports.default = render;
