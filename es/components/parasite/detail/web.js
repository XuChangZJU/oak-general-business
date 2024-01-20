import React from 'react';
import QrCode from '../../../components/common/qrCode';
import { Spin, Button, Space, Input, Tooltip,Alert } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';
export default function Render(props) {
    const { url, expiresAt, oakLoading } = props.data;
    const { setMessage } = props.methods;
    return oakLoading ? (<div style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '48px',
        }}>
            <Spin size="large"/>
        </div>) : (<div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '48px',
        }}>
            <div style={{
            maxWidth: 800
            }}>
                <Alert message="温馨提示：请扫描二维码或打开链接填写信息！" type="info" />
                <QrCode url={url} expiresAt={expiresAt}/>

                <Space.Compact block style={{ marginTop: 16 }}>
                    <Input value={url} readOnly/>
                    <Tooltip title="复制链接">
                        <Button icon={<CopyOutlined />} onClick={() => {
            copy(url);
            setMessage({
                content: '复制链接成功',
                type: 'success',
            });
        }}>
                            复制链接
                        </Button>
                    </Tooltip>
                </Space.Compact>
            </div>
        </div>);
}
