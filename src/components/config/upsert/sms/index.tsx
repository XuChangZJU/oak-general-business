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
    Modal,
    message,
} from 'antd';
import { get } from 'oak-domain/lib/utils/lodash';
import Styles from './web.module.less';
import { Config, AliSmsConfig, TencentSmsConfig } from '../../../../types/Config';


function Ali(props: {
    sms: AliSmsConfig[];
    setValue: (path: string, value: any) => void;
    removeItem: (path: string, index: number) => void;
    addItem: (path: string, index: number) => void;
    cleanKey: (path: string, key: string) => void;
}) {
    const [open, setModal] = useState(false);
    const [smsIndex, setSmsIndex] = useState('');
    const [labelType, setLabelType] = useState('');

    const { sms, setValue, addItem, removeItem, cleanKey } = props;
    return (
        <Col flex="auto">
            <Divider orientation="left" className={Styles.title}>
                阿里云云短信配置
            </Divider>
            <Tabs
                tabPosition={'top'}
                size={'middle'}
                type="editable-card"
                // hideAdd={!(sms.length > 0)}
                onEdit={(targetKey: any, action: 'add' | 'remove') => {
                    if (action === 'add') {
                        addItem('', sms.length);
                    } else {
                        removeItem('', parseInt(targetKey, 10));
                    }
                }}
                items={
                    sms.length > 0
                        ? sms.map((ele, idx) => ({
                              key: `${idx}`,
                              label: `短信${idx + 1}`,
                              children: (
                                  <Form
                                      colon={false}
                                      labelAlign="left"
                                      layout="vertical"
                                      style={{ marginTop: 10 }}
                                  >
                                      <Form.Item
                                          label="accessKeyId"
                                          name="accessKeyId"
                                      >
                                          <>
                                              <Input
                                                  placeholder="请输入accessKeyId"
                                                  type="text"
                                                  value={ele.accessKeyId}
                                                  onChange={(e) =>
                                                      setValue(
                                                          `${idx}.accessKeyId`,
                                                          e.target.value
                                                      )
                                                  }
                                              />
                                          </>
                                      </Form.Item>
                                      <Form.Item
                                          label="defaultSignName"
                                          name="defaultSignName"
                                      >
                                          <>
                                              <Input
                                                  placeholder="请输入defaultSignName"
                                                  type="text"
                                                  value={ele.defaultSignName}
                                                  onChange={(e) =>
                                                      setValue(
                                                          `${idx}.defaultSignName`,
                                                          e.target.value
                                                      )
                                                  }
                                              />
                                          </>
                                      </Form.Item>
                                      <Form.Item
                                          label="templates"
                                          name="templates"
                                      >
                                          <Tabs
                                              tabPosition={'top'}
                                              size={'middle'}
                                              type="editable-card"
                                              // hideAdd={!(Object.keys(ele.templates).length > 0)}
                                              onEdit={(
                                                  targetKey: any,
                                                  action: 'add' | 'remove'
                                              ) => {
                                                  if (action === 'add') {
                                                      setSmsIndex(`${idx}`);
                                                      setModal(true);
                                                  } else {
                                                      cleanKey(
                                                          `${idx}.templates`,
                                                          targetKey
                                                      );
                                                  }
                                              }}
                                              items={
                                                  Object.keys(
                                                      ele.templates || {}
                                                  ).length > 0
                                                      ? Object.keys(
                                                            ele.templates
                                                        ).map((name, idx) => {
                                                            const template =
                                                                ele.templates[
                                                                    name
                                                                ];
                                                            return {
                                                                key: `${name}`,
                                                                label: `${name}`,
                                                                children: (
                                                                    <Form
                                                                        colon={
                                                                            true
                                                                        }
                                                                        labelAlign="left"
                                                                        layout="vertical"
                                                                        style={{
                                                                            marginTop: 10,
                                                                        }}
                                                                    >
                                                                        <Form.Item
                                                                            label="signName"
                                                                            name="signName"
                                                                        >
                                                                            <>
                                                                                <Input
                                                                                    placeholder="请输入signName"
                                                                                    type="text"
                                                                                    value={
                                                                                        template.signName
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) =>
                                                                                        setValue(
                                                                                            `${idx}.templateMsgs.${name}.signName`,
                                                                                            e
                                                                                                .target
                                                                                                .value
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </>
                                                                        </Form.Item>
                                                                        <Form.Item
                                                                            label="code"
                                                                            name="code"
                                                                        >
                                                                            <>
                                                                                <Input
                                                                                    placeholder="请输入code"
                                                                                    type="text"
                                                                                    value={
                                                                                        template.code
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) =>
                                                                                        setValue(
                                                                                            `${idx}.templateMsgs.${name}.code`,
                                                                                            e
                                                                                                .target
                                                                                                .value
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </>
                                                                        </Form.Item>
                                                                    </Form>
                                                                ),
                                                            };
                                                        })
                                                      : []
                                              }
                                          ></Tabs>
                                      </Form.Item>
                                  </Form>
                              ),
                          }))
                        : []
                }
            ></Tabs>
            <Modal
                title="新建模版标签"
                onCancel={() => {
                    setModal(false);
                    setLabelType('');
                }}
                onOk={() => {
                    if (!labelType) {
                        message.error({
                            content: '请输入标签名称',
                        });
                        return;
                    }
                    const templates = get(sms, `${smsIndex}.templates`) || {};
                    if (Object.keys(templates).includes(labelType)) {
                        message.error({
                            content: '已存在相同的标签名，请重新输入',
                        });
                        return;
                    }
                    setValue(`${smsIndex}.templates.${labelType}`, {});
                    setModal(false);
                    setLabelType('');
                    setSmsIndex('');
                }}
                open={open}
                cancelText="取消"
                okText="确定"
                destroyOnClose={true}
            >
                <Form
                    colon={true}
                    labelAlign="left"
                    layout="vertical"
                    style={{ marginTop: 10 }}
                >
                    <Form.Item
                        label="标签名称"
                        name="messageType"
                        help="只能输入英文和中文"
                    >
                        <>
                            <Input
                                placeholder="请输入标签名称"
                                type="text"
                                value={labelType}
                                onChange={(e) =>
                                    setLabelType(
                                        e.target.value.replace(/[0-9-.]/g, '')
                                    )
                                }
                            />
                        </>
                    </Form.Item>
                </Form>
            </Modal>
        </Col>
    );
}

function Tencent(props: {
    sms: TencentSmsConfig[];
    setValue: (path: string, value: any) => void;
    removeItem: (path: string, index: number) => void;
    addItem: (path: string, index: number) => void;
    cleanKey: (path: string, key: string) => void;
}) {
    const [open, setModal] = useState(false);
    const [smsIndex, setSmsIndex] = useState('');
    const [labelType, setLabelType] = useState('');

    const { sms, setValue, addItem, removeItem, cleanKey } = props;
    return (
        <Col flex="auto">
            <Divider orientation="left" className={Styles.title}>
                腾讯云短信配置
            </Divider>
            <Tabs
                tabPosition={'top'}
                size={'middle'}
                type="editable-card"
                // hideAdd={!(sms.length > 0)}
                onEdit={(targetKey: any, action: 'add' | 'remove') => {
                    if (action === 'add') {
                        addItem('', sms.length);
                    } else {
                        removeItem('', parseInt(targetKey, 10));
                    }
                }}
                items={
                    sms.length > 0
                        ? sms.map((ele, idx) => ({
                              key: `${idx}`,
                              label: `短信${idx + 1}`,
                              children: (
                                  <Form
                                      colon={false}
                                      labelAlign="left"
                                      layout="vertical"
                                      style={{ marginTop: 10 }}
                                  >
                                      <Form.Item
                                          label="secretId"
                                          name="secretId"
                                      >
                                          <>
                                              <Input
                                                  placeholder="请输入secretId"
                                                  type="text"
                                                  value={ele.secretId}
                                                  onChange={(e) =>
                                                      setValue(
                                                          `${idx}.secretId`,
                                                          e.target.value
                                                      )
                                                  }
                                              />
                                          </>
                                      </Form.Item>
                                      <Form.Item
                                          label="defaultSignName"
                                          name="defaultSignName"
                                      >
                                          <>
                                              <Input
                                                  placeholder="请输入defaultSignName"
                                                  type="text"
                                                  value={ele.defaultSignName}
                                                  onChange={(e) =>
                                                      setValue(
                                                          `${idx}.defaultSignName`,
                                                          e.target.value
                                                      )
                                                  }
                                              />
                                          </>
                                      </Form.Item>
                                      <Form.Item
                                          label="templates"
                                          name="templates"
                                      >
                                          <Tabs
                                              tabPosition={'top'}
                                              size={'middle'}
                                              type="editable-card"
                                              // hideAdd={!(Object.keys(ele.templates).length > 0)}
                                              onEdit={(
                                                  targetKey: any,
                                                  action: 'add' | 'remove'
                                              ) => {
                                                  if (action === 'add') {
                                                      setSmsIndex(`${idx}`);
                                                      setModal(true);
                                                  } else {
                                                      cleanKey(
                                                          `${idx}.templates`,
                                                          targetKey
                                                      );
                                                  }
                                              }}
                                              items={
                                                  Object.keys(
                                                      ele.templates || {}
                                                  ).length > 0
                                                      ? Object.keys(
                                                            ele.templates
                                                        ).map((name, idx) => {
                                                            const template =
                                                                ele.templates[
                                                                    name
                                                                ];
                                                            return {
                                                                key: `${name}`,
                                                                label: `${name}`,
                                                                children: (
                                                                    <Form
                                                                        colon={
                                                                            true
                                                                        }
                                                                        labelAlign="left"
                                                                        layout="vertical"
                                                                        style={{
                                                                            marginTop: 10,
                                                                        }}
                                                                    >
                                                                        <Form.Item
                                                                            label="signName"
                                                                            name="signName"
                                                                        >
                                                                            <>
                                                                                <Input
                                                                                    placeholder="请输入signName"
                                                                                    type="text"
                                                                                    value={
                                                                                        template.signName
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) =>
                                                                                        setValue(
                                                                                            `${idx}.templateMsgs.${name}.signName`,
                                                                                            e
                                                                                                .target
                                                                                                .value
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </>
                                                                        </Form.Item>
                                                                        <Form.Item
                                                                            label="code"
                                                                            name="code"
                                                                        >
                                                                            <>
                                                                                <Input
                                                                                    placeholder="请输入code"
                                                                                    type="text"
                                                                                    value={
                                                                                        template.code
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) =>
                                                                                        setValue(
                                                                                            `${idx}.templateMsgs.${name}.code`,
                                                                                            e
                                                                                                .target
                                                                                                .value
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </>
                                                                        </Form.Item>
                                                                    </Form>
                                                                ),
                                                            };
                                                        })
                                                      : []
                                              }
                                          ></Tabs>
                                      </Form.Item>
                                  </Form>
                              ),
                          }))
                        : []
                }
            ></Tabs>
            <Modal
                title="新建模版标签"
                onCancel={() => {
                    setModal(false);
                    setLabelType('');
                }}
                onOk={() => {
                    if (!labelType) {
                        message.error({
                            content: '请输入标签名称',
                        });
                        return;
                    }
                    const templates = get(sms, `${smsIndex}.templates`) || {};
                    if (Object.keys(templates).includes(labelType)) {
                        message.error({
                            content: '已存在相同的标签名，请重新输入',
                        });
                        return;
                    }
                    setValue(`${smsIndex}.templates.${labelType}`, {});
                    setModal(false);
                    setLabelType('');
                    setSmsIndex('');
                }}
                open={open}
                cancelText="取消"
                okText="确定"
                destroyOnClose={true}
            >
                <Form
                    colon={true}
                    labelAlign="left"
                    layout="vertical"
                    style={{ marginTop: 10 }}
                >
                    <Form.Item
                        label="标签名称"
                        name="messageType"
                        help="只能输入英文和中文"
                    >
                        <>
                            <Input
                                placeholder="请输入标签名称"
                                type="text"
                                value={labelType}
                                onChange={(e) =>
                                    setLabelType(
                                        e.target.value.replace(/[0-9-.]/g, '')
                                    )
                                }
                            />
                        </>
                    </Form.Item>
                </Form>
            </Modal>
        </Col>
    );
}

export default function Sms(props: {
    sms: Required<Config>['Sms'];
    setValue: (path: string, value: any) => void;
    removeItem: (path: string, index: number) => void;
    cleanKey: (path: string, key: string) => void;
}) {
    const { sms, setValue, removeItem, cleanKey } = props;
    const { ali, tencent } = sms;
    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Row>
                <Card className={Styles.tips}>
                    每种均可配置一个，相应的服务所使用的帐号请准确对应
                </Card>
            </Row>
            <Ali
                sms={ali || []}
                setValue={(path, value) => setValue(`ali.${path}`, value)}
                removeItem={(path, index) => removeItem(`ali`, index)}
                addItem={(path, index) => setValue(`ali.${index}`, {})}
                cleanKey={(path, key) => cleanKey(`ali.${path}`, key)}
            />
            <Tencent
                sms={tencent || []}
                setValue={(path, value) => setValue(`tencent.${path}`, value)}
                removeItem={(path, index) => removeItem(`tencent`, index)}
                addItem={(path, index) => setValue(`tencent.${index}`, {})}
                cleanKey={(path, key) => cleanKey(`tencent.${path}`, key)}
            />
        </Space>
    );
}