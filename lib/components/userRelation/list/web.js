"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_mobile_1 = require("antd-mobile");
const antd_mobile_icons_1 = require("antd-mobile-icons");
const mobile_module_less_1 = tslib_1.__importDefault(require("./mobile.module.less"));
function Render(props) {
    const { t, goUpsert, goUpdate, addNamedFilter, refresh, removeNamedFilterByName } = props.methods;
    const { entity, users, searchValue } = props.data;
    return ((0, jsx_runtime_1.jsxs)("div", { className: mobile_module_less_1.default.container, children: [(0, jsx_runtime_1.jsxs)("span", { className: mobile_module_less_1.default.header, children: [(0, jsx_runtime_1.jsx)("div", { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Input, { placeholder: t('search'), value: searchValue, onChange: value => {
                                addNamedFilter({
                                    '#name': 'name',
                                    filter: {
                                        $text: {
                                            $search: value,
                                        }
                                    }
                                }, false);
                            }, onEnterPress: () => refresh(), clearable: true, onClear: () => removeNamedFilterByName('name') }) }), (0, jsx_runtime_1.jsx)(antd_mobile_1.Button, { size: 'small', color: 'primary', onClick: () => goUpsert(), children: t('common::action.create') })] }), (0, jsx_runtime_1.jsx)(antd_mobile_1.List, { children: users?.map((ele, index) => {
                    return ((0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { prefix: ele.avatar ? (0, jsx_runtime_1.jsx)(antd_mobile_1.Avatar, { className: mobile_module_less_1.default.avatar, src: ele.avatar }) : (0, jsx_runtime_1.jsx)(antd_mobile_icons_1.UserCircleOutline, { className: mobile_module_less_1.default.avatar }), extra: ele.mobile || '--', description: (0, jsx_runtime_1.jsx)("div", { style: {
                                display: 'flex',
                                flexWrap: 'wrap',
                            }, children: ele.userRelation$user?.map((ele2, index2) => ((0, jsx_runtime_1.jsx)(antd_mobile_1.Tag, { fill: "outline", children: ele2.relation?.name ? t(entity + ':r.' + ele2.relation.name) : ele2.relation?.display }, index))) }), onClick: () => goUpdate(ele.id), children: ele.name || ele.nickname || '--' }));
                }) })] }));
}
exports.default = Render;
