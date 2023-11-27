import React, { useState } from 'react';
import { Row, Col, Card, Divider, Input, Form, Space, Switch, message, Select, } from 'antd';
import Styles from './web.module.less';
export default function WechatPublic(props) {
    const [open, setModal] = useState(false);
    const [messageType, setMessageType] = useState('');
    const { config, setValue, cleanKey, removeItem, isService = true } = props;
    const templateMsgs = config?.templateMsgs || {};
    return (<Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Row>
                <Card className={Styles.tips}>
                    每种均可配置一个，相应的服务所使用的帐号请准确对应
                </Card>
            </Row>
            <Col flex="auto">
                <Divider orientation="left" className={Styles.title}>
                    微信公众号-基础
                </Divider>
                <Form colon={true} labelAlign="left" layout="vertical" style={{ marginTop: 10 }}>
                    <Form.Item label="appId">
                        <>
                            <Input placeholder="请输入appId" type="text" value={config?.appId} onChange={(e) => setValue(`appId`, e.target.value)}/>
                        </>
                    </Form.Item>
                    <Form.Item label="appSecret">
                        <>
                            <Input placeholder="请输入appSecret" type="text" value={config?.appSecret} onChange={(e) => setValue(`appSecret`, e.target.value)}/>
                        </>
                    </Form.Item>
                    <Form.Item label="原始ID">
                        <>
                            <Input placeholder="请输入原始ID" type="text" value={config?.originalId} onChange={(e) => setValue(`originalId`, e.target.value)}/>
                        </>
                    </Form.Item>
                    {isService && (<Form.Item label="是否为服务号">
                            <>
                                <Switch checkedChildren="是" unCheckedChildren="否" checked={config?.isService} onChange={(checked) => setValue(`isService`, checked)}/>
                            </>
                        </Form.Item>)}
                </Form>
            </Col>
            <Col flex="auto">
                <Divider orientation="left" className={Styles.title}>
                    网站-授权方式
                </Divider>
                <Form colon={true} labelAlign="left" layout="vertical" style={{ marginTop: 10 }}>
                    <Form.Item label="passport">
                        <>
                            <Select mode="multiple" allowClear style={{ width: '100%' }} placeholder="请选择授权方式" value={config?.passport} onChange={(value) => {
            if (value.includes('wechat') && value.includes('wechatPublic')) {
                // messageApi.warning('微信网站和微信公众号中，只能选择一个');
                message.warning('微信网站和微信公众号中，只能选择一个');
                return;
            }
            setValue(`passport`, value);
        }} options={[
            {
                label: '邮箱',
                value: 'email',
            },
            {
                label: '手机号',
                value: 'mobile',
            },
            {
                label: '微信网站',
                value: 'wechat',
            },
            {
                label: '微信公众号',
                value: 'wechatPublic',
            },
        ]}/>
                        </>
                    </Form.Item>
                </Form>
            </Col>
            <Col flex="auto">
                <Divider orientation="left" className={Styles.title}>
                    微信公众号-跳转小程序-小程序配置
                </Divider>
                <Form colon={true} labelAlign="left" layout="vertical" style={{ marginTop: 10 }}>
                    <Form.Item label="appId">
                        <>
                            <Input placeholder="请输入appId" type="text" value={config?.wechatMp?.appId} onChange={(e) => setValue(`wechatMp.appId`, e.target.value)}/>
                        </>
                    </Form.Item>
                    <Form.Item label="原始ID" 
    //name="originalId"
    tooltip="原始ID">
                        <>
                            <Input placeholder="请输入原始ID" type="text" value={config?.wechatMp?.originalId} onChange={(e) => setValue(`wechatMp.originalId`, e.target.value)}/>
                        </>
                    </Form.Item>
                </Form>
            </Col>
            {isService && (<Col flex="auto">
                    <Divider orientation="left" className={Styles.title}>
                        微信公众号-服务器配置
                    </Divider>
                    <Form colon={true} labelAlign="left" layout="vertical" style={{ marginTop: 10 }}>
                        <Form.Item label="服务器地址(URL)">
                            <>
                                <Input placeholder="请输入服务器地址(URL)，选填" type="text" value={config?.server?.url} onChange={(e) => setValue(`server.url`, e.target.value)}/>
                            </>
                        </Form.Item>
                        <Form.Item label="令牌(Token)">
                            <>
                                <Input placeholder="请输入令牌(Token)" type="text" value={config?.server?.token} onChange={(e) => setValue(`server.token`, e.target.value)}/>
                            </>
                        </Form.Item>
                        <Form.Item label="消息加解密密钥(EncodingAESKey)" 
        // name="encodingAESKey"
        tooltip="消息加解密密钥将用于消息体加解密过程。具体功能请参见微信文档">
                            <>
                                <Input placeholder="请输入消息加解密密钥(EncodingAESKey)" type="text" value={config?.server?.encodingAESKey} onChange={(e) => setValue(`server.encodingAESKey`, e.target.value)}/>
                            </>
                        </Form.Item>
                        <Form.Item label="消息加解密方式">
                            <>
                                <Select placeholder="请选择消息加解密方式" value={config?.server?.mode} onChange={(value) => setValue(`server.mode`, value)} options={[
                {
                    value: 'clear',
                    label: '明文模式',
                },
                {
                    value: 'compatible',
                    label: '兼容模式',
                },
                {
                    value: 'safe',
                    label: '安全模式',
                },
            ]}/>
                            </>
                        </Form.Item>
                    </Form>
                </Col>)}
        </Space>);
}
