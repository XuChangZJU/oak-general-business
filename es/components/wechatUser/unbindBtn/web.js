import { jsx as _jsx } from "react/jsx-runtime";
import { Button, Modal } from 'antd';
const { confirm } = Modal;
export default function Render(props) {
    const { data, methods } = props;
    const { oakFullpath, qrCodeUrl, loading } = data;
    const { t } = methods;
    return (_jsx(Button, { size: "small", onClick: () => {
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
