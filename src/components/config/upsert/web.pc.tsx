import React from 'react';
import { Tabs, Button, Alert, Affix , Space, Typography } from 'antd';
import Style from './web.module.less';
import Account from './account/index';
import Cos from './cos/index';
import Map from './map/index';
import Live from './live/index';

import { Config } from '../../../types/Config';

export default function render(this: any) {
    const { entity, name } = this.props;
    const { currentConfig, dirty } = this.state;
    const {
        Account: account,
        Cos: cos,
        Map: map,
        Live: live,
    } = currentConfig as Config;
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
                                onClick={() => this.resetConfig()}
                                style={{
                                    marginRight: 10,
                                }}
                            >
                                重置
                            </Button>
                            <Button
                                disabled={!dirty}
                                type="primary"
                                onClick={() => this.updateConfig()}
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
                                        this.setValue(`Account.${path}`, value)
                                    }
                                    removeItem={(path, index) =>
                                        this.removeItem(
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
                                        this.setValue(`Cos.${path}`, value)
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
                                        this.setValue(`Map.${path}`, value)
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
                                        this.setValue(`Map.${path}`, value)
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