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
} from 'antd';
import Styles from './web.module.less';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
    AppType,
    WechatPublicConfig,
    WechatPublicTemplateMsgsConfig,
} from '../../../../general-app-domain/Application/Schema';




export default function WechatPublic(props: {
    config: WechatPublicConfig;
    setValue: (path: string, value: any) => void;
    removeItem: (path: string, index: number) => void;
    cleanKey: (path: string, key: string) => void;
}) {
    const [open, setModal] = useState(false);
    const [messageType, setMessageType] = useState('');

    const { config, setValue, cleanKey, removeItem } = props;
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
                                                value={config?.appId}
                                                onChange={(e) =>
                                                    setValue(
                                                        `appId`,
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
                                                value={config?.appSecret}
                                                onChange={(e) =>
                                                    setValue(
                                                        `appSecret`,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </>
                                    </Form.Item>
                                    <Form.Item
                                        label="是否为服务号"
                                        name="isService"
                                    >
                                        <>
                                            <Switch
                                                checkedChildren="是"
                                                unCheckedChildren="否"
                                                checked={config?.isService}
                                                onChange={(checked) =>
                                                    setValue(
                                                        `isService`,
                                                        checked
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
                                  const templateMsg = templateMsgs[name];
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
                                                          value={
                                                              templateMsg?.templateId
                                                          }
                                                          onChange={(e) =>
                                                              setValue(
                                                                  `templateMsgs.${name}.templateId`,
                                                                  e.target.value
                                                              )
                                                          }
                                                      />
                                                  </>
                                              </Form.Item>
                                              {templateMsg?.dataDef?.map(
                                                  (ele, index) => (
                                                      <Form.Item>
                                                          <Space
                                                              key={`templateMsg_dataDef_${index}`}
                                                              align="baseline"
                                                          >
                                                              <Input
                                                                  placeholder="keyword"
                                                                  value={
                                                                      ele?.[0]
                                                                  }
                                                                  onChange={(e) => {
                                                                       setValue(
                                                                           `templateMsgs.${name}.dataDef.${index}.0`,
                                                                           e.target.value
                                                                       );
                                                                  }}
                                                              />
                                                              <Input
                                                                  placeholder="color"
                                                                  value={
                                                                      ele?.[1]
                                                                  }
                                                                   onChange={(e) => {
                                                                       setValue(
                                                                           `templateMsgs.${name}.dataDef.${index}.1`,
                                                                           e.target.value
                                                                       );
                                                                  }}
                                                              />

                                                              <MinusCircleOutlined
                                                                  onClick={() =>
                                                                      removeItem(
                                                                          `templateMsgs.${name}.dataDef`,
                                                                          index
                                                                      )
                                                                  }
                                                              />
                                                          </Space>
                                                      </Form.Item>
                                                  )
                                              )}

                                              <Form.Item>
                                                  <Button
                                                      type="dashed"
                                                      onClick={() => {
                                                          const length =
                                                              templateMsg
                                                                  ?.dataDef
                                                                  ?.length || 0; //新增第几项
                                                          setValue(
                                                              `templateMsgs.${name}.dataDef.${length}`,
                                                              []
                                                          );
                                                      }}
                                                      block
                                                      icon={<PlusOutlined />}
                                                  >
                                                      添加 keyword
                                                  </Button>
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
                        if (Object.keys(templateMsgs).includes(messageType)) {
                            message.error({
                                content: '已存在相同的标签名，请重新输入',
                            });
                            return;
                        }
                        setValue(`templateMsgs.${messageType}`, {});
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
                        <Form.Item label="标签名称" name="messageType" help="只能输入英文和中文">
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
        </Space>
    );
}