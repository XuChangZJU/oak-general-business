"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var list_1 = tslib_1.__importDefault(require("../../../components/messageTypeTemplateId/list"));
function Render(props) {
    var _a = props.data, oakId = _a.oakId, tabValue = _a.tabValue, config = _a.config, name = _a.name, description = _a.description, type = _a.type, system = _a.system;
    var _b = props.methods, t = _b.t, navigateBack = _b.navigateBack, onTabClick = _b.onTabClick, goWechatPublicTagList = _b.goWechatPublicTagList;
    var Actions = [];
    if (type === 'wechatPublic') {
        Actions.push((0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ onClick: function () { return goWechatPublicTagList(); } }, { children: "\u516C\u4F17\u53F7Tag\u7BA1\u7406" })));
    }
    var items = [
        {
            label: '应用概览',
            key: 'detail',
            children: ((0, jsx_runtime_1.jsxs)(antd_1.Descriptions, tslib_1.__assign({ column: 1, bordered: true }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, tslib_1.__assign({ label: "id" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Typography.Paragraph, tslib_1.__assign({ copyable: true }, { children: oakId })) })), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, tslib_1.__assign({ label: t('application:attr.name') }, { children: name })), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, tslib_1.__assign({ label: t('application:attr.description') }, { children: description })), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, tslib_1.__assign({ label: t('application:attr.type') }, { children: t("application:v.type.".concat(type)) })), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, tslib_1.__assign({ label: t('application:attr.system') +
                            t('system:attr.name') }, { children: system === null || system === void 0 ? void 0 : system.name }))] }))),
        },
    ];
    if (['wechatPublic', 'wechatMp'].includes(type)) {
        items.push({
            label: '模板消息管理',
            key: 'mttId',
            children: ((0, jsx_runtime_1.jsx)(list_1.default, { oakAutoUnmount: true, applicationId: oakId, oakPath: "$application-detail-mttId-".concat(oakId) })),
        });
    }
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, tslib_1.__assign({ showBack: true, title: "\u5E94\u7528\u6982\u89C8" }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: (0, jsx_runtime_1.jsx)(antd_1.Card, tslib_1.__assign({ title: name, bordered: false, actions: Actions }, { children: (0, jsx_runtime_1.jsx)(antd_1.Tabs, { items: items }) })) })) })));
}
exports.default = Render;
