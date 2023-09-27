import React from 'react';
import { Tabs, Card, Descriptions, Typography, Button } from 'antd';
import PageHeader from '../../common/pageHeader';
import ApplicationList from '../../../pages/application/list';
import DomainList from '../../../pages/domain/list';

import Style from './web.module.less';

import { EntityDict } from '../../../oak-app-domain';
import { Config } from '../../../types/Config';
import { WebComponentProps } from 'oak-frontend-base';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'platform',
        false,
        {
            name: string;
            description: string;
            oakId: string;
            folder: string;
            super: boolean;
        }
    >
) {
    const { oakId, folder, name, description, 'super': isSuper } = props.data;
    const { t } = props.methods;
    return (
        <Descriptions column={1} bordered>
            <Descriptions.Item label="id">
                <Typography.Paragraph copyable>
                    {oakId}
                </Typography.Paragraph>
            </Descriptions.Item>
            <Descriptions.Item
                label={t('system:attr.name')}
            >
                {name}
            </Descriptions.Item>
            <Descriptions.Item
                label={t('system:attr.description')}
            >
                {description}
            </Descriptions.Item>
            <Descriptions.Item
                label={t('system:attr.super')}
            >
                {isSuper ? '是' : '否'}
            </Descriptions.Item>
            <Descriptions.Item
                label={t('system:attr.folder')}
            >
                {folder}
            </Descriptions.Item>
        </Descriptions>
    );
}