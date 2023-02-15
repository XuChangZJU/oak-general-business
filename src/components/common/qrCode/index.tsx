import React, { useState, useEffect } from 'react';
import { Button, Space, QRCode } from 'antd';
import { DownloadOutlined, ReloadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import './index.less';

type IQrCodeProps = {
    filename?: string;
    expiresAt?: number;
    tips?: React.ReactNode;
    onDownload?: (qrCodeImage: string, filename?: string) => void;
    onRefresh?: () => void;
    size?: number;
    url: string;
};


function isBase64(url: string) {
    return /data:image\/[\w|\W]+(;base64,)$/.test(url);
}

function QrCode(props: IQrCodeProps) {
    const {
        filename = 'qrCode.png',
        expiresAt,
        tips,
        onDownload,
        onRefresh,
        size = 280,
        url,
    } = props;
    const prefixCls = 'oak';

    let V;
    if (expiresAt) {
        const diff = dayjs(expiresAt).diff(dayjs(), 'days');
        if (diff > 0) {
            const expiresAtStr = dayjs(expiresAt).format('YYYY年MM月DD日');

            V = (
                <span className={`${prefixCls}-qrCodeBox-caption`}>
                    该二维码
                    <span>{diff}</span>
                    天内(
                    <span>{expiresAtStr}</span>
                    前)有效，失效请重新更新
                </span>
            );
        } else {
            const diff2 = dayjs(expiresAt).diff(dayjs(), 'minutes');
            const expiresAtStr = dayjs(expiresAt).format('HH:mm');

            if (diff2 > 0) {
                V = (
                    <span className={`${prefixCls}-qrCodeBox_caption`}>
                        该二维码1天内(
                        <span>{expiresAtStr}</span>
                        前)有效，失效请重新更新
                    </span>
                );
            } else {
                V = (
                    <span className={`${prefixCls}-qrCodeBox_caption`}>
                        该二维码已失效，请重新更新
                    </span>
                );
            }
        }
    }


    return (
        <div id="oakQrCode" className={`${prefixCls}-qrCodeBox`}>
            <div
                className={`${prefixCls}-qrCodeBox_imgBox`}
                style={{
                    width: size,
                    height: size,
                }}
            >
                {isBase64(url) ? (
                    <img src={url} alt="qrCode" width={size} height={size} />
                ) : (
                   url ? <QRCode value={url} size={size} /> : null
                )}
            </div>
            {V}
            {tips}
            {
                <Space className={`${prefixCls}-qrCodeBox_actions`}>
                    {
                        <Button
                            type="text"
                            onClick={() => {
                                if (typeof onDownload === 'function') {
                                    onDownload(url, filename);
                                    return;
                                }
                                const canvas = document
                                    .getElementById('oakQrCode')
                                    ?.querySelector<HTMLCanvasElement>(
                                        'canvas'
                                    );
                                if (canvas) {
                                    const url = canvas.toDataURL();
                                    const a = document.createElement('a');
                                    a.download = filename;
                                    a.href = url;
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                }
                            }}
                        >
                            <DownloadOutlined
                                className={`${prefixCls}-qrCodeBox_actions_downloadIcon`}
                            />
                        </Button>
                    }
                    {onRefresh && (
                        <Button
                            type="text"
                            onClick={() => {
                                onRefresh();
                            }}
                        >
                            <ReloadOutlined
                                className={`${prefixCls}-qrCodeBox_actions_refreshIcon`}
                            />
                        </Button>
                    )}
                </Space>
            }
        </div>
    );
}

export default QrCode;
