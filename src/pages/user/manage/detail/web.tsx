import React from 'react';

import { List, Tag, Avatar } from 'antd-mobile';

import Style from './web.module.less';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../../general-app-domain';
import ActionPanel from '../../../../components/func/actionPanel';


export default function render(props: WebComponentProps<EntityDict, 'user', false, {
    nickname?: string,
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
    actionDescriptions: Record<string, {
        icon: { name: string; };
        label: string;
    }>;
}, {
    onActionClick: (action: string) => Promise<void>;
}>) {
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
        oakLegalActions,
        actionDescriptions,
        birth,
    } = props.data;
    const { t, onActionClick } = props.methods;

    return (
        <div className={Style.container}>
            <List className={Style.list}>
                <List.Item extra={avatar ? <Avatar src={avatar} /> : t('unset')}>
                    {t('user:attr.avatar')}
                </List.Item>

                <List.Item extra={nickname || t('unset')}>
                    {t('user:attr.nickname')}
                </List.Item>

                <List.Item extra={name || t('unset')}>
                    {t('user:attr.name')}
                </List.Item>

                <List.Item extra={gender ? t(`user:v.gender.${gender}`) : t('unset')}>
                    {t('user:attr.gender')}
                </List.Item>

                <List.Item extra={birth || t('unset')}>
                    {t('user:attr.birth')}
                </List.Item>

                <List.Item extra={mobileText}>
                    {t('mobile')}
                </List.Item>

                <List.Item
                    extra={
                        <Tag color={stateColor[userState!]}>
                            {t(`user:v.userState.${userState}`)}
                        </Tag>
                    }
                >
                    {t('user:attr.userState')}
                </List.Item>

                <List.Item
                    extra={
                        <Tag color={idStateColor[idState!]}>
                            {t(`user:v.idState.${idState}`)}
                        </Tag>
                    }
                >
                    {t('user:attr.idState')}
                </List.Item>
            </List>
            <div style={{ flex: 1 }} />
            <ActionPanel
                actions={oakLegalActions}
                actionDescriptions={actionDescriptions}
                onActionClick={(action: string) => onActionClick(action)}
            />
        </div>
    );
}
