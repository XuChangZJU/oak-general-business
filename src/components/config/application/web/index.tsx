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
                <Tabs
                    tabPosition={'top'}
                    size={'middle'}
                    type="card"
                    items={[
                        {
                            key: '0',
                            label: '配置项',
                            children: (
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
                                                    setValue(
                                                        `wechat.appId`,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </>
                                    </Form.Item>
                                    <Form.Item
                                        label="appSecret"
                                        name="appSecret"
                                    >
                                        <>
                                            <Input
                                                placeholder="请输入appSecret"
                                                type="text"
                                                value={
                                                    config?.wechat?.appSecret
                                                }
                                                onChange={(e) =>
                                                    setValue(
                                                        `wechat.appSecret`,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </>
                                    </Form.Item>
                                </Form>
                            ),
                        },
                    ]}
                ></Tabs>
            </Col>

            <Col flex="auto">
                <Divider orientation="left" className={Styles.title}>
                    网站-授权方式
                </Divider>
                <Tabs
                    tabPosition={'top'}
                    size={'middle'}
                    type="card"
                    items={[
                        {
                            key: '0',
                            label: '配置项',
                            children: (
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
                                                value={
                                                    config?.passport as Passport[]
                                                }
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
                            ),
                        },
                    ]}
                ></Tabs>
            </Col>
        </Space>
    );
}