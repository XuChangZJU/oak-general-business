import React, { useState, useEffect } from 'react';
import { Button, Space } from 'antd';
import { DownloadOutlined, ReloadOutlined } from '@ant-design/icons';
import qr from 'qr-image';
import dayjs from 'dayjs';
import Download from '../download';

import './index.less';

type IQrCodeProps = {
    filename?: string;
    expiresAt?: number;
    tips?: React.ReactNode;
    onDownload?: (qrCodeImage: string, filename?: string) => void;
    onRefresh?: () => void;
    width?: number;
    height?: number;
    url: string;
};


function QrCode(props: IQrCodeProps) {
    const {
        filename = 'qrCode.png',
        expiresAt,
        tips,
        onDownload,
        onRefresh,
        width = 280,
        height = 280,
        url,
    } = props;
    const prefixCls = 'oak';

    const [qrCodeImage, setQrCodeImage] = useState('');

    const qrImage = (url: string) => {
        const image = qr.imageSync(url, { type: 'png' });
        const imageToBase64 = Buffer.from(image).toString('base64');
        setQrCodeImage(`data:image/png;base64,${imageToBase64}`);
    };

    useEffect(() => {
        if (url) {
            if (/data:image\/[\w|\W]+(;base64,)$/.test(url)) {
                setQrCodeImage(url);
            } else {
                qrImage(url);
            }
        }
    }, [url]);

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
        <div className={`${prefixCls}-qrCodeBox`}>
            <div
                style={{
                    width: width,
                    height: height,
                }}
            >
                {!!qrCodeImage && (
                    <img
                        src={qrCodeImage}
                        alt="qrCode"
                        width={width}
                        height={height}
                    />
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
                                    onDownload(qrCodeImage, filename);
                                    return;
                                }
                                const arraybuffer =
                                    Download.base64ToArrayBuffer(qrCodeImage);
                                Download.onDownload(arraybuffer, filename);
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
