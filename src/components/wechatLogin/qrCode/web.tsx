import React from 'react';
import QrCode from '../../../components/common/qrCode';
import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';

import Style from './web.module.less';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'wechatLogin',
        true,
        {
            wechatLoginId: string;
            qrCodeUrl: string;
            loading: boolean;
        },
        {}
    >
) {
    const { oakFullpath, qrCodeUrl, loading } = props.data;

    return (
        <div>
            <QrCode
                loading={loading}
                url={qrCodeUrl}
                disableDownload={true}
                tips={<div>微信扫一扫</div>}
            />
        </div>
    );
}

