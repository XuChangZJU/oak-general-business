"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_mobile_1 = require("antd-mobile");
var antd_mobile_icons_1 = require("antd-mobile-icons");
var mobile_module_less_1 = tslib_1.__importDefault(require("./mobile.module.less"));
function Render(props) {
    var _a = props.methods, t = _a.t, goUpsert = _a.goUpsert, goUpdate = _a.goUpdate, addNamedFilter = _a.addNamedFilter, refresh = _a.refresh, removeNamedFilterByName = _a.removeNamedFilterByName;
    var _b = props.data, entity = _b.entity, users = _b.users, searchValue = _b.searchValue;
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: mobile_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsxs)("span", tslib_1.__assign({ className: mobile_module_less_1.default.header }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: { flex: 1 } }, { children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Input, { placeholder: t('search'), value: searchValue, onChange: function (value) {
                                addNamedFilter({
                                    '#name': 'name',
                                    filter: {
                                        $text: {
                                            $search: value,
                                        }
                                    }
                                }, false);
                            }, onEnterPress: function () { return refresh(); }, clearable: true, onClear: function () { return removeNamedFilterByName('name'); } }) })), (0, jsx_runtime_1.jsx)(antd_mobile_1.Button, tslib_1.__assign({ size: 'small', color: 'primary', onClick: function () { return goUpsert(); } }, { children: t('common::action.create') }))] })), (0, jsx_runtime_1.jsx)(antd_mobile_1.List, { children: users === null || users === void 0 ? void 0 : users.map(function (ele, index) {
                    var _a;
                    return ((0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, tslib_1.__assign({ prefix: ele.avatar ? (0, jsx_runtime_1.jsx)(antd_mobile_1.Avatar, { className: mobile_module_less_1.default.avatar, src: ele.avatar }) : (0, jsx_runtime_1.jsx)(antd_mobile_icons_1.UserCircleOutline, { className: mobile_module_less_1.default.avatar }), extra: ele.mobile || '--', description: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: {
                                display: 'flex',
                                flexWrap: 'wrap',
                            } }, { children: (_a = ele.userRelation$user) === null || _a === void 0 ? void 0 : _a.map(function (ele2, index2) {
                                var _a, _b;
                                return ((0, jsx_runtime_1.jsx)(antd_mobile_1.Tag, tslib_1.__assign({ fill: "outline" }, { children: ((_a = ele2.relation) === null || _a === void 0 ? void 0 : _a.name) ? t(entity + ':r.' + ele2.relation.name) : (_b = ele2.relation) === null || _b === void 0 ? void 0 : _b.display }), index));
                            }) })), onClick: function () { return goUpdate(ele.id); } }, { children: ele.name || ele.nickname || '--' })));
                }) })] })));
}
exports.default = Render;
