import React, { useState } from 'react';
import Styles from './web.pc.module.less';
import { Button, List, Modal, Tag, Input, Radio } from 'antd';
import MyAvatar from '../avatar';
import OakIcon from 'oak-frontend-base/es/components/icon';
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
export default function Render(props) {
    const { nameText, mobileText, userId, nickname, name, idState, userState, gender, showLogout } = props.data;
    const { t, logout, navigateTo, updateAttribute } = props.methods;
    const [updateAttr, setUpdateAttr] = useState(undefined);
    const [updateValue, setUpdateValue] = useState(undefined);
    if (!userId) {
        return (<div className={Styles.container}>
                <div className={Styles.header}>
                    <Button onClick={() => navigateTo({
                url: '/login',
            })}>
                        {t('login')}
                    </Button>
                </div>
                <div className={Styles.body}></div>
            </div>);
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
    return (<div className={Styles.container}>
            <div className={Styles.header}>
                <MyAvatar size={66} iconColor="white"/>
                <div className={Styles.name}>{nameText || t('unset')}</div>
                {showLogout && <Button size='small' onClick={() => logout()}>
                        {t('logout')}
                    </Button>}
            </div>
            <div className={Styles.body}>
                <List itemLayout="vertical">
                    <List.Item extra={<OakIcon name="pen-to-square"/>} onClick={() => setUpdateAttr('nickname')}>
                        <List.Item.Meta title={t('user:attr.nickname')} description={nickname || t('unset')}/>
                    </List.Item>
                    <List.Item extra={<OakIcon name="pen-to-square"/>} onClick={() => setUpdateAttr('name')}>
                        <List.Item.Meta title={t('user:attr.name')} description={name || t('unset')}/>
                    </List.Item>
                    <List.Item>
                        <List.Item.Meta title={t('user:attr.userState')} description={<Tag color={UserStateColor[userState]}>{t(`user:v.userState.${userState}`)}</Tag>}/>
                    </List.Item>
                    <List.Item>
                        <List.Item.Meta title={t('user:attr.idState')} description={<Tag color={IdStateColor[idState]}>{t(`user:v.idState.${idState}`)}</Tag>}/>
                    </List.Item>
                    <List.Item extra={<OakIcon name="pen-to-square"/>} onClick={() => setUpdateAttr('gender')}>
                        <List.Item.Meta title={t('user:attr.gender')} description={gender ? t(`user:v.gender.${gender}`) : t('unset')}/>
                    </List.Item>
                    <a href='/mobile/me'>
                        <List.Item extra={<OakIcon name="chevron-right"/>}>
                            <List.Item.Meta title={t('mobile')} description={mobileText}/>
                        </List.Item>
                    </a>
                </List>
            </div>
            <div className={Styles.extraContainer}>
                <div className={Styles.extra}>
                    <a href="/user/manage">
                        <OakIcon name="wand-magic-sparkles" size={26} color="warning"/>
                    </a>
                </div>
            </div>
            <Modal open={!!updateAttr} onOk={async () => {
            await updateAttribute(updateAttr, updateValue);
            setUpdateAttr(undefined);
            setUpdateValue(undefined);
        }} onCancel={() => {
            setUpdateAttr(undefined);
            setUpdateValue(undefined);
        }} okButtonProps={{
            disabled: updateValue === undefined,
        }}>
                {updateAttr !== 'gender'
            && <Input maxLength={updateAttr === 'name' ? 16 : 64} value={updateValue || props.data[updateAttr]} onChange={({ target }) => {
                    const { value } = target;
                    setUpdateValue(value);
                }}/>}
                {updateAttr === 'gender'
            && <Radio.Group options={GenderOptions} value={updateValue || gender} onChange={(e) => {
                    const { value } = e.target;
                    setUpdateValue(value);
                }}/>}
            </Modal>
        </div>);
}
