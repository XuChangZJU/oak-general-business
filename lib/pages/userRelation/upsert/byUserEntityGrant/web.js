"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_mobile_1 = require("antd-mobile");
var detail_1 = tslib_1.__importDefault(require("../../../../pages/userEntityGrant/detail"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render(props) {
    var _a = props.data, relations = _a.relations, userEntityGrant = _a.userEntityGrant, userEntityGrantId = _a.userEntityGrantId, period = _a.period, unit = _a.unit, maxes = _a.maxes, oakExecutable = _a.oakExecutable;
    var _b = userEntityGrant || {}, relationId = _b.relationId, type = _b.type, number = _b.number, entity = _b.entity;
    var _c = props.methods, update = _c.update, t = _c.t, onBack = _c.onBack, confirm = _c.confirm, setInit = _c.setInit, setPeriod = _c.setPeriod, setUnit = _c.setUnit;
    var P = !!userEntityGrantId ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_mobile_1.NoticeBar, { content: t('shareCode'), color: 'info' }), (0, jsx_runtime_1.jsx)(detail_1.default, { showBack: false, oakId: userEntityGrantId, oakAutoUnmount: true, oakPath: "$userRelation/upsert/byUserEntityGrant-userEntityGrant/detail" }), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: {
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                } }, { children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Button, tslib_1.__assign({ color: "primary", onClick: function () { return setInit(); }, block: true }, { children: t('restart') })) }))] })) : ((0, jsx_runtime_1.jsxs)(antd_mobile_1.Form, { children: [(0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, tslib_1.__assign({ label: t('userEntityGrant:attr.relation'), name: "relation", rules: [
                    {
                        required: true,
                    },
                ] }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Radio.Group, tslib_1.__assign({ value: relationId, onChange: function (value) {
                            update({ relationId: value });
                        } }, { children: relations.map(function (ele) { return (0, jsx_runtime_1.jsx)(antd_mobile_1.Radio, tslib_1.__assign({ value: ele.id, style: { marginRight: 20 } }, { children: ele.display || t("".concat(entity, ":r.").concat(ele.name)) })); }) })) }) })), type === 'grant' && ((0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, tslib_1.__assign({ label: t('userEntityGrant:attr.number'), name: "number", rules: [
                    {
                        required: true,
                        message: t('chooseNumber'),
                    },
                ] }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(antd_mobile_1.Radio.Group, tslib_1.__assign({ value: number, onChange: function (value) {
                            update({ number: value });
                        } }, { children: [(0, jsx_runtime_1.jsx)(antd_mobile_1.Radio, tslib_1.__assign({ value: 1, style: { marginRight: 20 } }, { children: t('single') })), (0, jsx_runtime_1.jsx)(antd_mobile_1.Radio, tslib_1.__assign({ value: 10000 }, { children: t('unlimited') }))] })) }) }))), (0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, tslib_1.__assign({ label: t('userEntityGrant:attr.expiresAt'), name: "period", rules: [
                    {
                        required: true,
                        message: t('chooseExpiresAt'),
                    },
                ], help: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: { marginBottom: 16 } }, { children: t('expiresAt') })), extra: (0, jsx_runtime_1.jsx)(antd_mobile_1.Selector, { options: [
                        {
                            label: t('unit.hour'),
                            value: 'hour',
                        },
                        {
                            label: t('unit.minute'),
                            value: 'minute',
                        }
                    ], defaultValue: ['minute'], value: unit && [unit], onChange: function (arr) { return setUnit(arr[0]); } }) }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Input, { min: 1, max: maxes[unit], value: "".concat(period), type: "number", placeholder: t('chooseExpiresAt'), onChange: function (value) {
                            var v = parseInt(value);
                            setPeriod(v);
                        } }) }) })), (0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, { children: (0, jsx_runtime_1.jsxs)(antd_mobile_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_mobile_1.Button, tslib_1.__assign({ color: "primary", onClick: function () { return confirm(); }, disabled: oakExecutable !== true }, { children: t('common:action.confirm') })), (0, jsx_runtime_1.jsx)(antd_mobile_1.Button, tslib_1.__assign({ onClick: function () { return onBack(); } }, { children: t('common:back') }))] }) })] }));
    return (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: P }));
}
exports.default = render;
