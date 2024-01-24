import React from 'react';
import { Row, Col, Card, Divider, Input, Form, Space, Select, } from 'antd';
import Styles from './web.module.less';
export default function WechatMp(props) {
    const { config, setValue } = props;
    return (<Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Row>
                <Card className={Styles.tips}>
                    每种均可配置一个，相应的服务所使用的帐号请准确对应
                </Card>
            </Row>
            <Col flex="auto">
                <Divider orientation="left" className={Styles.title}>
                    微信小程序-基础
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
                    <Form.Item label="普通链接二维码规则" tooltip="扫普通链接二维码打开小程序，如原有二维码链接为 http://www.qq.com/a/123456 ，其中12345为uuid，则可配置规则 http://www.qq.com/a/ 。 请在输入框中填写 http://www.qq.com/a ，系统将在生成二维码时，在链接末尾加上'/'和uuid，从而实现扫码打开小程序的规则。">
                        <>
                            <Input placeholder="请输入普通链接二维码规则" type="text" value={config?.qrCodePrefix} onChange={(e) => setValue(`qrCodePrefix`, e.target.value)}/>
                        </>
                    </Form.Item>
                </Form>
            </Col>
            <Col flex="auto">
                <Divider orientation="left" className={Styles.title}>
                    微信小程序-服务器配置
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
                    <Form.Item label="数据格式">
                        <>
                            <Select placeholder="请选择消息加解密方式" value={config?.server?.dataFormat} onChange={(value) => setValue(`server.dataFormat`, value)} options={[
            {
                value: 'json',
                label: 'JSON',
            },
            {
                value: 'xml',
                label: 'XML',
            },
        ]}/>
                        </>
                    </Form.Item>
                </Form>
            </Col>
        </Space>);
}
