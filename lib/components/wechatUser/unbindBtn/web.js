"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const { confirm } = antd_1.Modal;
function Render(props) {
    const { data, methods } = props;
    const { oakFullpath, qrCodeUrl, loading } = data;
    const { t } = methods;
    return ((0, jsx_runtime_1.jsx)(antd_1.Button, { size: "small", onClick: () => {
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
                okText: t('common::action.confirm'),
                cancelText: t('common::action.cancel'),
                onOk() {
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
        }, children: "\u89E3\u7ED1" }));
}
exports.default = Render;
