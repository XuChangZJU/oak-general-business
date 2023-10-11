"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const detail_1 = tslib_1.__importDefault(require("../detail"));
const upsert_1 = tslib_1.__importDefault(require("../../config/upsert"));
const platform_1 = tslib_1.__importDefault(require("../../config/style/platform"));
const list_1 = tslib_1.__importDefault(require("../../domain/list"));
const application_1 = tslib_1.__importDefault(require("../application"));
const web_pc_module_less_1 = tslib_1.__importDefault(require("./web.pc.module.less"));
function Render(props) {
    const { id, config, oakFullpath, name, style, application$system: applications } = props.data;
    const { t, update, addItem, removeItem } = props.methods;
    if (id && oakFullpath) {
        return ((0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.container, children: (0, jsx_runtime_1.jsx)(antd_1.Tabs, { tabPosition: 'left', items: [
                    {
                        label: (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.tabLabel, children: t('detail') }),
                        key: 'detail',
                        children: ((0, jsx_runtime_1.jsx)(detail_1.default, { oakId: id, oakPath: oakFullpath })),
                    },
                    {
                        label: (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.tabLabel, children: t('config') }),
                        key: 'config',
                        children: ((0, jsx_runtime_1.jsx)(upsert_1.default, { entity: "system", entityId: id, config: config, name: name })),
                    },
                    {
                        label: (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.tabLabel, children: t('style') }),
                        key: 'style',
                        children: ((0, jsx_runtime_1.jsx)(platform_1.default, { style: style, entity: 'system', entityId: id, name: name })),
                    },
                    {
                        label: (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.tabLabel, children: t('application-list') }),
                        key: 'application',
                        children: ((0, jsx_runtime_1.jsx)(application_1.default, { oakPath: `${oakFullpath}.application$system`, systemId: id })),
                    },
                    {
                        label: (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.tabLabel, children: t('domain-list') }),
                        key: 'domain_list',
                        children: ((0, jsx_runtime_1.jsx)(list_1.default, { oakPath: `${oakFullpath}.domain$system`, systemId: id })),
                    },
                ] }) }));
    }
}
exports.default = Render;
