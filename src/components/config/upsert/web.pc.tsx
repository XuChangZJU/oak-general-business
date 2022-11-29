import React from 'react';
import { Tabs, Button, Alert, Affix , Space, Typography } from 'antd';
import Style from './web.module.less';
import Account from './account/index';
import Cos from './cos/index';
import Map from './map/index';
import Live from './live/index';

import { Config } from '../../../types/Config';

import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'user',
        false,
        {
            entity: string;
            name: string;
            currentConfig: Config;
            dirty: boolean;
        },
        {
            resetConfig: () => void;
            updateConfig: () => void;
            setValue: (path: string, value: string) => void;
            removeItem: (path: string, index: number) => void;
        }
    >
) {
    const { entity, name, currentConfig, dirty } = props.data;
    const { resetConfig, updateConfig, setValue, removeItem } = props.methods;
    const { Account: account, Cos: cos, Map: map, Live: live } = currentConfig || {};
    return (
        <>
            <Affix offsetTop={64}>
                <Alert
                    message={
                        <div>
                            <text>
                                您正在更新
                                <Typography.Text
                                    keyboard
                                    className={Style.weight}
                                >
                                    {entity}
                                </Typography.Text>
                                对象
                                <Typography.Text
                                    keyboard
                                    className={Style.weight}
                                >
                                    {name}
                                </Typography.Text>
                                的配置，请谨慎操作
                            </text>
                        </div>
                    }
                    type="info"
                    showIcon
                    action={
                        <Space>
                            <Button
                                disabled={!dirty}
                                type="primary"
                                danger
                                onClick={() => resetConfig()}
                                style={{
                                    marginRight: 10,
                                }}
                            >
                                重置
                            </Button>
                            <Button
                                disabled={!dirty}
                                type="primary"
                                onClick={() => updateConfig()}
                            >
                                确定
                            </Button>
                        </Space>
                    }
                />
            </Affix>
            <div className={Style.container}>
                <Tabs
                    tabPosition="left"
                    items={[
                        {
                            key: '云平台帐号',
                            label: '云平台帐号',
                            children: (
                                <Account
                                    account={account || {}}
                                    setValue={(path, value) =>
                                        setValue(`Account.${path}`, value)
                                    }
                                    removeItem={(path, index) =>
                                        removeItem(
                                            `Account.${path}`,
                                            index
                                        )
                                    }
                                />
                            ),
                        },
                        {
                            key: '云存储设置',
                            label: '云存储设置',
                            children: (
                                <Cos
                                    cos={cos || {}}
                                    setValue={(path, value) =>
                                        setValue(`Cos.${path}`, value)
                                    }
                                />
                            ),
                        },
                        {
                            key: '直播api设置',
                            label: '直播api设置',
                            children: (
                                <Live
                                    live={live || {}}
                                    setValue={(path, value) =>
                                        setValue(`Map.${path}`, value)
                                    }
                                />
                            ),
                        },
                        {
                            key: '地图api设置',
                            label: '地图api设置',
                            children: (
                                <Map
                                    map={map || {}}
                                    setValue={(path, value) =>
                                        setValue(`Map.${path}`, value)
                                    }
                                />
                            ),
                        },
                    ]}
                ></Tabs>
            </div>
        </>
    );
}