"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const unbindBtn_1 = tslib_1.__importDefault(require("../unbindBtn"));
function Render(props) {
    const { wechatUsers, oakFullpath } = props.data;
    return ((0, jsx_runtime_1.jsx)(antd_1.Space, { children: wechatUsers && wechatUsers.map((ele) => ((0, jsx_runtime_1.jsx)(unbindBtn_1.default, { oakId: ele.id, oakPath: oakFullpath ? `${oakFullpath}.${ele.id}` : undefined }))) }));
}
exports.default = Render;
