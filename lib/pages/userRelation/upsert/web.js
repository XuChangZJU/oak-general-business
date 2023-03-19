"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var mobile_module_less_1 = tslib_1.__importDefault(require("./mobile.module.less"));
var index_1 = tslib_1.__importDefault(require("./byMobile/index"));
var byUserEntityGrant_1 = tslib_1.__importDefault(require("./byUserEntityGrant"));
var assert_1 = tslib_1.__importDefault(require("assert"));
function Render(props) {
    var _a = props.data, entity = _a.entity, entityId = _a.entityId, relations = _a.relations, grantByUserEntityGrant = _a.grantByUserEntityGrant, grantByEmail = _a.grantByEmail, grantByMobile = _a.grantByMobile, grantMethodCount = _a.grantMethodCount, oakFullpath = _a.oakFullpath, redirectToAfterConfirm = _a.redirectToAfterConfirm, qrCodeType = _a.qrCodeType;
    var SubPart = (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
    if (grantMethodCount === 0) {
        SubPart = ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: mobile_module_less_1.default.container }, { children: "\u5E94\u7528\u6CA1\u6709\u5B9A\u4E49\u6388\u6743\u65B9\u5F0F\uFF0C\u8BF7\u7BA1\u7406\u5458\u5728\u63A7\u5236\u53F0\u4E2D\u5B9A\u4E49" })));
    }
    else if (grantMethodCount === 1) {
        if (grantByEmail) {
            SubPart = (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: mobile_module_less_1.default.container }, { children: "\u5C1A\u672A\u5B9E\u73B0" }));
        }
        else if (grantByMobile) {
            SubPart = ((0, jsx_runtime_1.jsx)(index_1.default, { entity: entity, entityId: entityId, relations: relations, oakPath: oakFullpath ? "".concat(oakFullpath, ".mobile") : undefined, oakAutoUnmount: true }));
        }
        else {
            (0, assert_1.default)(grantByUserEntityGrant === true);
            SubPart = ((0, jsx_runtime_1.jsx)(byUserEntityGrant_1.default, { qrCodeType: qrCodeType, entity: entity, entityId: entityId, relations: relations, oakPath: oakFullpath
                    ? "".concat(oakFullpath, ".userEntityGrant")
                    : undefined, oakAutoUnmount: true, redirectToAfterConfirm: redirectToAfterConfirm }));
        }
    }
    else {
        var items = [
            {
                label: 'Email',
                key: 'item-1',
                children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: mobile_module_less_1.default.container }, { children: "\u5C1A\u672A\u5B9E\u73B0" })),
            },
            {
                label: '手机号',
                key: 'item-2',
                children: ((0, jsx_runtime_1.jsx)(index_1.default, { entity: entity, entityId: entityId, relations: relations, oakPath: oakFullpath ? "".concat(oakFullpath, ".mobile") : undefined, oakAutoUnmount: true })),
            },
            {
                label: '二维码',
                key: 'item-3',
                children: ((0, jsx_runtime_1.jsx)(byUserEntityGrant_1.default, { entity: entity, entityId: entityId, relations: relations, qrCodeType: qrCodeType, oakPath: oakFullpath
                        ? "".concat(oakFullpath, ".userEntityGrant")
                        : undefined, oakAutoUnmount: true, redirectToAfterConfirm: redirectToAfterConfirm })),
            },
        ];
        var items2 = [];
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
    return SubPart;
}
exports.default = Render;
