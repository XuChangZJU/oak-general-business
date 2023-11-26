import React from 'react';
import { Button, Space, Typography, Result } from 'antd';
import Style from './web.module.less';
import { WechatOutlined, MehOutlined } from '@ant-design/icons';
const { Text, Title } = Typography;
export default function Render(props) {
    const { oakLoading, oakExecuting, type, expired, expiresAt, user, successed, userId, loginUserId, appId, oakDirty, } = props.data;
    const { t, getCodeAndRedirect } = props.methods;
    let V;
    // if (!isWeiXin) {
    //     return <div
    //         style={{
    //             padding: 20,
    //             display: 'flex',
    //             alignItems: 'center',
    //             justifyContent: 'center',
    //         }}
    //     >
    //         请使用微信浏览器打开当前页面
    //     </div>
    // }
    if (type === 'bind') {
        V = (<Space direction="vertical" align='center' size={16}>
                <Text type="success" style={{ color: 'var(--oak-color-primary)' }}>
                    您尚未绑定微信，绑定登录更便捷
                </Text>
                <Text type="secondary">
                    点击下方按钮绑定您的微信账号
                </Text>
                <Button disabled={oakExecuting || oakLoading} type="primary" shape="round" icon={<WechatOutlined />} size={"large"} onClick={() => getCodeAndRedirect()}>
                    绑定微信
                </Button>
            </Space>);
        if (successed) {
            V = (<Result status={"success"} title={"绑定微信成功"}/>);
        }
    }
    else if (type === 'login') {
        V = (<Space direction="vertical" align='center' size={16}>
                <Button disabled={oakExecuting || oakLoading} type="primary" shape="round" icon={<WechatOutlined />} size={"large"} onClick={() => getCodeAndRedirect()}>
                    一键登录
                </Button>
            </Space>);
        if (successed) {
            V = (<Result status={"success"} title={"登录成功"}/>);
        }
    }
    else if (expired) {
        V = (<Space direction="vertical" align='center' size={12}>
                <MehOutlined style={{ fontSize: 24, color: 'var(--oak-color-warning)' }}/>
                <Text type="warning">
                    二维码已过期，请重新扫码
                </Text>
            </Space>);
    }
    return (<div className={Style.container}>
            <div className={Style.content}>
                {V ? V : (<Space direction="vertical" align='center' size={16}>
                        <Text type="success" style={{ color: 'var(--oak-color-primary)' }}>
                            您尚未绑定微信，绑定登录更便捷
                        </Text>
                        <Text type="secondary">
                            点击下方按钮绑定您的微信账号
                        </Text>
                        <Button disabled={oakExecuting || oakLoading} type="primary" shape="round" icon={<WechatOutlined />} size={"large"} onClick={() => getCodeAndRedirect()}>
                            绑定微信
                        </Button>
                    </Space>)}
            </div>
        </div>);
}
