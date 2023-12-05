import React, { useRef } from 'react';
import { Button, Input, Upload } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import Style from './web.module.less';
export default function render(props) {
    const { data, methods } = props;
    const { $$createAt$$, text, type, picUrl, isEntity, aaoe, sessionId, isWeChat, } = data;
    const { t, setContent, sendMessage, upload } = methods;
    const textareaRef = useRef(null);
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    };
    return (<>
            <div className={Style.toolbar}>
                <Upload accept={'image/*'} multiple={false} showUploadList={false} customRequest={() => { }} onChange={({ file }) => {
            upload(file);
        }}>
                    <PictureOutlined className={Style.icon}/>
                </Upload>
            </div>

            <div className={Style.textareaBox}>
                <Input.TextArea ref={textareaRef} className={Style.textarea} maxLength={500} placeholder={t('placeholder')} rows={5} onChange={(e) => {
            setContent(e.target.value);
        }} onFocus={() => { }} onKeyDown={handleKeyDown} value={text}/>
                <div className={Style.btn}>
                    <Button type="primary" disabled={!text} onClick={() => {
            sendMessage();
        }}>
                        {t('send')}
                    </Button>
                </div>
            </div>
        </>);
}
