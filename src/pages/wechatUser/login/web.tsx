import React from 'react';
import { Button } from 'antd';
import { LoadingOutlined, WarningOutlined } from '@ant-design/icons';
import { isWeiXin } from 'oak-frontend-base/es/utils/utils';
import Fail from '../../../components/common/result/fail';
import Success from '../../../components/common/result/success';

import Style from './web.module.less';

import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';

export default function render(
    props: WebComponentProps<
        EntityDict,
        'token',
        false,
        {
            error: string;
            loading: boolean;
        },
        {}
    >
) {
    const { error, loading } = props.data;

    let V;
    if (loading) {
        V = (
            <Success
                icon={<LoadingOutlined className={Style.brand_icon} />}
                title="登录中"
                description="正在登录..，请稍后"
            />
        );
    } else if (error) {
        V = (
            <Fail
                title={error}
                description="抱歉，登录失败，请联系管理员进行排查！"
            >
                {isWeiXin && (
                    <Button
                        type="primary"
                        onClick={() => {
                            WeixinJSBridge.call('closeWindow');
                        }}
                    >
                        关闭
                    </Button>
                )}
            </Fail>
        );
    }

    return <div className={Style.container}>{V}</div>;
}
