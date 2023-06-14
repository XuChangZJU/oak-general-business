"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var confirm = antd_1.Modal.confirm;
function Render(props) {
    var data = props.data, methods = props.methods;
    var oakFullpath = data.oakFullpath, qrCodeUrl = data.qrCodeUrl, loading = data.loading;
    var t = methods.t;
    return ((0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ size: "small", onClick: function () {
            // 解绑不做手机号验证
            // if (mobile) {
            //     setOpen3(true)
            // }
            // else {
            //     confirm({
            //         title: t('unbindingWechat'),
            //         onOk() {
            //             unbunding();
            //         },
            //     });
            // }
            confirm({
                title: '解绑微信账号',
                content: '解绑后，您将无法使用该微信扫码登录',
                okText: t('common:action.confirm'),
                cancelText: t('common:action.cancel'),
                onOk: function () {
                    methods.update({
                        userId: null,
                    });
                    methods.execute();
                    methods.setMessage({
                        content: '解绑成功',
                        type: 'success',
                    });
                },
            });
        } }, { children: "\u89E3\u7ED1" })));
}
exports.default = Render;
