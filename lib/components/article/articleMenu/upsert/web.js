"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var confirm = antd_1.Modal.confirm;
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render(props) {
    var _this = this;
    var data = props.data, methods = props.methods;
    var t = methods.t, update = methods.update, reset = methods.reset, check = methods.check, onRemoveArticleMenu = methods.onRemoveArticleMenu;
    var name = data.name, parentId = data.parentId, parentName = data.parentName;
    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: (0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)(antd_1.Col, tslib_1.__assign({ xs: 24, sm: 16 }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ colon: true, labelCol: { span: 4 }, wrapperCol: { span: 20 } }, { children: [parentId ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: t('articleMenu:attr.parent'), name: "parent" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Tooltip, { children: parentName }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: t('articleMenu:attr.name'), name: "name", rules: [
                                        {
                                            required: true,
                                            message: '文章分类名称必填',
                                        },
                                    ] }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165\u6587\u7AE0\u5206\u7C7B\u540D\u79F0", onChange: function (e) {
                                                update({
                                                    name: e.target.value,
                                                });
                                            }, value: name }) }) }))] })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: t('articleMenu:attr.name'), name: "name", rules: [
                                    {
                                        required: true,
                                        message: '文章分类名称必填',
                                    },
                                ] }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165\u6587\u7AE0\u5206\u7C7B\u540D\u79F0", onChange: function (e) {
                                            update({
                                                name: e.target.value,
                                            });
                                        }, value: name }) }) })) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ wrapperCol: { offset: 4 } }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () {
                                            check();
                                        } }, { children: "\u63D0\u4EA4" })), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ onClick: function () {
                                            reset();
                                        } }, { children: "\u91CD\u7F6E" })), (0, jsx_runtime_1.jsx)(antd_1.Button, { children: "\u6DFB\u52A0\u5B50\u8282\u70B9" }), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "link", onClick: function () {
                                            var modal = confirm({
                                                title: '确定删除该文章分类吗？',
                                                content: '删除后不可恢复',
                                                okText: '确定',
                                                cancelText: '取消',
                                                onOk: function (e) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                    return tslib_1.__generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0: return [4 /*yield*/, onRemoveArticleMenu(id)];
                                                            case 1:
                                                                _a.sent();
                                                                modal.destroy();
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); },
                                            });
                                        } }, { children: "\u5220\u9664" }))] }) }))] })) })) }) })));
}
exports.default = render;
