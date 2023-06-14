"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var unbindBtn_1 = tslib_1.__importDefault(require("../unbindBtn"));
function Render(props) {
    var _a = props.data, wechatUsers = _a.wechatUsers, oakFullpath = _a.oakFullpath;
    return ((0, jsx_runtime_1.jsx)(antd_1.Space, { children: wechatUsers && wechatUsers.map(function (ele) { return ((0, jsx_runtime_1.jsx)(unbindBtn_1.default, { oakId: ele.id, oakPath: oakFullpath ? "".concat(oakFullpath, ".").concat(ele.id) : undefined })); }) }));
}
exports.default = Render;
