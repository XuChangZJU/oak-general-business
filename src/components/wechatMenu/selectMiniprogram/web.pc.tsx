import React, { useState, useEffect } from 'react';
import { EntityDict } from "../../../oak-app-domain";
import { WebComponentProps } from 'oak-frontend-base';
import { Modal, Button, Table, Space, Upload, Form, Input } from 'antd';
import Style from './web.module.less';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        keyof EntityDict,
        true,
        {
            getMenuContent: (menuContent: any) => void;
            changeOpen: (open: boolean) => void;
        },
        {

        }
    >
) {
    const { getMenuContent, changeOpen } = props.data;
    const { setMessage } = props.methods;
    const [appid, setAppid] = useState('');
    const [url, setUrl] = useState('');
    const [pagepath, setPagepath] = useState('');
    return (
        <div className={Style.container}>
            <Form.Item required
                label={'appid'}
                labelAlign={'right'}
                labelCol={{ span: 6 }}
            >
                <Input placeholder='小程序的appid'
                    onChange={(val) => {
                        setAppid(val.target.value);
                    }}
                    value={appid}
                />
            </Form.Item>
            <Form.Item required
                label={'url'}
                labelAlign={'right'}
                labelCol={{ span: 6 }}
            >
                <Input placeholder='小程序的网页链接'
                    onChange={(val) => {
                        setUrl(val.target.value);
                    }}
                    value={url}
                />
            </Form.Item>
            <Form.Item required
                label={'pagepath'}
                labelAlign={'right'}
                labelCol={{ span: 6 }}
            >
                <Input placeholder='小程序的页面路径'
                    onChange={(val) => {
                        setPagepath(val.target.value);
                    }}
                    value={pagepath}
                />
            </Form.Item>
            <Space style={{display: 'flex', justifyContent: 'center'}}>
                <Button type='primary' onClick={() => {
                    if(!appid) {
                        setMessage({
                            type: 'warning',
                            content: '请输入小程序appid'
                        });
                        return;
                    }
                    if(!url) {
                        setMessage({
                            type: 'warning',
                            content: '请输入小程序网页链接'
                        });
                        return;
                    }
                    if(!pagepath) {
                        setMessage({
                            type: 'warning',
                            content: '请输入小程序页面路径'
                        });
                        return;
                    }
                    getMenuContent({ appid, url, pagepath});
                    setAppid('');
                    setPagepath('');
                    setUrl('');
                    changeOpen(false);
                }}>
                    确定
                </Button>
                <Button onClick={() => {
                    changeOpen(false);
                }}>
                    取消
                </Button>
            </Space>
        </div>
    );
}

