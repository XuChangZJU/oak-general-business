"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
function render() {
    var _a = this.props, variant = _a.variant, _b = _a.showBack, showBack = _b === void 0 ? true : _b;
    var _c = this.state, relation = _c.relation, expiresAt = _c.expiresAt;
    return ((0, jsx_runtime_1.jsx)(Container, { showBack: showBack, variant: variant }));
}
exports.default = render;
function Container(props) {
    var children = props.children, _a = props.variant, variant = _a === void 0 ? 'alone' : _a, showBack = props.showBack;
    if (['inline', 'dialog'].includes(variant)) {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
    }
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, tslib_1.__assign({ showBack: showBack, title: "\u83B7\u53D6\u6743\u9650" }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: children })) })));
}
