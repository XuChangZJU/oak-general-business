import React from 'react';
import { Tag, Avatar, Descriptions } from 'antd';
import ActionPanel from 'oak-frontend-base/es/components/func/actionPanel';
export default function render(props) {
    const { nickname, avatar, name, userState, idState, gender, stateColor, idStateColor, mobileText, executableActions, actionDescriptions, birth, } = props.data;
    const { t, onActionClick } = props.methods;
    return (<>
            <Descriptions extra={<ActionPanel actions={executableActions} actionDescriptions={actionDescriptions} onActionClick={(action) => onActionClick(action)}/>}>
                <Descriptions.Item label={t('avatar')}>
                    {avatar ? <Avatar src={avatar}/> : t('unset')}
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
                    <Tag color={stateColor[userState]}>
                        {t(`user:v.userState.${userState}`)}
                    </Tag>
                </Descriptions.Item>
                <Descriptions.Item label={t('user:attr.idState')}>
                    <Tag color={idStateColor[idState]}>
                        {t(`user:v.idState.${idState}`)}
                    </Tag>
                </Descriptions.Item>
            </Descriptions>
        </>);
}
