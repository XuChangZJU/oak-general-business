"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_1 = require("antd");
const pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const list_1 = tslib_1.__importDefault(require("../../../components/messageTypeTemplateId/list"));
const wechatMenu_1 = tslib_1.__importDefault(require("../../../components/wechatMenu"));
const userWechatPublicTag_1 = tslib_1.__importDefault(require("../../../components/userWechatPublicTag"));
const list_2 = tslib_1.__importDefault(require("../../../components/wechatPublicTag/list"));
const wechatPublicAutoReply_1 = tslib_1.__importDefault(require("../../../components/wechatPublicAutoReply"));
function Render(props) {
    const { oakId, tabValue, config, name, description, type, system } = props.data;
    const { t, navigateBack, onTabClick, goWechatPublicTagList } = props.methods;
    const [tabKey, setTabKey] = (0, react_1.useState)('');
    const Actions = [];
    const items = [
        {
            label: '应用概览',
            key: 'detail',
            children: ((0, jsx_runtime_1.jsxs)(antd_1.Descriptions, { column: 1, bordered: true, children: [(0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: "id", children: (0, jsx_runtime_1.jsx)(antd_1.Typography.Paragraph, { copyable: true, children: oakId }) }), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: t('application:attr.name'), children: name }), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: t('application:attr.description'), children: description }), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: t('application:attr.type'), children: t(`application:v.type.${type}`) }), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: t('application:attr.system') +
                            t('system:attr.name'), children: system?.name })] })),
        },
    ];
    if (['wechatPublic', 'wechatMp'].includes(type)) {
        items.push({
            label: '模板消息管理',
            key: 'mttId',
            children: ((0, jsx_runtime_1.jsx)(list_1.default, { oakAutoUnmount: true, applicationId: oakId, oakPath: `$application-detail-mttId-${oakId}` })),
        });
    }
    if (['wechatPublic'].includes(type)) {
        items.push({
            label: '菜单管理',
            key: 'menu',
            children: ((0, jsx_runtime_1.jsx)(wechatMenu_1.default, { oakAutoUnmount: true, applicationId: oakId, oakPath: `$application-detail-menu-${oakId}`, tabKey: tabKey }))
        }, {
            label: '被关注回复管理',
            key: 'autoReply',
            children: ((0, jsx_runtime_1.jsx)(wechatPublicAutoReply_1.default, { oakAutoUnmount: true, applicationId: oakId, oakPath: `$application-detial-autoReply-${oakId}` }))
        }, {
            label: '标签管理',
            key: 'tag',
            children: ((0, jsx_runtime_1.jsx)(list_2.default, { oakAutoUnmount: true, applicationId: oakId, oakPath: `$application-detail-tag-${oakId}` }))
        }, {
            label: '用户管理',
            key: 'user',
            children: ((0, jsx_runtime_1.jsx)(userWechatPublicTag_1.default, { oakAutoUnmount: true, applicationId: oakId, oakPath: `$application-detail-user-${oakId}` }))
        });
    }
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, { showBack: true, title: "\u5E94\u7528\u6982\u89C8", children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: (0, jsx_runtime_1.jsx)(antd_1.Card, { title: name, bordered: false, extra: Actions, children: (0, jsx_runtime_1.jsx)(antd_1.Tabs, { items: items, onChange: (key) => {
                        setTabKey(key);
                    } }) }) }) }));
}
exports.default = Render;
