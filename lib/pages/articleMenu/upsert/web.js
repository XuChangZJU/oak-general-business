"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
var common_module_less_1 = tslib_1.__importDefault(require("@project/config/styles/web/common.module.less"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var gallery_1 = tslib_1.__importDefault(require("../../../components/extraFile/gallery"));
function render(props) {
    var data = props.data, methods = props.methods;
    var t = methods.t, update = methods.update, reset = methods.reset, confirm = methods.confirm;
    var name = data.name, parentId = data.parentId, parentName = data.parentName, oakFullpath = data.oakFullpath;
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, tslib_1.__assign({ showBack: true, title: "\u6DFB\u52A0\u6587\u7AE0\u5206\u7C7B" }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: (0, classnames_1.default)(common_module_less_1.default.pageWithPadding, common_module_less_1.default.pageWithColor) }, { children: (0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)(antd_1.Col, tslib_1.__assign({ xs: 24, sm: 16 }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ colon: true, labelCol: { span: 4 }, wrapperCol: { span: 20 } }, { children: [parentId ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: t("articleMenu:attr.parent"), name: "parent" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Tooltip, { children: parentName }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "分类名称", rules: [
                                            {
                                                required: true,
                                                message: "分类名称必填",
                                            },
                                        ] }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165\u5206\u7C7B\u540D\u79F0", onChange: function (e) {
                                                    update({
                                                        name: e.target.value,
                                                    });
                                                }, value: name }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "LOGO", help: (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.help }, { children: [(0, jsx_runtime_1.jsx)("span", { children: "\u8BF7\u4E0A\u4F20LOGO\u9AD8\u6E05\u56FE\u7247\uFF0C" }), (0, jsx_runtime_1.jsx)("span", { children: "108*108\u50CF\u7D20\uFF0C\u4EC5\u652F\u6301PNG\u3001JPG\u683C\u5F0F\uFF0C\u5927\u5C0F\u4E0D\u8D85\u8FC7300KB\u3002" })] })) }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(gallery_1.default, { oakPath: oakFullpath
                                                    ? "".concat(oakFullpath, ".extraFile$entity$1")
                                                    : undefined, type: "image", origin: "qiniu", tag1: "logo", entity: "articleMenu", accept: ".PNG, .JPG", maxNumber: 1 }) }) }))] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "分类名称", rules: [
                                            {
                                                required: true,
                                                message: "分类名称必填",
                                            },
                                        ] }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165\u5206\u7C7B\u540D\u79F0", onChange: function (e) {
                                                    update({
                                                        name: e.target.value,
                                                    });
                                                }, value: name }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "LOGO", help: (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.help }, { children: [(0, jsx_runtime_1.jsx)("span", { children: "\u8BF7\u4E0A\u4F20LOGO\u9AD8\u6E05\u56FE\u7247\uFF0C" }), (0, jsx_runtime_1.jsx)("span", { children: "108*108\u50CF\u7D20\uFF0C\u4EC5\u652F\u6301PNG\u3001JPG\u683C\u5F0F\uFF0C\u5927\u5C0F\u4E0D\u8D85\u8FC7300KB\u3002" })] })) }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(gallery_1.default, { oakPath: oakFullpath
                                                    ? "".concat(oakFullpath, ".extraFile$entity$1")
                                                    : undefined, type: "image", origin: "qiniu", tag1: "logo", entity: "articleMenu", accept: ".PNG, .JPG", maxNumber: 1 }) }) }))] })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ wrapperCol: { offset: 4 } }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ disabled: !data.oakDirty || data.oakExecuting, type: "primary", onClick: function () {
                                                confirm();
                                            } }, { children: "\u63D0\u4EA4" })), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ onClick: function () {
                                                reset();
                                            } }, { children: "\u91CD\u7F6E" }))] }) }))] })) })) }) })) })));
}
exports.default = render;
