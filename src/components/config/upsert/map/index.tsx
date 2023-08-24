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
import { Config, AmapMapConfig } from '../../../../types/Config';


function Qiniu(props: {
    map: AmapMapConfig;
    setValue: (path: string, value: any) => void;
}) {
    const { map, setValue } = props;
    return (
        <Col flex="auto">
            <Divider orientation="left" className={Styles.title}>
                高德配置
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
                                <Form.Item
                                    label="webApiKey"
                                    //name="webApiKey"
                                >
                                    <>
                                        <Input
                                            placeholder="请输入webApiKey"
                                            type="text"
                                            value={map?.webApiKey}
                                            onChange={(e) =>
                                                setValue(
                                                    `webApiKey`,
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
    map: Required<Config>['Map'];
    setValue: (path: string, value: any) => void;
}) {
    const { map, setValue } = props;
    const { amap } = map;
    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Row>
                <Card className={Styles.tips}>
                    每种均可配置一个，相应的服务所使用的帐号请准确对应
                </Card>
            </Row>
            <Qiniu
                map={amap!}
                setValue={(path, value) => setValue(`amap.${path}`, value)}
            />
        </Space>
    );
}