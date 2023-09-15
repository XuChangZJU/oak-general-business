"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const application_1 = tslib_1.__importDefault(require("../../../../components/config/application"));
const pageHeader_1 = tslib_1.__importDefault(require("../../../../components/common/pageHeader"));
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render(props) {
    const { oakId, config, name, type } = props.data;
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, { showBack: true, title: "\u5E94\u7528\u914D\u7F6E", children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: (0, jsx_runtime_1.jsx)(application_1.default, { type: type, config: config, entity: "application", entityId: oakId, name: name }) }) }));
}
exports.default = render;
