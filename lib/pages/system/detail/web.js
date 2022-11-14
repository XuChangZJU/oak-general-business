"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
var list_1 = tslib_1.__importDefault(require("../../../pages/application/list"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render() {
    var _this = this;
    var _a = this.props, namespace = _a.namespace, oakId = _a.oakId;
    var _b = this.state, config = _b.config, name = _b.name, tabValue = _b.tabValue;
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, tslib_1.__assign({ showBack: true, title: "\u7CFB\u7EDF\u6982\u89C8" }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: (0, jsx_runtime_1.jsx)(antd_1.Card, tslib_1.__assign({ title: name, bordered: false }, { children: (0, jsx_runtime_1.jsx)(antd_1.Tabs, { activeKey: tabValue, onTabClick: function (key) {
                        _this.onTabClick(key);
                    }, items: [
                        {
                            label: '系统概览',
                            key: 'detail',
                            children: (0, jsx_runtime_1.jsx)("div", { children: "\u8BE6\u60C5" }),
                        },
                        {
                            label: '应用管理',
                            key: 'application_list',
                            children: ((0, jsx_runtime_1.jsx)(list_1.default, { namespace: namespace, systemId: oakId, variant: "inline", oakPath: "$system/detail-application/list" })),
                        },
                    ] }) })) })) })));
}
exports.default = render;
