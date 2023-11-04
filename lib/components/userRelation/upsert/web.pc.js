"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const index_1 = tslib_1.__importDefault(require("./byMobile/index"));
const byUserEntityGrant_1 = tslib_1.__importDefault(require("./byUserEntityGrant"));
const assert_1 = require("oak-domain/lib/utils/assert");
function Render(props) {
    const { entity, entityId, relations, grantByUserEntityGrant, grantByEmail, grantByMobile, grantMethodCount, oakFullpath, redirectToAfterConfirm, qrCodeType, claimUrl, rule, ruleOnRow, } = props.data;
    let SubPart = (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
    if (grantMethodCount === 0) {
        SubPart = ((0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: "\u5E94\u7528\u6CA1\u6709\u5B9A\u4E49\u6388\u6743\u65B9\u5F0F\uFF0C\u8BF7\u7BA1\u7406\u5458\u5728\u63A7\u5236\u53F0\u4E2D\u5B9A\u4E49" }));
    }
    else if (grantMethodCount === 1) {
        if (grantByEmail) {
            SubPart = (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: "\u5C1A\u672A\u5B9E\u73B0" });
        }
        else if (grantByMobile) {
            SubPart = ((0, jsx_runtime_1.jsx)(index_1.default, { entity: entity, entityId: entityId, relations: relations, oakPath: "$userRelation-upsert-by-mobile", oakAutoUnmount: true }));
        }
        else {
            (0, assert_1.assert)(grantByUserEntityGrant === true);
            SubPart = ((0, jsx_runtime_1.jsx)(byUserEntityGrant_1.default, { qrCodeType: qrCodeType, entity: entity, entityId: entityId, relations: relations, claimUrl: claimUrl, oakPath: "$userRelation-upsert-by-userEntityGrant", oakAutoUnmount: true, redirectToAfterConfirm: redirectToAfterConfirm }));
        }
    }
    else {
        const items = [
            {
                label: 'Email',
                key: 'item-1',
                children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: "\u5C1A\u672A\u5B9E\u73B0" }),
            },
            {
                label: '手机号',
                key: 'item-2',
                children: ((0, jsx_runtime_1.jsx)(index_1.default, { entity: entity, entityId: entityId, relations: relations, oakPath: "$userRelation-upsert-by-mobile", oakAutoUnmount: true })),
            },
            {
                label: '二维码',
                key: 'item-3',
                children: ((0, jsx_runtime_1.jsx)(byUserEntityGrant_1.default, { entity: entity, entityId: entityId, relations: relations, qrCodeType: qrCodeType, oakPath: "$userRelation-upsert-by-userEntityGrant", oakAutoUnmount: true, redirectToAfterConfirm: redirectToAfterConfirm, claimUrl: claimUrl, rule: rule, ruleOnRow: ruleOnRow })),
            },
        ];
        const items2 = [];
        if (grantByEmail) {
            items2.push(items[0]);
        }
        if (grantByMobile) {
            items2.push(items[1]);
        }
        if (grantByUserEntityGrant) {
            items2.push(items[2]);
        }
        SubPart = (0, jsx_runtime_1.jsx)(antd_1.Tabs, { items: items2 });
    }
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: SubPart }));
}
exports.default = Render;
