import React from 'react';
import { Tabs, Button, Alert, Affix, Space, Typography } from 'antd';
import Style from './web.module.less';
import Web from './web/index';
import WechatMp from './wechatMp/index';
import WechatPublic from './wechatPublic/index';

import {
    AppType,
    WebConfig,
    WechatPublicConfig,
    WechatMpConfig,
} from '../../../general-app-domain/Application/Schema';

type Config = WebConfig | WechatPublicConfig | WechatMpConfig;

function AppView(props: {
    type: AppType;
    config: Config;
    setValue: (path: string, value: string) => void;
    removeItem: (path: string, index: number) => void;
    cleanKey: (path: string, key: string) => void;
}) {
    const { type, config, setValue, removeItem, cleanKey } = props;
    if (type === 'web') {
        return (
            <Web
                config={(config as WebConfig) || {}}
                setValue={(path, value) => setValue(path, value)}
                removeItem={(path, index) => removeItem(path, index)}
                cleanKey={(path, key) => cleanKey(path, key)}
            />
        );
    }
    if (type === 'wechatMp') {
        return (
            <WechatMp
                config={(config as WechatMpConfig) || {}}
                setValue={(path, value) => setValue(path, value)}
                removeItem={(path, index) => removeItem(path, index)}
                cleanKey={(path, key) => cleanKey(path, key)}
            />
        );
    }
    if (type === 'wechatPublic') {
        return (
            <WechatPublic
                config={(config as WechatPublicConfig) || {}}
                setValue={(path, value) => setValue(path, value)}
                removeItem={(path, index) => removeItem(path, index)}
                cleanKey={(path, key) => cleanKey(path, key)}
            />
        );
    }
    return null;
}

export default function render(this: any) {
    const { entity, name, type } = this.props;
    const { currentConfig, dirty } = this.state;

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
                            key: '参数设置',
                            label: '参数设置',
                            children: (
                                <AppView
                                    type={type}
                                    config={currentConfig || {}}
                                    setValue={(path, value) =>
                                        this.setValue(path, value)
                                    }
                                    removeItem={(path, index) =>
                                        this.removeItem(path, index)
                                    }
                                    cleanKey={(path, key) =>
                                        this.cleanKey(path, key)
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
