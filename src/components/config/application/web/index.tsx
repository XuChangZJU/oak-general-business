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
    Switch,
    message,
} from 'antd';
import Styles from './web.module.less';
import {
    AppType,
    WebConfig,
    Passport,
} from '../../../../oak-app-domain/Application/Schema';




export default function Web(props: {
    config: WebConfig;
    setValue: (path: string, value: any) => void;
    removeItem: (path: string, index: number) => void;
    cleanKey: (path: string, key: string) => void;
}) {
    const { config, setValue } = props;
    const [messageApi] = message.useMessage();
    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Row>
                <Card className={Styles.tips}>
                    每种均可配置一个，相应的服务所使用的帐号请准确对应
                </Card>
            </Row>
            <Col flex="auto">
                <Divider orientation="left" className={Styles.title}>
                    网站-微信扫码
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
                                value={config?.wechat?.appId}
                                onChange={(e) =>
                                    setValue(`wechat.appId`, e.target.value)
                                }
                            />
                        </>
                    </Form.Item>
                    <Form.Item label="appSecret" name="appSecret">
                        <>
                            <Input
                                placeholder="请输入appSecret"
                                type="text"
                                value={config?.wechat?.appSecret}
                                onChange={(e) =>
                                    setValue(`wechat.appSecret`, e.target.value)
                                }
                            />
                        </>
                    </Form.Item>
                    <Form.Item
                        label="授权回调域"
                        name="domain"
                        tooltip="授权回调域可选填，未填写的话，使用网页访问的域名当作授权回调域"
                    >
                        <>
                            <Input
                                placeholder="请输入授权回调域"
                                type="text"
                                value={config?.wechat?.domain}
                                onChange={(e) =>
                                    setValue(`wechat.domain`, e.target.value)
                                }
                            />
                        </>
                    </Form.Item>
                    <Form.Item
                        label="微信网站应用授权登录"
                        name="enable"
                        tooltip="开启后，登录页显示微信扫码入口，微信扫码后使用微信网站应用授权登录"
                        help="开启当前登录方式时，将同时关闭微信公众号扫码登录"
                    >
                        <>
                            <Switch
                                checkedChildren="是"
                                unCheckedChildren="否"
                                checked={config?.wechat?.enable}
                                onChange={(checked) =>
                                    setValue(`wechat.enable`, checked)
                                }
                            />
                        </>
                    </Form.Item>
                </Form>
            </Col>

            <Col flex="auto">
                <Divider orientation="left" className={Styles.title}>
                    网站-授权方式
                </Divider>
                <Form
                    colon={true}
                    labelAlign="left"
                    layout="vertical"
                    style={{ marginTop: 10 }}
                >
                    <Form.Item label="passport" name="passport">
                        <>
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: '100%' }}
                                placeholder="请选择授权方式"
                                value={config?.passport as Passport[]}
                                onChange={(value: Passport[]) => {
                                    if (value.includes('wechat') && value.includes('wechatPublic')) {
                                        // messageApi.warning('微信网站和微信公众号中，只能选择一个');
                                        message.warning('微信网站和微信公众号中，只能选择一个')
                                        return;
                                    }
                                    setValue(`passport`, value);
                                }}
                                options={
                                    [
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
                                    ] as Array<{
                                        label: string;
                                        value: Passport;
                                    }>
                                }
                            />
                        </>
                    </Form.Item>
                </Form>
            </Col>
        </Space>
    );
}