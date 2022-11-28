import React from 'react';
import {
    LoadingOutlined,
    WarningOutlined,
} from '@ant-design/icons';
import Style from './web.module.less';
import Success from '../../../components/common/result/success';
import Fail from '../../../components/common/result/fail';

import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';

export default function render(
    props: WebComponentProps<
        EntityDict,
        'token',
        false,
        {
            oakLoading: boolean;
            isExist: boolean;
            expired: boolean;
        },
        {}
    >
) {
    const { oakLoading, isExist, expired } = props.data;

    let V;
    if (oakLoading) {
        V = (
            <Success
                icon={<LoadingOutlined className={Style.brand_icon} />}
                title="加载中"
                description="正在获取数据，请稍后"
            />
        );
    } else if (!isExist) {
        V = (
            <Fail
                title="二维码非法"
                description="抱歉，该二维码不存在，请检查是否扫错二维码"
            />
        );
    } else if (expired) {
        V = (
            <Fail
                icon={<WarningOutlined className={Style.icon} />}
                title="二维码已过期"
                description="抱歉，该码已过期，请联系相关人员重新分享"
            />
        );
    } else {
        V = (
            <Success
                icon={<LoadingOutlined className={Style.brand_icon} />}
                title="跳转中"
                description="正在跳转...，请稍后"
            />
        );
    }

    return <div className={Style.container}>{V}</div>;
}
