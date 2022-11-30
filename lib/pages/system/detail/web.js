"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
var list_1 = tslib_1.__importDefault(require("../../../pages/application/list"));
var list_2 = tslib_1.__importDefault(require("../../../pages/domain/list"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    var _a = props.data, oakId = _a.oakId, folder = _a.folder, name = _a.name, tabValue = _a.tabValue, description = _a.description, isSuper = _a["super"], platform = _a.platform;
    var _b = props.methods, t = _b.t, navigateBack = _b.navigateBack, onTabClick = _b.onTabClick;
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, tslib_1.__assign({ showBack: true, title: "\u7CFB\u7EDF\u4FE1\u606F" }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: (0, jsx_runtime_1.jsx)(antd_1.Card, tslib_1.__assign({ title: name, bordered: false }, { children: (0, jsx_runtime_1.jsx)(antd_1.Tabs, { activeKey: tabValue, onTabClick: function (key) {
                        onTabClick(key);
                    }, items: [
                        {
                            label: '系统概览',
                            key: 'detail',
                            children: (0, jsx_runtime_1.jsxs)(antd_1.Descriptions, tslib_1.__assign({ column: 1, bordered: true }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, tslib_1.__assign({ label: "id" }, { children: oakId })), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, tslib_1.__assign({ label: t('system:attr.name') }, { children: name })), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, tslib_1.__assign({ label: t('system:attr.description') }, { children: description })), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, tslib_1.__assign({ label: t('system:attr.super') }, { children: isSuper ? '是' : '否' })), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, tslib_1.__assign({ label: t('system:attr.folder') }, { children: folder })), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, tslib_1.__assign({ label: t('system:attr.platform') + t('platform:attr.name') }, { children: platform === null || platform === void 0 ? void 0 : platform.name }))] })),
                        },
                        {
                            label: '应用管理',
                            key: 'application_list',
                            children: ((0, jsx_runtime_1.jsx)(list_1.default, { systemId: oakId, variant: "inline", oakPath: "$system/detail-application/list", oakAutoUnmount: true })),
                        },
                        {
                            label: '域名管理',
                            key: 'domain_list',
                            children: ((0, jsx_runtime_1.jsx)(list_2.default, { systemId: oakId, variant: "inline", oakPath: "$system/detail-domain/list", oakAutoUnmount: true })),
                        },
                    ] }) })) })) })));
}
exports.default = Render;
