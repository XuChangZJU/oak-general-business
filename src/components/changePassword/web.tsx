import React, { useState } from 'react';
import { Tabs, Alert } from 'antd';

import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../oak-app-domain';
import ByMobile from './byMobile';
import ByPassword from './byPassword';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'user',
        false,
        {
            channels: string[];
            oakId: string;
            loading: boolean;
        },
        {
            goToMobile: () => void;
        }
    >
) {
    const { data, methods } = props;
    const { channels, oakFullpath, oakId, loading } = data;
    const { goToMobile } = methods;


    if (loading) {
        return null
    }

    const items = [
        {
            key: 'password',
            label: '原密码验证',
            children: (
                <ByPassword
                    oakId={oakId}
                    oakPath={oakFullpath + '.user'}
                    oakAutoUnmount={true}
                />
            ),
        },
        {
            key: 'mobile',
            label: '手机号验证',
            children: (
                <ByMobile
                    oakId={oakId}
                    oakPath={oakFullpath + '.user'}
                    oakAutoUnmount={true}
                />
            ),
        },
    ];
    if (channels.length === 0) {
        return (
            <Alert
                message={
                    <>
                        请您先
                        <div
                            style={{
                                color: 'blue',
                                display: 'inline',
                                textDecoration: 'underline',
                            }}
                            onClick={() => goToMobile()}
                        >
                            点此绑定手机号
                        </div>
                        再进行密码修改
                    </>
                }
                type="info"
            />
        );
    }
    return <Tabs items={items.filter((ele) => channels.includes(ele.key))} />;
}
