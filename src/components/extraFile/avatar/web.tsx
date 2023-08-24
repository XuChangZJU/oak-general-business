import React, { useState, useEffect } from 'react';

import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import classNames from 'classnames';
import Style from './web.module.less';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';


export default function render(
    props: WebComponentProps<
        EntityDict,
        'extraFile',
        true,
        {
            style?: Record<string, string>;
            className?: string;
            avatarUrl?: string;
        },
        {
            onPickByWeb: (files: File[]) => void;
        }
    >
) {
    const { style, className, avatarUrl } = props.data;
    const { onPickByWeb } = props.methods;

    return (
        <>
            <input
                id="input-for-upload"
                accept="image/*"
                className={Style.input}
                onChange={(evt) => {
                    const { files } = evt.currentTarget;
                    onPickByWeb(Object.values(files!));
                    //evt.target.value = null;
                }}
                type="file"
            />
            <label htmlFor="input-for-upload">
                {avatarUrl ? (
                    <Avatar size={64} src={avatarUrl} />
                ) : (
                    <Avatar size={64} icon={<UserOutlined />} />
                )}
            </label>
        </>
    );
}
