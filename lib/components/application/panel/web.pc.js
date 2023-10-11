"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const detail_1 = tslib_1.__importDefault(require("../detail"));
const application_1 = tslib_1.__importDefault(require("../../config/application"));
const platform_1 = tslib_1.__importDefault(require("../../config/style/platform"));
const list_1 = tslib_1.__importDefault(require("../../messageTypeTemplateId/list"));
const web_pc_module_less_1 = tslib_1.__importDefault(require("./web.pc.module.less"));
function Render(props) {
    const { id, config, oakFullpath, name, style, type } = props.data;
    const { t, update } = props.methods;
    if (id && oakFullpath) {
        return ((0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.container, children: (0, jsx_runtime_1.jsx)(antd_1.Tabs, { tabPosition: 'left', items: type === 'wechatPublic' ? [
                    {
                        label: (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.tabLabel, children: t('detail') }),
                        key: 'detail',
                        children: ((0, jsx_runtime_1.jsx)(detail_1.default, { oakId: id, oakPath: oakFullpath })),
                    },
                    {
                        label: (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.tabLabel, children: t('config') }),
                        key: 'config',
                        children: ((0, jsx_runtime_1.jsx)(application_1.default, { entity: "application", entityId: id, config: config || {}, name: name, type: config?.type })),
                    },
                    {
                        label: (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.tabLabel, children: t('style') }),
                        key: 'style',
                        children: ((0, jsx_runtime_1.jsx)(platform_1.default, { style: style, entity: 'application', entityId: id, name: name })),
                    },
                    {
                        label: (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.tabLabel, children: t('template') }),
                        key: 'template',
                        children: ((0, jsx_runtime_1.jsx)(list_1.default, { oakAutoUnmount: true, oakPath: `templateUpsert-ApplicationId:${id}`, applicationId: id })),
                    },
                ] : [
                    {
                        label: (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.tabLabel, children: t('detail') }),
                        key: 'detail',
                        children: ((0, jsx_runtime_1.jsx)(detail_1.default, { oakId: id, oakPath: oakFullpath })),
                    },
                    {
                        label: (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.tabLabel, children: t('config') }),
                        key: 'config',
                        children: ((0, jsx_runtime_1.jsx)(application_1.default, { entity: "application", entityId: id, config: config || {}, name: name, type: config?.type })),
                    },
                    {
                        label: (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.tabLabel, children: t('style') }),
                        key: 'style',
                        children: ((0, jsx_runtime_1.jsx)(platform_1.default, { style: style, entity: 'application', entityId: id, name: name })),
                    },
                ] }) }));
    }
}
exports.default = Render;
