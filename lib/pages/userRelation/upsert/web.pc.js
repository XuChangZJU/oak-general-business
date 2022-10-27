"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var index_1 = tslib_1.__importDefault(require("./byMobile/index"));
var byUserEntityGrant_1 = tslib_1.__importDefault(require("./byUserEntityGrant"));
var assert_1 = tslib_1.__importDefault(require("assert"));
function render() {
    var _a = this.props, entity = _a.entity, entityId = _a.entityId, relations = _a.relations;
    var _b = this.state, grantByUserEntityGrant = _b.grantByUserEntityGrant, grantByEmail = _b.grantByEmail, grantByMobile = _b.grantByMobile, grantMethodCount = _b.grantMethodCount;
    var SubPart = ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}));
    if (grantMethodCount === 0) {
        SubPart = ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: "\u5E94\u7528\u6CA1\u6709\u5B9A\u4E49\u6388\u6743\u65B9\u5F0F\uFF0C\u8BF7\u7BA1\u7406\u5458\u5728\u63A7\u5236\u53F0\u4E2D\u5B9A\u4E49" })));
    }
    else if (grantMethodCount === 1) {
        if (grantByEmail) {
            SubPart = ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: "\u5C1A\u672A\u5B9E\u73B0" })));
        }
        else if (grantByMobile) {
            SubPart = ((0, jsx_runtime_1.jsx)(index_1.default, { entity: entity, entityId: entityId, relations: relations, oakPath: "$userRelationUpsert/upsert-byMobile", oakAutoUnmount: true }));
        }
        else {
            (0, assert_1.default)(grantByUserEntityGrant === true);
            SubPart = ((0, jsx_runtime_1.jsx)(byUserEntityGrant_1.default, { entity: entity, entityId: entityId, relations: relations, oakPath: "$userRelationUpsert/upsert-byUserEntityGrant", oakAutoUnmount: true }));
        }
    }
    else {
        var items = [
            {
                label: 'Email', key: 'item-1', children: ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: "\u5C1A\u672A\u5B9E\u73B0" })))
            },
            {
                label: '手机号', key: 'item-2', children: ((0, jsx_runtime_1.jsx)(index_1.default, { entity: entity, entityId: entityId, relations: relations, oakPath: "$userRelationUpsert/upsert-byMobile", oakAutoUnmount: true }))
            },
            {
                label: '二维码', key: 'item-3', children: ((0, jsx_runtime_1.jsx)(byUserEntityGrant_1.default, { entity: entity, entityId: entityId, relations: relations, oakPath: "$userRelationUpsert/upsert-byUserEntityGrant", oakAutoUnmount: true }))
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
        SubPart = ((0, jsx_runtime_1.jsx)(antd_1.Tabs, { items: items2 }));
    }
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, tslib_1.__assign({ showBack: true, title: "\u6DFB\u52A0\u6743\u9650" }, { children: SubPart })));
}
exports.default = render;
