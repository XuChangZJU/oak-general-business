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
} from 'antd';
import Styles from './web.module.less';
import {
    AppType,
    WebConfig,
    Passport,
} from '../../../../general-app-domain/Application/Schema';




export default function Web(props: {
    config: WebConfig;
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
                        label="是否开启"
                        name="enable"
                        tooltip="网页微信扫码登录是否开启，如果不开启，登录页不会出现微信扫码入口"
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
                                onChange={(value: string[]) => {
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
                                            label: '微信二维码',
                                            value: 'wechat',
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