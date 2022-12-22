"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
function Render(props) {
    var data = props.data, methods = props.methods;
    var t = methods.t, tapAction = methods.tapAction;
    var oakLegalActions = data.oakLegalActions;
    return oakLegalActions && (oakLegalActions === null || oakLegalActions === void 0 ? void 0 : oakLegalActions.length) > 0
        ? oakLegalActions.map(function (ele) {
            return ((0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "link", onClick: function (event) {
                    var modal = antd_1.Modal.confirm({
                        title: "\u786E\u8BA4\u8BE5\u6D88\u606F\u6807\u4E3A\u5DF2\u8BFB\u5417\uFF1F",
                        okText: '确定',
                        cancelText: '取消',
                        onOk: function (e) {
                            tapAction(ele);
                            modal.destroy();
                        },
                        onCancel: function (e) {
                            modal.destroy();
                        },
                    });
                } }, { children: "\u6807\u4E3A\u5DF2\u8BFB" })));
        })
        : null;
}
exports.default = Render;
