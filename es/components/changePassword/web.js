import React from 'react';
import { Tabs, Alert } from 'antd';
import ByMobile from './byMobile';
import ByPassword from './byPassword';
export default function Render(props) {
    const { data, methods } = props;
    const { channels, oakFullpath, oakId, loading } = data;
    const { goToMobile } = methods;

    if (loading) {
        return null;
    }

    const items = [
        {
            key: 'password',
            label: '原密码验证',
            children: <ByPassword oakId={oakId} oakPath={oakFullpath}/>,
        },
        {
            key: 'mobile',
            label: '手机号验证',
            children: <ByMobile oakId={oakId} oakPath={oakFullpath}/>,
        },
    ];
    if (channels.length === 0) {
        return (<Alert message={<>
                        请您先
                        <div style={{
                    color: 'blue',
                    display: 'inline',
                    textDecoration: 'underline',
                }} onClick={() => goToMobile()}>
                            点此绑定手机号
                        </div>
                        再进行密码修改
                    </>} type="info"/>);
    }
    return <Tabs items={items.filter((ele) => channels.includes(ele.key))}/>;
}
