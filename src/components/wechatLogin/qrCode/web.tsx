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
        },
        {}
    >
) {
    const { oakFullpath, wechatLoginId, qrCodeUrl } = props.data;

    return (
        <div>
            <QrCode url={qrCodeUrl} />
        </div>
    );
}

