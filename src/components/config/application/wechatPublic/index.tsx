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
    Switch,
    Modal,
    message,
    Button,
    Select,
} from 'antd';
import Styles from './web.module.less';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
    AppType,
    WechatPublicConfig,
} from '../../../../general-app-domain/Application/Schema';




export default function WechatPublic(props: {
    isService?: boolean;
    config: WechatPublicConfig;
    setValue: (path: string, value: any) => void;
    removeItem: (path: string, index: number) => void;
    cleanKey: (path: string, key: string) => void;
}) {
    const [open, setModal] = useState(false);
    const [messageType, setMessageType] = useState('');

    const { config, setValue, cleanKey, removeItem, isService = true } = props;
    const templateMsgs = config?.templateMsgs || {};
    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Row>
                <Card className={Styles.tips}>
                    每种均可配置一个，相应的服务所使用的帐号请准确对应
                </Card>
            </Row>
            <Col flex="auto">
                <Divider orientation="left" className={Styles.title}>
                    微信公众号-基础
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
                    {isService && (
                        <Form.Item label="是否为服务号" name="isService">
                            <>
                                <Switch
                                    checkedChildren="是"
                                    unCheckedChildren="否"
                                    checked={config?.isService}
                                    onChange={(checked) =>
                                        setValue(`isService`, checked)
                                    }
                                />
                            </>
                        </Form.Item>
                    )}
                </Form>
            </Col>
            {isService && (
                <Col flex="auto">
                    <Divider orientation="left" className={Styles.title}>
                        微信公众号-服务器配置
                    </Divider>
                    <Form
                        colon={true}
                        labelAlign="left"
                        layout="vertical"
                        style={{ marginTop: 10 }}
                    >
                        <Form.Item label="服务器地址(URL)" name="url">
                            <>
                                <Input
                                    placeholder="请输入服务器地址(URL)，选填"
                                    type="text"
                                    value={config?.server?.url}
                                    onChange={(e) =>
                                        setValue(`server.url`, e.target.value)
                                    }
                                />
                            </>
                        </Form.Item>
                        <Form.Item label="令牌(Token)" name="token">
                            <>
                                <Input
                                    placeholder="请输入令牌(Token)"
                                    type="text"
                                    value={config?.server?.token}
                                    onChange={(e) =>
                                        setValue(`server.token`, e.target.value)
                                    }
                                />
                            </>
                        </Form.Item>
                        <Form.Item
                            label="消息加解密密钥(EncodingAESKey)"
                            name="encodingAESKey"
                            tooltip="消息加解密密钥将用于消息体加解密过程。具体功能请参见微信文档"
                        >
                            <>
                                <Input
                                    placeholder="请输入消息加解密密钥(EncodingAESKey)"
                                    type="text"
                                    value={config?.server?.encodingAESKey}
                                    onChange={(e) =>
                                        setValue(
                                            `server.encodingAESKey`,
                                            e.target.value
                                        )
                                    }
                                />
                            </>
                        </Form.Item>
                        <Form.Item label="消息加解密方式" name="mode">
                            <>
                                <Select
                                    placeholder="请选择消息加解密方式"
                                    value={config?.server?.mode}
                                    onChange={(value) =>
                                        setValue(`server.mode`, value)
                                    }
                                    options={[
                                        {
                                            value: 'clear',
                                            label: '明文模式',
                                        },
                                        {
                                            value: 'compatible',
                                            label: '兼容模式',
                                        },
                                        {
                                            value: 'safe',
                                            label: '安全模式',
                                        },
                                    ]}
                                />
                            </>
                        </Form.Item>
                    </Form>
                </Col>
            )}
            {isService && (
                <Col flex="auto">
                    <Divider orientation="left" className={Styles.title}>
                        微信公众号-模版
                    </Divider>
                    <Tabs
                        tabPosition={'top'}
                        size={'middle'}
                        type="editable-card"
                        // hideAdd={!(Object.keys(templateMsgs).length > 0)}
                        onEdit={(targetKey: any, action: 'add' | 'remove') => {
                            if (action === 'add') {
                                setModal(true);
                            } else {
                                cleanKey(`templateMsgs`, targetKey);
                            }
                        }}
                        items={
                            Object.keys(templateMsgs).length > 0
                                ? Object.keys(templateMsgs).map((name, idx) => {
                                      const templateId = templateMsgs[name];
                                      return {
                                          key: `${name}`,
                                          label: `${name}`,
                                          children: (
                                              <Form
                                                  colon={true}
                                                  labelAlign="left"
                                                  layout="vertical"
                                                  style={{ marginTop: 10 }}
                                              >
                                                  <Form.Item
                                                      label="templateId"
                                                      name="templateId"
                                                  >
                                                      <>
                                                          <Input
                                                              placeholder="请输入templateId"
                                                              type="text"
                                                              value={templateId}
                                                              onChange={(e) =>
                                                                  setValue(
                                                                      `templateMsgs.${name}`,
                                                                      e.target
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
                    <Modal
                        title="新建模版标签"
                        onCancel={() => {
                            setModal(false);
                            setMessageType('');
                        }}
                        onOk={() => {
                            if (!messageType) {
                                message.error({
                                    content: '请输入标签名称',
                                });
                                return;
                            }
                            if (
                                Object.keys(templateMsgs).includes(messageType)
                            ) {
                                message.error({
                                    content: '已存在相同的标签名，请重新输入',
                                });
                                return;
                            }
                            setValue(`templateMsgs.${messageType}`, '');
                            setModal(false);
                            setMessageType('');
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
                                        value={messageType}
                                        onChange={(e) =>
                                            setMessageType(
                                                e.target.value.replace(
                                                    /[0-9-.]/g,
                                                    ''
                                                )
                                            )
                                        }
                                    />
                                </>
                            </Form.Item>
                        </Form>
                    </Modal>
                </Col>
            )}
        </Space>
    );
}