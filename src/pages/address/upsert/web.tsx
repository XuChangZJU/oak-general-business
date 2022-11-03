import React from 'react';
import { Button, Input, Form } from 'antd';
import { RightOutlined  } from '@ant-design/icons';
import Style from './web.module.less';

export default function Render(this: any) {
    const PickArea = (
        <Button
            type="text"
            icon={<RightOutlined style={{ fontSize: 12 }} />}
            onClick={() => this.callAreaPicker()}
        />
    );
    console.log(this.state.name);
    return (
        <div className={Style.container}>
        <Input
            placeholder="姓名2"
            onChange={(e) => this.setUpdateData('name', e.target.value)}
            value={this.state.name}
            data-attr="name"
            status={
                this.state.oakFocused?.attr === 'name'
                    ? 'error'
                    : undefined
            }
        />
            <Form colon={false} layout="vertical">
                <Form.Item
                    label={this.t('address:attr.name')}
                    name="name"
                    help={
                        this.state.oakFocused?.attr === 'name'
                            ? this.state.oakFocused.message
                            : undefined
                    }
                >
                    <Input
                        placeholder="姓名"
                        onChange={(e) => this.setUpdateData('name', e.target.value)}
                        value={this.state.name}
                        data-attr="name"
                        status={
                            this.state.oakFocused?.attr === 'name'
                                ? 'error'
                                : undefined
                        }
                    />
                </Form.Item>
                <Form.Item
                    label={this.t('address:attr.phone')}
                    name="phone"
                    help={
                        this.state.oakFocused?.attr === 'phone'
                            ? this.state.oakFocused.message
                            : undefined
                    }
                >
                    <Input
                        placeholder="手机号"
                        onChange={(e) => this.setUpdateData('phone', e.target.value)}
                        value={this.state.phone}
                        data-attr="phone"
                        status={
                            this.state.oakFocused?.attr === 'phone'
                                ? 'error'
                                : undefined
                        }
                    />
                </Form.Item>
                <Form.Item
                    label={this.t('address:attr.area')}
                    name="areaText"
                    help={
                        this.state.oakFocused?.attr === 'areaId'
                            ? this.state.oakFocused.message
                            : undefined
                    }
                >
                    <Input
                        addonBefore={PickArea}
                        placeholder="所在地区"
                        onChange={this.setValue}
                        value={this.state.areaText}
                        data-attr="areaText"
                        disabled={true}
                        status={
                            this.state.oakFocused?.attr === 'areaId'
                                ? 'error'
                                : undefined
                        }
                    />
                </Form.Item>
                <Form.Item
                    label={this.t('address:attr.detail')}
                    name="detail"
                    help={
                        this.state.oakFocused?.attr === 'detail'
                            ? this.state.oakFocused.message
                            : undefined
                    }
                >
                    <Input.TextArea
                        maxLength={100}
                        onChange={(e) =>
                            this.setUpdateData('detail', e.target.value)
                        }
                        value={this.state.detail}
                        data-attr="detail"
                        placeholder="详细地址"
                        status={
                            this.state.oakFocused?.attr === 'detail'
                                ? 'error'
                                : undefined
                        }
                    />
                </Form.Item>
            </Form>
            <div style={{ flex: 1 }} />
            <Button
                block
                disabled={this.state.oakAllowExecuting !== true}
                type="primary"
                onClick={() => {
                    this.confirm();
                }}
            >
                {this.t('common:action.confirm')}
            </Button>
        </div>
    );
}
