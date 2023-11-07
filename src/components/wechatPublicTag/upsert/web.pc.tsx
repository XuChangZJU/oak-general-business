import React, { useState } from 'react';
import { Button, Form, Input, Space, Modal } from 'antd';

import { EntityDict } from '../../../oak-app-domain';
import { RowWithActions, WebComponentProps } from 'oak-frontend-base';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'wechatPublicTag',
        false,
        {
            text: string;
            tagName: string;
            wechatId: number;
            sync: boolean;
            open: boolean;
            changeOpen: (open: boolean) => void;
            editTag: () => void;
            addTag: () => void;
            changeText: (text: string) => void;
            isUpdate: boolean;
        },
        {
        }
    >
) {
    const {
        text,
        tagName,
        open,
        changeOpen,
        editTag,
        addTag,
        changeText,
        isUpdate,
    } = props.data;
    const { t, update, navigateBack } = props.methods;
    return (
        <Modal
            open={open}
            title='微信公众号标签信息'
            onCancel={() => changeOpen(false)}
            footer={<Space style={{display: 'flex', justifyContent: 'center'}}>
                <Button onClick={() => changeOpen(false)}>取消</Button>
                <Button type='primary' onClick={() => {
                    if (isUpdate) {
                        editTag();
                    } else {
                        addTag();
                    }
                    changeOpen(false);
                }} disabled={text !== tagName ? false : true}>确定</Button>
            </Space>}
        >

            <Form
                colon={true}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
            >
                <Form.Item
                    label="TAG名称"
                    required
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <>
                        <Input
                            value={text}
                            onChange={(v) => changeText(v.target.value)}
                            placeholder='标签名称'
                            maxLength={30}
                        />
                    </>
                </Form.Item>
            </Form>
        </Modal>
    );
}
