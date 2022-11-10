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
import { Config, QiniuCosConfig } from '../../../../types/Config';


function QiniuCos(props: {
    cos: QiniuCosConfig;
    setValue: (path: string, value: any) => void;
}) {
    const { cos, setValue } = props;
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
                                            value={cos?.accessKey}
                                            onChange={(e) =>
                                                setValue(
                                                    `accessKey`,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </>
                                </Form.Item>
                                <Form.Item label="bucket" name="bucket">
                                    <>
                                        <Input
                                            placeholder="请输入bucket"
                                            type="text"
                                            value={cos?.bucket}
                                            onChange={(e) =>
                                                setValue(
                                                    `bucket`,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </>
                                </Form.Item>
                                <Form.Item label="uploadHost" name="uploadHost">
                                    <>
                                        <Input
                                            placeholder="请输入uploadHost"
                                            type="text"
                                            value={cos?.uploadHost}
                                            onChange={(e) =>
                                                setValue(
                                                    `uploadHost`,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </>
                                </Form.Item>
                                <Form.Item label="domain" name="domain">
                                    <>
                                        <Input
                                            placeholder="请输入domain"
                                            type="text"
                                            value={cos?.domain}
                                            onChange={(e) =>
                                                setValue(
                                                    `domain`,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </>
                                </Form.Item>
                                <Form.Item label="protocol" name="protocol">
                                    <>
                                        <Select
                                            mode="multiple"
                                            allowClear
                                            style={{ width: '100%' }}
                                            placeholder="请选择协议"
                                            value={cos?.protocol as string[]}
                                            onChange={(value: string[]) => {
                                                setValue(`protocol`, value);
                                            }}
                                            options={[
                                                {
                                                    label: 'http',
                                                    value: 'http',
                                                },
                                                {
                                                    label: 'https',
                                                    value: 'https',
                                                },
                                            ]}
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
    cos: Required<Config>['Cos'];
    setValue: (path: string, value: any) => void;
}) {
    const { cos, setValue } = props;
    const { qiniu } = cos;
    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Row>
                <Card className={Styles.tips}>
                    每种均可配置一个，相应的服务所使用的帐号请准确对应
                </Card>
            </Row>
            <QiniuCos
                cos={qiniu!}
                setValue={(path, value) => setValue(`qiniu.${path}`, value)}
            />
        </Space>
    );
}