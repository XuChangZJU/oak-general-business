import React from 'react';
import { Button, Alert, Affix, Space, Typography } from 'antd';
import Style from './web.module.less';
import Web from './web/index';
import WechatMp from './wechatMp/index';
import WechatPublic from './wechatPublic/index';
function AppView(props) {
    const { type, config, setValue, removeItem, cleanKey, isService } = props;
    if (type === 'web') {
        return (<Web config={config || {}} setValue={(path, value) => setValue(path, value)} removeItem={(path, index) => removeItem(path, index)} cleanKey={(path, key) => cleanKey(path, key)}/>);
    }
    if (type === 'wechatMp') {
        return (<WechatMp config={config || {}} setValue={(path, value) => setValue(path, value)} removeItem={(path, index) => removeItem(path, index)} cleanKey={(path, key) => cleanKey(path, key)}/>);
    }
    if (type === 'wechatPublic') {
        return (<WechatPublic isService={isService} config={config || {}} setValue={(path, value) => setValue(path, value)} removeItem={(path, index) => removeItem(path, index)} cleanKey={(path, key) => cleanKey(path, key)}/>);
    }
    return null;
}
export default function render(props) {
    const { entity, name, type, currentConfig, dirty, isService, } = props.data;
    const { resetConfig, updateConfig, setValue, removeItem, cleanKey } = props.methods;
    return (<>
            <Affix offsetTop={64}>
                <Alert message={<div>
                            <text>
                                您正在更新
                                <Typography.Text keyboard className={Style.weight}>
                                    {entity}
                                </Typography.Text>
                                对象
                                <Typography.Text keyboard className={Style.weight}>
                                    {name}
                                </Typography.Text>
                                的配置，请谨慎操作
                            </text>
                        </div>} type="info" showIcon action={<Space>
                            <Button disabled={!dirty} type="primary" danger onClick={() => resetConfig()} style={{
                marginRight: 10,
            }}>
                                重置
                            </Button>
                            <Button disabled={!dirty} type="primary" onClick={() => updateConfig()}>
                                确定
                            </Button>
                        </Space>}/>
            </Affix>
            <div className={Style.container}>
                <AppView isService={isService} type={type} config={currentConfig || {}} setValue={(path, value) => setValue(path, value)} removeItem={(path, index) => removeItem(path, index)} cleanKey={(path, key) => cleanKey(path, key)}/>
            </div>
        </>);
}
