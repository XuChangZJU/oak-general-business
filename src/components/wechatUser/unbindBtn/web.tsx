import React from 'react';
import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';

import { Button, Modal } from 'antd';

const { confirm } = Modal;

import Style from './web.module.less';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'wechatUser',
        false,
        {
            wechatLoginId: string;
            qrCodeUrl: string;
            loading: boolean;
        },
        {}
    >
) {
    const { data, methods } = props;
    const { oakFullpath, qrCodeUrl, loading } = data;
    const { t } = methods;

    return (
        <Button
            size="small"
            onClick={() => {
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
                        })
                    },
                });
            }}
        >
            解绑
        </Button>
    );
}

