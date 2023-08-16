import React, { useState } from 'react';

import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
import Styles from './web.pc.module.less';
import { Button, List, Popup, Tag, Input, Radio, Form, Space } from 'antd-mobile';
import MyAvatar from '../avatar';
import OakIcon from '../../icon';


const PrimaryColor = getComputedStyle(document.documentElement).getPropertyValue('--oak-color-primary');
const WarningColor = getComputedStyle(document.documentElement).getPropertyValue('--oak-color-warning');
const ErrorColor = getComputedStyle(document.documentElement).getPropertyValue('--oak-color-error');
const SuccessColor = getComputedStyle(document.documentElement).getPropertyValue('--oak-color-success');
const UserStateColor = {
    normal: PrimaryColor,
    merged: WarningColor,
    shadow: WarningColor,
    disabled: ErrorColor,
};

const IdStateColor = {
    unverified: WarningColor,
    verifying: PrimaryColor,
    verified: SuccessColor,
};

export default function Render(props: WebComponentProps<EntityDict, 'token', false, {
    nameText?: string; mobileText?: string; userId?: string; gender: string;
    nickname?: string; name?: string; idState?: string; userState?: string;
    showLogout?: boolean;
}, {
    logout: () => void;
    updateAttribute: (attr: string, value: any) => Promise<void>;
}>) {
    const { nameText, mobileText, userId, nickname, name, idState, userState, gender, showLogout } = props.data;
    const { t, logout, navigateTo, updateAttribute } = props.methods;

    const [updateAttr, setUpdateAttr] = useState(undefined as string | undefined);
    const [updateValue, setUpdateValue] = useState(undefined as any | undefined);

    if (!userId) {
        return (
            <div className={Styles.container}>
                <div className={Styles.header}>
                    <Button
                        onClick={() => navigateTo({
                            url: '/login',
                        })}
                    >
                        {t('login')}
                    </Button>
                </div>
                <div className={Styles.body}></div>
            </div>
        );
    }

    const GenderOptions = [
        {
            label: t('user:v.gender.male'),
            value: 'male',
        },
        {
            label: t('user:v.gender.female'),
            value: 'female',
        }
    ];

    return (
        <div className={Styles.container}>
            <div className={Styles.header}>
                <MyAvatar size={66} iconColor="white" />
                <div className={Styles.name}>{nameText || t('unset')}</div>
            </div>
            <div className={Styles.body}>
                <List>
                    <List.Item
                        extra={nickname || t('unset')}
                        onClick={() => setUpdateAttr('nickname')}
                    >
                        {t('user:attr.nickname')}
                    </List.Item>
                    <List.Item
                        extra={name || t('unset')}
                        onClick={() => setUpdateAttr('name')}
                    >
                        {t('user:attr.name')}
                    </List.Item>
                    <List.Item extra={<Tag color={UserStateColor[userState as 'normal']}>{t(`user:v.userState.${userState}`)}</Tag>}>
                        {t('user:attr.userState')}
                    </List.Item>
                    <List.Item extra={<Tag color={IdStateColor[idState as 'verified']}>{t(`user:v.idState.${idState}`)}</Tag>}>
                        {t('user:attr.idState')}
                    </List.Item>
                    <List.Item
                        extra={gender ? t(`user:v.gender.${gender}`) : t('unset')}
                        onClick={() => setUpdateAttr('gender')}
                    >
                        {t('user:attr.gender')}
                    </List.Item>
                    <List.Item
                        extra={mobileText}
                        onClick={() => navigateTo({ url: '/mobile/me' })}
                    >
                        {t('mobile')}
                    </List.Item>
                </List>
            </div>
            {
                showLogout && <>
                    <div style={{ flex: 1 }} />
                    <Button
                        block
                        color="warning"
                        onClick={() => logout()}
                    >
                        {t('logout')}
                    </Button>
                </>
            }
            <div className={Styles.extraMobile}>
                <a href="/user/manage">
                    <OakIcon name="wand-magic-sparkles" size={26} color="warning" />
                </a>
            </div>
            <Popup
                position="bottom"
                visible={!!updateAttr}
                onClose={() => {
                    setUpdateAttr(undefined);
                    setUpdateValue(undefined);
                }}
                closeOnMaskClick={true}
            >
                <Form layout="horizontal">
                    <Form.Item
                        extra={
                            <Button
                                size="middle"
                                disabled={!updateValue}
                                color="primary"
                                onClick={async () => {
                                    await updateAttribute(updateAttr!, updateValue);
                                    setUpdateAttr(undefined);
                                    setUpdateValue(undefined);
                                }}
                            >
                                {t('common::action.confirm')}
                            </Button>
                        }
                    >
                        {
                            updateAttr !== 'gender'
                            && <Input
                                className={Styles.input}
                                maxLength={updateAttr === 'name' ? 16 : 64}
                                value={updateValue || props.data[updateAttr as 'name']}
                                onChange={(value) => {
                                    setUpdateValue(value);
                                }}
                            />
                        }
                        {
                            updateAttr === 'gender'
                            && <Radio.Group value={updateValue || gender} onChange={(value) => {
                                setUpdateValue(value);
                            }}>
                                <Space direction="horizontal">
                                    {
                                        GenderOptions.map(
                                            ele => <Radio value={ele.value}>{ele.label}</Radio>
                                        )
                                    }
                                </Space>
                            </Radio.Group>
                        }
                    </Form.Item>
                </Form>
            </Popup>
        </div>
    );
}