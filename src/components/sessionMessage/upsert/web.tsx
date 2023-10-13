import React, { useRef, useState, useEffect } from 'react';
import { Button, Input, Upload } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
import Style from './web.module.less';
import { UploadFile } from 'antd/es/upload/interface';

export default function render(
    props: WebComponentProps<
        EntityDict,
        'sessionMessage',
        false,
        {
            isEntity: boolean;
            isUser: boolean;
            $$createAt$$: number;
            text: string;
            type: string;
            aaoe: boolean;
            picUrl: string;
            sessionId: string;
            oakId: string;
            isWeChat: string;
        },
        {
            setContent: (str: string) => void;
            sendData: () => void;
            upload: (file: UploadFile) => void;
        }
    >
) {
    const { data, methods } = props;
    const {
        $$createAt$$,
        text,
        type,
        picUrl,
        isEntity,
        aaoe,
        sessionId,
        isWeChat,
    } = data;
    const { t, setContent, sendData, upload } = methods;
    const textareaRef = useRef(null);

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendData();
        }
    };

    return (
        <>
            <div className={Style.toolbar}>
                <Upload
                    accept={'image/*'}
                    multiple={false}
                    showUploadList={false}
                    customRequest={() => {}}
                    onChange={({ file }) => {
                        upload(file as UploadFile);
                    }}
                >
                    <PictureOutlined className={Style.icon} />
                </Upload>
            </div>

            <div className={Style.textareaBox}>
                <Input.TextArea
                    ref={textareaRef}
                    className={Style.textarea}
                    maxLength={500}
                    placeholder={t('placeholder')}
                    rows={5}
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                    onFocus={() => {}}
                    onKeyDown={handleKeyDown}
                    value={text}
                />
                <div className={Style.btn}>
                    <Button
                        type="primary"
                        disabled={!text}
                        onClick={() => {
                            sendData();
                        }}
                    >
                        {t('send')}
                    </Button>
                </div>
            </div>
        </>
    );
}
