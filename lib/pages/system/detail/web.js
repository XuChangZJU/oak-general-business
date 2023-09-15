"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
const list_1 = tslib_1.__importDefault(require("../../../pages/application/list"));
const list_2 = tslib_1.__importDefault(require("../../../pages/domain/list"));
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    const { oakId, folder, name, tabValue, description, 'super': isSuper, platform } = props.data;
    const { t, navigateBack, onTabClick } = props.methods;
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, { showBack: true, title: "\u7CFB\u7EDF\u4FE1\u606F", children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: (0, jsx_runtime_1.jsx)(antd_1.Card, { title: name, bordered: false, children: (0, jsx_runtime_1.jsx)(antd_1.Tabs, { activeKey: tabValue, onTabClick: (key) => {
                        onTabClick(key);
                    }, items: [
                        {
                            label: '系统概览',
                            key: 'detail',
                            children: ((0, jsx_runtime_1.jsxs)(antd_1.Descriptions, { column: 1, bordered: true, children: [(0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: "id", children: (0, jsx_runtime_1.jsx)(antd_1.Typography.Paragraph, { copyable: true, children: oakId }) }), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: t('system:attr.name'), children: name }), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: t('system:attr.description'), children: description }), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: t('system:attr.super'), children: isSuper ? '是' : '否' }), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: t('system:attr.folder'), children: folder }), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: t('system:attr.platform') +
                                            t('platform:attr.name'), children: platform?.name })] })),
                        },
                        {
                            label: '应用管理',
                            key: 'application_list',
                            children: ((0, jsx_runtime_1.jsx)(list_1.default, { systemId: oakId, oakPath: "$system/detail-application/list", oakAutoUnmount: true })),
                        },
                        {
                            label: '域名管理',
                            key: 'domain_list',
                            children: ((0, jsx_runtime_1.jsx)(list_2.default, { systemId: oakId, oakPath: "$system/detail-domain/list", oakAutoUnmount: true })),
                        },
                    ] }) }) }) }));
}
exports.default = Render;
