import React from 'react';
import { Tabs, Button } from 'tdesign-react';
const { TabPanel } = Tabs;
import classNames from 'classnames';
import Styles from './web.module.less';
import Account from './account/index';
import { Config } from '../../../types/Config';

export default function render(this: any) {
    const { entity, name } = this.props;
    const { currentConfig, dirty } = this.state;
    const { Account: account } = currentConfig as Config;
    return (
        <>
            <div className={Styles.padding} />
            <div className={Styles.ctrl}>
                <text>您正在更新<text className={Styles.weight}>{entity}</text>对象<text className={Styles.weight}>{name}</text>的配置，请谨慎操作</text>
                <span>
                    <Button
                        disabled={!dirty}
                        theme="primary"
                        onClick={() => this.resetConfig()}
                        style={{
                            marginRight: 10,
                        }}
                    >
                        重置
                    </Button>
                    <Button
                        disabled={!dirty}
                        theme="danger"
                        onClick={() => this.updateConfig()}
                    >
                        确定
                    </Button>
                </span>
            </div>
            <div
                className={Styles.container}
            >
                <Tabs placement='left'>
                    <TabPanel label="云平台帐号" style={{
                        marginLeft: 20,
                    }}>
                        <Account
                            account={account || {}}
                            setValue={(path, value) => this.setValue(`Account.${path}`, value)}
                            removeItem={(path, index) => this.removeItem(`Account.${path}`, index)}
                        />
                    </TabPanel>
                </Tabs>
            </div>
        </>
    );
}