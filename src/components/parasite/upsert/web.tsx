import React from 'react';
import { Tabs } from 'antd';
import Style from './mobile.module.less';
import assert from 'assert';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
import { QrCodeType } from '../../../types/Config';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'parasite',
        false,
        {
            entity: keyof EntityDict;
            entityId: string;
            relation: string;
        },
        {}
    >
) {
    const { entity, entityId, relation } = props.data;

    return <div>手机端尚未实现</div>;
}
