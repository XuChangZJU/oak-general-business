"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var upsert_1 = tslib_1.__importDefault(require("../../../../components/config/upsert"));
var pageHeader_1 = tslib_1.__importDefault(require("../../../../components/common/pageHeader"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    var _a = props.data, oakId = _a.oakId, config = _a.config, name = _a.name;
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, { showBack: true, title: "\u5E73\u53F0\u914D\u7F6E", children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: (0, jsx_runtime_1.jsx)(upsert_1.default, { config: config, entity: "platform", entityId: oakId, name: name }) }) }));
}
exports.default = Render;
