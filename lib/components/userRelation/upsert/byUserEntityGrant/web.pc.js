"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var detail_1 = tslib_1.__importDefault(require("../../../../pages/userEntityGrant/detail"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render(props) {
    var _a = props.data, relations = _a.relations, userEntityGrant = _a.userEntityGrant, userEntityGrantId = _a.userEntityGrantId, period = _a.period, unit = _a.unit, maxes = _a.maxes, oakExecutable = _a.oakExecutable;
    var _b = userEntityGrant || {}, relationId = _b.relationId, type = _b.type, number = _b.number, entity = _b.entity;
    var _c = props.methods, update = _c.update, t = _c.t, onBack = _c.onBack, confirm = _c.confirm, setInit = _c.setInit, setPeriod = _c.setPeriod, setUnit = _c.setUnit;
    var P = !!userEntityGrantId ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Alert, { showIcon: true, message: t('shareCode'), type: "info", style: { marginBottom: 16 } }), (0, jsx_runtime_1.jsx)(detail_1.default, { showBack: false, oakId: userEntityGrantId, oakAutoUnmount: true, oakPath: "$userRelation/upsert/byUserEntityGrant-userEntityGrant/detail" }), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: {
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                } }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () { return setInit(); } }, { children: t('restart') })) }))] })) : ((0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ labelCol: { span: 4 }, wrapperCol: { span: 8 } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: t('userEntityGrant:attr.relation'), required: true }, { children: (0, jsx_runtime_1.jsx)(antd_1.Radio.Group, { value: relationId, onChange: function (_a) {
                        var target = _a.target;
                        var value = target.value;
                        update({ relationId: value });
                    }, options: relations === null || relations === void 0 ? void 0 : relations.map(function (ele) { return ({
                        value: ele.id,
                        label: ele.display ||
                            t("".concat(entity, ":r.").concat(ele.name)),
                    }); }) }) })), type === 'grant' && ((0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: t('userEntityGrant:attr.number'), required: true }, { children: (0, jsx_runtime_1.jsx)(antd_1.Radio.Group, { value: number, onChange: function (_a) {
                        var target = _a.target;
                        var value = target.value;
                        update({ number: value });
                    }, options: [
                        { value: 1, label: t('single') },
                        { value: 10000, label: t('unlimited') },
                    ] }) }))), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: t('userEntityGrant:attr.expiresAt'), required: true, 
                // name="period"
                // rules={[
                //     {
                //         required: true,
                //         message: t('chooseExpiresAt'),
                //     },
                // ]}
                help: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: { marginBottom: 16 } }, { children: t('expiresHelp') })), tooltip: "\u901A\u8FC7\u914D\u7F6E\u5B9E\u73B0\u5728\u89C4\u5B9A\u7684\u65F6\u6548\u5185\u626B\u63CF\u4E8C\u7EF4\u7801\u4E0D\u8FC7\u671F\u7684\u6548\u679C\u3002" }, { children: (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { min: 1, max: maxes[unit], value: period, onChange: function (value) { return setPeriod(value); }, 
                    // addonAfter="分钟"
                    addonAfter: (0, jsx_runtime_1.jsxs)(antd_1.Select, tslib_1.__assign({ value: unit, style: { width: 80 }, onChange: function (v) {
                            setUnit(v);
                        } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Select.Option, tslib_1.__assign({ value: "minute" }, { children: t('unit.minute') })), (0, jsx_runtime_1.jsx)(antd_1.Select.Option, tslib_1.__assign({ value: "hour" }, { children: t('unit.hour') }))] })) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ wrapperCol: { offset: 4 } }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () { return confirm(); }, disabled: oakExecutable !== true }, { children: t('common::action.confirm') })), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ onClick: function () { return onBack(); } }, { children: t('common::back') }))] }) }))] })));
    return (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: P }));
}
exports.default = render;
