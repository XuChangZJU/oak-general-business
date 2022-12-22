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

import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';

type Config = WebConfig | WechatPublicConfig | WechatMpConfig;

function AppView(props: {
    isService?: boolean;
    type: AppType;
    config: Config;
    setValue: (path: string, value: string) => void;
    removeItem: (path: string, index: number) => void;
    cleanKey: (path: string, key: string) => void;
}) {
    const { type, config, setValue, removeItem, cleanKey, isService } = props;
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
                isService={isService}
                config={(config as WechatPublicConfig) || {}}
                setValue={(path, value) => setValue(path, value)}
                removeItem={(path, index) => removeItem(path, index)}
                cleanKey={(path, key) => cleanKey(path, key)}
            />
        );
    }
    return null;
}

export default function render(
    props: WebComponentProps<
        EntityDict,
        'user',
        false,
        {
            entity: string;
            name: string;
            currentConfig: Config;
            dirty: boolean;
            type: AppType;
            isService?: boolean; //只对type为wechatPublic有效 默认配置服务号
        },
        {
            resetConfig: () => void;
            updateConfig: () => void;
            setValue: (path: string, value: string) => void;
            removeItem: (path: string, index: number) => void;
            cleanKey: (path: string, key: string) => void;
        }
    >
) {
    const {
        entity,
        name,
        type,
        currentConfig,
        dirty,
        isService = true,
    } = props.data;
    const { resetConfig, updateConfig, setValue, removeItem, cleanKey } =
        props.methods;

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
                            key: '参数设置',
                            label: '参数设置',
                            children: (
                                <AppView
                                    isService={isService}
                                    type={type}
                                    config={currentConfig || {}}
                                    setValue={(path, value) =>
                                        setValue(path, value)
                                    }
                                    removeItem={(path, index) =>
                                        removeItem(path, index)
                                    }
                                    cleanKey={(path, key) =>
                                        cleanKey(path, key)
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
