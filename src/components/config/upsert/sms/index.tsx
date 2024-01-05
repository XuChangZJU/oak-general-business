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
    Switch,
} from 'antd';
import { get } from 'oak-domain/lib/utils/lodash';
import Styles from './web.module.less';
import { Config, AliSmsConfig, TencentSmsConfig, CTYunSmsConfig } from '../../../../types/Config';


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
                                          label="accessKeySecret"
                                          name="accessKeySecret"
                                      >
                                          <>
                                              <Input
                                                  placeholder="请输入accessKeySecret"
                                                  type="text"
                                                  value={ele.accessKeySecret}
                                                  onChange={(e) =>
                                                      setValue(
                                                          `${idx}.accessKeySecret`,
                                                          e.target.value
                                                      )
                                                  }
                                              />
                                          </>
                                      </Form.Item>
                                      <Form.Item
                                          label="endpoint"
                                          name="endpoint"
                                      >
                                          <>
                                              <Input
                                                  placeholder="请输入endpoint"
                                                  type="text"
                                                  value={ele.endpoint}
                                                  onChange={(e) =>
                                                      setValue(
                                                          `${idx}.endpoint`,
                                                          e.target.value
                                                      )
                                                  }
                                              />
                                          </>
                                      </Form.Item>
                                      <Form.Item
                                          label="apiVersion"
                                          name="apiVersion"
                                      >
                                          <>
                                              <Input
                                                  placeholder="请输入apiVersion"
                                                  type="text"
                                                  value={ele.apiVersion}
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
                                      {/* <Form.Item
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
                                                                                            `${idx}.templates.${name}.signName`,
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
                                                                                            `${idx}.templates.${name}.code`,
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
                                      </Form.Item> */}
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
                        //name="messageType"
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
                                          //name="secretId"
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
                                          label="secretKey"
                                          //name="secretId"
                                      >
                                          <>
                                              <Input
                                                  placeholder="请输入secretKey"
                                                  type="text"
                                                  value={ele.secretKey}
                                                  onChange={(e) =>
                                                      setValue(
                                                          `${idx}.secretKey`,
                                                          e.target.value
                                                      )
                                                  }
                                              />
                                          </>
                                      </Form.Item>
                                      <Form.Item
                                          label="smsSdkAppId"
                                          //name="smsSdkAppId"
                                      >
                                          <>
                                              <Input
                                                  placeholder="请输入smsSdkAppId"
                                                  type="text"
                                                  value={ele.smsSdkAppId}
                                                  onChange={(e) =>
                                                      setValue(
                                                          `${idx}.smsSdkAppId`,
                                                          e.target.value
                                                      )
                                                  }
                                              />
                                          </>
                                      </Form.Item>
                                      <Form.Item
                                          label="region"
                                          //name="region"
                                      >
                                          <>
                                              <Input
                                                  placeholder="请输入region"
                                                  type="text"
                                                  value={ele.region}
                                                  onChange={(e) =>
                                                      setValue(
                                                          `${idx}.region`,
                                                          e.target.value
                                                      )
                                                  }
                                              />
                                          </>
                                      </Form.Item>
                                      <Form.Item
                                          label="endpoint"
                                          //name="endpoint"
                                      >
                                          <>
                                              <Input
                                                  placeholder="请输入endpoint"
                                                  type="text"
                                                  value={ele.endpoint}
                                                  onChange={(e) =>
                                                      setValue(
                                                          `${idx}.endpoint`,
                                                          e.target.value
                                                      )
                                                  }
                                              />
                                          </>
                                      </Form.Item>
                                      <Form.Item
                                          label="defaultSignName"
                                          //name="defaultSignName"
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
                                          //name="templates"
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
                                                                            //name="signName"
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
                                                                                            `${idx}.templates.${name}.signName`,
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
                                                                            //name="code"
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
                                                                                            `${idx}.templates.${name}.code`,
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
                        //name="messageType"
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

function CTYun(props: {
    sms: CTYunSmsConfig[];
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
                天翼云云短信配置
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
                                          label="accessKey"
                                          name="accessKey"
                                      >
                                          <>
                                              <Input
                                                  placeholder="请输入accessKey"
                                                  type="text"
                                                  value={ele.accessKey}
                                                  onChange={(e) =>
                                                      setValue(
                                                          `${idx}.accessKey`,
                                                          e.target.value
                                                      )
                                                  }
                                              />
                                          </>
                                      </Form.Item>
                                      <Form.Item
                                          label="securityKey"
                                          name="securityKey"
                                      >
                                          <>
                                              <Input
                                                  placeholder="请输入securityKey"
                                                  type="text"
                                                  value={ele.securityKey}
                                                  onChange={(e) =>
                                                      setValue(
                                                          `${idx}.securityKey`,
                                                          e.target.value
                                                      )
                                                  }
                                              />
                                          </>
                                      </Form.Item>
                                      <Form.Item
                                          label="endpoint"
                                          name="endpoint"
                                      >
                                          <>
                                              <Input
                                                  placeholder="请输入endpoint"
                                                  type="text"
                                                  value={ele.endpoint}
                                                  onChange={(e) =>
                                                      setValue(
                                                          `${idx}.endpoint`,
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
                                      {/* <Form.Item
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
                                                                                            `${idx}.templates.${name}.signName`,
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
                                                                                            `${idx}.templates.${name}.code`,
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
                                      </Form.Item> */}
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
                        //name="messageType"
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
    const { ali, tencent, mockSend, ctyun } = sms;
    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Row>
                <Card className={Styles.tips}>
                    每种均可配置一个，相应的服务所使用的帐号请准确对应
                </Card>
            </Row>
            <Col flex="auto">
                <Divider orientation="left" className={Styles.title}>
                    短信配置
                </Divider>
                <Form>
                    <Form.Item
                        label="模拟发送"
                        //name="mockSend"
                        tooltip="开启模拟发送短信，发短信不会调用api"
                    >
                        <>
                            <Switch
                                checkedChildren="是"
                                unCheckedChildren="否"
                                checked={mockSend}
                                onChange={(checked) =>
                                    setValue(`mockSend`, checked)
                                }
                            />
                        </>
                    </Form.Item>
                </Form>
            </Col>
            <Tencent
                sms={tencent || []}
                setValue={(path, value) => setValue(`tencent.${path}`, value)}
                removeItem={(path, index) => removeItem(`tencent`, index)}
                addItem={(path, index) => setValue(`tencent.${index}`, {})}
                cleanKey={(path, key) => cleanKey(`tencent.${path}`, key)}
            />
            <Ali
                sms={ali || []}
                setValue={(path, value) => setValue(`ali.${path}`, value)}
                removeItem={(path, index) => removeItem(`ali`, index)}
                addItem={(path, index) => setValue(`ali.${index}`, {})}
                cleanKey={(path, key) => cleanKey(`ali.${path}`, key)}
            />
            <CTYun
                sms={ctyun || []}
                setValue={(path, value) => setValue(`ctyun.${path}`, value)}
                removeItem={(path, index) => removeItem(`ctyun`, index)}
                addItem={(path, index) => setValue(`ctyun.${index}`, {})}
                cleanKey={(path, key) => cleanKey(`ctyun.${path}`, key)}
            />
        </Space>
    );
}