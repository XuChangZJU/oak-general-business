"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
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
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)(antd_1.List, tslib_1.__assign({ split: true, className: web_module_less_1.default.list }, { children: [(0, jsx_runtime_1.jsx)(antd_1.List.Item, tslib_1.__assign({ extra: avatar ? (0, jsx_runtime_1.jsx)(antd_1.Avatar, { src: avatar }) : '未设置' }, { children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { title: "\u5934\u50CF" }) })), (0, jsx_runtime_1.jsx)(antd_1.List.Item, tslib_1.__assign({ extra: nickname || '未设置' }, { children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { title: "\u6635\u79F0" }) })), (0, jsx_runtime_1.jsx)(antd_1.List.Item, tslib_1.__assign({ extra: name || '未设置' }, { children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { title: "\u771F\u5B9E\u59D3\u540D" }) })), (0, jsx_runtime_1.jsx)(antd_1.List.Item, tslib_1.__assign({ extra: getMobile() }, { children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { title: "\u624B\u673A\u53F7" }) })), (0, jsx_runtime_1.jsx)(antd_1.List.Item, tslib_1.__assign({ extra: (0, jsx_runtime_1.jsx)(antd_1.Tag, tslib_1.__assign({ color: stateColor[userState] }, { children: this.t("user:v.userState.".concat(userState)) })) }, { children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { title: "\u7528\u6237\u72B6\u6001" }) })), (0, jsx_runtime_1.jsx)(antd_1.List.Item, tslib_1.__assign({ extra: (0, jsx_runtime_1.jsx)(antd_1.Tag, tslib_1.__assign({ color: idStateColor[idState] }, { children: this.t("user:v.idState.".concat(idState)) })) }, { children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { title: "\u5B9E\u540D\u9A8C\u8BC1" }) }))] })) }));
}
exports.default = render;
