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
} from 'antd';
import Styles from './web.module.less';
import { Config, QiniuLiveConfig } from '../../../../types/Config';


function Qiniu(props: {
    live: QiniuLiveConfig;
    setValue: (path: string, value: any) => void;
}) {
    const { live, setValue } = props;
    return (
        <Col flex="auto">
            <Divider orientation="left" className={Styles.title}>
                七牛云配置
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
                                <Form.Item label="accessKey" name="accessKey">
                                    <>
                                        <Input
                                            placeholder="请输入accessKey"
                                            type="text"
                                            value={live?.accessKey}
                                            onChange={(e) =>
                                                setValue(
                                                    `accessKey`,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </>
                                </Form.Item>
                                <Form.Item label="hub" name="hub">
                                    <>
                                        <Input
                                            placeholder="请输入hub"
                                            type="text"
                                            value={live?.hub}
                                            onChange={(e) =>
                                                setValue(`hub`, e.target.value)
                                            }
                                        />
                                    </>
                                </Form.Item>
                                <Form.Item label="liveHost" name="liveHost">
                                    <>
                                        <Input
                                            placeholder="请输入liveHost"
                                            type="text"
                                            value={live?.liveHost}
                                            onChange={(e) =>
                                                setValue(
                                                    `liveHost`,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </>
                                </Form.Item>
                                <Form.Item label="playDomain" name="playDomain">
                                    <>
                                        <Input
                                            placeholder="请输入playDomain"
                                            type="text"
                                            value={live?.playDomain}
                                            onChange={(e) =>
                                                setValue(
                                                    `playDomain`,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </>
                                </Form.Item>
                                <Form.Item
                                    label="playBackDomain"
                                    name="playBackDomain"
                                >
                                    <>
                                        <Input
                                            placeholder="请输入playBackDomain"
                                            type="text"
                                            value={live?.playBackDomain}
                                            onChange={(e) =>
                                                setValue(
                                                    `playBackDomain`,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </>
                                </Form.Item>
                                <Form.Item label="playKey" name="playKey">
                                    <>
                                        <Input
                                            placeholder="请输入playKey"
                                            type="text"
                                            value={live?.playKey}
                                            onChange={(e) =>
                                                setValue(
                                                    `playKey`,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </>
                                </Form.Item>
                                <Form.Item
                                    label="publishDomain"
                                    name="publishDomain"
                                >
                                    <>
                                        <Input
                                            placeholder="请输入publishDomain"
                                            type="text"
                                            value={live?.publishDomain}
                                            onChange={(e) =>
                                                setValue(
                                                    `publishDomain`,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </>
                                </Form.Item>
                                <Form.Item label="publishKey" name="publishKey">
                                    <>
                                        <Input
                                            placeholder="请输入publishKey"
                                            type="text"
                                            value={live?.publishKey}
                                            onChange={(e) =>
                                                setValue(
                                                    `publishKey`,
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
    );
}

export default function Cos(props: {
    live: Required<Config>['Live'];
    setValue: (path: string, value: any) => void;
}) {
    const { live, setValue } = props;
    const { qiniu } = live;
    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Row>
                <Card className={Styles.tips}>
                    每种均可配置一个，相应的服务所使用的帐号请准确对应
                </Card>
            </Row>
            <Qiniu
                live={qiniu!}
                setValue={(path, value) => setValue(`qiniu.${path}`, value)}
            />
        </Space>
    );
}