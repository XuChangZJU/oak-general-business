import React from 'react';
import { Space } from 'antd';
import UnbindBtn from '../unbindBtn';
export default function Render(props) {
    const { wechatUsers, oakFullpath } = props.data;
    return (<Space>
            {wechatUsers && wechatUsers.map((ele) => (<UnbindBtn oakId={ele.id} oakPath={`${oakFullpath}.${ele.id}`}/>))}
        </Space>);
}
