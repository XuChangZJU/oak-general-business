"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_1 = require("antd");
const pageHeader_1 = tslib_1.__importDefault(require("../../common/pageHeader"));
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const wechatMenu_1 = tslib_1.__importDefault(require("../../wechatMenu"));
const wechatPublicAutoReply_1 = tslib_1.__importDefault(require("../../wechatPublicAutoReply"));
const userWechatPublicTag_1 = tslib_1.__importDefault(require("../../userWechatPublicTag"));
function Render(props) {
    const { oakId, tabValue, config, name, description, type, system } = props.data;
    const { t, navigateBack, onTabClick, goWechatPublicTagList } = props.methods;
    const [tabKey, setTabKey] = (0, react_1.useState)('');
    const Actions = [];
    const items = [
        {
            label: '公众号菜单管理',
            key: 'menu',
            children: ((0, jsx_runtime_1.jsx)(wechatMenu_1.default, { oakAutoUnmount: true, applicationId: oakId, oakPath: `$application-detail-menu-${oakId}`, isPlatform: true, tabKey: tabKey }))
        },
        {
            label: '被关注回复管理',
            key: 'autoReply',
            children: ((0, jsx_runtime_1.jsx)(wechatPublicAutoReply_1.default, { oakAutoUnmount: true, applicationId: oakId, oakPath: `$application-detial-autoReply-${oakId}` }))
        },
        {
            label: '用户管理',
            key: 'user',
            children: ((0, jsx_runtime_1.jsx)(userWechatPublicTag_1.default, { oakAutoUnmount: true, applicationId: oakId, oakPath: `$application-detail-user-${oakId}` }))
        }
    ];
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, { showBack: true, title: "\u5E94\u7528\u6982\u89C8", children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: (0, jsx_runtime_1.jsx)(antd_1.Card, { title: name, bordered: false, extra: Actions, children: (0, jsx_runtime_1.jsx)(antd_1.Tabs, { items: items, onChange: (key) => {
                        setTabKey(key);
                    } }) }) }) }));
}
exports.default = Render;
