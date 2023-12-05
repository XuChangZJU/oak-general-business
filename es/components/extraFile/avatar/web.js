import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Style from './web.module.less';
export default function render(props) {
    const { style, className, avatarUrl } = props.data;
    const { onPickByWeb } = props.methods;
    return (<>
            <input id="input-for-upload" accept="image/*" className={Style.input} onChange={(evt) => {
            const { files } = evt.currentTarget;
            onPickByWeb(Object.values(files));
            //evt.target.value = null;
        }} type="file"/>
            <label htmlFor="input-for-upload">
                {avatarUrl ? (<Avatar size={64} src={avatarUrl}/>) : (<Avatar size={64} icon={<UserOutlined />}/>)}
            </label>
        </>);
}
