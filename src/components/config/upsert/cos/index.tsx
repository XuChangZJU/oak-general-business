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
import { QiniuZone, CTYunZone } from 'oak-external-sdk';
import { Config, QiniuCosConfig, CTYunCosConfig } from '../../../../types/Config';

// https://developer.qiniu.com/kodo/1671/region-endpoint-fq
const QiniuZoneArray: Array<{ label: string; value: QiniuZone }> = [
    {
        label: '华东-浙江',
        value: 'z0',
    },
    {
        label: '华东-浙江2',
        value: 'cn-east-2',
    },
    {
        label: '华北-河北',
        value: 'z1',
    },
    {
        label: '华南-广东',
        value: 'z2',
    },
    {
        label: '北美-洛杉矶',
        value: 'na0',
    },
    {
        label: '亚太-新加坡',
        value: 'as0',
    }
];

function QiniuCos(props: {
    cos: QiniuCosConfig;
    setValue: (path: string, value: any) => void;
    removeItem: (path: string, index: number) => void;
}) {
    const { cos, setValue, removeItem } = props;
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
                                <Form.Item
                                    label="accessKey"
                                //name="accessKey"
                                >
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
                                {/* <Form.Item
                                    label="bucket"
                                    //name="bucket"
                                >
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
                                </Form.Item> */}
                                <Divider orientation="left" className={Styles.title}>
                                    bucket配置
                                </Divider>
                                <Tabs
                                    tabPosition={'top'}
                                    size={'middle'}
                                    type="editable-card"
                                    // hideAdd={!(sms.length > 0)}
                                    onEdit={(targetKey: any, action: 'add' | 'remove') => {
                                        if (action === 'add') {
                                            setValue(`buckets.${cos?.buckets?.length || 0}`, {});
                                        } else {
                                            removeItem('buckets', parseInt(targetKey, 10));
                                        }
                                    }}
                                    items={
                                        cos?.buckets?.length > 0
                                            ? cos.buckets.map((ele, idx) => ({
                                                key: `${idx}`,
                                                label: `bucket:${idx + 1}`,
                                                children: (
                                                    <Form
                                                        colon={false}
                                                        labelAlign="left"
                                                        layout="vertical"
                                                        style={{ marginTop: 10 }}
                                                    >
                                                        <Form.Item
                                                            label="name"
                                                        // name="name"
                                                        >
                                                            <>
                                                                <Input
                                                                    placeholder="请输入name"
                                                                    type="text"
                                                                    value={ele.name}
                                                                    onChange={(e) =>
                                                                        setValue(
                                                                            `buckets.${idx}.name`,
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                />
                                                            </>
                                                        </Form.Item>
                                                        <Form.Item
                                                            label="zone"
                                                        //name="uploadHost"
                                                        >
                                                            <>
                                                                <Select
                                                                    style={{ width: '100%' }}
                                                                    placeholder="请选择存储区域"
                                                                    value={ele.zone}
                                                                    onChange={(value: string) => {
                                                                        setValue(`buckets.${idx}.zone`, value);
                                                                    }}
                                                                    options={QiniuZoneArray}
                                                                />
                                                            </>
                                                        </Form.Item>
                                                        <Form.Item
                                                            label="domain"
                                                        // name="domain"
                                                        >
                                                            <>
                                                                <Input
                                                                    placeholder="请输入domain"
                                                                    type="text"
                                                                    value={ele.domain}
                                                                    onChange={(e) =>
                                                                        setValue(
                                                                            `buckets.${idx}.domain`,
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                />
                                                            </>
                                                        </Form.Item>
                                                        <Form.Item
                                                            label="protocol"
                                                        // name="protocol"
                                                        >
                                                            <>
                                                                <Select
                                                                    mode="multiple"
                                                                    allowClear
                                                                    style={{ width: '100%' }}
                                                                    placeholder="请选择协议"
                                                                    value={ele?.protocol as string[]}
                                                                    onChange={(value: string[]) => {
                                                                        setValue(`buckets.${idx}.protocol`, value);
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
                                            }))
                                            : []
                                    }
                                />
                                {
                                    cos?.buckets?.length > 0 && (
                                        <Form.Item
                                            label="defaultBucket"
                                        //name="uploadHost"
                                        >
                                            <>
                                                <Select
                                                    allowClear
                                                    style={{ width: '100%' }}
                                                    placeholder="请选择默认bucket"
                                                    value={cos.defaultBucket}
                                                    onChange={(value: string) => {
                                                        setValue(`defaultBucket`, value);
                                                    }}
                                                    options={cos.buckets.map(
                                                        ele => ({
                                                            label: ele.name,
                                                            value: ele.name
                                                        })
                                                    )}
                                                />
                                            </>
                                        </Form.Item>
                                    )}
                            </Form>
                        ),
                    },
                ]}
            ></Tabs>
        </Col>
    );
}


const CTYunZoneArray: Array<{ label: string; value: CTYunZone }> = [
    {
        label: '郑州',
        value: 'hazz',
    },
    {
        label: '沈阳',
        value: 'lnsy',
    },
    {
        label: '四川成都',
        value: 'sccd',
    },
    {
        label: '乌鲁木齐',
        value: 'xjwlmq',
    },
    {
        label: '甘肃兰州',
        value: 'gslz',
    },
    {
        label: '山东青岛',
        value: 'sdqd',
    },
    {
        label: '贵州贵阳',
        value: 'gzgy',
    },
    {
        label: '湖北武汉',
        value: 'hbwh',
    },
    {
        label: '西藏拉萨',
        value: 'xzls',
    },
    {
        label: '安徽芜湖',
        value: 'ahwh',
    },
    {
        label: '广东深圳',
        value: 'gdsz',
    },
    {
        label: '江苏苏州',
        value: 'jssz',
    },
    {
        label: '上海2',
        value: 'sh2',
    },
];


function CTYunCos(props: {
    cos: CTYunCosConfig;
    setValue: (path: string, value: any) => void;
    removeItem: (path: string, index: number) => void;
}) {
    const { cos, setValue, removeItem } = props;
    return (
        <Col flex="auto">
            <Divider orientation="left" className={Styles.title}>
                天翼云配置
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
                                    label="accessKey"
                                    //name="accessKey"
                                >
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
                                {/* <Form.Item
                                    label="bucket"
                                    //name="bucket"
                                >
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
                                </Form.Item> */}
                                <Divider
                                    orientation="left"
                                    className={Styles.title}
                                >
                                    bucket配置
                                </Divider>
                                <Tabs
                                    tabPosition={'top'}
                                    size={'middle'}
                                    type="editable-card"
                                    // hideAdd={!(sms.length > 0)}
                                    onEdit={(
                                        targetKey: any,
                                        action: 'add' | 'remove'
                                    ) => {
                                        if (action === 'add') {
                                            setValue(
                                                `buckets.${
                                                    cos?.buckets?.length || 0
                                                }`,
                                                {}
                                            );
                                        } else {
                                            removeItem(
                                                'buckets',
                                                parseInt(targetKey, 10)
                                            );
                                        }
                                    }}
                                    items={
                                        cos?.buckets?.length > 0
                                            ? cos.buckets.map((ele, idx) => ({
                                                  key: `${idx}`,
                                                  label: `bucket:${idx + 1}`,
                                                  children: (
                                                      <Form
                                                          colon={false}
                                                          labelAlign="left"
                                                          layout="vertical"
                                                          style={{
                                                              marginTop: 10,
                                                          }}
                                                      >
                                                          <Form.Item
                                                              label="name"
                                                              // name="name"
                                                          >
                                                              <>
                                                                  <Input
                                                                      placeholder="请输入name"
                                                                      type="text"
                                                                      value={
                                                                          ele.name
                                                                      }
                                                                      onChange={(
                                                                          e
                                                                      ) =>
                                                                          setValue(
                                                                              `buckets.${idx}.name`,
                                                                              e
                                                                                  .target
                                                                                  .value
                                                                          )
                                                                      }
                                                                  />
                                                              </>
                                                          </Form.Item>
                                                          <Form.Item
                                                              label="zone"
                                                              //name="uploadHost"
                                                          >
                                                              <>
                                                                  <Select
                                                                      style={{
                                                                          width: '100%',
                                                                      }}
                                                                      placeholder="请选择存储区域"
                                                                      value={
                                                                          ele.zone
                                                                      }
                                                                      onChange={(
                                                                          value: string
                                                                      ) => {
                                                                          setValue(
                                                                              `buckets.${idx}.zone`,
                                                                              value
                                                                          );
                                                                      }}
                                                                      options={
                                                                          CTYunZoneArray
                                                                      }
                                                                  />
                                                              </>
                                                          </Form.Item>
                                                          <Form.Item
                                                              label="domain"
                                                              // name="domain"
                                                          >
                                                              <>
                                                                  <Input
                                                                      placeholder="请输入domain"
                                                                      type="text"
                                                                      value={
                                                                          ele.domain
                                                                      }
                                                                      onChange={(
                                                                          e
                                                                      ) =>
                                                                          setValue(
                                                                              `buckets.${idx}.domain`,
                                                                              e
                                                                                  .target
                                                                                  .value
                                                                          )
                                                                      }
                                                                  />
                                                              </>
                                                          </Form.Item>
                                                          <Form.Item
                                                              label="protocol"
                                                              // name="protocol"
                                                          >
                                                              <>
                                                                  <Select
                                                                      mode="multiple"
                                                                      allowClear
                                                                      style={{
                                                                          width: '100%',
                                                                      }}
                                                                      placeholder="请选择协议"
                                                                      value={
                                                                          ele?.protocol as string[]
                                                                      }
                                                                      onChange={(
                                                                          value: string[]
                                                                      ) => {
                                                                          setValue(
                                                                              `buckets.${idx}.protocol`,
                                                                              value
                                                                          );
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
                                              }))
                                            : []
                                    }
                                />
                                {cos?.buckets?.length > 0 && (
                                    <Form.Item
                                        label="defaultBucket"
                                        //name="uploadHost"
                                    >
                                        <>
                                            <Select
                                                allowClear
                                                style={{ width: '100%' }}
                                                placeholder="请选择默认bucket"
                                                value={cos.defaultBucket}
                                                onChange={(value: string) => {
                                                    setValue(
                                                        `defaultBucket`,
                                                        value
                                                    );
                                                }}
                                                options={cos.buckets.map(
                                                    (ele) => ({
                                                        label: ele.name,
                                                        value: ele.name,
                                                    })
                                                )}
                                            />
                                        </>
                                    </Form.Item>
                                )}
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
    removeItem: (path: string, index: number) => void;
}) {
    const { cos, setValue, removeItem } = props;
    const { qiniu, ctyun } = cos;
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
                removeItem={(path, index) => removeItem(`qiniu.${path}`, index)}
            />
            <CTYunCos
                cos={ctyun!}
                setValue={(path, value) => setValue(`ctyun.${path}`, value)}
                removeItem={(path, index) => removeItem(`ctyun.${path}`, index)}
            />
        </Space>
    );
}
