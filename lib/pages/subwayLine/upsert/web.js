"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var gallery_1 = tslib_1.__importDefault(require("@oak-general-business/components/extraFile/gallery"));
var pageHeader_1 = tslib_1.__importDefault(require("@oak-general-business/components/common/pageHeader"));
var TextArea = antd_1.Input.TextArea;
function render(props) {
    var data = props.data, methods = props.methods;
    var t = methods.t, update = methods.update, reset = methods.reset, confirm = methods.confirm;
    var oakId = data.oakId, oakFullpath = data.oakFullpath, parentId = data.parentId, parentName = data.parentName, type = data.type, description = data.description, name = data.name, typeArr = data.typeArr, show = data.show;
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, tslib_1.__assign({ showBack: true, title: "\u6DFB\u52A0\u670D\u52A1" }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: (0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)(antd_1.Col, tslib_1.__assign({ xs: 24, sm: 16 }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ colon: true, labelCol: { span: 4 }, wrapperCol: { span: 20 } }, { children: [parentId ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: t('service:attr.parent'), name: "parent" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Tooltip, { children: parentName }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: t('service:attr.name'), name: "name", rules: [
                                            {
                                                required: true,
                                                message: '服务名称必填',
                                            },
                                        ] }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165\u670D\u52A1\u540D\u79F0", onChange: function (e) {
                                                    update({
                                                        name: e.target.value,
                                                    });
                                                }, value: name }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: t('service:attr.show'), name: "show", rules: [
                                            {
                                                required: true,
                                                message: "\u672A\u586B\u5199".concat(t('service:attr.show')),
                                            },
                                        ], requiredMark: true, tooltip: "\u6D89\u53CA\u4EA7\u54C1\u521B\u5EFA\u548C\u8BE6\u60C5\u663E\u793A" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Select, { value: show, onChange: function (value) {
                                                    update({
                                                        show: value,
                                                    });
                                                }, options: [
                                                    'shop',
                                                    'independent',
                                                    'self',
                                                ].map(function (ele) { return ({
                                                    label: t("service:v.show.".concat(ele)),
                                                    value: ele,
                                                }); }) }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: t('service:attr.description'), name: "description" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(TextArea, { placeholder: "\u8BF7\u8F93\u5165\u63CF\u8FF0(\u9009\u586B)", value: description, onChange: function (e) {
                                                    update({
                                                        description: e.target.value,
                                                    });
                                                }, maxLength: 200, autoSize: {
                                                    minRows: 2,
                                                    maxRows: 6,
                                                } }) }) }))] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: t('service:attr.type'), name: "type", rules: [
                                            {
                                                required: true,
                                                message: "\u672A\u586B\u5199".concat(t('service:attr.type')),
                                            },
                                        ], requiredMark: true }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Select, { value: type, onChange: function (value) {
                                                    update({
                                                        type: value,
                                                    });
                                                }, options: typeArr }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: t('service:attr.name'), name: "name", rules: [
                                            {
                                                required: true,
                                                message: '服务名称必填',
                                            },
                                        ] }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165\u670D\u52A1\u540D\u79F0", onChange: function (e) {
                                                    update({
                                                        name: e.target.value,
                                                    });
                                                }, value: name }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: t('service:attr.show'), name: "show", rules: [
                                            {
                                                required: true,
                                                message: "\u672A\u586B\u5199".concat(t('service:attr.show')),
                                            },
                                        ], requiredMark: true, tooltip: "\u6D89\u53CA\u4EA7\u54C1\u521B\u5EFA\u548C\u8BE6\u60C5\u663E\u793A" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Select, { value: show, onChange: function (value) {
                                                    update({
                                                        show: value,
                                                    });
                                                }, options: [
                                                    'shop',
                                                    'independent',
                                                    'self',
                                                ].map(function (ele) { return ({
                                                    label: t("service:v.show.".concat(ele)),
                                                    value: ele,
                                                }); }) }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u56FE\u6807", rules: [
                                            {
                                                required: true,
                                            },
                                        ], help: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.help }, { children: (0, jsx_runtime_1.jsx)("span", { children: "\u4EC5\u652F\u6301SVG\u683C\u5F0F\u3002" }) })) }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(gallery_1.default, { accept: ".svg, .SVG", oakPath: oakFullpath
                                                    ? "".concat(oakFullpath, ".extraFile$entity")
                                                    : undefined, type: "image", origin: "qiniu", tag1: "icon", entity: "service" }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: t('service:attr.description'), name: "description" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(TextArea, { showCount: true, placeholder: "\u8BF7\u8F93\u5165\u63CF\u8FF0(\u9009\u586B)", value: description, onChange: function (e) {
                                                    update({
                                                        description: e.target.value,
                                                    });
                                                }, maxLength: 200, autoSize: {
                                                    minRows: 2,
                                                    maxRows: 6,
                                                } }) }) }))] })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ wrapperCol: { offset: 4 } }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () {
                                                confirm();
                                            } }, { children: "\u63D0\u4EA4" })), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ onClick: function () {
                                                reset();
                                            } }, { children: "\u91CD\u7F6E" }))] }) }))] })) })) }) })) })));
}
exports.default = render;
