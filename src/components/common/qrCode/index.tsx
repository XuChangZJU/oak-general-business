import React, { useState, useEffect } from 'react';
import { Button, Space } from 'antd';
import { DownloadOutlined, ReloadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { QRCodeCanvas } from 'qrcode.react';

import './index.less';

type IQrCodeProps = {
    filename?: string;
    expiresAt?: number;
    tips?: React.ReactNode;
    onDownload?: (qrCodeImage: string, filename?: string) => void;
    onRefresh?: () => void;
    size?: number;
    url: string;
    loading?: boolean;
};


function isBase64(url: string) {
    return /data:image\/[\w|\W]+(;base64,)[\w|\W]*/.test(url);
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
        loading = false,
    } = props;
    const prefixCls = 'oak';

    let V;
    if (expiresAt) {
        const diff = dayjs(expiresAt).diff(dayjs(), 'days');
        if (diff > 0) {
            const expiresAtStr =
                dayjs(expiresAt).format('YYYY年MM月DD日 HH:mm');

            V = (
                <span className={`${prefixCls}-qrCodeBox-caption`}>
                    该二维码
                    <span>{diff}</span>
                    天内(
                    <span>{expiresAtStr}</span>
                    前)有效，失效请重新生成
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
                        前)有效，失效请重新生成
                    </span>
                );
            } else {
                V = (
                    <span className={`${prefixCls}-qrCodeBox_caption`}>
                        该二维码已失效，请重新生成
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
                    marginBottom: 10,
                }}
            >
                {isBase64(url) ? (
                    <img src={url} alt="qrCode" width={size} height={size} />
                ) : url ? (
                    <QRCodeCanvas value={url} size={size} />
                ) : null}
            </div>
            {V}
            {tips}
            {
                <Space className={`${prefixCls}-qrCodeBox_actions`}>
                    {!!url && (
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
                    )}
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
