"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const upsert_1 = tslib_1.__importDefault(require("../../../../components/config/upsert"));
const pageHeader_1 = tslib_1.__importDefault(require("../../../../components/common/pageHeader"));
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    const { oakId, config, name } = props.data;
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, { showBack: true, title: "\u5E73\u53F0\u914D\u7F6E", children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: (0, jsx_runtime_1.jsx)(upsert_1.default, { config: config, entity: "platform", entityId: oakId, name: name }) }) }));
}
exports.default = Render;
