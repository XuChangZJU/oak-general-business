"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const web_pc_module_less_1 = tslib_1.__importDefault(require("./web.pc.module.less"));
const upsert_1 = tslib_1.__importDefault(require("../../config/upsert"));
const style_1 = tslib_1.__importDefault(require("../../config/style"));
const detail_1 = tslib_1.__importDefault(require("../detail"));
const system_1 = tslib_1.__importDefault(require("../system"));
function render(props) {
    const { id, name, config, oakFullpath, style } = props.data;
    const { t, update } = props.methods;
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
                        children: ((0, jsx_runtime_1.jsx)(upsert_1.default, { entity: "platform", entityId: id, config: config, name: name })),
                    },
                    {
                        label: (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.tabLabel, children: t('style') }),
                        key: 'style',
                        children: ((0, jsx_runtime_1.jsx)(style_1.default, { value: style, onChange: (s) => {
                                update({ style: s });
                            } })),
                    },
                    {
                        label: (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.tabLabel, children: t('system-list') }),
                        key: 'system',
                        children: ((0, jsx_runtime_1.jsx)(system_1.default, { oakPath: `${oakFullpath}.system$platform`, platformId: id })),
                    },
                ] }) }));
    }
    return null;
}
exports.default = render;
