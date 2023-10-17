"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_1 = require("antd");
const detail_1 = tslib_1.__importDefault(require("../detail"));
const application_1 = tslib_1.__importDefault(require("../../config/application"));
const platform_1 = tslib_1.__importDefault(require("../../config/style/platform"));
const list_1 = tslib_1.__importDefault(require("../../messageTypeTemplate/list"));
const web_pc_module_less_1 = tslib_1.__importDefault(require("./web.pc.module.less"));
const wechatMenu_1 = tslib_1.__importDefault(require("../../wechatMenu"));
const userWechatPublicTag_1 = tslib_1.__importDefault(require("../../userWechatPublicTag"));
const list_2 = tslib_1.__importDefault(require("../..//wechatPublicTag/list"));
const wechatPublicAutoReply_1 = tslib_1.__importDefault(require("../..//wechatPublicAutoReply"));
function Render(props) {
    const { id, config, oakFullpath, name, style, type } = props.data;
    const { t, update } = props.methods;
    const [tabKey, setTabKey] = (0, react_1.useState)('detail');
    const items = [
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
            children: ((0, jsx_runtime_1.jsx)(platform_1.default, { style: style, entity: 'platform', entityId: id, name: name })),
        },
    ];
    if (type === 'wechatPublic') {
        items.push({
            label: (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.tabLabel, children: t('menu') }),
            key: 'menu',
            children: ((0, jsx_runtime_1.jsx)(wechatMenu_1.default, { oakAutoUnmount: true, applicationId: id, oakPath: `$application-panel-menu-${id}`, tabKey: tabKey }))
        }, {
            label: (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.tabLabel, children: t('autoReply') }),
            key: 'autoReply',
            children: ((0, jsx_runtime_1.jsx)(wechatPublicAutoReply_1.default, { oakAutoUnmount: true, applicationId: id, oakPath: `$application-panel-autoReply-${id}` }))
        }, {
            label: (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.tabLabel, children: t('tag') }),
            key: 'tag',
            children: ((0, jsx_runtime_1.jsx)(list_2.default, { oakAutoUnmount: true, applicationId: id, oakPath: `$application-panel-tag-${id}` }))
        }, {
            label: (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.tabLabel, children: t('user') }),
            key: 'user',
            children: ((0, jsx_runtime_1.jsx)(userWechatPublicTag_1.default, { oakAutoUnmount: true, applicationId: id, oakPath: `$application-panel-user-${id}` }))
        }, {
            label: (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.tabLabel, children: t('template') }),
            key: 'template',
            children: ((0, jsx_runtime_1.jsx)(list_1.default, { oakAutoUnmount: true, oakPath: `templateUpsert-ApplicationId:${id}`, applicationId: id })),
        });
    }
    if (id && oakFullpath) {
        return ((0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.container, children: (0, jsx_runtime_1.jsx)(antd_1.Tabs, { tabPosition: 'left', onChange: (key) => {
                    setTabKey(key);
                }, items: items, style: { height: 520 } }) }));
    }
}
exports.default = Render;
