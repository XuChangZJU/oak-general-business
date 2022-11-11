"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var upsert_1 = tslib_1.__importDefault(require("../../../../components/config/upsert"));
var pageHeader_1 = tslib_1.__importDefault(require("../../../../components/common/pageHeader"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render() {
    var _a = this.props, namespace = _a.namespace, oakId = _a.oakId;
    var _b = this.state, config = _b.config, name = _b.name;
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, tslib_1.__assign({ showBack: true, title: "\u7CFB\u7EDF\u914D\u7F6E" }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: (0, jsx_runtime_1.jsx)(upsert_1.default, { config: config, entity: "system", entityId: oakId, name: name, namespace: namespace }) })) })));
}
exports.default = render;
