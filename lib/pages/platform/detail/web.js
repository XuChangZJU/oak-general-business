"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render() {
    var _a = this.props, namespace = _a.namespace, oakId = _a.oakId;
    var _b = this.state, config = _b.config, name = _b.name;
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, { children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container }) }));
}
exports.default = render;
