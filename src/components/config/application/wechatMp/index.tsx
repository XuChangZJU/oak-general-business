import React, { useState } from 'react';
import {
    Tabs,
    Row,
    Col,
    Card,
    Divider,
    Input,
    Form,
    Space,
    Select,
} from 'antd';
import Styles from './web.module.less';
import {
    AppType,
    WechatMpConfig,
} from '../../../../general-app-domain/Application/Schema';




export default function WechatMp(props: {
    config: WechatMpConfig;
    setValue: (path: string, value: any) => void;
    removeItem: (path: string, index: number) => void;
    cleanKey: (path: string, key: string) => void;
}) {
    const { config, setValue } = props;
    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Row>
                <Card className={Styles.tips}>
                    每种均可配置一个，相应的服务所使用的帐号请准确对应
                </Card>
            </Row>
            <Col flex="auto">
                <Divider orientation="left" className={Styles.title}>
                    微信小程序-基础
                </Divider>
                <Form
                    colon={true}
                    labelAlign="left"
                    layout="vertical"
                    style={{ marginTop: 10 }}
                >
                    <Form.Item label="appId" name="appId">
                        <>
                            <Input
                                placeholder="请输入appId"
                                type="text"
                                value={config?.appId}
                                onChange={(e) =>
                                    setValue(`appId`, e.target.value)
                                }
                            />
                        </>
                    </Form.Item>
                    <Form.Item label="appSecret" name="appSecret">
                        <>
                            <Input
                                placeholder="请输入appSecret"
                                type="text"
                                value={config?.appSecret}
                                onChange={(e) =>
                                    setValue(`appSecret`, e.target.value)
                                }
                            />
                        </>
                    </Form.Item>
                    <Form.Item label="qrCodePrefix" name="qrCodePrefix">
                        <>
                            <Input
                                placeholder="请输入qrCodePrefix"
                                type="text"
                                value={config?.qrCodePrefix}
                                onChange={(e) =>
                                    setValue(`qrCodePrefix`, e.target.value)
                                }
                            />
                        </>
                    </Form.Item>
                </Form>
            </Col>
            <Col flex="auto">
                <Divider orientation="left" className={Styles.title}>
                    微信小程序-服务器配置
                </Divider>
                <Form
                    colon={true}
                    labelAlign="left"
                    layout="vertical"
                    style={{ marginTop: 10 }}
                >
                    <Form.Item label="服务器地址(URL)" name="url">
                        <>
                            <Input
                                placeholder="请输入服务器地址(URL)，选填"
                                type="text"
                                value={config?.server?.url}
                                onChange={(e) =>
                                    setValue(`server.url`, e.target.value)
                                }
                            />
                        </>
                    </Form.Item>
                    <Form.Item label="令牌(Token)" name="token">
                        <>
                            <Input
                                placeholder="请输入令牌(Token)"
                                type="text"
                                value={config?.server?.token}
                                onChange={(e) =>
                                    setValue(`server.token`, e.target.value)
                                }
                            />
                        </>
                    </Form.Item>
                    <Form.Item
                        label="消息加解密密钥(EncodingAESKey)"
                        name="encodingAESKey"
                        tooltip="消息加解密密钥将用于消息体加解密过程。具体功能请参见微信文档"
                    >
                        <>
                            <Input
                                placeholder="请输入消息加解密密钥(EncodingAESKey)"
                                type="text"
                                value={config?.server?.encodingAESKey}
                                onChange={(e) =>
                                    setValue(
                                        `server.encodingAESKey`,
                                        e.target.value
                                    )
                                }
                            />
                        </>
                    </Form.Item>
                    <Form.Item label="消息加解密方式" name="mode">
                        <>
                            <Select
                                placeholder="请选择消息加解密方式"
                                value={config?.server?.mode}
                                onChange={(value) =>
                                    setValue(`server.mode`, value)
                                }
                                options={[
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
                                ]}
                            />
                        </>
                    </Form.Item>
                    <Form.Item label="数据格式" name="dataFormat">
                        <>
                            <Select
                                placeholder="请选择消息加解密方式"
                                value={config?.server?.dataFormat}
                                onChange={(value) =>
                                    setValue(`server.dataFormat`, value)
                                }
                                options={[
                                    {
                                        value: 'json',
                                        label: 'JSON',
                                    },
                                    {
                                        value: 'xml',
                                        label: 'XML',
                                    },
                                ]}
                            />
                        </>
                    </Form.Item>
                </Form>
            </Col>
        </Space>
    );
}