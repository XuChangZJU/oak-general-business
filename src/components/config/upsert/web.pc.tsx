import React from 'react';
import { Tabs, Button, Alert, Affix , Space, Typography } from 'antd';
import Style from './web.module.less';
import Account from './account/index';
import { Config } from '../../../types/Config';
const { TabPane } = Tabs;

export default function render(this: any) {
    const { entity, name } = this.props;
    const { currentConfig, dirty } = this.state;
    const { Account: account } = currentConfig as Config;
    return (
        <>
            <Affix offsetTop={0}>
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
                <Tabs tabPosition="left">
                    <TabPane
                        key="云平台帐号"
                        tab="云平台帐号"
                        style={{
                            marginLeft: 20,
                        }}
                    >
                        <Account
                            account={account || {}}
                            setValue={(path, value) =>
                                this.setValue(`Account.${path}`, value)
                            }
                            removeItem={(path, index) =>
                                this.removeItem(`Account.${path}`, index)
                            }
                        />
                    </TabPane>
                </Tabs>
            </div>
        </>
    );
}