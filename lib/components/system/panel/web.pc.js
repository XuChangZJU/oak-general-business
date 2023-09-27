"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const detail_1 = tslib_1.__importDefault(require("../detail"));
const upsert_1 = tslib_1.__importDefault(require("../../config/upsert"));
const style_1 = tslib_1.__importDefault(require("../../config/style"));
const list_1 = tslib_1.__importDefault(require("../../domain/list"));
function Render(props) {
    const { id, config, oakFullpath, name, style } = props.data;
    const { t, update } = props.methods;
    if (id && oakFullpath) {
        return ((0, jsx_runtime_1.jsx)(antd_1.Tabs, { items: [
                {
                    label: t('detail'),
                    key: 'detail',
                    children: ((0, jsx_runtime_1.jsx)(detail_1.default, { oakId: id })),
                },
                {
                    label: t('config'),
                    key: 'detail',
                    children: ((0, jsx_runtime_1.jsx)(upsert_1.default, { entity: "system", entityId: id, config: config, name: name })),
                },
                {
                    label: t('style'),
                    key: 'detail',
                    children: ((0, jsx_runtime_1.jsx)(style_1.default, { value: style, onChange: (s) => {
                            update({ style: s });
                        } })),
                },
                {
                    label: t('domain-list'),
                    key: 'domain_list',
                    children: ((0, jsx_runtime_1.jsx)(list_1.default, { oakPath: `${oakFullpath}.domain$system` })),
                },
            ] }));
    }
}
exports.default = Render;
