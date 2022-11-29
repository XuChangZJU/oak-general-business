"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var lodash_1 = require("oak-domain/lib/utils/lodash");
function Render(props) {
    var _a = props.data, name = _a.name, description = _a.description, super2 = _a.super, _b = _a.domain, domain = _b === void 0 ? [] : _b, variant = _a.variant, _c = _a.showBack, showBack = _c === void 0 ? true : _c;
    var _d = props.methods, t = _d.t, update = _d.update, navigateBack = _d.navigateBack, confirm = _d.confirm;
    var setDomainItem = function (path, value) {
        update({
            domain: (0, lodash_1.set)(domain || [], path, value),
        });
    };
    var removeDomainItem = function (index) {
        domain.splice(index, 1);
        update({
            domain: tslib_1.__spreadArray([], tslib_1.__read(domain), false),
        });
    };
    return ((0, jsx_runtime_1.jsx)(Container, tslib_1.__assign({ variant: variant, showBack: showBack }, { children: (0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)(antd_1.Col, tslib_1.__assign({ xs: 24, sm: 12 }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ colon: true, labelCol: { span: 6 }, wrapperCol: { span: 16 } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u540D\u79F0", requiredMark: true, name: "name", rules: [
                                {
                                    required: true,
                                },
                            ] }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { onChange: function (e) {
                                        update({
                                            name: e.target.value,
                                        });
                                    }, value: name }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u63CF\u8FF0", requiredMark: true, name: "description" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input.TextArea, { onChange: function (e) {
                                        update({
                                            description: e.target.value,
                                        });
                                    }, value: description }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u662F\u5426\u4E3A\u8D85\u7EA7\u7CFB\u7EDF", requiredMark: true, name: "super" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Switch, { checkedChildren: "\u662F", unCheckedChildren: "\u5426", checked: super2, onChange: function (checked) {
                                        update({
                                            super: checked,
                                        });
                                    } }) }) })), domain === null || domain === void 0 ? void 0 : domain.map(function (ele, index) { return ((0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u57DF\u540D".concat(index + 1), requiredMark: true, name: "domain".concat(index + 1), rules: [
                                {
                                    required: true,
                                },
                            ] }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Space.Compact, tslib_1.__assign({ block: true }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u586B\u5199\u57DF\u540D\uFF0C\u4F8B\u5982: www.abc.com", value: ele, onChange: function (e) {
                                            setDomainItem("".concat(index), e.target.value);
                                        } }), (0, jsx_runtime_1.jsx)(icons_1.MinusCircleOutlined, { onClick: function () {
                                            removeDomainItem(index);
                                        }, style: { marginLeft: 5 } })] }), "domain_".concat(index)) }))); }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ wrapperCol: { offset: 6 } }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "dashed", onClick: function () {
                                    var length = (domain === null || domain === void 0 ? void 0 : domain.length) || 0; //新增第几项
                                    setDomainItem("".concat(length), '');
                                }, block: true, icon: (0, jsx_runtime_1.jsx)(icons_1.PlusOutlined, {}) }, { children: "\u6DFB\u52A0\u57DF\u540D" })) })), (0, jsx_runtime_1.jsx)(Action, tslib_1.__assign({ variant: variant }, { children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ wrapperCol: { offset: 6 } }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () {
                                                confirm();
                                            } }, { children: "\u786E\u5B9A" })), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ onClick: function () {
                                                navigateBack();
                                            } }, { children: "\u8FD4\u56DE" }))] }) })) }))] })) })) }) })));
}
exports.default = Render;
function Action(props) {
    var children = props.children, variant = props.variant;
    if (variant === 'dialog') {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children }));
}
function Container(props) {
    var children = props.children, variant = props.variant, showBack = props.showBack;
    if (variant === 'inline' || variant === 'dialog') {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
    }
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, tslib_1.__assign({ showBack: showBack, title: "\u7CFB\u7EDF\u7F16\u8F91" }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: children })) })));
}
