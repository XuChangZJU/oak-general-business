import React from 'react';
import { List, Tag, Avatar } from 'antd-mobile';
import Style from './mobile.module.less';
import ActionPanel from '../../../../components/func/actionPanel';
export default function render(props) {
    const { nickname, avatar, name, userState, idState, gender, stateColor, idStateColor, mobileText, executableActions, actionDescriptions, birth, } = props.data;
    const { t, onActionClick } = props.methods;
    return (<div className={Style.container}>
            <List className={Style.list}>
                <List.Item extra={avatar ? <Avatar src={avatar}/> : t('unset')}>
                    {t('avatar')}
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

                <List.Item extra={mobileText}>{t('mobile')}</List.Item>

                <List.Item extra={<Tag color={stateColor[userState]}>
                            {t(`user:v.userState.${userState}`)}
                        </Tag>}>
                    {t('user:attr.userState')}
                </List.Item>

                <List.Item extra={<Tag color={idStateColor[idState]}>
                            {t(`user:v.idState.${idState}`)}
                        </Tag>}>
                    {t('user:attr.idState')}
                </List.Item>
            </List>
            <ActionPanel actions={executableActions} actionDescriptions={actionDescriptions} onActionClick={(action) => onActionClick(action)}/>
        </div>);
}
