import React from 'react';
import { Button, Space, Spin, Result } from 'antd';
import { DownloadOutlined, ReloadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { QRCodeCanvas } from 'qrcode.react';
import './index.less';
import useFeatures from '../../../hooks/useFeatures';
function isBase64(url) {
    return /data:image\/[\w|\W]+(;base64,)[\w|\W]*/.test(url);
}
function QrCode(props) {
    const { filename = 'qrCode.png', expiresAt, tips, onDownload, onRefresh, size = 280, url, loading = false, disableDownload = false, successed, type, } = props;
    const prefixCls = 'oak';
    const features = useFeatures();
    let V;
    if (expiresAt) {
        const diff = dayjs(expiresAt).diff(dayjs(), 'days');
        if (diff > 0) {
            const expiresAtStr = dayjs(expiresAt).format('YYYY年MM月DD日 HH:mm');
            V = (<span className={`${prefixCls}-qrCodeBox-caption`}>
                    该二维码
                    <span>{expiresAtStr}</span>
                    前有效
                </span>);
        }
        else {
            const diff2 = dayjs(expiresAt).diff(dayjs(), 'minutes');
            const expiresAtStr = dayjs(expiresAt).format('HH:mm');
            if (diff2 > 0) {
                V = (<span className={`${prefixCls}-qrCodeBox_caption`}>
                        该二维码
                        <span>{expiresAtStr}</span>
                        前有效
                    </span>);
            }
            else {
                V = (<span className={`${prefixCls}-qrCodeBox_caption`}>
                        该二维码已失效
                    </span>);
            }
        }
    }
    if (successed) {
        return (<div className={`${prefixCls}-qrCodeBox`}>
                <Result status="success" title={type === 'bind' ? features.locales.t('weChat-account-successfully-bound') : features.locales.t('weChat-authorization-login-successful')}/>
            </div>);
    }
    return (<div id="oakQrCode" className={`${prefixCls}-qrCodeBox`}>
            <div className={`${prefixCls}-qrCodeBox_imgBox`} style={{
            width: size,
            height: size,
            marginBottom: 16,
            marginTop: 16,
        }}>
                <Spin spinning={loading}>
                    {isBase64(url) ? (<img src={url} alt="qrCode" width={size} height={size}/>) : url ? (<QRCodeCanvas value={url} size={size}/>) : null}
                </Spin>
            </div>

            {V}
            {tips}
            {<Space className={`${prefixCls}-qrCodeBox_actions`}>
                    {!!url && !disableDownload && (<Button type="text" onClick={() => {
                    if (typeof onDownload === 'function') {
                        onDownload(url, filename);
                        return;
                    }
                    const canvas = document
                        .getElementById('oakQrCode')
                        ?.querySelector('canvas');
                    if (canvas) {
                        const url = canvas.toDataURL();
                        const a = document.createElement('a');
                        a.download = filename;
                        a.href = url;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    }
                }}>
                            <DownloadOutlined className={`${prefixCls}-qrCodeBox_actions_downloadIcon`}/>
                        </Button>)}
                    {onRefresh && (<Button type="text" onClick={() => {
                    onRefresh();
                }}>
                            <ReloadOutlined className={`${prefixCls}-qrCodeBox_actions_refreshIcon`}/>
                        </Button>)}
                </Space>}
        </div>);
}
export default QrCode;
