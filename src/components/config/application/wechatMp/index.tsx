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
        </Space>
    );
}