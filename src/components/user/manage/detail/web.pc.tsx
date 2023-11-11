import React from 'react';

import { Tag, Avatar, Descriptions } from 'antd';

import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../../oak-app-domain';
import ActionPanel from '../../../../components/func/actionPanel';

export default function render(
    props: WebComponentProps<
        EntityDict,
        'user',
        false,
        {
            nickname?: string;
            avatar?: string;
            name?: string;
            mobile?: string;
            userState?: string;
            birth?: string;
            idState?: string;
            gender?: string;
            stateColor: Record<string, string>;
            idStateColor: Record<string, string>;
            mobileCount: number;
            mobileText: string;
            actionDescriptions: Record<
                string,
                {
                    icon: { name: string };
                    label: string;
                }
            >;
            executableActions: string[];
        },
        {
            onActionClick: (action: string) => Promise<void>;
        }
    >
) {
    const {
        nickname,
        avatar,
        name,
        userState,
        idState,
        gender,
        stateColor,
        idStateColor,
        mobileText,
        executableActions,
        actionDescriptions,
        birth,
    } = props.data;
    const { t, onActionClick } = props.methods;

    return (
        <>
            <Descriptions
                extra={
                    <ActionPanel
                        actions={executableActions}
                        actionDescriptions={actionDescriptions}
                        onActionClick={(action: string) =>
                            onActionClick(action)
                        }
                    />
                }
            >
                <Descriptions.Item label={t('avatar')}>
                    {avatar ? <Avatar src={avatar} /> : t('unset')}
                </Descriptions.Item>

                <Descriptions.Item label={t('user:attr.nickname')}>
                    {nickname || t('unset')}
                </Descriptions.Item>

                <Descriptions.Item label={t('user:attr.name')}>
                    {name || t('unset')}
                </Descriptions.Item>

                <Descriptions.Item label={t('user:attr.gender')}>
                    {gender ? t(`user:v.gender.${gender}`) : t('unset')}
                </Descriptions.Item>

                <Descriptions.Item label={t('user:attr.birth')}>
                    {birth || t('unset')}
                </Descriptions.Item>

                <Descriptions.Item label={t('mobile')}>
                    {mobileText || t('unset')}
                </Descriptions.Item>

                <Descriptions.Item label={t('user:attr.userState')}>
                    <Tag color={stateColor[userState!]}>
                        {t(`user:v.userState.${userState}`)}
                    </Tag>
                </Descriptions.Item>
                <Descriptions.Item label={t('user:attr.idState')}>
                    <Tag color={idStateColor[idState!]}>
                        {t(`user:v.idState.${idState}`)}
                    </Tag>
                </Descriptions.Item>
            </Descriptions>
        </>
    );
}
